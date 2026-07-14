// ==========================================================================
// finalExam.js — question bank for the comprehensive Final Exam.
//
// 50 questions spanning all 13 modules. These are DELIBERATELY harder than the
// per-module quizzes (scenario/applied/distinguishing rather than recall) and
// are authored to NOT duplicate any question already in the module pools in
// courseData.jsx. Each attempt serves 20 of these; a large pool lets retakes
// avoid the previous attempt's questions.
//
// Schema (per question):
//   id       stable, unique — drives the no-repeat-across-retakes logic. Never
//            renumber or reuse an id.
//   q        the question stem
//   options  array of 3-4 answer strings
//   correct  0-based index of the correct option
//   why      explanation shown after submitting
//   module   source module number (1-13), or 0 for cross-module synthesis
//
// NOTE: review pass recommended — since the exam is graded, every `correct`
// index and explanation should be human-verified before this goes live.
// ==========================================================================

export const FINAL_EXAM = [
  // --- Module 1: Digital Transformation ---------------------------------
  {
    id: "fx-001",
    q: "A prospect says 'we're doing digital transformation.' Per the module, what is the rep's primary discovery job?",
    options: [
      "Recommend a specific cloud platform on the first call",
      "Find which of the three DT workstreams they're actually struggling with, and what is forcing the conversation now",
      "Propose a fixed-scope, fixed-price contract to lock in budget",
      "Route the deal straight to the CFO for sign-off",
    ],
    correct: 1,
    why: "A customer who 'is doing DT' isn't telling you enough. Discovery is finding which of strategy, process, or technology they struggle with and the forcing function behind it.",
    module: 1,
  },
  {
    id: "fx-002",
    q: "Which stakeholder does the module describe as 'not usually the buyer but always a gatekeeper,' whose desk every DT business case eventually crosses?",
    options: ["CIO or CTO", "COO", "CFO", "Chief Digital Officer"],
    correct: 2,
    why: "The CFO is not usually the buyer but is always a gatekeeper; every DT business case eventually passes their desk.",
    module: 1,
  },
  {
    id: "fx-003",
    q: "According to the module, why do good transformation roadmaps survive leadership changes?",
    options: [
      "They are tied to outcomes, not personalities",
      "They are personally approved by the CFO",
      "They always use the newest technology",
      "They are locked in as fixed-price",
    ],
    correct: 0,
    why: "Good roadmaps survive leadership changes because they are tied to outcomes, not personalities.",
    module: 1,
  },
  {
    id: "fx-004",
    q: "In the four-phase delivery model, what does each phase include that lets a customer pause, pivot, or continue with full visibility?",
    options: ["A fixed price", "Exit criteria", "A signed master services agreement", "A live product demo"],
    correct: 1,
    why: "Each phase has an exit criteria, so at any point the customer can pause, pivot, or continue with full visibility into what they've committed to.",
    module: 1,
  },

  // --- Module 2: Cloud Modernization ------------------------------------
  {
    id: "fx-005",
    q: "A customer opens with 'our AWS bill is out of control.' Per the module, which Cloud Modernization workstream are they really thinking about?",
    options: ["Migration", "Cloud Strategy", "Security and governance", "Repurchase"],
    correct: 1,
    why: "'Move to AWS' signals migration; 'AWS bill out of control' signals strategy; 'pass a SOC 2 audit' signals security and governance.",
    module: 2,
  },
  {
    id: "fx-006",
    q: "A workload is moved to the cloud and optimized during the move (for example, swapping to a managed database) without a full re-architecture. Which of the 6 Rs is this?",
    options: ["Rehost", "Replatform", "Refactor", "Repurchase"],
    correct: 1,
    why: "Replatform is 'lift and optimize' — optimize during migration, short of a full refactor.",
    module: 2,
  },
  {
    id: "fx-007",
    q: "Which of the 6 Rs is the highest effort and highest payoff, re-architecting an app for cloud-native patterns like microservices and serverless?",
    options: ["Rehost", "Replatform", "Refactor", "Retain"],
    correct: 2,
    why: "Refactor means re-architecting for cloud-native; it is the highest effort and highest payoff path.",
    module: 2,
  },
  {
    id: "fx-008",
    q: "A customer raises security concerns about moving to cloud. Which concept does the module's response rely on to explain that the provider handles physical security and platform hardening?",
    options: ["The shared responsibility model", "Zero trust", "Elasticity", "Geo-redundancy"],
    correct: 0,
    why: "The shared responsibility model means the provider handles physical security and platform hardening, and we implement best practices on top.",
    module: 2,
  },

  // --- Module 3: Managed Services ---------------------------------------
  {
    id: "fx-009",
    q: "In managed services, why do tighter SLAs cost the customer more?",
    options: [
      "They require more staff standing by",
      "They need more software licenses",
      "They mandate longer contract terms",
      "They require the customer to buy more hardware",
    ],
    correct: 0,
    why: "Tighter SLAs cost more because they require more staff standing by to meet the response and fix targets.",
    module: 3,
  },
  {
    id: "fx-010",
    q: "A managed-services contract promises backups run at least every hour. Which metric does that define?",
    options: [
      "RTO (Recovery Time Objective)",
      "RPO (Recovery Point Objective)",
      "MTTR (Mean Time To Resolve)",
      "Uptime percentage",
    ],
    correct: 1,
    why: "RPO is the maximum acceptable data loss; an RPO of 1 hour means backups run at least every hour. RTO is the target time to restore.",
    module: 3,
  },
  {
    id: "fx-011",
    q: "A customer needs 24/7 monitoring focused specifically on security threats and events. Which center is the right fit?",
    options: [
      "NOC (Network Operations Center)",
      "SOC (Security Operations Center)",
      "L1 help desk",
      "A disaster-recovery site",
    ],
    correct: 1,
    why: "A NOC monitors infrastructure health; a SOC monitors for security threats. Security events map to the SOC.",
    module: 3,
  },

  // --- Module 4: AI Engineering -----------------------------------------
  {
    id: "fx-012",
    q: "Which of the following is NOT one of the three things the module says every AI project needs to succeed?",
    options: [
      "Good training data",
      "A clear success metric",
      "An operational home for the model",
      "A dedicated on-prem data center",
    ],
    correct: 3,
    why: "The three prerequisites are good training data, a clear success metric, and an operational home. A dedicated data center is not one of them.",
    module: 4,
  },
  {
    id: "fx-013",
    q: "A SaaS product handles about 80% of a customer's need, but the last 20% requires custom glue to fit their business. Per the build/buy framing, what's the right move?",
    options: [
      "Build a fully custom model",
      "Buy the SaaS and use it as-is",
      "Integrate — buy the SaaS and add the custom glue",
      "Retire the requirement",
    ],
    correct: 2,
    why: "Integrate when a SaaS product handles 80% of the need but the last 20% needs custom glue to fit the business.",
    module: 4,
  },
  {
    id: "fx-014",
    q: "A customer is worried about the ongoing per-use cost of an AI model in production. Which activity drives that recurring cost?",
    options: ["Training", "Inference", "Labeling the data", "Fine-tuning"],
    correct: 1,
    why: "Training is expensive and happens once; inference happens every time the model is used, so it drives the recurring cost.",
    module: 4,
  },
  {
    id: "fx-015",
    q: "A customer is worried about LLM hallucinations. Which combination does the module say we build into every LLM deployment?",
    options: [
      "Evaluation, guardrails, and human review of high-stakes outputs",
      "A larger model and more GPUs",
      "Turning the model off for risky questions",
      "Manual review of every single output",
    ],
    correct: 0,
    why: "We build evaluation and guardrails in, measure accuracy on the customer's data before production, and keep humans reviewing high-stakes outputs.",
    module: 4,
  },

  // --- Module 5: Product Development -------------------------------------
  {
    id: "fx-016",
    q: "A customer presents an 'MVP' with 40 features. Per the module's test, what's the problem?",
    options: [
      "It isn't really an MVP — an MVP is the single core workflow you can describe in one sentence",
      "It's a well-scoped MVP",
      "MVPs should have at least 40 features",
      "MVP just means minimum visual polish",
    ],
    correct: 0,
    why: "If you can describe it in one sentence it's an MVP; if you need a PowerPoint deck it's not. An MVP is the single core workflow that delivers value.",
    module: 5,
  },
  {
    id: "fx-017",
    q: "A customer wants to offshore a brand-new product build to save money. Which trade-off does the module's response highlight?",
    options: [
      "You save ~40% on hourly rate but often lose 2-3x on rework, because new products aren't well-specified",
      "Offshore is always cheaper end-to-end",
      "Offshore teams cannot write production code",
      "There is no meaningful difference either way",
    ],
    correct: 0,
    why: "Offshore works for well-specified tasks; new products aren't well-specified by definition, so you save 40% on rate and often lose 2-3x on rework.",
    module: 5,
  },
  {
    id: "fx-018",
    q: "In the default tech stack, which datastore is named specifically for caching?",
    options: ["PostgreSQL", "Redis", "Elasticsearch", "MongoDB"],
    correct: 1,
    why: "PostgreSQL for transactional data, Redis for caching, Elasticsearch for search.",
    module: 5,
  },

  // --- Module 6: UI/UX Design -------------------------------------------
  {
    id: "fx-019",
    q: "A product looks polished, but users still can't accomplish their goals. Which discipline is deficient?",
    options: ["UX (User Experience)", "UI (User Interface)", "The color palette", "The design-system tokens"],
    correct: 0,
    why: "UX is how the product works and whether users can accomplish their goals; UI is how it looks. 'UI without UX is lipstick on a broken flow.'",
    module: 6,
  },
  {
    id: "fx-020",
    q: "What is the module's strongest argument for doing user research before building?",
    options: [
      "Testing an idea in interviews is far cheaper than building the wrong thing for six months",
      "It makes the interface prettier",
      "It is legally mandated in most markets",
      "It removes the need for engineers",
    ],
    correct: 0,
    why: "Research is the cheapest way to fail; a few interviews can prevent a six-month engineering mistake.",
    module: 6,
  },
  {
    id: "fx-021",
    q: "When does the module recommend a customer invest in a design system?",
    options: [
      "As soon as they have more than one product or surface",
      "Only after they ship ten products",
      "Never, for anything smaller than an enterprise",
      "Before any user research is done",
    ],
    correct: 0,
    why: "Build a design system as soon as a customer has more than one product or surface; the upfront cost pays back fast once multiple teams draw from the same library.",
    module: 6,
  },

  // --- Module 7: AI Automation ------------------------------------------
  {
    id: "fx-022",
    q: "A typical modern document-processing deployment handles roughly what share of documents without human review, escalating the rest?",
    options: ["20-30%", "50-60%", "80-95%", "100%"],
    correct: 2,
    why: "A typical deployment handles 80-95% of documents without human review, with the rest escalated for a quick check.",
    module: 7,
  },
  {
    id: "fx-023",
    q: "A customer worries AI Automation will make mistakes on edge cases. What design does the module use to address this?",
    options: [
      "Full autonomy with no oversight",
      "Human-in-the-loop for low-confidence cases, with audit trails",
      "Manual review of every case",
      "Removing AI from the workflow entirely",
    ],
    correct: 1,
    why: "AI Automation is not 100% autonomous; we build human-in-the-loop for low-confidence cases and audit trails for everything.",
    module: 7,
  },
  {
    id: "fx-024",
    q: "The module says never to say 'we're building you a chatbot.' What should you say instead?",
    options: [
      "'An AI assistant that resolves X% of your support volume'",
      "'A rule-based bot like the 2019 ones'",
      "'A scripted FAQ page'",
      "'A generic virtual assistant'",
    ],
    correct: 0,
    why: "Anchor on the outcome, not the tech: 'an AI assistant that resolves X% of your support volume.'",
    module: 7,
  },
  {
    id: "fx-025",
    q: "Which of these is a warning sign, during discovery, that an AI Automation deal will stall?",
    options: [
      "The inputs are paper-only with no digital source",
      "There is a named owner on the customer's team",
      "The inputs are clean and already digital",
      "The scope is a single concrete workflow",
    ],
    correct: 0,
    why: "Paper-only documents can't be automated for extraction until there's digital input; it's a listed pitfall, along with no owner and inconsistent input quality.",
    module: 7,
  },

  // --- Module 8: DevOps & CI/CD -----------------------------------------
  {
    id: "fx-026",
    q: "A team wants every change that passes CI to reach production automatically, with no human clicking 'release.' Which practice is that?",
    options: ["Continuous Integration", "Continuous Delivery", "Continuous Deployment", "Blue-green deployment"],
    correct: 2,
    why: "Continuous Delivery still has a human push the button; Continuous Deployment sends every change that passes CI to production automatically.",
    module: 8,
  },
  {
    id: "fx-027",
    q: "In observability, which signal is described as 'the full path of a request across services,' used to diagnose complex distributed issues?",
    options: ["Metrics", "Logs", "Traces", "Alerts"],
    correct: 2,
    why: "Traces show the full path of a request across services; metrics are numbers over time and logs are time-stamped event records.",
    module: 8,
  },
  {
    id: "fx-028",
    q: "A customer can tell their system is up but can't explain why it's intermittently slow for some users at 3am. What do they actually need?",
    options: ["More uptime in the SLA", "Monitoring", "Observability", "A public status page"],
    correct: 2,
    why: "Monitoring tells you whether the system is up; observability tells you why it's slow at 3am for customers in Europe, which needs richer instrumentation.",
    module: 8,
  },
  {
    id: "fx-029",
    q: "A customer insists on Kubernetes for a single small application. What's the module's honest recommendation?",
    options: [
      "Deploy Kubernetes anyway — it's always best practice",
      "They likely need containerization and a real CI/CD pipeline, not Kubernetes",
      "Refuse to use containers at all",
      "Rewrite everything into microservices first",
    ],
    correct: 1,
    why: "Kubernetes is overkill for small or single applications; what they likely need is containerization and a real CI/CD pipeline, even without Kubernetes.",
    module: 8,
  },

  // --- Module 9: Cybersecurity Services ---------------------------------
  {
    id: "fx-030",
    q: "A customer wants a provider that not only alerts on threats but investigates and contains them on the customer's behalf. Which model fits?",
    options: [
      "MSSP (Managed Security Services Provider)",
      "MDR (Managed Detection and Response)",
      "A SIEM tool on its own",
      "A SOC 2 auditor",
    ],
    correct: 1,
    why: "An MSSP monitors and hands incidents back to the customer; MDR monitors, investigates, AND responds — usually what customers actually need.",
    module: 9,
  },
  {
    id: "fx-031",
    q: "Which cybersecurity buying motivation does the module say carries the highest urgency and maximum budget authority?",
    options: [
      "A regulatory requirement",
      "A recent incident or close call",
      "Proactive risk management",
      "A CEO's general curiosity",
    ],
    correct: 1,
    why: "'We had a ransomware attempt last month' — a recent incident or close call — brings high urgency and maximum budget authority.",
    module: 9,
  },
  {
    id: "fx-032",
    q: "Which compliance framework carries penalties of up to 4% of global revenue?",
    options: ["SOC 2", "HIPAA", "PCI-DSS", "GDPR"],
    correct: 3,
    why: "GDPR applies to any organization handling EU resident data, with penalties up to 4% of global revenue.",
    module: 9,
  },

  // --- Module 10: Data & Analytics --------------------------------------
  {
    id: "fx-033",
    q: "A customer wants to load raw data into the warehouse first and transform it there, so they can always re-transform later. Which pattern is that?",
    options: [
      "ETL (Extract, Transform, Load)",
      "ELT (Extract, Load, Transform)",
      "OLTP (transactional processing)",
      "SAN (storage area network)",
    ],
    correct: 1,
    why: "ELT loads raw data into the warehouse first, then transforms it there; keeping the raw data means you can always re-transform later.",
    module: 10,
  },
  {
    id: "fx-034",
    q: "An executive asks, 'What will demand be next quarter, and what should we do about it?' Which capability answers that?",
    options: ["BI dashboards", "Data science", "An ETL pipeline", "Data governance"],
    correct: 1,
    why: "BI answers 'what happened' and 'what's happening now'; data science answers 'what will happen' and 'what should we do.'",
    module: 10,
  },
  {
    id: "fx-035",
    q: "Why does the module say most customers need BI before data science?",
    options: [
      "You cannot predict what you cannot measure — data science needs a solid data foundation first",
      "Data science is cheaper to build",
      "BI is the more advanced discipline",
      "The two are unrelated",
    ],
    correct: 0,
    why: "Most customers need BI first because you cannot predict what you cannot measure; data science comes once the data foundation is solid.",
    module: 10,
  },
  {
    id: "fx-036",
    q: "A customer buys a BI tool before their warehouse and source data are trustworthy. What does the module warn will happen?",
    options: [
      "Dashboards with no trustworthy data behind them",
      "Faster, more reliable insights",
      "Lower total cost of ownership",
      "Automatic data governance",
    ],
    correct: 0,
    why: "Choosing a BI tool before the warehouse is ready produces dashboards with no trustworthy data behind them.",
    module: 10,
  },

  // --- Module 11: Application Modernization ------------------------------
  {
    id: "fx-037",
    q: "A customer was burned by a failed big-bang rewrite. Which modernization approach does the module recommend, and why?",
    options: [
      "The strangler pattern — incremental and reversible, with the old system working throughout",
      "Another big-bang rewrite, done faster this time",
      "Freeze the legacy system indefinitely",
      "An immediate full cutover to microservices",
    ],
    correct: 0,
    why: "The strangler pattern wraps the legacy system and peels off pieces; it's risk-controlled and reversible — you can stop anywhere and still have a working app.",
    module: 11,
  },
  {
    id: "fx-038",
    q: "A small team wants some benefits of microservices without the operational cost. What middle ground does the module suggest?",
    options: [
      "A modular monolith — one deployment with clean internal boundaries",
      "Full microservices from day one",
      "A mainframe rewrite",
      "Serverless for absolutely everything",
    ],
    correct: 0,
    why: "A modular monolith is one deployment with clean internal boundaries, giving the option to split later without the upfront operational cost.",
    module: 11,
  },
  {
    id: "fx-039",
    q: "Per the module, microservices actually pay off primarily when:",
    options: [
      "Multiple teams need to ship independently and services need different scaling characteristics",
      "Any application at all, regardless of size",
      "The team is very small and early-stage",
      "You want the simplest possible operations",
    ],
    correct: 0,
    why: "Monoliths are fine for small-to-medium teams; microservices pay off when multiple teams ship independently and specific services need different scaling.",
    module: 11,
  },

  // --- Module 12: Infrastructure Services -------------------------------
  {
    id: "fx-040",
    q: "A customer needs high-performance block storage for their databases and virtualization. Which fits, per the module?",
    options: ["SAN (Storage Area Network)", "NAS (Network Attached Storage)", "Tape backup", "A CDN"],
    correct: 0,
    why: "SAN is high-performance block storage, expensive, used for databases and virtualization; NAS is file-level and cheaper.",
    module: 12,
  },
  {
    id: "fx-041",
    q: "Which storage type does the module describe as file-level, cheaper, and used for shared drives and backups?",
    options: ["SAN", "NAS", "Block SSD", "RAM disk"],
    correct: 1,
    why: "NAS (Network Attached Storage) is file-level storage, cheaper than SAN, used for shared drives and backups.",
    module: 12,
  },
  {
    id: "fx-042",
    q: "The module says 'if you cannot restore it, you do not have a backup.' What's the point being made?",
    options: [
      "Backups must be tested and restorable, and kept separate from production",
      "Backups only need to run on a schedule",
      "One backup copy is always enough",
      "Backups should live on the production server",
    ],
    correct: 0,
    why: "Backups must be regular, tested, and separate from production; an untested backup you can't restore isn't a backup.",
    module: 12,
  },

  // --- Module 13: Migration Services ------------------------------------
  {
    id: "fx-043",
    q: "What does the module say SmarTek21's 4-phase migration methodology differentiates against?",
    options: [
      "Generic competitors who just quote a headcount and a timeline",
      "Other phased methodologies",
      "The cloud providers themselves",
      "The customer's internal IT team",
    ],
    correct: 0,
    why: "Lead with the 4-phase methodology to differentiate from generic competitors who just quote a headcount and a timeline.",
    module: 13,
  },
  {
    id: "fx-044",
    q: "Per the module, the biggest migration risks are primarily:",
    options: [
      "Organizational — users not knowing what changed, undocumented integrations, data in unexpected places",
      "Purely technical — CPU and network limits",
      "Hardware failures during cutover",
      "Cloud pricing changes",
    ],
    correct: 0,
    why: "The biggest migration risks are not technical; they are organizational, which is exactly what the discovery phase is designed to surface.",
    module: 13,
  },
  {
    id: "fx-045",
    q: "How does the module quantify downtime under its phased migration approach?",
    options: [
      "Under 2 hours total across the whole migration, most of it during off-hours",
      "Zero downtime, ever, guaranteed",
      "A full weekend of downtime",
      "About one business week",
    ],
    correct: 0,
    why: "The phased approach means under 2 hours total downtime across the whole migration, and most is planned during off-hours.",
    module: 13,
  },

  // --- Cross-module synthesis -------------------------------------------
  {
    id: "fx-046",
    q: "Across DT, Cloud, Cybersecurity, DevOps, and Migration, SmarTek21 repeatedly opens with a free or low-cost assessment. What is the shared strategic purpose?",
    options: [
      "A low-friction first step that produces a specific roadmap or risk register and expands into a larger engagement",
      "To give away as much free work as possible",
      "To avoid ever quoting a paid project",
      "To replace the sales team with automation",
    ],
    correct: 0,
    why: "The assessment is the low-risk opening move; it produces a concrete artifact (top opportunities, a risk register, pipeline gaps) that becomes the roadmap for the larger engagement.",
    module: 0,
  },
  {
    id: "fx-047",
    q: "MVPs (Product), 2-week AI proofs of concept (AI Engineering), pilot waves (Migration), and quick wins (DT) all express which shared principle?",
    options: [
      "Reduce risk and build confidence with a small first increment before committing to large scope",
      "Always sell the largest possible deal first",
      "Never perform assessments",
      "Fixed-price everything upfront",
    ],
    correct: 0,
    why: "Start small, prove value, then expand is the common thread — it de-risks the engagement and builds customer confidence before a large commitment.",
    module: 0,
  },
  {
    id: "fx-048",
    q: "Which assessment-to-output pairing is correct?",
    options: [
      "Cybersecurity assessment produces a risk register that becomes the engagement roadmap",
      "DevOps assessment produces a customer-facing design system",
      "Digital Transformation assessment produces a penetration-test report",
      "Migration assessment produces a production Kubernetes cluster",
    ],
    correct: 0,
    why: "The cybersecurity assessment produces a specific risk register that becomes the roadmap; the other pairings are mismatched to their modules.",
    module: 0,
  },
  {
    id: "fx-049",
    q: "An AI Automation chatbot buyer worried about wrong answers should hear the same safeguard emphasized in AI Engineering. What is it?",
    options: [
      "Guardrails and human-in-the-loop, with evaluation before anything high-stakes goes to production",
      "Blue-green deployment",
      "A SAN for faster storage",
      "A SOC 2 certification",
    ],
    correct: 0,
    why: "Both AI modules stress evaluation, guardrails, and human review of low-confidence or high-stakes outputs to manage model mistakes.",
    module: 0,
  },
  {
    id: "fx-050",
    q: "'End the hardware refresh cycle and move to predictable monthly spend' appears in Cloud, Infrastructure, and Migration as a CFO-friendly framing. Which financial shift is it describing?",
    options: [
      "Moving from capital expenditure (CapEx) to operating expenditure (OpEx)",
      "Increasing capital expenditure",
      "Converting OpEx back into CapEx",
      "A change in revenue recognition",
    ],
    correct: 0,
    why: "Ending hardware refresh cycles in favor of a predictable monthly bill is the CapEx-to-OpEx shift that CFOs respond to.",
    module: 0,
  },
];
