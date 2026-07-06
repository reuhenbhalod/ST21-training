// ==========================================================================
// build-course-kb.mjs — derive the server-side chat knowledge base.
//
// Reads src/courseData.jsx (the single source of truth for course content)
// and flattens each module's reading + dictionary into plain text, writing
// api/course-kb.json. That JSON is bundled into the chat Lambda and stuffed
// into the model's system prompt so answers stay grounded in the modules.
//
// Quiz questions/answers are intentionally EXCLUDED so the assistant can't be
// used to look up quiz answers (quizzes require 100% to pass).
//
// courseData.jsx is pure data (no JSX tags) whose only non-JSON bits are
// lucide-react icon references used as values. We stub those out and eval the
// array — no transpiler needed. Run via `npm run build:kb`.
// ==========================================================================

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, "..", "src", "courseData.jsx");
const OUT = join(here, "..", "api", "course-kb.json");

const source = readFileSync(SRC, "utf8");

// Collect the lucide icon identifiers imported by the file so we can define
// them as harmless placeholders before evaluating the data.
const importRe = /import\s*\{([^}]*)\}\s*from\s*["']lucide-react["'];?/g;
const iconNames = new Set();
for (const m of source.matchAll(importRe)) {
  for (const name of m[1].split(",")) {
    const n = name.trim();
    if (n) iconNames.add(n);
  }
}

// Strip the import statement(s); the eval provides the identifiers itself.
const body = source.replace(importRe, "").replace(/export\s+const\s+COURSE/, "const COURSE");

const preamble = [...iconNames].map((n) => `const ${n} = null;`).join("\n");
// eslint-disable-next-line no-new-func
const COURSE = Function(`${preamble}\n${body}\nreturn COURSE;`)();

if (!Array.isArray(COURSE) || COURSE.length === 0) {
  throw new Error("Failed to extract COURSE from courseData.jsx");
}

function flattenBlocks(blocks = []) {
  const out = [];
  for (const b of blocks) {
    switch (b.type) {
      case "h2":
        out.push(`## ${b.text}`);
        break;
      case "p":
        out.push(b.text);
        break;
      case "grid":
        for (const c of b.cards || []) out.push(`- ${c.title}: ${c.text}`);
        break;
      case "list":
        for (const it of b.items || []) out.push(`- ${it}`);
        break;
      case "callouts":
        for (const it of b.items || []) out.push(`- ${it.title}: ${it.text}`);
        break;
      case "phases":
        for (const it of b.items || [])
          out.push(`- ${it.phase} (${it.weeks}): ${(it.bullets || []).join("; ")}`);
        break;
      case "objections":
        for (const it of b.items || [])
          out.push(`- Objection: "${it.obj}" — Response: ${it.resp}`);
        break;
      case "key":
        out.push(`Key takeaway — ${b.title}: ${b.text}`);
        break;
      default:
        if (b.text) out.push(b.text);
    }
  }
  return out.join("\n");
}

const kb = COURSE.map((m) => {
  const parts = [];
  if (m.reading?.lead) parts.push(m.reading.lead);
  const blocks = flattenBlocks(m.reading?.blocks);
  if (blocks) parts.push(blocks);
  if (Array.isArray(m.dictionary) && m.dictionary.length) {
    parts.push("Glossary:\n" + m.dictionary.map((d) => `- ${d.term}: ${d.def}`).join("\n"));
  }
  return {
    number: m.number,
    id: m.id,
    title: m.title,
    subtitle: m.subtitle,
    text: parts.join("\n\n"),
  };
});

writeFileSync(OUT, JSON.stringify(kb, null, 2) + "\n");

const chars = kb.reduce((n, m) => n + m.text.length, 0);
console.log(`Wrote ${kb.length} modules to api/course-kb.json (~${chars.toLocaleString()} chars).`);
