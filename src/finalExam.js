// ==========================================================================
// finalExam.js — question bank for the comprehensive Final Exam.
//
// 50 questions spanning all 13 modules. Difficulty is calibrated to MATCH the
// per-module quizzes: direct recall and recognition (definitions, key facts,
// glossary terms) rather than multi-step reasoning. They are authored to NOT
// duplicate any question already in the module pools in courseData.jsx.
//
// Each attempt serves 20 of these; a large pool lets retakes avoid the previous
// attempt's questions.
//
// Schema (per question):
//   id       stable, unique — drives the no-repeat-across-retakes logic. Never
//            renumber or reuse an id.
//   q        the question stem
//   options  array of 3-4 answer strings
//   correct  0-based index of the correct option
//   why      explanation shown after submitting
//   module   source module number (1-13)
//
// NOTE: since the exam is graded, human-verify every `correct` index before
// relying on it.
// ==========================================================================

export const FINAL_EXAM = [
  // --- Module 1: Digital Transformation ---------------------------------
  {
    id: "fx-001",
    q: "What does ROI stand for?",
    options: ["Return on Investment", "Rate of Inflation", "Risk of Inaction", "Return on Innovation"],
    correct: 0,
    why: "ROI (Return on Investment) is how much financial value a project returns compared to what it cost.",
    module: 1,
  },
  {
    id: "fx-002",
    q: "What is a 'legacy system'?",
    options: [
      "An older system that is important to operations but expensive to maintain and hard to change",
      "A brand-new cloud-native application",
      "A type of data warehouse",
      "A security compliance framework",
    ],
    correct: 0,
    why: "A legacy system is older, often critical to operations, but expensive to maintain and hard to change.",
    module: 1,
  },
  {
    id: "fx-003",
    q: "In the DT delivery model, which phase focuses on current-state analysis and quick-win identification?",
    options: ["Phase 1: Assess", "Phase 2: Design", "Phase 3: Implement", "Phase 4: Scale"],
    correct: 0,
    why: "Phase 1 (Assess, Weeks 1 to 3) covers current-state analysis, technology gaps, and quick-win identification.",
    module: 1,
  },
  {
    id: "fx-004",
    q: "Who is the 'economic buyer' in a deal?",
    options: [
      "The person with authority to release budget",
      "The end user of the software",
      "The technical evaluator",
      "The project's contractor",
    ],
    correct: 0,
    why: "The economic buyer has the authority to release budget, usually different from the technical evaluator or end user.",
    module: 1,
  },

  // --- Module 2: Cloud Modernization ------------------------------------
  {
    id: "fx-005",
    q: "Which cloud provider is described as having the broadest service catalog and the default for most general-purpose workloads?",
    options: ["AWS", "Azure", "Google Cloud", "Oracle Cloud"],
    correct: 0,
    why: "AWS has the broadest service catalog, deepest ecosystem, and is the default choice for most general-purpose workloads.",
    module: 2,
  },
  {
    id: "fx-006",
    q: "Which cloud provider has the strongest Microsoft 365 and Active Directory integration?",
    options: ["Azure", "AWS", "Google Cloud", "IBM Cloud"],
    correct: 0,
    why: "Azure is strongest in Microsoft-centric environments, with the best M365, Active Directory, and .NET support.",
    module: 2,
  },
  {
    id: "fx-007",
    q: "What does SaaS stand for?",
    options: ["Software as a Service", "Storage as a Service", "Security as a Standard", "Systems and Software"],
    correct: 0,
    why: "SaaS (Software as a Service) is complete software applications delivered over the web, like Microsoft 365 and Salesforce.",
    module: 2,
  },
  {
    id: "fx-008",
    q: "What does 'elasticity' mean in cloud computing?",
    options: [
      "The ability to scale capacity up or down automatically based on demand",
      "The number of data centers a provider operates",
      "The length of a cloud contract",
      "The speed of a network connection",
    ],
    correct: 0,
    why: "Elasticity is the ability to scale capacity up or down automatically based on demand — a core cloud benefit.",
    module: 2,
  },

  // --- Module 3: Managed Services ---------------------------------------
  {
    id: "fx-009",
    q: "What does SLA stand for?",
    options: ["Service Level Agreement", "System Load Average", "Secure Login Access", "Software License Agreement"],
    correct: 0,
    why: "An SLA (Service Level Agreement) is a contractual commitment on response time, resolution time, or availability.",
    module: 3,
  },
  {
    id: "fx-010",
    q: "What does RTO (Recovery Time Objective) measure?",
    options: [
      "The target time to restore service after a disaster",
      "The maximum acceptable amount of data loss",
      "The average time to resolve a support ticket",
      "The uptime percentage guaranteed in a contract",
    ],
    correct: 0,
    why: "RTO is the target time to restore service after a disaster. (RPO is the maximum acceptable data loss.)",
    module: 3,
  },
  {
    id: "fx-011",
    q: "What is a 'runbook'?",
    options: [
      "A documented step-by-step procedure for handling a specific type of incident",
      "A monthly invoice for managed services",
      "A list of all open support tickets",
      "A contract that defines SLA penalties",
    ],
    correct: 0,
    why: "A runbook turns tribal knowledge into a documented step-by-step procedure anyone on the team can execute.",
    module: 3,
  },
  {
    id: "fx-012",
    q: "Which support tier is the front-line help desk?",
    options: ["L1", "L2", "L3", "L4"],
    correct: 0,
    why: "L1 is the front-line help desk; L4 is deep technical experts. Most tickets resolve at L1 or L2.",
    module: 3,
  },

  // --- Module 4: AI Engineering -----------------------------------------
  {
    id: "fx-013",
    q: "What does LLM stand for?",
    options: ["Large Language Model", "Long-Lived Memory", "Layered Learning Method", "Logical Language Machine"],
    correct: 0,
    why: "An LLM (Large Language Model) is trained on huge amounts of text; ChatGPT, Claude, and Gemini are LLMs.",
    module: 4,
  },
  {
    id: "fx-014",
    q: "What is 'inference' in machine learning?",
    options: [
      "Running the model to make a prediction",
      "Teaching the model from training data",
      "Cleaning and labeling a dataset",
      "Deploying the model to a server",
    ],
    correct: 0,
    why: "Inference is running the model to make a prediction. Training happens once; inference happens every time the model is used.",
    module: 4,
  },
  {
    id: "fx-015",
    q: "What is a 'hallucination' in an LLM?",
    options: [
      "When it generates plausible-sounding but false information",
      "When it refuses to answer a question",
      "When it runs out of memory",
      "When it responds too slowly",
    ],
    correct: 0,
    why: "A hallucination is when an LLM generates plausible-sounding but false information — a key risk that guardrails address.",
    module: 4,
  },
  {
    id: "fx-016",
    q: "What does OCR (Optical Character Recognition) do?",
    options: [
      "Extracts text from images of documents",
      "Encrypts sensitive data at rest",
      "Predicts future demand from history",
      "Detects objects in a video stream",
    ],
    correct: 0,
    why: "OCR extracts text from images of documents — foundational for digitizing forms, invoices, and contracts.",
    module: 4,
  },

  // --- Module 5: Product Development -------------------------------------
  {
    id: "fx-017",
    q: "What does MVP stand for?",
    options: ["Minimum Viable Product", "Most Valuable Platform", "Managed Vendor Program", "Modular Version Prototype"],
    correct: 0,
    why: "An MVP (Minimum Viable Product) is the smallest usable version of a product that delivers real value.",
    module: 5,
  },
  {
    id: "fx-018",
    q: "What is 'React' in our tech stack?",
    options: [
      "The most popular frontend framework for building web interfaces",
      "A cloud data warehouse",
      "A container orchestration tool",
      "A backend database",
    ],
    correct: 0,
    why: "React is the most popular frontend framework for building web interfaces; it is the industry standard.",
    module: 5,
  },
  {
    id: "fx-019",
    q: "What is 'Node.js'?",
    options: [
      "A JavaScript runtime for building backend services",
      "A design tool for wireframing",
      "A CI/CD pipeline platform",
      "A type of mobile operating system",
    ],
    correct: 0,
    why: "Node.js is a JavaScript runtime for building backend services, commonly paired with React for full-stack development.",
    module: 5,
  },
  {
    id: "fx-020",
    q: "What is a 'prototype' in product development?",
    options: [
      "An early, rough version used to test ideas, not production-ready",
      "The final shipped version of a product",
      "A signed statement of work",
      "A fully load-tested release",
    ],
    correct: 0,
    why: "A prototype is an early, rough version used to test ideas; it is not production-ready and is often thrown away.",
    module: 5,
  },

  // --- Module 6: UI/UX Design -------------------------------------------
  {
    id: "fx-021",
    q: "What does UX (User Experience) refer to?",
    options: [
      "How the product works and feels over time, and whether users can accomplish their goals",
      "The colors, typography, and spacing of a screen",
      "The server-side business logic",
      "The accessibility compliance standard",
    ],
    correct: 0,
    why: "UX is how the product works and feels over time — flows, interactions, and whether users can accomplish their goals.",
    module: 6,
  },
  {
    id: "fx-022",
    q: "What does UI (User Interface) refer to?",
    options: [
      "What the product looks like: colors, typography, spacing, and components",
      "How users accomplish their goals over time",
      "The database schema",
      "The user research process",
    ],
    correct: 0,
    why: "UI is the surface layer — what the product looks like: colors, typography, spacing, and visual consistency.",
    module: 6,
  },
  {
    id: "fx-023",
    q: "What does WCAG stand for?",
    options: [
      "Web Content Accessibility Guidelines",
      "Web Component And Grid",
      "Wireframe Creation And Guidance",
      "Windows Color Accessibility Guide",
    ],
    correct: 0,
    why: "WCAG (Web Content Accessibility Guidelines) is the international standard for web accessibility; 2.1 AA is a common target.",
    module: 6,
  },
  {
    id: "fx-024",
    q: "What is a 'wireframe'?",
    options: [
      "A low-fidelity sketch of a screen's layout and structure without colors or polish",
      "A polished, final visual design",
      "A working section of production code",
      "A user interview transcript",
    ],
    correct: 0,
    why: "A wireframe is a low-fidelity sketch showing layout and structure without colors or polish, used to test ideas cheaply.",
    module: 6,
  },

  // --- Module 7: AI Automation ------------------------------------------
  {
    id: "fx-025",
    q: "What does RPA (Robotic Process Automation) refer to?",
    options: [
      "Scripts that click through user interfaces to move data between systems",
      "Physical robots on a factory floor",
      "A large language model with guardrails",
      "A data warehouse loading pattern",
    ],
    correct: 0,
    why: "RPA is the older generation of automation: scripts that click through UIs to move data between systems — effective but brittle.",
    module: 7,
  },
  {
    id: "fx-026",
    q: "Intelligent Document Processing (IDP) typically combines which technologies?",
    options: [
      "OCR, NLP, and sometimes LLMs",
      "Firewalls and VPNs",
      "SAN and NAS storage",
      "Blue-green deployments",
    ],
    correct: 0,
    why: "IDP combines OCR (to extract text), NLP (to understand structure), and sometimes LLMs (for ambiguous cases).",
    module: 7,
  },
  {
    id: "fx-027",
    q: "What is a 'webhook'?",
    options: [
      "A reverse API call where one system notifies another when something happens",
      "A scheduled nightly backup",
      "A type of firewall rule",
      "A user-facing chat widget",
    ],
    correct: 0,
    why: "A webhook is a reverse API call: system A notifies system B when something happens. A common way to trigger automations.",
    module: 7,
  },
  {
    id: "fx-028",
    q: "What does 'human-in-the-loop' mean in an automation workflow?",
    options: [
      "AI handles routine cases automatically but routes low-confidence cases to humans",
      "Humans manually perform every step",
      "AI runs with no human oversight at all",
      "Humans write the automation scripts",
    ],
    correct: 0,
    why: "Human-in-the-loop means AI handles routine cases automatically but routes low-confidence cases to humans, balancing speed and accuracy.",
    module: 7,
  },

  // --- Module 8: DevOps & CI/CD -----------------------------------------
  {
    id: "fx-029",
    q: "What does the 'CI' in CI/CD stand for?",
    options: ["Continuous Integration", "Continuous Improvement", "Code Inspection", "Cloud Infrastructure"],
    correct: 0,
    why: "CI (Continuous Integration) means every code change automatically triggers tests and builds, catching breakage within minutes.",
    module: 8,
  },
  {
    id: "fx-030",
    q: "What is 'Docker'?",
    options: [
      "The most common container technology, packaging apps with their dependencies",
      "A cloud data warehouse",
      "A version control system",
      "A BI dashboard tool",
    ],
    correct: 0,
    why: "Docker is the most common container technology; it packages applications with dependencies so they run identically anywhere.",
    module: 8,
  },
  {
    id: "fx-031",
    q: "What is 'Git'?",
    options: [
      "The dominant version control system",
      "A container orchestrator",
      "A cloud provider",
      "A monitoring platform",
    ],
    correct: 0,
    why: "Git is the dominant version control system; commits, branches, and pull requests are the language of development.",
    module: 8,
  },
  {
    id: "fx-032",
    q: "What is a 'rollback' in deployment?",
    options: [
      "Reverting to a previous version after a bad deployment",
      "Deploying to production for the first time",
      "Running automated tests on a commit",
      "Scaling up the number of servers",
    ],
    correct: 0,
    why: "A rollback is reverting to a previous version after a bad deployment; fast rollback is a key DevOps capability.",
    module: 8,
  },

  // --- Module 9: Cybersecurity Services ---------------------------------
  {
    id: "fx-033",
    q: "What does MFA (Multi-Factor Authentication) require?",
    options: [
      "Two or more proofs of identity",
      "A single strong password",
      "A signed compliance certificate",
      "A 24/7 monitoring contract",
    ],
    correct: 0,
    why: "MFA requires two or more proofs of identity, such as 'something you know' (password) plus 'something you have' (phone or token).",
    module: 9,
  },
  {
    id: "fx-034",
    q: "What is 'phishing'?",
    options: [
      "Fraudulent messages designed to trick users into revealing credentials or running malware",
      "Encrypting data so it can't be read without a key",
      "A simulated attack by ethical hackers",
      "A framework for handling health data",
    ],
    correct: 0,
    why: "Phishing uses fraudulent emails or messages to trick users into revealing credentials or executing malware — the most common initial attack vector.",
    module: 9,
  },
  {
    id: "fx-035",
    q: "What is 'ransomware'?",
    options: [
      "Malware that encrypts data and demands payment for decryption",
      "A tool for scanning for vulnerabilities",
      "A compliance audit framework",
      "A type of multi-factor token",
    ],
    correct: 0,
    why: "Ransomware encrypts the customer's data and demands payment for decryption; it can shut down operations for weeks.",
    module: 9,
  },
  {
    id: "fx-036",
    q: "What does the 'Zero Trust' security model assume?",
    options: [
      "No user or system should be trusted by default; every request is verified",
      "Everything inside the network is safe",
      "Only external traffic needs inspection",
      "Passwords alone are sufficient protection",
    ],
    correct: 0,
    why: "Zero Trust assumes no user or system should be trusted by default; every request is verified.",
    module: 9,
  },

  // --- Module 10: Data & Analytics --------------------------------------
  {
    id: "fx-037",
    q: "What does ETL stand for?",
    options: ["Extract, Transform, Load", "Encrypt, Transfer, Log", "Evaluate, Test, Launch", "Export, Table, Link"],
    correct: 0,
    why: "ETL (Extract, Transform, Load) is the classic data integration pattern: pull data from sources, transform it, load into the warehouse.",
    module: 10,
  },
  {
    id: "fx-038",
    q: "What is a 'data warehouse'?",
    options: [
      "A central store of business-ready data optimized for analytical queries",
      "A store of raw, unstructured data in its original format",
      "A tool for building dashboards",
      "A pipeline that moves data between systems",
    ],
    correct: 0,
    why: "A data warehouse is a central store of business-ready data optimized for analytical queries (OLAP), unlike a transactional database.",
    module: 10,
  },
  {
    id: "fx-039",
    q: "What does a KPI (Key Performance Indicator) represent?",
    options: [
      "A measurable value showing how effectively a business is meeting objectives",
      "A type of data pipeline",
      "A cloud data warehouse",
      "A security compliance metric",
    ],
    correct: 0,
    why: "A KPI is a measurable value that indicates how effectively a business is achieving its objectives.",
    module: 10,
  },
  {
    id: "fx-040",
    q: "What is 'dbt' used for?",
    options: [
      "Transforming data inside the warehouse using version-controlled SQL",
      "Visualizing data in dashboards",
      "Storing raw unstructured data",
      "Monitoring server health",
    ],
    correct: 0,
    why: "dbt (data build tool) is the standard tool for transforming data inside the warehouse using version-controlled SQL.",
    module: 10,
  },

  // --- Module 11: Application Modernization ------------------------------
  {
    id: "fx-041",
    q: "What is a 'monolith'?",
    options: [
      "An application built and deployed as a single unit",
      "An app split into many independent services",
      "A cloud data warehouse",
      "A container orchestration platform",
    ],
    correct: 0,
    why: "A monolith is an application built and deployed as a single unit — not automatically bad; often right for small teams.",
    module: 11,
  },
  {
    id: "fx-042",
    q: "What are 'microservices'?",
    options: [
      "An architecture that splits the application into small, independently deployable services",
      "A single, all-in-one deployment",
      "A type of database migration",
      "A monitoring and alerting tool",
    ],
    correct: 0,
    why: "Microservices split the application into small, independently deployable services, enabling team autonomy at the cost of operational complexity.",
    module: 11,
  },
  {
    id: "fx-043",
    q: "What does 'REST' refer to?",
    options: [
      "The dominant style for web APIs, using HTTP verbs on resource URLs",
      "A container orchestration standard",
      "A data warehouse query language",
      "A backup and recovery method",
    ],
    correct: 0,
    why: "REST is the dominant style for web APIs, using HTTP verbs (GET, POST, PUT, DELETE) on resource URLs.",
    module: 11,
  },
  {
    id: "fx-044",
    q: "What is a 'modular monolith'?",
    options: [
      "One deployment with clean internal boundaries, giving the option to split later",
      "A fully distributed microservices system",
      "A legacy mainframe application",
      "A serverless, event-driven design",
    ],
    correct: 0,
    why: "A modular monolith is one deployment with clean internal boundaries — the middle ground that can be split later without upfront operational cost.",
    module: 11,
  },

  // --- Module 12: Infrastructure Services -------------------------------
  {
    id: "fx-045",
    q: "What does a 'router' do?",
    options: [
      "Forwards data between networks, such as connecting an office to the internet",
      "Filters traffic based on security rules",
      "Stores files on a shared network drive",
      "Runs virtual machines on physical hardware",
    ],
    correct: 0,
    why: "A router forwards data between networks — for example, connecting your office to the internet. (A firewall filters traffic; a switch connects devices within a network.)",
    module: 12,
  },
  {
    id: "fx-046",
    q: "What does 'virtualization' mean?",
    options: [
      "Running multiple virtual servers on a single piece of physical hardware",
      "Moving all workloads to the public cloud",
      "Encrypting data in transit",
      "Backing up data to tape",
    ],
    correct: 0,
    why: "Virtualization is running multiple virtual servers on a single physical machine, increasing efficiency and flexibility.",
    module: 12,
  },
  {
    id: "fx-047",
    q: "What does a VPN (Virtual Private Network) provide?",
    options: [
      "A secure tunnel over a public network, used for remote access",
      "High-performance block storage for databases",
      "Automatic scaling of cloud capacity",
      "A dashboard for monitoring uptime",
    ],
    correct: 0,
    why: "A VPN is a secure tunnel over a public network, used for remote access and connecting sites.",
    module: 12,
  },

  // --- Module 13: Migration Services ------------------------------------
  {
    id: "fx-048",
    q: "What does 'cutover' mean in a migration?",
    options: [
      "The specific point in time when the migration goes live and users start on the new system",
      "The initial environment audit",
      "The rollback to the old system",
      "The training session after go-live",
    ],
    correct: 0,
    why: "Cutover is the specific point in time when a migration goes live; users are on the new system from that moment.",
    module: 13,
  },
  {
    id: "fx-049",
    q: "What is a 'wave migration'?",
    options: [
      "Moving users or workloads in planned groups rather than all at once",
      "Migrating everything in a single big-bang cutover",
      "Backing up data before a migration",
      "A rollback procedure for failed migrations",
    ],
    correct: 0,
    why: "Wave migration moves users or workloads in planned groups (waves) rather than all at once, which reduces risk.",
    module: 13,
  },
  {
    id: "fx-050",
    q: "What is a 'pilot' in a migration?",
    options: [
      "A small first migration with a friendly group of users to validate the approach",
      "The final wave of a migration",
      "A written rollback plan",
      "The post-migration support window",
    ],
    correct: 0,
    why: "A pilot is a small first migration, typically with a friendly group of users, to validate the approach before the full rollout.",
    module: 13,
  },
];
