// ---------------------------------------------------------------------------
// COURSE CONTENT — extracted from App.jsx so it can be imported by both the
// React app and the KB build script (scripts/build-course-kb.mjs).
// ---------------------------------------------------------------------------
import {
  Mail, BookOpen, Target, Users, TrendingUp, Shield, Zap, Bot,
  Database, Cog, Sparkles, Network, Layers, AlertCircle, CheckCheck,
  Cloud, LifeBuoy, Cpu, Package, Palette, GitBranch, RefreshCw,
  ArrowRightLeft, Server
} from "lucide-react";

// ---------------------------------------------------------------------------
// COURSE CONTENT
// ---------------------------------------------------------------------------

export const COURSE = [
  // ==========================================================================
  // 01 — DIGITAL TRANSFORMATION
  // ==========================================================================
  {
    id: "digital-transformation",
    number: "01",
    title: "Digital Transformation",
    subtitle: "Modernizing business through technology",
    duration: "10 min read",
    icon: TrendingUp,
    reading: {
      lead: "Digital Transformation is the umbrella conversation that sits above most of our service lines. Customers rarely arrive asking for 'digital transformation' by name, but it is often the frame that connects a specific pain to a larger program. This module covers what we mean by DT, how we deliver it, who buys, and how to run a discovery conversation that turns a vague wish into a real opportunity.",
      blocks: [
        { type: "h2", text: "What Digital Transformation really means" },
        { type: "p", text: "Digital Transformation is not a product you buy, a cloud you move to, or a piece of software you install. It is a sustained change in how a business operates, competes, and creates value. When we use the term at SmarTek21, we mean three workstreams that run in parallel. Customers usually need help with at least one, and the biggest programs cover all three." },
        {
          type: "grid",
          cards: [
            { icon: Target, title: "Strategy and Roadmap", text: "Define the vision, prioritize initiatives, and build the transformation roadmap. Good roadmaps survive leadership changes because they are tied to outcomes, not personalities." },
            { icon: Cog, title: "Process Modernization", text: "Automate workflows, eliminate manual tasks, and rebuild processes that were designed around yesterday's constraints and today are the bottleneck." },
            { icon: Network, title: "Technology Enablement", text: "Cloud migration, AI and ML integration, modern development practices, data platforms, and the integration fabric between old and new." }
          ]
        },
        { type: "p", text: "When any one of these runs ahead of the others, programs stall. A customer who tells you 'we are doing digital transformation' is rarely telling you enough. Your job in discovery is to find out which of the three they are actually struggling with and what is forcing the conversation now." },
        { type: "h2", text: "Why clients need this" },
        { type: "p", text: "If a customer is asking about DT today, there is usually a forcing function behind it. Understanding that function tells you where the urgency lives and where the budget will come from." },
        {
          type: "list",
          items: [
            "Competitive pressure: competitors are moving faster with better technology and winning deals we used to win",
            "Customer expectations: modern digital experiences are now table stakes, not differentiators",
            "Operational efficiency: manual processes cannot scale as the business grows",
            "Data-driven decisions: leaders need real-time insights, not last month's report",
            "Talent retention: top engineers want to work with modern tools and leave if the stack is outdated"
          ]
        },
        { type: "h2", text: "Who actually buys DT" },
        { type: "p", text: "Digital Transformation is a C-suite conversation, but the specific buyer varies by what is driving the program. Knowing which stakeholder owns the budget tells you how to frame the conversation." },
        {
          type: "callouts",
          items: [
            { title: "CIO or CTO", text: "Buys when the driver is technology modernization, cloud migration, or AI adoption. Technical credibility matters in these conversations." },
            { title: "COO or Business Line Leader", text: "Buys when the driver is operational efficiency or a specific process being broken. Speak about outcomes, not architectures." },
            { title: "Chief Digital Officer", text: "Dedicated DT role in larger enterprises. Strong internal influence but often needs a CIO partner to get anything shipped." },
            { title: "CFO", text: "Not usually the buyer but always a gatekeeper. Every DT business case eventually passes their desk." }
          ]
        },
        { type: "h2", text: "Our phased delivery model" },
        { type: "p", text: "We deliver transformation in four phases. This is not just a project plan, it is how we manage risk and build customer confidence one step at a time. Each phase has an exit criteria, so at any point the customer can pause, pivot, or continue with full visibility into what they have committed to so far." },
        {
          type: "phases",
          items: [
            { phase: "Phase 1: Assess", weeks: "Weeks 1 to 3", bullets: ["Current state analysis", "Technology gaps", "Quick win identification"] },
            { phase: "Phase 2: Design", weeks: "Weeks 4 to 6", bullets: ["Target architecture", "Transformation roadmap", "Budget and ROI model"] },
            { phase: "Phase 3: Implement", weeks: "Months 2 to 6", bullets: ["Agile delivery sprints", "Continuous integration", "User training"] },
            { phase: "Phase 4: Scale", weeks: "Months 6 onward", bullets: ["Rollout across organization", "Measure outcomes", "Continuous improvement"] }
          ]
        },
        { type: "h2", text: "Sales discovery framework" },
        { type: "p", text: "Good discovery is structured around three buckets. Do not leave a first call without at least one strong answer in each. If you only hear about technology and never hear about business impact or urgency, you do not yet have a qualified opportunity." },
        {
          type: "callouts",
          items: [
            { title: "Current state", text: "What is your biggest technology challenge? How do you currently make technology decisions? Where does work slow down today?" },
            { title: "Business impact", text: "Where are you losing to competitors? What customer complaints keep coming up? What keeps leadership up at night?" },
            { title: "Decision drivers", text: "What is forcing this conversation now? Who needs to sign off? What is the budget cycle? What happens if you do nothing?" }
          ]
        },
        { type: "h2", text: "Common objections and responses" },
        {
          type: "objections",
          items: [
            { obj: "Too expensive", resp: "What is the cost of NOT transforming? Your competitors are already moving, and every quarter you wait is a quarter they get further ahead. Doing nothing has a price, even if it does not show up on a line item." },
            { obj: "Too disruptive", resp: "Our phased approach exists specifically to prevent disruption. Quick wins in the first 90 days build momentum without breaking operations. Nothing ships without a rollback plan." },
            { obj: "We will do it ourselves", resp: "You probably can. The question is whether your team should be building transformation infrastructure or the things that actually differentiate your business. We bring 100+ transformations of pattern recognition; your team stays focused and your roadmap stays on schedule." }
          ]
        },
        { type: "h2", text: "What makes a good DT opportunity" },
        {
          type: "list",
          items: [
            "A clear forcing function with a date attached (lease renewal, regulatory deadline, new leadership mandate)",
            "An executive sponsor who owns the outcome and has authority to unblock decisions",
            "At least one specific pain point that can become the first-phase quick win",
            "Willingness to start with an assessment rather than demanding a fixed-scope fixed-price commitment"
          ]
        },
        { type: "key", title: "Key positioning", text: "Digital Transformation is not a project, it is a journey. We have guided 100+ companies through it. Start with quick wins, build momentum, scale what works. The low-risk opening move is a free assessment to identify the top three opportunities. That small first step is how most of our largest programs began." }
      ]
    },
    dictionary: [
      { term: "Digital Transformation (DT)", def: "A sustained change in how a business operates using technology. It covers strategy, processes, and technology together, not just software upgrades." },
      { term: "Roadmap", def: "A sequenced plan showing which initiatives happen in what order and when. Good roadmaps survive leadership changes because they are tied to outcomes." },
      { term: "Quick Win", def: "A small, high-visibility improvement that ships in the first 30-90 days of a program. Used to build customer confidence before tackling harder problems." },
      { term: "Agile", def: "A delivery methodology where work ships in short cycles (usually 2 weeks), with continuous customer feedback, rather than planning everything upfront." },
      { term: "Sprint", def: "A fixed-length work cycle in agile, typically 2 weeks long. Each sprint ends with working software demonstrated to stakeholders." },
      { term: "MVP (Minimum Viable Product)", def: "The smallest usable version of a product that delivers real value. Ships fast, gathers feedback, then grows." },
      { term: "ROI (Return on Investment)", def: "How much financial value a project returns compared to what it cost, usually expressed as a percentage or a payback period in months." },
      { term: "TCO (Total Cost of Ownership)", def: "All costs of owning a system over its full life: purchase, licensing, operations, support, retirement. Almost always higher than the initial price." },
      { term: "Legacy System", def: "An older system, often critical to operations but expensive to maintain and hard to change. Customers rarely want to replace them all at once." },
      { term: "Stakeholder", def: "Any person affected by or influencing a project. Includes economic buyers, end users, and people who can block the deal." },
      { term: "Economic Buyer", def: "The person who has authority to release budget for a deal. Usually different from the technical evaluator or the end user." },
    ],
    quiz: [
      {
        q: "Which are the three workstreams of Digital Transformation as SmarTek21 frames it?",
        options: [
          "Hardware, software, services",
          "Strategy and Roadmap, Process Modernization, Technology Enablement",
          "Cloud, mobile, social",
          "People, process, profit"
        ],
        correct: 1,
        why: "Strategy (vision), Process (operational change), Technology (enablement). This framing lets us fit any customer conversation."
      },
      {
        q: "What is the correct sequence of the phased delivery model?",
        options: [
          "Design, Assess, Implement, Scale",
          "Assess, Design, Implement, Scale",
          "Implement, Assess, Design, Scale",
          "Scale, Implement, Design, Assess"
        ],
        correct: 1,
        why: "Assess before designing, design before implementing, and scale only after something is working. That sequence is how we manage risk."
      },
      {
        q: "A prospect says 'this is too disruptive for us right now.' What is the best response?",
        options: [
          "Transformation is always disruptive, you will have to accept that",
          "Our phased approach minimizes disruption with quick wins in the first 90 days",
          "We can go faster if you commit more budget",
          "Then let's not do it"
        ],
        correct: 1,
        why: "The phased approach is specifically our answer to disruption concerns. Quick wins in the first 90 days build confidence without breaking operations."
      },
      {
        q: "Which discovery question best probes 'decision drivers'?",
        options: [
          "What technology are you running today?",
          "How many people are on your IT team?",
          "What is forcing this conversation now?",
          "When did you last do a refresh?"
        ],
        correct: 2,
        why: "Decision drivers surface urgency and trigger events. Without urgency, deals stall."
      },
      {
        q: "What low-friction first step do we typically offer DT prospects?",
        options: [
          "A multi-year master contract",
          "A free assessment to identify the top 3 opportunities",
          "A full platform license",
          "A rewrite of their core systems"
        ],
        correct: 1,
        why: "A short, free assessment lowers the commitment barrier and is how most of our larger programs start."
      },
      {
        q: "What is a 'quick win' in our Digital Transformation framework?",
        options: [
          "A discount given to the customer",
          "A small, high-visibility improvement delivered early in the program",
          "A competitor's product",
          "A sales deal that closes in one call"
        ],
        correct: 1,
        why: "Quick wins are short-term, visible deliverables that build customer confidence for the larger program. They are a sales tool as much as a delivery one."
      },
      {
        q: "A customer says 'too expensive.' What's the best response?",
        options: [
          "Offer a discount immediately",
          "Ask 'what is the cost of NOT transforming?' - competitors are moving ahead",
          "Walk away from the deal",
          "Remove all scope until it is cheap"
        ],
        correct: 1,
        why: "Anchor on cost of inaction. If doing nothing is free, there is no deal. Surfacing the cost of standing still reframes the conversation."
      },
      {
        q: "Which pillar of DT covers automating workflows and eliminating manual tasks?",
        options: [
          "Strategy and Roadmap",
          "Process Modernization",
          "Technology Enablement",
          "Cost Reduction"
        ],
        correct: 1,
        why: "Process Modernization is specifically about automating workflows and rebuilding processes designed around yesterday's constraints."
      },
      {
        q: "Which statement best captures our key positioning on DT?",
        options: [
          "DT is a software purchase",
          "DT is a one-time project",
          "DT is a journey: start with quick wins, build momentum, scale what works",
          "DT is only for the Fortune 500"
        ],
        correct: 2,
        why: "Framing DT as a journey, not a project, sets realistic expectations and opens the door to a long-term relationship."
      },
      {
        q: "What does Phase 4 (Scale) focus on?",
        options: [
          "Current state analysis",
          "Target architecture design",
          "Agile delivery sprints",
          "Rollout across organization, measure outcomes, continuous improvement"
        ],
        correct: 3,
        why: "Phase 4 takes what worked in earlier phases and scales it across the organization with ongoing improvement."
      }
    ]
  },

  // ==========================================================================
  // 02 — CLOUD MODERNIZATION
  // ==========================================================================
  {
    id: "cloud-modernization",
    number: "02",
    title: "Cloud Modernization",
    subtitle: "AWS, Azure, GCP strategy and migration",
    duration: "12 min read",
    icon: Cloud,
    reading: {
      lead: "Cloud Modernization is one of our most active service lines. Every enterprise is either in, moving to, or planning to move to the public cloud. Your job as a rep is to qualify what is actually driving the conversation, because 'cloud' means different things to different customers. This module covers the what, why, how, and the objections you will hear.",
      blocks: [
        { type: "h2", text: "Understanding Cloud Modernization" },
        { type: "p", text: "At SmarTek21, Cloud Modernization covers three linked workstreams. Most engagements involve all three, but the entry point varies by customer. A customer who leads with 'we need to move to AWS' is usually thinking migration; one who leads with 'our AWS bill is out of control' is thinking strategy; one who leads with 'we need to pass a SOC 2 audit' is thinking security and governance." },
        {
          type: "grid",
          cards: [
            { icon: Cloud, title: "Cloud Strategy", text: "AWS, Azure, and GCP selection and roadmap. Which platform, for which workloads, in what sequence." },
            { icon: ArrowRightLeft, title: "Migration", text: "Lift-and-shift to cloud-native. Moving existing workloads from on-prem to the cloud efficiently and with minimal downtime." },
            { icon: Shield, title: "Security", text: "Identity, compliance, governance. Making sure the cloud is more secure than what it replaced, not less." }
          ]
        },
        { type: "h2", text: "Why clients move to cloud" },
        {
          type: "list",
          items: [
            "Cost Optimization: pay only for what you use, scale down when you do not",
            "Scalability: scale up or down instantly without hardware procurement",
            "Resilience: 99.99% uptime SLAs from major providers, backed by geo-redundant infrastructure",
            "Innovation speed: access to hundreds of managed services without building them yourself",
            "Talent: engineers want to work with modern platforms, not rack-and-stack hardware"
          ]
        },
        { type: "h2", text: "Trigger events to listen for" },
        { type: "p", text: "Cloud conversations rarely start with 'we want to move to cloud.' They start with these specific phrases. When you hear them, the opportunity is active and usually has a timeline." },
        {
          type: "callouts",
          items: [
            { title: "Our data center lease is up for renewal", text: "CapEx-to-OpEx conversation. Budget is often already allocated. Timeline is fixed by the lease end date." },
            { title: "We need to support remote teams globally", text: "Identity, collaboration, and secure access are in play. Often opens a broader M365 conversation as well." },
            { title: "Our infrastructure cannot handle traffic spikes", text: "Classic elasticity play. Cloud is purpose-built for this; hard to replicate on-prem." },
            { title: "Compliance requires geo-redundancy", text: "Regulation forcing the hand. Timeline is usually fixed and non-negotiable." },
            { title: "Hardware refresh costs are eating our budget", text: "CFO-friendly framing. Move CapEx to OpEx, end the refresh cycle, predictable monthly spending." }
          ]
        },
        { type: "h2", text: "Choosing a cloud platform" },
        { type: "p", text: "Most customers either have a preference or are politically constrained to one. When they genuinely have a choice, the decision comes down to a few factors." },
        {
          type: "grid",
          cards: [
            { icon: Cloud, title: "AWS", text: "Broadest service catalog, deepest ecosystem, most mature. Default choice for most general-purpose workloads." },
            { icon: Cloud, title: "Azure", text: "Strongest in Microsoft-centric environments. Best M365 integration, deep Active Directory and .NET support. Often a natural choice for enterprises." },
            { icon: Cloud, title: "Google Cloud", text: "Strongest in data analytics, ML, and Kubernetes. Often chosen when those are the primary workloads, or for multi-cloud strategies." }
          ]
        },
        { type: "h2", text: "The 6 Rs of cloud migration" },
        { type: "p", text: "Every workload a customer wants to move falls into one of six categories. Knowing which is which lets us estimate effort, sequence the migration, and set expectations. A typical customer ends up with a mix of all six." },
        {
          type: "phases",
          items: [
            { phase: "Rehost", weeks: "Lift-and-shift", bullets: ["Quickest path to cloud"] },
            { phase: "Replatform", weeks: "Lift and optimize", bullets: ["Optimize during migration"] },
            { phase: "Repurchase", weeks: "Switch to SaaS", bullets: ["Move to SaaS alternatives"] },
            { phase: "Refactor", weeks: "Re-architect", bullets: ["Re-architect for cloud-native"] },
            { phase: "Retire", weeks: "Decommission", bullets: ["Decommission unused apps"] },
            { phase: "Retain", weeks: "Stay put", bullets: ["Keep on-prem for now"] }
          ]
        },
        { type: "key", title: "Our recommendation", text: "Start with Rehost for quick wins, then Refactor high-value apps over time. Retire anything nobody is using." },
        { type: "h2", text: "Sales discovery framework" },
        {
          type: "grid",
          cards: [
            { icon: Server, title: "Current infrastructure", text: "What is your current hosting setup? How many applications or servers? On-prem, colocated, or already partially in cloud?" },
            { icon: AlertCircle, title: "Pain points", text: "What is costing you the most? Any scalability challenges? How often do you run out of capacity?" },
            { icon: CheckCheck, title: "Timeline", text: "When does your data center contract end? What is driving the timeline? Is there a specific event forcing a decision?" }
          ]
        },
        { type: "h2", text: "Positioning against common pushback" },
        {
          type: "objections",
          items: [
            { obj: "Cloud costs seem high", resp: "We optimize for cost from day one. Clients save 30-40% vs on-prem TCO when you factor in hardware, power, cooling, data center space, and staff. We can produce a 3-year comparison in the free assessment." },
            { obj: "Security concerns", resp: "AWS and Azure have better baseline security than most enterprise data centers. The shared responsibility model means the provider handles physical security and platform hardening. We implement best practices on top." },
            { obj: "Too complex to move", resp: "Not every workload needs to move on day one. We stage migrations to limit disruption and put the easiest, highest-impact workloads first. Your business keeps running throughout." }
          ]
        },
        { type: "h2", text: "Next steps to offer" },
        {
          type: "list",
          items: [
            "Offer a FREE cloud readiness assessment: we inventory apps and recommend strategy",
            "Timeline: 1 to 2 weeks for assessment, proposal in 5 business days",
            "Position a TCO analysis: 3-year cost comparison of on-prem versus cloud",
            "Small-scope pilot as the first paid phase if they want to validate before committing to a larger program"
          ]
        }
      ]
    },
    dictionary: [
      { term: "Cloud", def: "Computing delivered as a service over the internet by providers like AWS, Azure, or Google Cloud. Customers rent capacity by the hour instead of buying hardware." },
      { term: "On-premises (on-prem)", def: "Software and hardware that runs in the customer's own data center. The traditional model before cloud." },
      { term: "Hybrid Cloud", def: "A setup that uses both on-prem and cloud for different workloads. Common during migration and for regulated industries." },
      { term: "Multi-cloud", def: "Using more than one cloud provider at the same time (e.g., AWS for compute, Azure for identity). Avoids vendor lock-in but adds complexity." },
      { term: "IaaS (Infrastructure as a Service)", def: "Raw compute, storage, and networking rented from the cloud. The customer manages the OS and everything above it." },
      { term: "PaaS (Platform as a Service)", def: "A managed platform where the provider handles the OS, runtime, and scaling. Example: AWS Elastic Beanstalk." },
      { term: "SaaS (Software as a Service)", def: "Complete software applications delivered over the web. Microsoft 365 and Salesforce are SaaS." },
      { term: "Lift and Shift", def: "Moving a workload from on-prem to cloud with minimal changes. Fastest migration path but misses most cloud-native benefits." },
      { term: "Refactor", def: "Rebuilding an application to take advantage of cloud-native patterns like microservices and serverless. Highest effort, highest payoff." },
      { term: "SLA (Service Level Agreement)", def: "A contractual guarantee of uptime or performance. Major cloud providers typically offer 99.9% to 99.99% availability SLAs." },
      { term: "Elasticity", def: "The ability to scale capacity up or down automatically based on demand. A core cloud benefit that is hard to replicate on-prem." },
      { term: "Geo-redundancy", def: "Running workloads in multiple geographic regions so a single-region outage does not take the service down." },
      { term: "CapEx vs OpEx", def: "Capital expenditure (upfront hardware purchase) vs operating expenditure (monthly cloud bill). Most cloud migrations shift spending from CapEx to OpEx." },
      { term: "TCO (Total Cost of Ownership)", def: "All costs over a system's life. For cloud vs on-prem comparisons, always include hardware refresh, power, cooling, space, and staff." },
      { term: "Data Center", def: "A physical facility where servers and networking equipment live. On-prem customers either own one or lease space in one (colocation)." },
    ],
    quiz: [
      {
        q: "Which 6-R migration path is the quickest to cloud but leaves the workload largely unchanged?",
        options: ["Refactor", "Rehost (lift-and-shift)", "Repurchase", "Retire"],
        correct: 1,
        why: "Rehost is lift-and-shift: fastest path, minimal changes, misses most cloud-native benefits."
      },
      {
        q: "A customer says 'compliance requires geo-redundancy.' What does this trigger phrase indicate?",
        options: [
          "Low urgency, let's circle back in a year",
          "A forcing function with a fixed timeline driven by regulation",
          "The customer should stay on-prem",
          "An IT hobby project with no budget"
        ],
        correct: 1,
        why: "Geo-redundancy as a compliance requirement means a regulation is forcing the hand. Timeline is usually fixed and budget is allocated."
      },
      {
        q: "A customer pushes back: 'cloud costs seem high.' What's the best response?",
        options: [
          "You are right, cloud is always more expensive",
          "Clients save 30-40% vs on-prem TCO when you factor in hardware, power, cooling, and staff",
          "Switch providers to save money",
          "Cloud only makes sense for startups"
        ],
        correct: 1,
        why: "Reframe on total cost of ownership, not sticker price. Hardware refresh cycles, power, cooling, and staff are often hidden on-prem costs."
      },
      {
        q: "Which of the 6 Rs applies when you replace an application entirely with a SaaS alternative?",
        options: ["Rehost", "Replatform", "Repurchase", "Retire"],
        correct: 2,
        why: "Repurchase means moving to a SaaS equivalent and retiring the legacy app. No more maintenance."
      },
      {
        q: "What does our standard cloud readiness assessment produce?",
        options: [
          "A signed migration contract",
          "An app inventory, strategy recommendation, and TCO comparison",
          "A full re-architecture",
          "A guaranteed cost savings number"
        ],
        correct: 1,
        why: "The assessment takes 1-2 weeks, produces an inventory and strategy, and a 3-year TCO comparison. It's the opening move, not the close."
      },
      {
        q: "Which of the 6 Rs means 'keep on-prem for now'?",
        options: ["Rehost", "Replatform", "Retire", "Retain"],
        correct: 3,
        why: "Retain keeps workloads on-prem, typically for regulatory or cost reasons. Not everything moves to cloud."
      },
      {
        q: "Which trigger phrase signals an elasticity conversation?",
        options: [
          "Our data center lease is up for renewal",
          "Our infrastructure cannot handle traffic spikes",
          "We need to support remote teams globally",
          "Compliance requires geo-redundancy"
        ],
        correct: 1,
        why: "Traffic spikes are a classic elasticity play. Cloud is purpose-built to scale up and down on demand."
      },
      {
        q: "What's our recommended starting strategy for most cloud migrations?",
        options: [
          "Refactor everything at once",
          "Wait for a quiet quarter",
          "Start with Rehost for quick wins, then Refactor high-value apps over time",
          "Move everything to SaaS immediately"
        ],
        correct: 2,
        why: "Rehost for quick wins, Refactor high-value apps over time. Balances speed with long-term cloud value."
      },
      {
        q: "What is our cloud migration assessment timeline?",
        options: [
          "1-2 weeks for the assessment, proposal in 5 business days",
          "6 months of analysis",
          "1 day",
          "No assessment needed"
        ],
        correct: 0,
        why: "The assessment is 1-2 weeks, with the proposal delivered within 5 business days. A low-friction entry point."
      },
      {
        q: "Which of the 6 Rs means 'decommission unused apps'?",
        options: ["Retire", "Rehost", "Replatform", "Refactor"],
        correct: 0,
        why: "Retire turns off unused apps. Often finds 10-20% of the inventory no one remembers needing, which is free savings."
      }
    ]
  },

  // ==========================================================================
  // 03 — MANAGED SERVICES
  // ==========================================================================
  {
    id: "managed-services",
    number: "03",
    title: "Managed Services",
    subtitle: "IT operations and support",
    duration: "10 min read",
    icon: LifeBuoy,
    reading: {
      lead: "Managed Services is one of our most recurring and sticky revenue lines. Customers do not buy managed services because they enjoy outsourcing. They buy because running 24/7 IT operations with their own team has become impossible or uneconomical. Your job is to find the pain driving that calculation and match it to the right engagement model.",
      blocks: [
        { type: "h2", text: "What we manage" },
        { type: "p", text: "Managed Services covers the operational side of IT. These are the recurring activities that keep systems running, rather than project work that delivers new capability. Customers often buy a combination across multiple of these categories." },
        {
          type: "grid",
          cards: [
            { icon: LifeBuoy, title: "Help Desk and End-User Support", text: "L1 through L4 support. Commonly via ServiceNow, Jira, or Zendesk. Everything from password resets to complex escalations." },
            { icon: Server, title: "Infrastructure Monitoring", text: "Servers, network, cloud. 24/7 visibility into system health, alerting, and first-line response." },
            { icon: Cog, title: "Application Support and Maintenance", text: "Keeping business applications running: patching, performance tuning, integration issues." },
            { icon: Shield, title: "Security Operations", text: "24/7 monitoring from a SOC or NOC. Threat detection and response before incidents escalate." },
            { icon: RefreshCw, title: "Backup and Disaster Recovery", text: "Regular backups, tested recovery procedures, and documented RTO and RPO targets." }
          ]
        },
        { type: "h2", text: "Why clients buy managed services" },
        { type: "p", text: "There are four motivations that come up again and again. Identify which one the customer is actually solving for, because the pitch changes depending on their answer." },
        {
          type: "list",
          items: [
            "Cost predictability: fixed monthly fee beats the roller coaster of hiring, turnover, and overtime",
            "24/7 coverage: some businesses cannot afford downtime, and a nine-to-five IT team is not enough",
            "Expertise on demand: access to specialized skills (security, cloud, networking) without hiring five different specialists",
            "Focus on core business: IT is not their competitive advantage, they would rather spend leadership attention elsewhere"
          ]
        },
        { type: "h2", text: "Our service delivery model: SLA-based support tiers" },
        { type: "p", text: "Every managed services contract has priority levels. Customers need to know what they will get at each level, and this tiering drives both delivery design and pricing. Tighter SLAs cost more because they require more staff standing by." },
        {
          type: "phases",
          items: [
            { phase: "P1 - Critical", weeks: "15 min response / 2 hr fix", bullets: ["System down", "Business stopped"] },
            { phase: "P2 - High", weeks: "1 hour response", bullets: ["Major degradation"] },
            { phase: "P3 - Medium", weeks: "4 hour response", bullets: ["Limited impact"] },
            { phase: "P4 - Low", weeks: "Next business day", bullets: ["Questions, requests"] }
          ]
        },
        { type: "h2", text: "How the engagement is structured" },
        { type: "p", text: "A managed services contract is not a one-time sale; it is an ongoing relationship with defined governance. Setting expectations about this upfront prevents friction later." },
        {
          type: "list",
          items: [
            "Fixed monthly fee with clearly scoped inclusions and exclusions",
            "Monthly or quarterly service reviews with the customer's IT leadership",
            "Named account manager and escalation path",
            "Tooling typically supplied by SmarTek21 or integrated into the customer's existing ITSM platform",
            "Clear process for scope changes, with additional work billed separately from the retainer"
          ]
        },
        { type: "h2", text: "Discovery questions" },
        {
          type: "list",
          items: [
            "How do you currently handle after-hours incidents? Who is on call and how often do they actually get called?",
            "What is your current IT headcount, and how many of those people are retention risks?",
            "When you had your last outage, how long did it take to recover, and what was the business impact?",
            "What tools do you use today for ticketing, monitoring, and alerting?",
            "How much are you currently spending on infrastructure and IT operations, fully loaded with salaries and benefits?"
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "We have our own IT team", resp: "We do not replace them, we extend them. Most engagements free up the internal team for strategic work by taking the reactive 24/7 load off their plate." },
            { obj: "Managed services sounds expensive", resp: "Compared to what? When you factor in salaries, benefits, turnover, training, and 24/7 shift coverage, most customers find us significantly less expensive than building equivalent capability in-house." },
            { obj: "We do not trust outsiders with our systems", resp: "Our people go through the same background checks and security training your employees do. We sign strict data handling agreements, and you keep full admin control and audit visibility." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Managed Services is not about replacing the customer's IT team. It is about extending them. Lead with the pain of 24/7 coverage, quantify the cost of one bad outage, and anchor on business impact rather than ticket counts." }
      ]
    },
    dictionary: [
      { term: "Managed Services Provider (MSP)", def: "A company that takes ongoing responsibility for a customer's IT operations under contract. Different from a consultancy, which typically does project work." },
      { term: "SLA (Service Level Agreement)", def: "A contractual commitment on response time, resolution time, or availability. Breaching an SLA usually triggers financial penalties." },
      { term: "L1 / L2 / L3 / L4 support", def: "Escalation tiers. L1 is front-line help desk; L4 is deep technical experts. Most tickets resolve at L1 or L2." },
      { term: "NOC (Network Operations Center)", def: "The team and systems that monitor infrastructure health 24/7. Watches for alerts and performs first-line response." },
      { term: "SOC (Security Operations Center)", def: "The team and systems that monitor for security threats 24/7. Overlaps with NOC but focused on security events." },
      { term: "Uptime", def: "The percentage of time a system is available. 99.9% uptime equals about 8.7 hours of downtime per year." },
      { term: "MTTR (Mean Time To Resolve)", def: "Average time to fix an incident from when it was reported to when it was resolved. Lower is better; often in the contract." },
      { term: "Ticket", def: "A tracked unit of work, usually a support request or incident. Tickets have priority, assignee, status, and SLA clock." },
      { term: "Incident", def: "An unplanned event that affects service. Differs from a 'request' which is routine (like a password reset)." },
      { term: "Runbook", def: "A documented step-by-step procedure for handling a specific type of incident. Turns tribal knowledge into something anyone on the team can execute." },
      { term: "RTO (Recovery Time Objective)", def: "The target time to restore service after a disaster. Lower RTO costs more to deliver." },
      { term: "RPO (Recovery Point Objective)", def: "The maximum acceptable data loss in a disaster. RPO of 1 hour means backups run at least every hour." },
      { term: "ServiceNow / Jira / Zendesk", def: "Common ticketing and ITSM platforms. ServiceNow dominates large enterprise; Jira is common in dev teams; Zendesk in customer-facing support." },
      { term: "DR (Disaster Recovery)", def: "Plans and systems for restoring operations after a major outage. Includes backups, failover sites, and tested recovery procedures." },
    ],
    quiz: [
      {
        q: "What is the response-time target for a P1 (Critical) incident in our standard SLA?",
        options: ["4 hours", "1 hour", "15 minutes", "Next business day"],
        correct: 2,
        why: "P1 is system-down, business stopped. 15-minute response and 2-hour fix target."
      },
      {
        q: "Which of the following is NOT one of the four listed buying motivations for managed services?",
        options: [
          "Cost predictability",
          "24/7 coverage",
          "Access to specialized expertise",
          "Desire to reduce vendor count"
        ],
        correct: 3,
        why: "The four buying motivations we sell against are cost predictability, 24/7 coverage, expertise, and focus on core business."
      },
      {
        q: "Which priority level is associated with 'next business day' response?",
        options: ["P1", "P2", "P3", "P4"],
        correct: 3,
        why: "P4 is low priority: questions and requests with no immediate impact."
      },
      {
        q: "What types of support make up the help desk scope?",
        options: [
          "L1 only",
          "L1 through L4",
          "L3 and above only",
          "Any problem the customer has"
        ],
        correct: 1,
        why: "Help desk spans L1 through L4, typically through platforms like ServiceNow, Jira, or Zendesk."
      },
      {
        q: "Which is the best framing of managed services when talking to a customer with an existing IT team?",
        options: [
          "We replace your IT team",
          "We extend your IT team and take the reactive 24/7 load off their plate",
          "Your IT team is not good enough",
          "We compete with your IT team"
        ],
        correct: 1,
        why: "Never attack the customer's team. Managed services extend internal capability, freeing them for strategic work."
      },
      {
        q: "Which service covers 24/7 SOC/NOC monitoring?",
        options: [
          "Help Desk and End-User Support",
          "Infrastructure Monitoring",
          "Security Operations",
          "Backup and Disaster Recovery"
        ],
        correct: 2,
        why: "Security Operations includes the 24/7 SOC/NOC monitoring for threats."
      },
      {
        q: "What is the response time target for a P2 (High) incident?",
        options: ["15 minutes", "1 hour", "4 hours", "Next business day"],
        correct: 1,
        why: "P2 High gets 1-hour response. Major degradation but not a complete system-down situation."
      },
      {
        q: "Which platforms are commonly used for help desk ticketing?",
        options: [
          "ServiceNow, Jira, Zendesk",
          "Microsoft Word",
          "PowerPoint",
          "Adobe Photoshop"
        ],
        correct: 0,
        why: "ServiceNow, Jira, and Zendesk are the three explicitly named platforms in our help desk service."
      },
      {
        q: "What is the fix time target for a P1 (Critical) incident?",
        options: ["15 minutes", "1 hour", "2 hours", "Next business day"],
        correct: 2,
        why: "P1 Critical gets 15-minute response AND 2-hour fix target. The response and fix numbers are both in the contract."
      },
      {
        q: "If a customer says 'IT is not our competitive advantage,' which buying motivation does this map to?",
        options: [
          "Cost predictability",
          "24/7 coverage",
          "Specialized expertise",
          "Focus on core business"
        ],
        correct: 3,
        why: "That statement maps directly to 'focus on core business.' IT management is not what differentiates the customer."
      }
    ]
  },

  // ==========================================================================
  // 04 — AI ENGINEERING
  // ==========================================================================
  {
    id: "ai-engineering",
    number: "04",
    title: "AI Engineering",
    subtitle: "Custom AI solutions and ML models",
    duration: "9 min read",
    icon: Cpu,
    reading: {
      lead: "AI Engineering is about building custom intelligence into a customer's business. It is not the chatbot you see on a website, and it is not a simple wrapper around an LLM API. It is designing, training, and deploying models that solve problems specific to the customer's data and operations. The gap between 'impressed by a demo' and 'running critical workflows on a trained model' is where SmarTek21 lives.",
      blocks: [
        { type: "h2", text: "What is AI Engineering?" },
        { type: "p", text: "Every customer has heard of AI by now, and most have tried ChatGPT at least once. That is not the same as shipping AI into production. Our AI Engineering practice builds five categories of capability. A typical engagement uses one or two; larger customers build across all five over time." },
        {
          type: "grid",
          cards: [
            { icon: Cpu, title: "Custom AI Models", text: "Trained on the customer's data for their specific use case. Not a generic model with a prompt; a model that learns their domain." },
            { icon: Bot, title: "LLM Integration", text: "ChatGPT, Claude, Gemini APIs with proper guardrails, evaluation, and cost management. Plus fine-tuning when the use case justifies it." },
            { icon: Sparkles, title: "Computer Vision", text: "Image recognition, object detection, OCR. Used for everything from document processing to manufacturing quality inspection." },
            { icon: BookOpen, title: "Natural Language Processing", text: "Sentiment analysis, document classification, summarization, entity extraction. Turns unstructured text into structured data." },
            { icon: TrendingUp, title: "Predictive Analytics", text: "Forecast demand, detect fraud, optimize pricing. Uses historical data to predict future outcomes with a known confidence level." }
          ]
        },
        { type: "h2", text: "How AI projects actually start" },
        { type: "p", text: "The biggest mistake a sales rep can make is asking 'do you want to add AI to something?' That leads to vague wish lists. The better approach is asking about the underlying problem and letting AI reveal itself as the right solution." },
        {
          type: "callouts",
          items: [
            { title: "Time drain", text: "What manual tasks take up most of your team's time? Repetitive, judgment-heavy work is where AI shines." },
            { title: "Decision quality", text: "What decisions would be easier with better predictions? Pricing, staffing, inventory, fraud. These are predictive analytics plays." },
            { title: "Hidden value", text: "What data do you have that you are not using? Companies accumulate huge datasets they never analyze. AI unlocks the value trapped inside." },
            { title: "Human bottlenecks", text: "Where are humans the bottleneck in your process? When work queues up waiting for human review, AI can accelerate or eliminate it." }
          ]
        },
        { type: "h2", text: "What every AI project needs to succeed" },
        { type: "p", text: "Three things have to be in place, and all three tie back to the specific use case. Without all three, the project stalls in production or never gets there at all." },
        {
          type: "list",
          items: [
            "Good training data: enough examples of the right kind, with labels or outcomes where applicable",
            "A clear success metric: what does 'working' look like as a number the customer will agree to measure?",
            "An operational home: where the model runs, how it gets updated, who owns it after we ship it"
          ]
        },
        { type: "h2", text: "Common use cases by industry" },
        {
          type: "grid",
          cards: [
            { icon: Shield, title: "Financial Services", text: "Fraud detection, credit underwriting, customer segmentation, transaction monitoring, AML compliance, trading signals." },
            { icon: LifeBuoy, title: "Healthcare", text: "Medical image analysis, clinical decision support, patient risk stratification, claims processing." },
            { icon: Package, title: "Retail", text: "Demand forecasting, recommendation engines, dynamic pricing, inventory optimization, personalization." },
            { icon: Cog, title: "Manufacturing", text: "Predictive maintenance, quality inspection via computer vision, yield optimization, supply chain forecasting." }
          ]
        },
        { type: "h2", text: "Build vs buy" },
        { type: "p", text: "Not every AI opportunity is a custom build. Sometimes the right answer is a SaaS product that already solves the problem. Being honest about when to build and when to buy earns the customer's trust and usually pays off on the next deal." },
        {
          type: "list",
          items: [
            "Build when the use case is core to the business, data is proprietary, and differentiation matters",
            "Buy when the problem is well-solved by off-the-shelf products and the customer's data is not their moat",
            "Integrate when a SaaS product handles 80% of the need but the last 20% needs custom glue to fit the business"
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "We do not have enough data", resp: "You probably have more than you think. Starting with a data assessment is a small commitment, and we can tell you quickly whether the data supports a model or if we need to collect more." },
            { obj: "AI is too expensive", resp: "Compared to what? For the right use case, a model that saves a team 20 hours a week pays for itself inside a year. The discovery is about finding the right use case." },
            { obj: "We are worried about AI hallucinations", resp: "Valid concern, and that is why we build evaluation and guardrails into every LLM deployment. We measure accuracy on your data before anything goes to production, and we design so high-stakes outputs are always reviewed by a human." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Lead with the problem, not the technology. Qualify the use case before pitching the model. The strongest entry point is a data assessment or a 2-week proof of concept, not a full build. The best AI deals start small and expand as the customer trusts the results." }
      ]
    },
    dictionary: [
      { term: "AI (Artificial Intelligence)", def: "Broad term for machines performing tasks that would require human intelligence. Includes ML, NLP, computer vision, and more." },
      { term: "ML (Machine Learning)", def: "A subset of AI where systems learn from data instead of being explicitly programmed. Most 'AI' in production today is actually ML." },
      { term: "LLM (Large Language Model)", def: "A large model trained on huge amounts of text that can generate, summarize, and reason about language. ChatGPT, Claude, and Gemini are LLMs." },
      { term: "NLP (Natural Language Processing)", def: "The field of AI focused on understanding and generating human language." },
      { term: "Computer Vision (CV)", def: "AI that processes images and video. Used for object detection, facial recognition, OCR, and quality inspection." },
      { term: "OCR (Optical Character Recognition)", def: "Extracting text from images of documents. Foundational technology for digitizing forms, invoices, and contracts." },
      { term: "Fine-tuning", def: "Further training a pre-trained model on a specific dataset to make it better at a specific task." },
      { term: "Training Data", def: "The dataset used to teach a model. Quality and quantity of training data usually determines how well the model performs." },
      { term: "Model", def: "A trained AI system. Think of it as a function that takes input and produces predictions or outputs." },
      { term: "Inference", def: "Running the model to make a prediction. Training is expensive and happens once; inference happens every time the model is used." },
      { term: "API (Application Programming Interface)", def: "A defined way for software systems to talk to each other. AI services are usually accessed through an API." },
      { term: "Hallucination", def: "When an LLM generates plausible-sounding but false information. A key risk for LLM deployments and why guardrails matter." },
      { term: "Predictive Analytics", def: "Using historical data to predict future outcomes like demand, fraud, or churn. A subset of ML focused on forecasting." },
      { term: "ChatGPT / Claude / Gemini", def: "Consumer-facing LLM products from OpenAI, Anthropic, and Google. We use their APIs in enterprise deployments." },
    ],
    quiz: [
      {
        q: "Which is NOT one of SmarTek21's five core AI Engineering capabilities?",
        options: [
          "Custom AI Models",
          "Computer Vision",
          "LLM Integration",
          "Quantum Computing"
        ],
        correct: 3,
        why: "The five capabilities are Custom AI Models, LLM Integration, Computer Vision, NLP, and Predictive Analytics. Quantum is not part of the practice."
      },
      {
        q: "Which discovery question best surfaces a predictive analytics opportunity?",
        options: [
          "Do you use cloud?",
          "What decisions would be easier with better predictions?",
          "What version of Python do you run?",
          "How large is your IT team?"
        ],
        correct: 1,
        why: "Predictive analytics is about forecasting outcomes. Asking about decisions surfaces those opportunities directly."
      },
      {
        q: "What's the biggest mistake a rep can make when opening an AI conversation?",
        options: [
          "Asking 'do you want to add AI to something?'",
          "Mentioning specific use cases",
          "Asking about the customer's budget",
          "Qualifying the decision maker"
        ],
        correct: 0,
        why: "That question leads to vague wish lists. Ask about problems and pain, then let AI reveal itself as the right tool."
      },
      {
        q: "What fits the Natural Language Processing category?",
        options: [
          "Image recognition",
          "Demand forecasting",
          "Sentiment analysis and document classification",
          "Network monitoring"
        ],
        correct: 2,
        why: "NLP handles text: sentiment, classification, summarization. Image recognition is Computer Vision; forecasting is Predictive Analytics."
      },
      {
        q: "Which use case is a classic fit for Computer Vision?",
        options: [
          "Sentiment analysis of support emails",
          "Invoice OCR and manufacturing quality inspection",
          "Demand forecasting",
          "Credit scoring"
        ],
        correct: 1,
        why: "Computer Vision processes images and video. OCR and quality inspection are textbook use cases."
      },
      {
        q: "Which capability handles fraud detection and demand forecasting?",
        options: [
          "Computer Vision",
          "Natural Language Processing",
          "Predictive Analytics",
          "LLM Integration"
        ],
        correct: 2,
        why: "Predictive Analytics uses historical data to forecast future outcomes: fraud, demand, pricing, churn."
      },
      {
        q: "What does LLM Integration typically include?",
        options: [
          "Physical robotics",
          "ChatGPT or Claude API integration and custom fine-tuning",
          "Fiber optic network setup",
          "Marketing email templates"
        ],
        correct: 1,
        why: "LLM Integration is API-based access to foundation models, plus custom fine-tuning where the use case justifies it."
      },
      {
        q: "Which discovery question best opens a time-savings opportunity?",
        options: [
          "What version of Python do you use?",
          "What manual tasks take up most of your team's time?",
          "How big is your IT team?",
          "What cloud provider do you use?"
        ],
        correct: 1,
        why: "Manual tasks that eat team time are prime AI targets. That question surfaces them directly."
      },
      {
        q: "What's the best first deliverable for a new AI engagement?",
        options: [
          "A five-year contract",
          "A fully deployed production AI system",
          "A data assessment or 2-week proof of concept",
          "A signed Master Services Agreement"
        ],
        correct: 2,
        why: "Best AI deals start small. Assessment or POC builds the customer's confidence before committing to scale."
      },
      {
        q: "Custom AI Models are described as:",
        options: [
          "Generic models used with a smart prompt",
          "Models trained on the customer's data for their specific use case",
          "Prebuilt marketing tools",
          "Open-source libraries anyone can download"
        ],
        correct: 1,
        why: "The defining feature of Custom AI Models is training on the customer's data for their use case. Not a generic model with a prompt."
      }
    ]
  },

  // ==========================================================================
  // 05 — PRODUCT DEVELOPMENT
  // ==========================================================================
  {
    id: "product-development",
    number: "05",
    title: "Product Development",
    subtitle: "Full-stack development and agile delivery",
    duration: "8 min read",
    icon: Package,
    reading: {
      lead: "Product Development is where we build custom software for customers who need something off-the-shelf products cannot provide. Most engagements start because a customer has a business problem that either has no existing solution, or would require so much customization that building is the better economic choice. Your job is to qualify which of those three situations applies.",
      blocks: [
        { type: "h2", text: "What we build" },
        { type: "p", text: "Our product development practice delivers four categories of custom software. These cover the vast majority of what modern businesses need to build internally or ship to their own customers." },
        {
          type: "grid",
          cards: [
            { icon: Package, title: "Web Applications", text: "Customer portals, internal tools, SaaS dashboards. Modern single-page apps built with React or equivalent, backed by cloud APIs." },
            { icon: Cpu, title: "Mobile Apps (iOS / Android)", text: "Native or cross-platform (React Native). Used where customer experience on the go matters more than feature depth." },
            { icon: Cloud, title: "SaaS Platforms", text: "Multi-tenant subscription products. Auth, billing, and data isolation designed in from day one." },
            { icon: GitBranch, title: "APIs and Integrations", text: "The plumbing between systems. Often the highest-value work because everyone needs it and few teams do it well." }
          ]
        },
        { type: "h2", text: "Why clients choose us" },
        { type: "p", text: "Four reasons come up consistently in our closed deals. Memorize them because they are also the four ways competitors lose these deals." },
        {
          type: "list",
          items: [
            "Speed to market: MVP in 8 to 12 weeks, not 12 months. Agile delivery with real software every two weeks.",
            "Transparent process: customer sees progress every sprint, no surprises at the end",
            "Modern tech stack: React, Node, AWS, Kubernetes. No legacy frameworks, no technical debt from day one",
            "Product thinking, not just coding: we push back on requirements that do not serve the business"
          ]
        },
        { type: "h2", text: "How we deliver" },
        { type: "p", text: "Every product engagement follows roughly the same shape. Knowing the stages helps you set customer expectations and identify which phase the customer's budget will need to cover first." },
        {
          type: "phases",
          items: [
            { phase: "Discovery", weeks: "2 to 4 weeks", bullets: ["User research", "Requirements", "Technical feasibility"] },
            { phase: "Design", weeks: "2 to 4 weeks", bullets: ["Wireframes", "High-fidelity mockups", "Architecture"] },
            { phase: "MVP build", weeks: "8 to 12 weeks", bullets: ["Core features only", "Production-ready", "Real user testing"] },
            { phase: "Iterate", weeks: "Ongoing", bullets: ["Feature additions", "Performance tuning", "User feedback loops"] }
          ]
        },
        { type: "h2", text: "The MVP conversation" },
        { type: "p", text: "Customers often arrive with a feature list that looks like a Christmas tree. Our job is to help them see that shipping the smallest useful version first (the MVP) is almost always the right move. MVPs are not about building less; they are about learning faster and ending up with a better product." },
        {
          type: "callouts",
          items: [
            { title: "Why MVPs work", text: "Real users reveal what is actually important. Features that seemed essential often get cut after MVP, and features nobody predicted become core." },
            { title: "What goes in an MVP", text: "The single core workflow that delivers value. Everything else waits. Nice-to-haves and edge cases come after the core is validated." },
            { title: "Common MVP mistake", text: "Building an 'MVP' with 40 features. If you can describe it in one sentence, it is an MVP. If you need a PowerPoint deck, it is not." }
          ]
        },
        { type: "h2", text: "Tech stack decisions" },
        { type: "p", text: "Customers do not usually know what stack to ask for, and that is a good thing because it means we choose the tools that fit the problem. Here is how we typically decide." },
        {
          type: "list",
          items: [
            "Frontend: React for web, React Native or Swift/Kotlin for mobile depending on complexity",
            "Backend: Node.js or Python for most workloads, Go for high-performance services",
            "Database: PostgreSQL for transactional data, Redis for caching, Elasticsearch for search",
            "Cloud: AWS is our default; Azure if the customer is Microsoft-centric",
            "CI/CD: GitHub Actions or AWS CodePipeline, with infrastructure as code via Terraform"
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "We need it in 4 weeks", resp: "For a production-ready MVP with real users, 8 to 12 weeks is typical. We can get you a prototype faster, but the prototype will not handle scale or edge cases. Let us talk about what success looks like at 4, 8, and 12 weeks." },
            { obj: "We would rather offshore it and save money", resp: "Offshore can work for well-specified tasks. New products are not well-specified by definition. You save 40% on hourly rate and often lose 2-3x on rework, missed deadlines, and a product that does not fit the market." },
            { obj: "Our team can build it themselves", resp: "They probably can. Every hour your engineers spend on infrastructure is an hour they are not spending on features that differentiate your business. We are a force multiplier, not a replacement." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Lead with speed to market and product thinking, not just technical capability. The MVP conversation is a qualification tool: customers who insist on building everything at once are usually not ready to start. Customers who get it are the ones who ship successful products." }
      ]
    },
    dictionary: [
      { term: "MVP (Minimum Viable Product)", def: "The smallest usable version of a product that delivers real value to real users. Ships fast, gathers feedback, then grows." },
      { term: "Agile", def: "A delivery methodology with short cycles (usually 2-week sprints), continuous customer feedback, and shippable software at the end of each cycle." },
      { term: "Sprint", def: "A 2-week agile work cycle. Ends with a demo of working software." },
      { term: "Web Application", def: "Software that runs in a browser. Includes customer portals, SaaS dashboards, and internal tools." },
      { term: "Mobile Application", def: "Software that runs on iOS or Android. Native apps use platform-specific languages; cross-platform frameworks like React Native build for both at once." },
      { term: "SaaS (Software as a Service)", def: "Subscription-based software accessed over the web. Typically multi-tenant, meaning one instance serves many customers." },
      { term: "API (Application Programming Interface)", def: "A defined way for software systems to talk to each other. Modern applications are composed of APIs." },
      { term: "React", def: "The most popular frontend framework for building web interfaces. Originally from Facebook, now industry standard." },
      { term: "Node.js", def: "A JavaScript runtime for building backend services. A common pairing with React for full-stack development." },
      { term: "Full-stack", def: "A developer or team that works on both frontend (what users see) and backend (what runs on servers). Common in smaller teams." },
      { term: "Frontend", def: "The user-facing part of an application: buttons, pages, forms. Usually runs in the browser or on the device." },
      { term: "Backend", def: "The server-side part of an application: business logic, databases, integrations. Invisible to end users." },
      { term: "AWS (Amazon Web Services)", def: "The largest cloud provider. Hosts a large portion of modern software infrastructure." },
      { term: "iOS / Android", def: "The two dominant mobile operating systems. iOS runs on iPhone; Android runs on everything else." },
      { term: "Prototype", def: "An early, rough version of a product used to test ideas. Not production-ready; meant to be thrown away." },
    ],
    quiz: [
      {
        q: "What is our typical MVP delivery window?",
        options: ["1 to 2 weeks", "3 to 4 weeks", "8 to 12 weeks", "12 to 18 months"],
        correct: 2,
        why: "MVP in 8 to 12 weeks is our standard. Faster gives you a prototype, not a production-ready product."
      },
      {
        q: "Which is NOT one of the four reasons clients choose us for Product Development?",
        options: [
          "Speed to market",
          "Agile process with regular progress",
          "Modern tech stack",
          "Cheapest hourly rate"
        ],
        correct: 3,
        why: "We compete on speed, process, modern stack, and product thinking. We are not the cheapest option, and trying to be loses deals."
      },
      {
        q: "Our default cadence for showing customers progress in product development is:",
        options: [
          "Every day",
          "Every 2 weeks",
          "At the end of the project",
          "Every quarter"
        ],
        correct: 1,
        why: "Agile sprints are typically 2 weeks. End each sprint with a demo of working software."
      },
      {
        q: "Which pairing represents our typical modern tech stack?",
        options: [
          "COBOL, mainframe, DB2",
          "React, Node, AWS",
          "jQuery, PHP, physical servers",
          "Flash, ColdFusion, Oracle"
        ],
        correct: 1,
        why: "React for frontend, Node for backend, AWS for cloud. Most SmarTek21 product builds start from this default."
      },
      {
        q: "Which category of work is often the highest-value because everyone needs it and few do it well?",
        options: [
          "Logo design",
          "APIs and integrations",
          "Email setup",
          "Font selection"
        ],
        correct: 1,
        why: "APIs and integrations are the plumbing between systems. Undervalued, underpriced, and usually critical to the business."
      },
      {
        q: "What does 'product thinking' mean in our delivery?",
        options: [
          "We ship every feature the customer asks for without pushback",
          "We push back on requirements that do not serve the business",
          "We skip the design phase",
          "We build the cheapest possible version"
        ],
        correct: 1,
        why: "Product thinking means thinking like a product team, not a code shop. Pushing back on bad requirements is part of that."
      },
      {
        q: "Which is one of the four types of software we build?",
        options: [
          "Firmware for embedded devices",
          "SaaS Platforms",
          "Operating systems",
          "Hardware drivers"
        ],
        correct: 1,
        why: "Our four categories are Web Apps, Mobile Apps, SaaS Platforms, and APIs/Integrations."
      },
      {
        q: "What mobile platforms do we build for?",
        options: [
          "Only iOS",
          "Only Android",
          "iOS and Android",
          "Feature phones only"
        ],
        correct: 2,
        why: "We build for both iOS and Android. Native or cross-platform depending on the use case."
      },
      {
        q: "Which best summarizes why clients pick us over a cheaper offshore vendor?",
        options: [
          "Speed to market, agile process, modern tech stack, product thinking",
          "Lower cost with no design, testing, or meetings",
          "Only because of geographic proximity",
          "Because we are required by contract"
        ],
        correct: 0,
        why: "Our four competitive reasons are speed to market, agile visibility, modern stack, and product thinking. We are not the low-cost option."
      },
      {
        q: "What is our typical sprint cycle for showing working software?",
        options: ["1 day", "1 week", "2 weeks", "1 month"],
        correct: 2,
        why: "Sprints are 2 weeks. Each sprint ends with a demo of working software for the customer."
      }
    ]
  },

  // ==========================================================================
  // 06 — UI/UX DESIGN
  // ==========================================================================
  {
    id: "ui-ux-design",
    number: "06",
    title: "UI/UX Design",
    subtitle: "User-centered design and research",
    duration: "8 min read",
    icon: Palette,
    reading: {
      lead: "UI/UX Design is one of our most misunderstood services. Customers often think it means 'making things look pretty.' In practice, good design is what makes customers adopt a product, keep using it, and recommend it. Bad design quietly kills more software than bad engineering does, and your job is to help customers see design as risk reduction, not decoration.",
      blocks: [
        { type: "h2", text: "UX vs UI: the difference that matters" },
        { type: "p", text: "These two terms get used interchangeably but they are not the same. Knowing the distinction helps you position SmarTek21 credibly and avoid wasting design budget on the wrong thing." },
        {
          type: "grid",
          cards: [
            { icon: Cpu, title: "UX (User Experience)", text: "How the product works and feels over time. Information architecture, user flows, interaction design, and whether users can actually accomplish their goals." },
            { icon: Palette, title: "UI (User Interface)", text: "What the product looks like. Colors, typography, spacing, components, and visual consistency. UI without UX is lipstick on a broken flow." }
          ]
        },
        { type: "h2", text: "What we deliver" },
        { type: "p", text: "Our design practice covers the full arc from user research to shipped interfaces. Not every engagement needs every step, but every step has a specific purpose." },
        {
          type: "grid",
          cards: [
            { icon: Users, title: "User Research", text: "Interviews, surveys, usability testing. Answers 'what do users actually need' before anything gets built." },
            { icon: Palette, title: "Wireframing and Prototyping", text: "Low-fidelity sketches and clickable Figma prototypes that test ideas cheaply before development." },
            { icon: Layers, title: "Design Systems", text: "Reusable components, typography scales, color tokens. Makes every future screen faster to build and more consistent." },
            { icon: Cpu, title: "Mobile and Web Design", text: "Responsive, accessible interfaces that work across devices and meet accessibility standards (WCAG)." }
          ]
        },
        { type: "h2", text: "The user research conversation" },
        { type: "p", text: "Most customers underestimate the value of user research because it happens before anything visible gets built. Your job is to help them see that research is the cheapest way to fail. Testing an idea in an interview costs nothing. Building and then finding out the idea was wrong costs six months of engineering." },
        {
          type: "callouts",
          items: [
            { title: "User interviews", text: "One-on-one conversations with 5-10 representative users. Surfaces real goals, frustrations, and workflows. Usually produces surprises." },
            { title: "Usability testing", text: "Watching real users try to complete tasks with a prototype. Reveals where the interface confuses people before code is written." },
            { title: "Surveys", text: "Quantitative backup for the qualitative insights from interviews. Good for validating that a problem exists at scale." }
          ]
        },
        { type: "h2", text: "Design systems: why they matter" },
        { type: "p", text: "A design system is a library of reusable components, rules, and tokens that every product built by the customer uses. The first product without a design system feels like normal design work. The fifth product without one feels like chaos. The tenth feels like technical debt that slows everything down." },
        { type: "p", text: "We recommend building a design system as soon as a customer has more than one product or surface. The upfront cost pays back fast once multiple teams start drawing from the same library." },
        { type: "h2", text: "Accessibility is not optional" },
        { type: "p", text: "Accessibility (often shortened to a11y) is both a legal requirement in many markets and a basic quality signal. WCAG (Web Content Accessibility Guidelines) is the standard we design to. Ignoring it used to be acceptable; today it is a liability and a lost user base." },
        {
          type: "list",
          items: [
            "Visual: sufficient color contrast, readable font sizes, no information conveyed by color alone",
            "Interaction: keyboard navigation, focus indicators, no time-based interactions without controls",
            "Content: clear heading structure, alt text on images, readable language level"
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "We do not need design research, we know our users", resp: "Every client says that, and every client is surprised by what they learn in the first 5 interviews. Research is the cheapest way to prevent a six-month engineering mistake. We can run a compressed research phase in 2 to 3 weeks." },
            { obj: "Our engineers can do the UI", resp: "They can ship screens. What they cannot do on their own is design a coherent experience across many flows, or build a design system that scales. Design pays for itself when the same engineer builds a feature in half the time because the components already exist." },
            { obj: "Design is too expensive for this project", resp: "The cost of poor design is measured in churn, support tickets, and rebuilds. Every dollar spent on design before the build typically saves five to ten in engineering rework." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Position design as risk reduction and force multiplication, not decoration. The strongest close is to offer a short discovery sprint (2 to 3 weeks) that produces user insights, wireframes, and a prototype the customer can use to align their stakeholders." }
      ]
    },
    dictionary: [
      { term: "UI (User Interface)", def: "What the product looks like. Colors, typography, spacing, buttons, icons. The surface layer." },
      { term: "UX (User Experience)", def: "How the product works and feels over time. Flows, interactions, whether users can actually accomplish their goals." },
      { term: "Wireframe", def: "A low-fidelity sketch of a screen showing layout and structure without colors or polish. Used to test ideas cheaply before building." },
      { term: "Prototype", def: "A clickable mockup used to test flows and interactions before code is written. Usually built in Figma." },
      { term: "Figma", def: "The industry-standard design tool for UI/UX work. Browser-based, collaborative, and dominant in the market." },
      { term: "User Research", def: "Systematic study of user needs, behaviors, and problems. Includes interviews, surveys, and observation." },
      { term: "Usability Testing", def: "Watching real users try to complete tasks with a prototype or product. Reveals problems before launch." },
      { term: "Design System", def: "A library of reusable components, rules, and tokens that every product uses. Keeps design consistent and speeds up development." },
      { term: "Responsive Design", def: "Interfaces that adapt to different screen sizes (phone, tablet, desktop). Core web design practice today." },
      { term: "Accessibility (a11y)", def: "Designing products that work for people with disabilities. Both a legal requirement in many markets and a quality signal." },
      { term: "WCAG (Web Content Accessibility Guidelines)", def: "The international standard for web accessibility. WCAG 2.1 AA is the common compliance target." },
      { term: "Information Architecture (IA)", def: "How content and features are organized and labeled so users can find what they need." },
      { term: "High-fidelity Mockup", def: "A polished visual design showing exactly what the final interface will look like. Comes after wireframes." },
    ],
    quiz: [
      {
        q: "Which design tool is used for wireframing and prototyping at SmarTek21?",
        options: ["PowerPoint", "Figma", "Microsoft Paint", "Excel"],
        correct: 1,
        why: "Figma is the industry-standard design tool, browser-based and collaborative. Used for wireframes and prototypes before development."
      },
      {
        q: "Which is NOT one of our four listed UI/UX Design services?",
        options: [
          "User Research",
          "Wireframing and Prototyping",
          "Design Systems",
          "Paid advertising campaigns"
        ],
        correct: 3,
        why: "Our four services are User Research, Wireframing/Prototyping, Design Systems, and Mobile & Web Design. Advertising is not in scope."
      },
      {
        q: "What is the purpose of user research?",
        options: [
          "Making the product look prettier",
          "Answering 'what do users actually need' before building",
          "Reducing development time",
          "Writing marketing copy"
        ],
        correct: 1,
        why: "User research surfaces real needs before code is written. It's the cheapest way to avoid a six-month engineering mistake."
      },
      {
        q: "Why does a design system matter once a customer has multiple products?",
        options: [
          "It looks prettier",
          "Consistent components across products mean faster builds and less chaos",
          "It is legally required",
          "It replaces engineers"
        ],
        correct: 1,
        why: "Design systems pay back as more teams draw from the same library. Without one, every new surface reinvents buttons, colors, and typography."
      },
      {
        q: "What does 'responsive' design mean?",
        options: [
          "A design that responds to customer emails",
          "An interface that adapts to different screen sizes like phone, tablet, and desktop",
          "A fast-loading design",
          "A highly animated design"
        ],
        correct: 1,
        why: "Responsive design adapts to screen size. Core web design practice given the mix of devices users are on."
      },
      {
        q: "Which service produces a clickable prototype to test flows before development?",
        options: [
          "Wireframing and Prototyping",
          "Mobile Design only",
          "Server Management",
          "Network Design"
        ],
        correct: 0,
        why: "Wireframing and Prototyping produces clickable designs, usually in Figma, that test flows before any code is written."
      },
      {
        q: "Which research method involves watching real users try to complete tasks?",
        options: [
          "Customer interviews",
          "Surveys",
          "Usability testing",
          "Financial audits"
        ],
        correct: 2,
        why: "Usability testing is observing users with a prototype or product. Reveals confusion before code is written."
      },
      {
        q: "What are the four UI/UX Design services we offer?",
        options: [
          "User Research, Wireframing and Prototyping, Design Systems, Mobile and Web Design",
          "Logos, Brochures, Videos, Marketing Copy",
          "Coding, Testing, Deploying, Monitoring",
          "SEO, Content Marketing, Analytics, Ads"
        ],
        correct: 0,
        why: "Our four design services are User Research, Wireframing/Prototyping, Design Systems, and Mobile & Web Design."
      },
      {
        q: "What's the strongest pitch for investing in design research?",
        options: [
          "It is legally required",
          "It is the cheapest way to avoid a six-month engineering mistake",
          "It makes code run faster",
          "It reduces cloud costs"
        ],
        correct: 1,
        why: "Research is a low-cost upfront investment that prevents expensive engineering rework. Position it as risk reduction."
      },
      {
        q: "What does 'accessible' design mean in our practice?",
        options: [
          "Available 24/7",
          "Usable by people with disabilities, meeting accessibility standards",
          "Cheap to buy",
          "Written in simple language only"
        ],
        correct: 1,
        why: "Accessibility means designing for users with disabilities. It is a legal requirement in many markets and a quality signal everywhere."
      }
    ]
  },

  // ==========================================================================
  // 07 — AI AUTOMATION
  // ==========================================================================
  {
    id: "ai-automation",
    number: "07",
    title: "AI Automation",
    subtitle: "Intelligent process automation",
    duration: "8 min read",
    icon: Bot,
    reading: {
      lead: "AI Automation is where AI meets business process. If AI Engineering is about building custom intelligence, AI Automation is about deploying that intelligence to eliminate repetitive work. It often closes faster than full AI Engineering because the ROI is tangible, the scope is concrete, and the before-and-after is easy to see.",
      blocks: [
        { type: "h2", text: "What we automate" },
        { type: "p", text: "Four categories come up in nearly every enterprise. Each has a familiar before-and-after story you can tell on a first call." },
        {
          type: "grid",
          cards: [
            { icon: BookOpen, title: "Document Processing", text: "Extract structured data from invoices, contracts, forms, and receipts. Replaces hours of manual data entry with seconds of inference." },
            { icon: Bot, title: "Customer Service", text: "AI chatbots and virtual assistants that handle common questions without human agents. Routes to humans when confidence is low." },
            { icon: Database, title: "Data Entry and Validation", text: "Automated extraction, cross-checking, and routing of data between systems. Catches errors before they reach humans." },
            { icon: GitBranch, title: "Workflow Automation", text: "Intelligent routing, approvals, and system integrations. When X happens, do Y, with judgment for exceptions." }
          ]
        },
        { type: "h2", text: "Why AI Automation sells faster than AI Engineering" },
        { type: "p", text: "AI Engineering projects often require abstract conversations about data and models. AI Automation is easier to close because you can point at a specific task the customer hates, estimate the time it takes today, and quantify the saving tomorrow. Customers convert on math, not on model architecture." },
        {
          type: "list",
          items: [
            "Measurable ROI: 'Team spends 40 hours a week on this. We automate 80% of it. That is 32 hours back every week.'",
            "Clear scope: you can point at the specific task or document type on a whiteboard",
            "Fast proof of value: a 4-week pilot can usually demonstrate real savings on a real workflow",
            "Immediate user feedback: the people whose work changes can tell you quickly if it is working"
          ]
        },
        { type: "h2", text: "The document processing sweet spot" },
        { type: "p", text: "Document processing is our most common AI Automation opener because nearly every enterprise has stacks of documents being handled manually. Invoices, purchase orders, claims, applications, contracts, medical records. The pattern is always the same: documents arrive, humans read them, humans type the data somewhere, process continues." },
        { type: "p", text: "Modern document processing combines OCR (for extracting text) with NLP (for understanding structure and meaning) and sometimes LLMs (for ambiguous cases). A typical deployment handles 80-95% of documents without human review, with the rest escalated for a quick check." },
        { type: "h2", text: "Chatbots done right" },
        { type: "p", text: "Every customer has heard of chatbots. Most have also been burned by one. Your job is to help them see that modern LLM-based chatbots are not the same product as the rule-based bots they tried in 2019." },
        {
          type: "callouts",
          items: [
            { title: "The 2019 failure", text: "Rule-based chatbots that could not handle anything outside their script. Fell over at the first unusual phrasing." },
            { title: "The 2024 reality", text: "LLM-powered assistants with access to the customer's knowledge base. Handle nuanced questions, escalate when unsure, and learn from feedback." },
            { title: "The positioning", text: "Never say 'we are building you a chatbot.' Say 'we are building an AI assistant that resolves X% of your support volume.' Anchor on outcome, not tech." }
          ]
        },
        { type: "h2", text: "Common pitfalls to avoid" },
        { type: "p", text: "AI Automation deals fail when they are under-specified or the data is not what the customer thinks it is. Watch for these warning signs during discovery." },
        {
          type: "list",
          items: [
            "'We'll automate all our processes' - too vague, no ROI story, project stalls",
            "No owner inside the customer's team - if no one owns it post-launch, it will rot",
            "Documents are paper-only - you need digital input before you can automate extraction",
            "Input quality is inconsistent - a model trained on clean data will not handle garbage input well"
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "Our last chatbot failed", resp: "Most did, and usually for the same reason: rule-based bots could not handle anything outside their script. Modern LLM-powered assistants handle nuance and know when to escalate. We can show you the difference in a 2-week pilot on one of your actual workflows." },
            { obj: "We are worried AI will make mistakes", resp: "AI Automation is not 100% autonomous. We build human-in-the-loop for low-confidence cases and audit trails for everything. You get the speed benefit while keeping human judgment where it matters." },
            { obj: "Our team will lose their jobs", resp: "Most engagements do not reduce headcount; they redirect it. People stop typing invoices and start handling exceptions and strategic work. The boring parts get automated, not the people." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Lead with a specific, measurable task. Quantify the time spent today. Offer a 4-week pilot that proves the savings. Avoid abstract AI conversations; anchor everything on the workflow and the math." }
      ]
    },
    dictionary: [
      { term: "AI Automation", def: "Using AI to eliminate or accelerate repetitive business tasks. Overlaps with traditional automation but adds judgment." },
      { term: "RPA (Robotic Process Automation)", def: "The older generation of automation: scripts that click through UIs to move data between systems. Effective but brittle." },
      { term: "IDP (Intelligent Document Processing)", def: "AI-based extraction of data from documents. Combines OCR, NLP, and sometimes LLMs to handle varied formats." },
      { term: "Chatbot", def: "An AI assistant that handles user questions in a conversational interface. Modern ones are LLM-based; older ones were rule-based." },
      { term: "Virtual Assistant", def: "A broader term for an AI agent that can perform tasks, not just answer questions. Often used interchangeably with chatbot." },
      { term: "OCR (Optical Character Recognition)", def: "Extracting text from images of documents. Foundational technology for document automation." },
      { term: "Workflow", def: "A sequence of tasks that accomplishes a business process. Automation targets workflows, not individual actions." },
      { term: "Trigger", def: "An event that starts an automated workflow. Can be time-based (every Monday), event-based (new invoice arrives), or manual." },
      { term: "Integration", def: "A connection between two software systems. Automation requires integrations to move data where it needs to go." },
      { term: "API (Application Programming Interface)", def: "The defined way software systems communicate. Automation platforms talk to business systems through APIs." },
      { term: "Webhook", def: "A reverse API call: system A notifies system B when something happens. A common way to trigger automations." },
      { term: "Human-in-the-loop", def: "A workflow design where AI handles routine cases automatically but routes low-confidence cases to humans. Balances speed and accuracy." },
      { term: "NLP (Natural Language Processing)", def: "The field of AI focused on understanding and generating human language. Core to chatbots and document processing." },
    ],
    quiz: [
      {
        q: "Which of these is NOT one of the four AI Automation categories we sell?",
        options: [
          "Document Processing",
          "Customer Service",
          "Data Entry",
          "Physical robotics on a factory floor"
        ],
        correct: 3,
        why: "The four are Document Processing, Customer Service, Data Entry, and Workflow Automation. Physical robotics is outside the practice."
      },
      {
        q: "Why does AI Automation typically close faster than broader AI Engineering deals?",
        options: [
          "It's always cheaper",
          "It targets a specific task with measurable ROI rather than abstract model conversations",
          "Customers don't read the contract",
          "Compliance requires it"
        ],
        correct: 1,
        why: "AI Automation is anchored to a specific task with clear before-and-after economics. That's easier to buy than an abstract AI capability."
      },
      {
        q: "Which category would handle extracting data from invoices and contracts?",
        options: [
          "Workflow Automation",
          "Data Entry",
          "Document Processing",
          "Customer Service"
        ],
        correct: 2,
        why: "Invoices, contracts, and forms are Document Processing. Usually combines OCR with NLP or LLMs."
      },
      {
        q: "What does AI Automation for customer service typically look like?",
        options: [
          "Replacing the entire support team",
          "AI chatbots and virtual assistants handling common questions with escalation when unsure",
          "Sending automated marketing emails",
          "Hiring offshore agents"
        ],
        correct: 1,
        why: "Modern AI Automation handles common questions and escalates edge cases. Human-in-the-loop for what matters."
      },
      {
        q: "What's a typical pilot duration for proving AI Automation value?",
        options: ["1 day", "4 weeks", "6 months", "2 years"],
        correct: 1,
        why: "4 weeks is typical for proof of value. Enough to show real savings on a real workflow without committing to full deployment."
      },
      {
        q: "Which category would automate routing between systems when events occur?",
        options: [
          "Customer Service",
          "Workflow Automation",
          "Document Processing",
          "Data Entry"
        ],
        correct: 1,
        why: "Workflow Automation integrates systems and triggers actions. When X happens in system A, do Y in system B."
      },
      {
        q: "What should you lead an AI Automation conversation with?",
        options: [
          "An abstract discussion of AI capabilities",
          "A specific measurable task and the time spent on it today",
          "A pricing proposal",
          "A five-year roadmap"
        ],
        correct: 1,
        why: "Lead with a concrete task and the time it takes today. The math writes the deal, not the tech."
      },
      {
        q: "Why does AI Automation close faster than broad AI Engineering conversations?",
        options: [
          "Because it is free",
          "Because the ROI is tangible and the scope is concrete",
          "Because it does not actually require AI",
          "Because customers do not ask questions"
        ],
        correct: 1,
        why: "Customers convert on math. AI Automation targets specific tasks with clear before-and-after economics."
      },
      {
        q: "Which is NOT handled by Data Entry automation?",
        options: [
          "Automated data extraction",
          "Data validation before it reaches other systems",
          "Writing a product roadmap",
          "Catching errors early"
        ],
        correct: 2,
        why: "Data Entry automation handles extraction and validation. Product roadmaps are strategy work, not data entry."
      },
      {
        q: "Which of these would NOT be part of Customer Service AI automation?",
        options: [
          "Handling common questions",
          "Escalating to humans when unsure",
          "Running an executive board meeting",
          "Providing typical responses to account inquiries"
        ],
        correct: 2,
        why: "Customer Service AI handles questions and escalates when unsure. It does not run board meetings."
      }
    ]
  },

  // ==========================================================================
  // 08 — DEVOPS & CI/CD
  // ==========================================================================
  {
    id: "devops-cicd",
    number: "08",
    title: "DevOps & CI/CD",
    subtitle: "Automation and infrastructure as code",
    duration: "9 min read",
    icon: GitBranch,
    reading: {
      lead: "DevOps is the operational backbone of modern software. Every product engagement we do eventually requires DevOps work, and customers who invest in it early ship faster, break less, and sleep better. Your job is to help customers see that DevOps is not a cost center; it is the thing that lets everything else move fast.",
      blocks: [
        { type: "h2", text: "What DevOps actually is" },
        { type: "p", text: "DevOps is the practice of unifying software development and IT operations. The goal is to let a team ship software changes frequently, reliably, and with confidence. In practice that means automation: automated testing, automated deployments, automated infrastructure provisioning, automated monitoring. Every manual step in the delivery pipeline is a place where something will eventually break." },
        { type: "h2", text: "What we deliver" },
        {
          type: "grid",
          cards: [
            { icon: GitBranch, title: "CI/CD Pipelines", text: "Automated testing and deployment. Takes code from commit to production without manual steps. Cuts deployment time from weeks to minutes." },
            { icon: Cloud, title: "Infrastructure as Code", text: "Terraform, CloudFormation, Pulumi. Infrastructure as a version-controlled codebase: reviewable, rollback-able, reproducible." },
            { icon: Package, title: "Container Orchestration", text: "Kubernetes and Docker. Package applications with dependencies and run them consistently anywhere, scale on demand." },
            { icon: TrendingUp, title: "Monitoring and Observability", text: "24/7 visibility into system health, performance, and user experience. You find problems before users do." }
          ]
        },
        { type: "h2", text: "CI vs CD vs CD (two different CDs)" },
        { type: "p", text: "The acronym CI/CD hides three different practices. Customers often conflate them, so knowing the distinction helps you diagnose what they actually need." },
        {
          type: "callouts",
          items: [
            { title: "CI (Continuous Integration)", text: "Every code change automatically triggers tests. Catches breakage within minutes of a developer committing. Table stakes for any modern team." },
            { title: "CD (Continuous Delivery)", text: "Every change that passes CI is automatically prepared for production. Humans still push the button to release, but the pipeline is ready to go." },
            { title: "CD (Continuous Deployment)", text: "The stronger version. Every change that passes CI goes to production automatically. Requires high automated test coverage and confidence in the pipeline." }
          ]
        },
        { type: "h2", text: "Infrastructure as Code: why it matters" },
        { type: "p", text: "Without IaC, infrastructure changes happen by someone clicking around in a cloud console. The changes are invisible, unaudited, and impossible to roll back cleanly. With IaC, your infrastructure is a codebase: every change is reviewed, versioned, and tested like software." },
        {
          type: "list",
          items: [
            "Reproducibility: spin up a new environment in minutes because it is all defined in code",
            "Audit trail: every change is a pull request with reviewer and timestamp",
            "Rollback: if a change breaks, revert the commit and re-apply. No heroics required",
            "Compliance: auditors love IaC because there is a complete paper trail of every infrastructure change"
          ]
        },
        { type: "h2", text: "Containers and Kubernetes" },
        { type: "p", text: "Containers (usually Docker) package an application with all its dependencies. The promise is that the app runs identically on your laptop, in staging, and in production, because everything it needs is inside the container. Kubernetes is the orchestrator: it runs containers at scale, restarts failed ones, and scales up or down based on demand." },
        { type: "p", text: "Customers often arrive wanting Kubernetes specifically because they have heard about it. Our job is to qualify whether they actually need it. For small workloads or single applications, Kubernetes is overkill. For complex microservices at scale, it is the right tool." },
        { type: "h2", text: "Observability vs monitoring" },
        { type: "p", text: "Monitoring tells you whether the system is up. Observability tells you why it is slow at 3am for customers in Europe. The distinction matters because most customers think they need monitoring when they actually need observability, which requires richer instrumentation." },
        {
          type: "list",
          items: [
            "Metrics: numbers over time (CPU, memory, request rate). Good for dashboards and alerts.",
            "Logs: time-stamped records of events. Good for investigating what happened.",
            "Traces: the full path of a request across services. Good for diagnosing complex distributed issues."
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "Our team deploys fine manually", resp: "It works until it does not. The first outage caused by a manual deployment mistake usually pays for CI/CD. And the real benefit is not fewer mistakes; it is the confidence to ship small changes often instead of hoarding them for a big quarterly release." },
            { obj: "We do not need Kubernetes", resp: "You are probably right. Kubernetes is overkill for most workloads. We recommend it only when the scale or complexity justifies it. What you likely do need is containerization and a real CI/CD pipeline, even without Kubernetes." },
            { obj: "DevOps is just another IT budget line", resp: "DevOps is what lets every other investment pay off. Fast product delivery, reliable uptime, and cloud cost control all depend on it. Customers who skip DevOps pay for it in incident response and missed deadlines." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Position DevOps as risk reduction and velocity. Every change ships fast, every change ships safe, every change is auditable. Lead with a DevOps assessment that maps their current pipeline against best practices and identifies the top three gaps." }
      ]
    },
    dictionary: [
      { term: "DevOps", def: "The practice of unifying software development and operations to ship software changes frequently, reliably, and with confidence." },
      { term: "CI (Continuous Integration)", def: "Every code change automatically triggers tests and builds. Catches breakage within minutes of a commit." },
      { term: "CD (Continuous Delivery)", def: "Every change that passes CI is automatically prepared for production release. Humans trigger the final deploy." },
      { term: "CD (Continuous Deployment)", def: "Every change that passes CI goes to production automatically. Requires high test coverage and confidence." },
      { term: "Pipeline", def: "An automated sequence of steps that takes code from commit to production. Usually visualized as a series of stages." },
      { term: "Git", def: "The dominant version control system. Every modern codebase uses Git. Commits, branches, and pull requests are the language of development." },
      { term: "IaC (Infrastructure as Code)", def: "Defining infrastructure in code files that are version-controlled and applied automatically. Terraform and CloudFormation are popular tools." },
      { term: "Terraform", def: "The most popular IaC tool, cloud-agnostic. Lets you define infrastructure across AWS, Azure, and GCP using the same language." },
      { term: "CloudFormation", def: "AWS's native IaC service. Deep AWS integration but only works for AWS." },
      { term: "Docker", def: "The most common container technology. Packages applications with dependencies so they run identically in any environment." },
      { term: "Container", def: "A lightweight, isolated package containing an application and everything it needs to run. Like a VM but much smaller and faster." },
      { term: "Kubernetes (K8s)", def: "The dominant container orchestrator. Runs containers at scale, restarts failures, auto-scales, and manages networking." },
      { term: "Observability", def: "The ability to understand what is happening inside a system from its outputs. Goes beyond monitoring by enabling diagnosis of unknown issues." },
      { term: "SRE (Site Reliability Engineering)", def: "A specialization of DevOps pioneered at Google. Applies software engineering practices to operations." },
      { term: "Deployment", def: "The act of releasing a new version of software to an environment (production, staging)." },
      { term: "Rollback", def: "Reverting to a previous version after a bad deployment. Fast rollback is a key DevOps capability." },
      { term: "Blue-Green Deployment", def: "A deployment pattern with two identical environments. Traffic switches instantly from old (blue) to new (green); fast rollback by switching back." },
    ],
    quiz: [
      {
        q: "Which tool is named as an example of Infrastructure as Code in our service?",
        options: ["Excel", "Terraform", "PowerPoint", "Zoom"],
        correct: 1,
        why: "Terraform and CloudFormation are the two named IaC tools. Both let you manage infrastructure as code."
      },
      {
        q: "Which of these is NOT one of our four DevOps services?",
        options: [
          "CI/CD Pipelines",
          "Infrastructure as Code",
          "Container Orchestration",
          "Email campaign management"
        ],
        correct: 3,
        why: "Our four services are CI/CD, IaC, Container Orchestration, and Monitoring & Observability. Email is not DevOps."
      },
      {
        q: "What do CI/CD Pipelines automate?",
        options: [
          "Customer billing",
          "Testing and deployment of code changes",
          "Employee onboarding",
          "Content creation"
        ],
        correct: 1,
        why: "CI/CD automates the path from a developer's commit to production. Testing on commit, automated deployment, minimal manual steps."
      },
      {
        q: "Which is named as a container orchestration technology?",
        options: ["Kubernetes", "Microsoft Word", "PostgreSQL", "Adobe Illustrator"],
        correct: 0,
        why: "Kubernetes is the dominant container orchestrator. Docker is the container runtime. Both are in our DevOps practice."
      },
      {
        q: "What's the primary purpose of monitoring and observability?",
        options: [
          "Tracking employee performance",
          "24/7 system health, finding problems before users do",
          "Compliance reporting only",
          "Reducing cloud bills"
        ],
        correct: 1,
        why: "Monitoring and observability give you visibility into system health continuously. The goal is finding issues before customers notice."
      },
      {
        q: "Which technology is named for container orchestration at scale?",
        options: ["Docker", "Kubernetes", "PostgreSQL", "Tableau"],
        correct: 1,
        why: "Kubernetes is the container orchestrator. Docker is the container runtime. Both are part of our DevOps practice."
      },
      {
        q: "What do Terraform and CloudFormation both accomplish?",
        options: [
          "Infrastructure as Code",
          "Database backups",
          "Email sending",
          "User training"
        ],
        correct: 0,
        why: "Terraform and CloudFormation are the named IaC tools. They let you manage infrastructure as version-controlled code."
      },
      {
        q: "What's the primary benefit of Infrastructure as Code?",
        options: [
          "Lower licensing costs only",
          "Version-controlled, reviewable, reproducible infrastructure",
          "Faster internet connection",
          "Better screen resolution"
        ],
        correct: 1,
        why: "IaC brings software engineering discipline to infrastructure: version control, code review, reproducibility, easy rollback."
      },
      {
        q: "What should a DevOps engagement typically start with?",
        options: [
          "A signed master contract",
          "A DevOps assessment that maps the customer's current pipeline against best practices",
          "A full Kubernetes deployment in week one",
          "A network infrastructure overhaul"
        ],
        correct: 1,
        why: "Lead with an assessment that identifies the top three gaps. It becomes the roadmap for the engagement."
      },
      {
        q: "What does CI/CD do to the software delivery lifecycle?",
        options: [
          "Slows it down with extra gates",
          "Automates testing and deployment from commit to production",
          "Requires manual approval at every step",
          "Prevents rollbacks"
        ],
        correct: 1,
        why: "CI/CD automates the path from commit to production. Typically shrinks deployment time from weeks to minutes."
      }
    ]
  },

  // ==========================================================================
  // 09 — CYBERSECURITY
  // ==========================================================================
  {
    id: "cybersecurity",
    number: "09",
    title: "Cybersecurity Services",
    subtitle: "Security assessments and compliance",
    duration: "8 min read",
    icon: Shield,
    reading: {
      lead: "Cybersecurity is unique because every customer needs it, but most do not want to talk about it until something bad happens. Your job is to help customers see security as a business risk issue (the cost of a breach) rather than just a technical one, and to find the angle that lets them buy before the bad thing happens.",
      blocks: [
        { type: "h2", text: "What we offer" },
        { type: "p", text: "SmarTek21's cybersecurity practice covers four main categories. Most customers need a combination, but the entry point is usually one specific pain." },
        {
          type: "grid",
          cards: [
            { icon: Shield, title: "Security Assessments", text: "Penetration testing, vulnerability scans, risk assessments. Tells the customer where they are weak before attackers find out for them." },
            { icon: CheckCheck, title: "Compliance Support", text: "SOC 2, ISO 27001, HIPAA, PCI-DSS, GDPR. Gap analysis, remediation, and audit preparation." },
            { icon: AlertCircle, title: "Security Monitoring", text: "24/7 threat detection and response from our Security Operations Center. Catches and contains threats before they become incidents." },
            { icon: RefreshCw, title: "Incident Response", text: "Breach investigation, forensics, remediation, and post-incident hardening. What you call when something has already gone wrong." }
          ]
        },
        { type: "h2", text: "Why customers buy cybersecurity" },
        { type: "p", text: "There are three buying motivations, and they carry different urgency and budget levels." },
        {
          type: "list",
          items: [
            "Regulatory requirement: 'We need to be SOC 2 certified to land this enterprise customer.' Budget is usually already committed.",
            "Recent incident or close call: 'We had a ransomware attempt last month.' High urgency, maximum budget authority.",
            "Proactive risk management: 'Our CEO wants a third-party assessment.' Good for long-term relationships, slower to close."
          ]
        },
        { type: "h2", text: "Compliance frameworks that come up" },
        { type: "p", text: "You do not need to be an auditor, but you should recognize the major frameworks and what each one requires." },
        {
          type: "callouts",
          items: [
            { title: "SOC 2", text: "The most common B2B SaaS requirement. Covers security, availability, processing integrity, confidentiality, and privacy. Usually required to close enterprise deals." },
            { title: "ISO 27001", text: "International standard for information security management. Common in Europe and for global enterprises. More rigorous and more expensive than SOC 2." },
            { title: "HIPAA", text: "US regulation for protected health information. Required for any software handling patient data. Carries real legal penalties." },
            { title: "PCI-DSS", text: "Required for any system handling credit card data. Very specific technical requirements; non-compliance means losing payment processing." },
            { title: "GDPR", text: "European data protection regulation. Applies to anyone handling EU resident data. Penalties up to 4% of global revenue." }
          ]
        },
        { type: "h2", text: "The breach cost conversation" },
        { type: "p", text: "Customers often underestimate what a breach actually costs, because they only think about the visible costs. Use this framework to expand their thinking." },
        {
          type: "list",
          items: [
            "Direct costs: incident response team, legal fees, forensic investigation, notification requirements",
            "Regulatory: fines (GDPR up to 4% of global revenue), required audits, mandatory reporting",
            "Business: customer loss, deal freezes, procurement restrictions, extended sales cycles",
            "Reputation: long-tail effects on brand, often visible in lower win rates for years",
            "Productivity: weeks or months of engineering distraction rebuilding and hardening systems"
          ]
        },
        { type: "h2", text: "MDR vs MSSP: what customers actually need" },
        { type: "p", text: "Many customers arrive asking for 'security monitoring' without a clear picture of what they mean. Two common flavors." },
        {
          type: "callouts",
          items: [
            { title: "MSSP (Managed Security Services Provider)", text: "Monitors security tools, alerts on suspicious activity, hands incidents to the customer. Cheaper, less hands-on." },
            { title: "MDR (Managed Detection and Response)", text: "Monitors, investigates, AND responds to threats on the customer's behalf. More expensive but faster containment. Usually what customers actually need." }
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "We have never had a breach, why invest now?", resp: "That is survivorship bias. Most organizations are already breached in some capacity; the question is whether they know it. Assessments typically reveal existing issues that have been quiet. The cost of finding them now is a small fraction of finding them during an incident." },
            { obj: "Our IT team handles security", resp: "IT teams handle security the same way they handle backups before a ransomware attack: technically yes, practically often not well enough. Security is a specialization. We do not replace your IT team; we provide depth they cannot reasonably build internally." },
            { obj: "Compliance is a box-checking exercise", resp: "It can be, or it can be used to build real security posture. The best compliance engagements produce both the certification and the underlying security improvements. The cost is similar either way; the value differs hugely." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Lead with business risk, not technical detail. Quantify the breach cost, identify the specific regulatory or customer driver, and offer an assessment as the opening move. The assessment produces a specific risk register that becomes the roadmap for the full engagement." }
      ]
    },
    dictionary: [
      { term: "Penetration Testing (pentest)", def: "Authorized simulated attack on a system to find vulnerabilities. Done by professional ethical hackers." },
      { term: "Vulnerability", def: "A weakness in a system that could be exploited. Different from a threat (someone who wants to exploit it) or a risk (likelihood times impact)." },
      { term: "SOC 2", def: "An audit framework covering security, availability, processing integrity, confidentiality, and privacy. Most common B2B SaaS requirement." },
      { term: "ISO 27001", def: "International standard for information security management systems. Rigorous, audited certification used globally." },
      { term: "HIPAA", def: "US regulation protecting health information. Required for any software handling patient data." },
      { term: "PCI-DSS", def: "Standards for handling credit card data. Non-negotiable for any system processing payment cards." },
      { term: "GDPR", def: "European data protection regulation. Applies to any organization handling EU resident data, regardless of where the company is located." },
      { term: "SIEM (Security Information and Event Management)", def: "A platform that aggregates logs from across the environment and alerts on suspicious patterns. A core tool for security operations." },
      { term: "SOC (Security Operations Center)", def: "The team and tools monitoring for threats 24/7. Can be internal or outsourced (MSSP or MDR)." },
      { term: "MDR (Managed Detection and Response)", def: "Outsourced security operations that not only monitor but investigate and respond to threats." },
      { term: "MSSP (Managed Security Services Provider)", def: "Outsourced security services, typically monitoring and alerting. Less hands-on than MDR." },
      { term: "Zero Trust", def: "A security model assuming no user or system should be trusted by default. Every request is verified." },
      { term: "MFA (Multi-Factor Authentication)", def: "Requires two or more proofs of identity. 'Something you know' (password) plus 'something you have' (phone or token)." },
      { term: "Encryption", def: "Converting data into a form that cannot be read without a key. Used at rest (stored) and in transit (moving between systems)." },
      { term: "Breach", def: "An incident where unauthorized access to data or systems occurred. Usually triggers legal notification requirements." },
      { term: "Phishing", def: "Fraudulent emails or messages designed to trick users into revealing credentials or executing malware. The most common initial attack vector." },
      { term: "Ransomware", def: "Malware that encrypts the customer's data and demands payment for decryption. Can shut down operations for weeks." },
    ],
    quiz: [
      {
        q: "Which is NOT one of our four Cybersecurity services?",
        options: [
          "Security Assessments",
          "Compliance Support",
          "Security Monitoring",
          "Antivirus software sales"
        ],
        correct: 3,
        why: "Our four services are Security Assessments, Compliance Support, Security Monitoring, and Incident Response. We are not a retail antivirus vendor."
      },
      {
        q: "Which compliance framework is the most common requirement for B2B SaaS customers?",
        options: ["SOC 2", "PCI-DSS", "HIPAA", "ISO 9001"],
        correct: 0,
        why: "SOC 2 is the most common B2B SaaS requirement. Typically required to close enterprise deals."
      },
      {
        q: "Which compliance framework specifically applies to protected health information in the US?",
        options: ["SOC 2", "ISO 27001", "HIPAA", "PCI-DSS"],
        correct: 2,
        why: "HIPAA is US regulation for protected health information. Required for any software handling patient data."
      },
      {
        q: "What does a penetration test do?",
        options: [
          "Tests physical door locks",
          "Authorized simulated attack on a system to find vulnerabilities",
          "Tests customer satisfaction",
          "Audits financial controls"
        ],
        correct: 1,
        why: "Pentests are authorized simulated attacks. Professional ethical hackers find weaknesses before real attackers do."
      },
      {
        q: "Which service do you call when a breach has already happened?",
        options: [
          "Security Assessment",
          "Compliance Support",
          "Incident Response",
          "Security Monitoring"
        ],
        correct: 2,
        why: "Incident Response handles breach investigation, remediation, and hardening after the fact."
      },
      {
        q: "Which service covers gap analysis, remediation, and audit preparation?",
        options: [
          "Security Assessments",
          "Compliance Support",
          "Security Monitoring",
          "Incident Response"
        ],
        correct: 1,
        why: "Compliance Support covers gap analysis against frameworks, remediation of gaps, and audit preparation."
      },
      {
        q: "Which compliance framework applies to credit card data?",
        options: ["HIPAA", "SOC 2", "PCI-DSS", "ISO 9001"],
        correct: 2,
        why: "PCI-DSS is required for any system handling credit card data. Non-compliance means losing payment processing privileges."
      },
      {
        q: "What does 'Security Monitoring' provide in our practice?",
        options: [
          "24/7 threat detection and response",
          "Annual compliance audits only",
          "Physical security guards",
          "Marketing campaigns"
        ],
        correct: 0,
        why: "Security Monitoring is continuous threat detection and response. Catches issues before they become full incidents."
      },
      {
        q: "Which standard is commonly required by European or global enterprises?",
        options: ["HIPAA", "PCI-DSS", "ISO 27001", "GDPR"],
        correct: 2,
        why: "ISO 27001 is the international standard for information security management. Common in Europe and for global enterprises."
      },
      {
        q: "How should you frame the cost of a cybersecurity investment?",
        options: [
          "As a technical line item only",
          "As business risk compared to the cost of a breach",
          "As purely optional",
          "As an insurance premium only"
        ],
        correct: 1,
        why: "Lead with business risk. Quantify what a breach costs (direct, regulatory, customer loss, reputation). Technical framings do not sell to CFOs."
      }
    ]
  },

  // ==========================================================================
  // 10 — DATA & ANALYTICS
  // ==========================================================================
  {
    id: "data-analytics",
    number: "10",
    title: "Data & Analytics",
    subtitle: "Data platforms and business intelligence",
    duration: "8 min read",
    icon: Database,
    reading: {
      lead: "Data and Analytics is the foundation under every AI conversation, every operational dashboard, and every 'why is this business metric down' question. Customers often have tons of data and almost no ability to use it. Your job is to help them see that the problem is not 'we need more data,' it is 'we need to make the data we have usable.'",
      blocks: [
        { type: "h2", text: "What we build" },
        { type: "p", text: "Data projects span from raw infrastructure to business-user-facing dashboards. A full engagement usually touches all four layers, but entry points vary." },
        {
          type: "grid",
          cards: [
            { icon: Database, title: "Data Warehouses", text: "Snowflake, Redshift, BigQuery. The central place where business-ready data lives, optimized for analytical queries rather than transactional work." },
            { icon: ArrowRightLeft, title: "ETL / ELT Pipelines", text: "Automated data integration from source systems into the warehouse. Where most data projects actually spend their time and budget." },
            { icon: TrendingUp, title: "Business Intelligence", text: "Power BI, Tableau, Looker dashboards. The visible layer where executives see the numbers that drive decisions." },
            { icon: Cpu, title: "Data Science", text: "Predictive models, statistical analysis, custom algorithms. Where data turns into forward-looking insights." }
          ]
        },
        { type: "h2", text: "The modern data stack" },
        { type: "p", text: "The architecture has converged on a common pattern over the past five years. Recognizing the pieces helps you diagnose where a customer is stuck." },
        {
          type: "phases",
          items: [
            { phase: "Sources", weeks: "Transactional systems", bullets: ["ERP, CRM, apps", "Databases, APIs", "Events and logs"] },
            { phase: "Ingestion", weeks: "ETL or ELT tool", bullets: ["Fivetran, Airbyte", "Custom pipelines", "Streaming for real-time"] },
            { phase: "Warehouse", weeks: "Central store", bullets: ["Snowflake, Redshift, BigQuery", "Structured and modeled"] },
            { phase: "Transformation", weeks: "Business-ready", bullets: ["dbt is standard", "Version-controlled SQL"] },
            { phase: "BI / Apps", weeks: "Consumption", bullets: ["Power BI, Tableau", "Embedded analytics", "Data science"] }
          ]
        },
        { type: "h2", text: "ETL vs ELT" },
        { type: "p", text: "The old model (ETL) extracted data, transformed it somewhere in the middle, then loaded it into the warehouse. The new model (ELT) loads raw data into the warehouse first, then transforms it there. The shift happened because modern warehouses are fast enough to do the transformations themselves, and keeping raw data means you can always re-transform later." },
        { type: "h2", text: "BI platform choice" },
        { type: "p", text: "Customers often arrive with a preference for a specific BI tool. That is fine, because they are all capable. The differences are mostly about ecosystem fit." },
        {
          type: "callouts",
          items: [
            { title: "Power BI", text: "Dominant in Microsoft-centric organizations. Tight M365 integration, per-user licensing. Strong for finance and operations reporting." },
            { title: "Tableau", text: "Strongest visualization capabilities and most flexible for analytical work. More expensive but preferred by data analyst teams." },
            { title: "Looker", text: "Developer-friendly semantic layer (LookML). Strong for engineering-led data teams. Owned by Google, closer to GCP ecosystem." }
          ]
        },
        { type: "h2", text: "Data science vs BI" },
        { type: "p", text: "BI answers 'what happened?' and 'what is happening now?' Data science answers 'what will happen?' and 'what should we do?' Most customers need BI first, because you cannot predict what you cannot measure. Data science comes once the data foundation is solid." },
        { type: "h2", text: "Common pitfalls" },
        {
          type: "list",
          items: [
            "Building the warehouse before fixing source data quality: garbage in, garbage out, scaled up",
            "Choosing a BI tool before the warehouse is ready: dashboards with no trustworthy data behind them",
            "Skipping data governance: six months in, nobody agrees what 'active customer' means",
            "Building for data engineers only, not business users: beautiful pipelines nobody consumes from"
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "We have Excel, why do we need a warehouse?", resp: "Excel works great until it does not. The moment multiple people need the same report, or the data does not fit on a laptop, or history needs to be preserved, Excel breaks. A warehouse is what you move to when Excel stops scaling." },
            { obj: "We already have a BI tool", resp: "Then the question is not whether to buy one, it is whether it is being used effectively. Many customers have BI tools that produce reports nobody trusts because the underlying data is unreliable. That is where we usually add value: fixing the data layer underneath an existing BI investment." },
            { obj: "Data projects always fail or overrun", resp: "Large all-at-once data projects often do. We deliver in small, business-visible increments. Each phase produces a specific dashboard or capability that a business user can actually use. That keeps momentum and adjusts priorities as reality hits." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Lead with a specific business question the customer cannot answer today. 'Why is the Eastern region underperforming?' beats 'do you need a data warehouse?' every time. Start small, deliver a working dashboard fast, expand from there." }
      ]
    },
    dictionary: [
      { term: "Data Warehouse", def: "A central store of business-ready data optimized for analytical queries. Different from a transactional database (OLTP) which optimizes for writes." },
      { term: "Data Lake", def: "A store of raw data in its original format, including unstructured data. Complementary to a warehouse; lakes are cheaper and more flexible but less query-ready." },
      { term: "ETL (Extract, Transform, Load)", def: "The classic data integration pattern: pull data from sources, transform it, load into the warehouse." },
      { term: "ELT (Extract, Load, Transform)", def: "The modern variant: load raw data first, transform inside the warehouse. Enables more flexibility and cheaper storage." },
      { term: "Snowflake", def: "The dominant cloud data warehouse. Separates storage and compute, pay-per-use, runs on all major clouds." },
      { term: "Redshift", def: "AWS's data warehouse. Mature and deeply integrated with other AWS services." },
      { term: "BigQuery", def: "Google Cloud's data warehouse. Serverless, scales automatically, strong for large analytical workloads." },
      { term: "Power BI", def: "Microsoft's BI tool. Dominant in Microsoft-centric organizations. Included in many M365 plans." },
      { term: "Tableau", def: "A BI and visualization tool known for flexibility. Popular among data analysts. Owned by Salesforce." },
      { term: "dbt (data build tool)", def: "The standard tool for transforming data inside the warehouse. Uses version-controlled SQL." },
      { term: "Data Science", def: "The practice of using statistics, algorithms, and ML to extract insight from data. Answers 'what will happen' and 'why'." },
      { term: "Predictive Model", def: "A model that forecasts future values based on historical data. Examples: demand forecasts, churn prediction, fraud scoring." },
      { term: "KPI (Key Performance Indicator)", def: "A measurable value that indicates how effectively a business is achieving objectives." },
      { term: "Dashboard", def: "A visual display of KPIs and metrics, usually refreshed automatically. The primary BI consumption surface." },
      { term: "Data Governance", def: "The policies, processes, and ownership around how data is managed. Includes definitions, quality, access, and lineage." },
      { term: "OLAP (Online Analytical Processing)", def: "Systems optimized for complex analytical queries. Warehouses are OLAP. Contrasts with OLTP (transactional)." },
    ],
    quiz: [
      {
        q: "Which is NOT named as one of our Data Warehouse options?",
        options: ["Snowflake", "Redshift", "BigQuery", "Microsoft Word"],
        correct: 3,
        why: "Snowflake, Redshift, and BigQuery are our three named data warehouses. Word is not a data platform."
      },
      {
        q: "Which BI tool is commonly used in Microsoft-centric organizations?",
        options: ["Tableau", "Power BI", "Looker", "Notepad"],
        correct: 1,
        why: "Power BI and Tableau are both common. Power BI is tightly integrated with Microsoft and included in many M365 plans."
      },
      {
        q: "What do ETL pipelines do?",
        options: [
          "Train AI models",
          "Automated data integration from source systems into the warehouse",
          "Design user interfaces",
          "Process payments"
        ],
        correct: 1,
        why: "ETL (Extract, Transform, Load) pipelines move data from source systems into the warehouse, automated and scheduled."
      },
      {
        q: "Which is NOT one of our four Data & Analytics capabilities?",
        options: [
          "Data Warehouses",
          "ETL Pipelines",
          "Business Intelligence",
          "Physical storage and backup tapes"
        ],
        correct: 3,
        why: "Our four are Data Warehouses, ETL, BI, and Data Science. Backup tapes fall under Infrastructure."
      },
      {
        q: "Which layer would a Data Science workflow produce?",
        options: [
          "Warehouse infrastructure",
          "Executive dashboards",
          "Predictive models and insights",
          "Data entry forms"
        ],
        correct: 2,
        why: "Data Science produces predictive models. BI produces dashboards; ETL produces pipelines; warehouses store the data."
      },
      {
        q: "Which layer produces executive dashboards?",
        options: [
          "Data Warehouse",
          "ETL Pipelines",
          "Business Intelligence",
          "Data Science"
        ],
        correct: 2,
        why: "BI tools (Power BI, Tableau) produce the dashboards executives consume from. It is the visible layer of the stack."
      },
      {
        q: "Which is a named cloud data warehouse in our practice?",
        options: ["Snowflake", "MySQL", "MongoDB", "Firebase"],
        correct: 0,
        why: "Snowflake, Redshift, and BigQuery are our three named cloud data warehouses."
      },
      {
        q: "What question should lead a Data and Analytics discovery?",
        options: [
          "Do you want a data warehouse?",
          "What is your cloud budget?",
          "What is a specific business question you cannot answer today?",
          "How big is your IT team?"
        ],
        correct: 2,
        why: "Lead with a business question. 'Why is the Eastern region underperforming' beats 'do you need a warehouse' every time."
      },
      {
        q: "Which BI tool is an alternative to Power BI?",
        options: ["Tableau", "Notepad", "Outlook", "Excel by itself"],
        correct: 0,
        why: "Power BI and Tableau are both common enterprise BI platforms we deliver dashboards on."
      },
      {
        q: "Where does ETL move data?",
        options: [
          "From warehouse to end users",
          "From source systems into the warehouse",
          "From Excel to paper",
          "From cloud to physical CDs"
        ],
        correct: 1,
        why: "ETL (Extract, Transform, Load) moves data from source systems into the warehouse, where it becomes analysis-ready."
      }
    ]
  },

  // ==========================================================================
  // 11 — APP MODERNIZATION
  // ==========================================================================
  {
    id: "app-modernization",
    number: "11",
    title: "Application Modernization",
    subtitle: "Legacy to modern",
    duration: "8 min read",
    icon: RefreshCw,
    reading: {
      lead: "Application Modernization is the conversation every enterprise has about their legacy systems eventually. The old applications work, but they cost too much to maintain, cannot integrate with modern tools, and will stop running on supported infrastructure soon. Your job is to help customers see a path that does not require betting the business on a rewrite.",
      blocks: [
        { type: "h2", text: "What we modernize" },
        { type: "p", text: "Four modernization patterns cover the majority of our engagements. Most projects combine several over their lifetime." },
        {
          type: "grid",
          cards: [
            { icon: Layers, title: "Legacy Applications", text: "Monolithic applications broken down into services. Usually starts with strangler pattern: wrap the monolith, peel off pieces, retire it gradually." },
            { icon: Database, title: "Database Migration", text: "Oracle to PostgreSQL. SQL Server to cloud-managed services. Legacy mainframe data to modern warehouses. Hard work but high payoff." },
            { icon: GitBranch, title: "API Development", text: "Modernizing integrations. Turn legacy interfaces into clean REST or GraphQL APIs that modern apps can actually consume." },
            { icon: Cloud, title: "Re-architecture", text: "Scalable, cloud-native designs. Microservices where they make sense, serverless for event-driven workloads, proper observability from day one." }
          ]
        },
        { type: "h2", text: "Monolith vs microservices" },
        { type: "p", text: "Customers often arrive wanting microservices because they have heard that word. Microservices are not always the right answer. The honest framing is that monoliths are fine for small-to-medium teams; microservices pay off when multiple teams need to ship independently and when specific services need different scaling characteristics." },
        {
          type: "callouts",
          items: [
            { title: "Monolith strengths", text: "Simpler to reason about, faster to iterate on in early stages, easier to deploy, lower operational overhead." },
            { title: "Microservices strengths", text: "Independent deployment per team, independent scaling, technology flexibility per service, fault isolation." },
            { title: "The middle ground", text: "Modular monolith: one deployment, but clean internal boundaries. Gives you the option to split later without the operational cost upfront." }
          ]
        },
        { type: "h2", text: "The strangler pattern" },
        { type: "p", text: "Most successful legacy modernizations use some version of the strangler pattern. You do not rewrite the whole system; you wrap it, peel off pieces one at a time, and let the old system shrink until it can be retired. The name comes from strangler fig trees that gradually replace their host." },
        { type: "p", text: "This matters commercially because it is risk-controlled. At every stage the old system still works. If priorities change, you can stop at any point and still have a working application. Contrast this with big-bang rewrites, which either succeed entirely or fail entirely." },
        { type: "h2", text: "Database modernization" },
        { type: "p", text: "Database migrations are notoriously risky. The data is usually critical, downtime is unacceptable, and the legacy schema encodes years of business logic nobody fully remembers." },
        {
          type: "list",
          items: [
            "Oracle to PostgreSQL is the most common request, driven by license costs",
            "SQL Server to Azure SQL or AWS RDS is typical when moving to cloud",
            "Mainframe data unlocked via modernization is often the highest-value data in the business",
            "Migrations are done in waves with synchronization in both directions during the transition"
          ]
        },
        { type: "h2", text: "Cloud-native patterns that matter" },
        { type: "p", text: "Modernizing to cloud does not mean using every cloud feature. These are the patterns that actually pay off." },
        {
          type: "grid",
          cards: [
            { icon: Cloud, title: "Managed services", text: "Do not run your own database or queue when AWS or Azure will run it better. Offloads operational burden." },
            { icon: Zap, title: "Serverless where appropriate", text: "For event-driven, bursty workloads. Pay only when code runs. Great fit for some problems, wrong for others." },
            { icon: GitBranch, title: "12-factor principles", text: "Config in environment, stateless processes, disposable instances. Lets apps run anywhere and scale horizontally." },
            { icon: TrendingUp, title: "Observability from day one", text: "Metrics, logs, traces as first-class concerns. Essential for diagnosing distributed systems." }
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "The legacy system works fine", resp: "It works today. What happens when the vendor ends support? What happens when you cannot hire people who know the tech? Modernization is often cheaper when planned than when forced by an external deadline." },
            { obj: "We tried a rewrite before and it failed", resp: "Big-bang rewrites fail more often than they succeed, for exactly that reason. Our approach is the strangler pattern: the old system keeps working while we peel off pieces. If priorities change, you stop anywhere and still have a functional app." },
            { obj: "We cannot afford downtime", resp: "Our migrations are designed for zero-downtime. Blue-green deployments, read replicas during database moves, feature flags to control cutover. Customers often do not notice anything happened." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Lead with risk management, not technology. Customers who have been burned by failed rewrites need to hear 'incremental' and 'reversible' more than 'microservices' and 'cloud-native.' Offer a modernization assessment that maps the current state, identifies quick wins, and sequences the full program." }
      ]
    },
    dictionary: [
      { term: "Monolith", def: "An application built and deployed as a single unit. Not automatically bad; often the right choice for small teams." },
      { term: "Microservices", def: "An architecture where the application is split into small, independently deployable services. Enables team autonomy but adds operational complexity." },
      { term: "API (Application Programming Interface)", def: "A defined way for software systems to communicate. Modernization usually means exposing legacy systems through clean APIs." },
      { term: "REST", def: "The dominant style for web APIs. Uses HTTP verbs (GET, POST, PUT, DELETE) on resource URLs." },
      { term: "GraphQL", def: "A newer API style where clients specify exactly what data they want. Good for complex UIs with varied data needs." },
      { term: "Cloud-native", def: "Applications designed to take advantage of cloud platforms: horizontal scaling, managed services, event-driven where appropriate." },
      { term: "Containerization", def: "Packaging applications with their dependencies into containers (usually Docker). Standard step in modernization." },
      { term: "Kubernetes", def: "The dominant container orchestrator. Runs containers at scale with automatic recovery and scaling." },
      { term: "Strangler Pattern", def: "A modernization approach where new functionality wraps and gradually replaces the legacy system. Low-risk and reversible." },
      { term: "Legacy System", def: "An older system that is important to operations but expensive to maintain and hard to change. Most enterprises have many." },
      { term: "Oracle / PostgreSQL / SQL Server", def: "Common enterprise databases. Migrations from Oracle (commercial) to PostgreSQL (open source) are usually driven by license costs." },
      { term: "Re-architecture", def: "Rebuilding an application with a new structure, usually to take advantage of cloud-native patterns." },
      { term: "Refactor", def: "Improving code structure without changing external behavior. A common step in modernization." },
      { term: "Replatform", def: "Moving an app to a new platform with minimal code changes. Example: lifting from on-prem Linux to cloud VMs." },
      { term: "12-factor App", def: "A methodology for building apps that run well in the cloud. Includes principles like config in environment, stateless processes, and disposable instances." },
    ],
    quiz: [
      {
        q: "Which is NOT one of our four Application Modernization areas?",
        options: [
          "Legacy Applications (monolith to microservices)",
          "Database Migration",
          "API Development",
          "Retail point-of-sale installation"
        ],
        correct: 3,
        why: "Our four areas are Legacy Apps, Database Migration, API Development, and Re-architecture. Retail POS hardware is not in the practice."
      },
      {
        q: "A common database migration pattern in our practice is:",
        options: [
          "Oracle to PostgreSQL",
          "Excel to paper",
          "MongoDB to Microsoft Word",
          "Redis to CSV"
        ],
        correct: 0,
        why: "Oracle to PostgreSQL is a common migration driven by license cost savings. SQL Server to cloud-managed services is another."
      },
      {
        q: "What's the main architectural pattern in Legacy Application modernization?",
        options: [
          "Monolith to microservices",
          "Microservices to monolith",
          "Keeping things exactly as they are",
          "Rewriting everything at once"
        ],
        correct: 0,
        why: "The common pattern is breaking monoliths into services, usually incrementally rather than big-bang rewrites."
      },
      {
        q: "Why do we modernize APIs?",
        options: [
          "APIs never get old",
          "To turn legacy interfaces into clean REST or GraphQL APIs that modern apps can consume",
          "Because they're required by law",
          "To make customer support easier"
        ],
        correct: 1,
        why: "Legacy integrations are often SOAP, flat files, or bespoke. Modern apps need clean REST or GraphQL APIs."
      },
      {
        q: "What describes the Re-architecture service?",
        options: [
          "Same code, new colors",
          "Scalable, cloud-native design",
          "Changing font sizes",
          "A marketing rebrand"
        ],
        correct: 1,
        why: "Re-architecture is redesigning the system for scale and cloud-native patterns. Microservices, managed services, proper observability."
      },
      {
        q: "What's the common commercial driver for Oracle to PostgreSQL migrations?",
        options: [
          "Oracle is being discontinued",
          "License cost savings",
          "Better security",
          "A regulatory mandate"
        ],
        correct: 1,
        why: "Oracle license costs are the main driver. PostgreSQL is open source and functionally comparable for most workloads."
      },
      {
        q: "Which API styles are typically produced in modern API Development?",
        options: [
          "SOAP only",
          "REST or GraphQL",
          "FTP file drops",
          "Paper forms"
        ],
        correct: 1,
        why: "REST dominates web APIs; GraphQL is growing. Legacy interfaces are often SOAP or flat files, which modernization replaces."
      },
      {
        q: "What's a common pitfall in legacy modernization that our approach avoids?",
        options: [
          "Big-bang rewrites that fail entirely when priorities change",
          "Using multiple version control systems",
          "Too many design reviews",
          "Over-testing"
        ],
        correct: 0,
        why: "Big-bang rewrites fail more often than they succeed. Our incremental approach lets customers pause or pivot at any phase."
      },
      {
        q: "Re-architecture usually leads toward what kind of design?",
        options: [
          "A single large monolithic application",
          "Scalable cloud-native design",
          "Mainframe consolidation",
          "Paper-based processes"
        ],
        correct: 1,
        why: "Re-architecture targets scalable cloud-native designs: microservices where they make sense, managed services, observability from day one."
      },
      {
        q: "What's the primary business reason to modernize a legacy application?",
        options: [
          "It looks outdated",
          "High maintenance cost, poor integration with modern tools, and vendor support ending",
          "Applications always need rewriting",
          "The admin enjoys the project"
        ],
        correct: 1,
        why: "Legacy systems are expensive to maintain, hard to integrate, and often face end-of-support deadlines. All real business drivers."
      }
    ]
  },

  // ==========================================================================
  // 12 — INFRASTRUCTURE
  // ==========================================================================
  {
    id: "infrastructure",
    number: "12",
    title: "Infrastructure Services",
    subtitle: "On-prem, hybrid, and cloud",
    duration: "7 min read",
    icon: Server,
    reading: {
      lead: "Infrastructure Services is the less glamorous side of enterprise IT, but it is the foundation everything else runs on. Customers call us when their existing infrastructure cannot keep up, when a hardware refresh is forcing a decision, or when they need specialized skills they cannot hire directly. Your job is to help them see that infrastructure is not just a cost center; it is the thing that determines whether every other initiative will succeed.",
      blocks: [
        { type: "h2", text: "What we manage" },
        {
          type: "grid",
          cards: [
            { icon: Server, title: "Server Management", text: "Windows, Linux, virtualization platforms like VMware and Hyper-V. Keep the compute layer running reliably." },
            { icon: Network, title: "Network Infrastructure", text: "Routers, switches, firewalls. The connective tissue between users, systems, and cloud." },
            { icon: Database, title: "Storage and Backup", text: "SAN, NAS, disaster recovery. Where data lives and how it comes back after a failure." },
            { icon: Cloud, title: "Hybrid Cloud", text: "Seamless on-prem and cloud integration. Most real enterprise infrastructure is hybrid today, not pure cloud." }
          ]
        },
        { type: "h2", text: "Server management in practice" },
        { type: "p", text: "Server management is not about installing an OS. It is about keeping compute reliable across patching cycles, capacity planning, security updates, and configuration drift. A well-managed server estate is invisible; a poorly managed one shows up in every outage retrospective." },
        {
          type: "list",
          items: [
            "Operating system patching on a scheduled cadence with testing first",
            "Virtualization management: VMware vSphere, Microsoft Hyper-V, or KVM on Linux",
            "Capacity monitoring to spot saturation before it causes incidents",
            "Configuration management so systems do not drift over time",
            "Automated provisioning for new environments"
          ]
        },
        { type: "h2", text: "Network infrastructure fundamentals" },
        { type: "p", text: "Network problems are some of the hardest to diagnose because they cross organizational boundaries. A solid network stack handles the boring parts invisibly so the exciting stuff (apps, users, data) just works." },
        {
          type: "callouts",
          items: [
            { title: "Routers and switches", text: "Move traffic between networks and between devices on the same network. Configuration mistakes here cause outages that affect everyone." },
            { title: "Firewalls", text: "Filter traffic based on rules. Modern firewalls inspect application-layer traffic, not just ports and IPs." },
            { title: "VPN and remote access", text: "Secure access for remote employees and offices. Mostly replaced by zero-trust models in modern networks but still widely deployed." }
          ]
        },
        { type: "h2", text: "Storage and backup" },
        { type: "p", text: "Storage decisions look technical but are actually business-critical. The difference between good and bad storage shows up when something goes wrong, at which point it is too late to change the design." },
        {
          type: "list",
          items: [
            "SAN (Storage Area Network): high-performance block storage, expensive, used for databases and virtualization",
            "NAS (Network Attached Storage): file-level storage, cheaper, used for shared drives and backups",
            "Cloud storage: object storage like S3, elastic and cheap but with different performance characteristics",
            "Backup: regular, tested, and separate from production. If you cannot restore it, you do not have a backup",
            "Disaster recovery: documented RTO and RPO targets, tested at least annually, automated where possible"
          ]
        },
        { type: "h2", text: "Hybrid cloud in real environments" },
        { type: "p", text: "Most enterprise infrastructure is hybrid, not pure cloud. Legacy systems often stay on-prem because of regulatory requirements, data gravity, or integration complexity. Our job is to make the on-prem and cloud sides work together cleanly, not to force everything into one or the other." },
        { type: "h2", text: "Discovery questions" },
        {
          type: "list",
          items: [
            "What's the age of your current hardware, and when is the next refresh cycle?",
            "How many data centers, and are any leased with an upcoming renewal date?",
            "What percentage of your workloads are on-prem versus cloud today?",
            "When you had your last infrastructure-related outage, what caused it?",
            "Who currently manages your network, storage, and backup? In-house or outsourced?"
          ]
        },
        { type: "h2", text: "Common objections" },
        {
          type: "objections",
          items: [
            { obj: "Our infrastructure is fine", resp: "It works until the next hardware refresh or outage. Infrastructure problems compound slowly, so the conversation is about when, not if. We can run a short assessment that benchmarks your current state and identifies the top risks." },
            { obj: "Everything is moving to cloud, so why invest on-prem?", resp: "Most customers end up hybrid for years, sometimes permanently. On-prem infrastructure still has to work, and the integration between on-prem and cloud is often the weakest link." }
          ]
        },
        { type: "key", title: "Key positioning", text: "Infrastructure is plumbing. Frame it as the foundation every other initiative depends on. Customers underinvest here until something breaks; our job is to help them see the risk before the break. Lead with an assessment that documents current state and identifies the top three risks." }
      ]
    },
    dictionary: [
      { term: "Server", def: "A computer that provides services or resources to other computers. Can be physical hardware or a virtual machine." },
      { term: "Virtualization", def: "Running multiple virtual servers on a single piece of physical hardware. Increases efficiency and flexibility." },
      { term: "VMware / Hyper-V", def: "The two dominant virtualization platforms. VMware is popular across industries; Hyper-V is common in Microsoft-centric environments." },
      { term: "Router", def: "A network device that forwards data between networks. Connects your office to the internet." },
      { term: "Switch", def: "A network device that connects devices within the same network, like computers in an office." },
      { term: "Firewall", def: "A network device that filters traffic based on security rules. Protects networks from unwanted access." },
      { term: "SAN (Storage Area Network)", def: "High-performance block storage for critical workloads like databases. Expensive but fast." },
      { term: "NAS (Network Attached Storage)", def: "File-level storage shared across a network. Cheaper than SAN; used for shared drives and backups." },
      { term: "Backup", def: "Copies of data kept separately from production so data can be restored after a failure. Regular, tested, and ideally automated." },
      { term: "DR (Disaster Recovery)", def: "Plans and systems for restoring operations after a major outage. Tested at least annually." },
      { term: "Hybrid Cloud", def: "A setup that uses both on-prem and cloud together. Most real enterprise infrastructure is hybrid today." },
      { term: "Data Center", def: "A physical facility where servers and networking equipment live. Often leased or cloud-replaced today." },
      { term: "LAN (Local Area Network)", def: "A network within a limited area, like an office or building." },
      { term: "WAN (Wide Area Network)", def: "A network that spans large geographic distances, connecting offices or data centers." },
      { term: "VPN (Virtual Private Network)", def: "A secure tunnel over a public network. Used for remote access and connecting sites." },
    ],
    quiz: [
      {
        q: "Which is NOT one of our four Infrastructure Services areas?",
        options: [
          "Server Management",
          "Network Infrastructure",
          "Storage and Backup",
          "Employee payroll processing"
        ],
        correct: 3,
        why: "Our four areas are Server, Network, Storage/Backup, and Hybrid Cloud. Payroll is not infrastructure."
      },
      {
        q: "Which OS families are supported in our Server Management service?",
        options: [
          "Only Windows",
          "Only Linux",
          "Windows, Linux, and virtualization platforms",
          "Only macOS"
        ],
        correct: 2,
        why: "Server Management covers Windows, Linux, and virtualization. The major enterprise platforms."
      },
      {
        q: "Which components fall under Network Infrastructure?",
        options: [
          "Routers, switches, firewalls",
          "Payroll systems",
          "Customer email templates",
          "Data warehouses"
        ],
        correct: 0,
        why: "Routers, switches, and firewalls are the connective tissue of enterprise networks."
      },
      {
        q: "What does Hybrid Cloud mean in our Infrastructure practice?",
        options: [
          "Using only one cloud provider",
          "Seamless integration of on-prem and cloud",
          "A cloud that only runs at night",
          "Public cloud only"
        ],
        correct: 1,
        why: "Hybrid means on-prem plus cloud, integrated. Most real enterprise infrastructure is hybrid, not pure cloud."
      },
      {
        q: "Which service includes SAN, NAS, and disaster recovery?",
        options: [
          "Server Management",
          "Network Infrastructure",
          "Storage and Backup",
          "Hybrid Cloud"
        ],
        correct: 2,
        why: "SAN (Storage Area Network), NAS (Network Attached Storage), and DR are all under Storage and Backup."
      },
      {
        q: "Which two storage technologies appear in our Storage and Backup service?",
        options: [
          "SAN and NAS",
          "DVD and CD",
          "FM and AM",
          "HR and PR"
        ],
        correct: 0,
        why: "SAN (Storage Area Network) and NAS (Network Attached Storage) are the two named storage technologies."
      },
      {
        q: "Why is Hybrid Cloud common in enterprise infrastructure?",
        options: [
          "Because pure cloud is illegal",
          "Most real enterprise setups have both on-prem and cloud integrated",
          "Because clouds do not work",
          "Because customers prefer complicated architectures"
        ],
        correct: 1,
        why: "Most enterprise infrastructure is hybrid. Legacy systems often remain on-prem while new workloads run in cloud, integrated together."
      },
      {
        q: "Which area would handle virtualization platforms like VMware or Hyper-V?",
        options: [
          "Network Infrastructure",
          "Storage and Backup",
          "Server Management",
          "Hybrid Cloud"
        ],
        correct: 2,
        why: "Server Management covers Windows, Linux, AND virtualization platforms like VMware and Hyper-V."
      },
      {
        q: "What is a firewall?",
        options: [
          "A type of server",
          "A network device that filters traffic between networks",
          "A storage device",
          "A database product"
        ],
        correct: 1,
        why: "Firewalls filter network traffic based on rules. They fall under Network Infrastructure in our service catalog."
      },
      {
        q: "How do we frame the value of Infrastructure Services?",
        options: [
          "The most glamorous service we sell",
          "The foundation every other initiative depends on",
          "Optional for most customers",
          "Only needed during outages"
        ],
        correct: 1,
        why: "Infrastructure is plumbing: not glamorous, but the foundation that every other initiative (cloud, apps, analytics) depends on."
      }
    ]
  },

  // ==========================================================================
  // 13 — MIGRATION SERVICES
  // ==========================================================================
  {
    id: "migration-services",
    number: "13",
    title: "Migration Services",
    subtitle: "O365, cloud, and infrastructure migrations",
    duration: "11 min read",
    icon: ArrowRightLeft,
    reading: {
      lead: "Migration Services is one of our most concrete, easy-to-sell service lines because the customer's pain is visible: aging infrastructure, expiring contracts, or acquisitions that need to be integrated. Your job is to qualify which migration pattern applies, and lead with our 4-phase methodology to differentiate from generic competitors who just quote a headcount and a timeline.",
      blocks: [
        { type: "h2", text: "Understanding Migration Opportunities" },
        {
          type: "grid",
          cards: [
            { icon: Mail, title: "Microsoft 365 / G-Suite", text: "Email, SharePoint, Teams, OneDrive. Productivity platform migrations and consolidations." },
            { icon: Cloud, title: "Cloud Infrastructure", text: "AWS, Azure, Google Cloud, Oracle. Workload migrations between or into the public cloud." },
            { icon: Server, title: "Data Center Consolidation", text: "On-prem to cloud or hybrid. Often driven by lease renewal or M&A." }
          ]
        },
        { type: "h2", text: "Why clients buy" },
        {
          type: "list",
          items: [
            "Cost Reduction: eliminate hardware refresh cycles and predictable monthly billing",
            "Business Continuity: better disaster recovery and geographic redundancy",
            "Scalability: pay-as-you-grow model, no capacity planning headaches",
            "Security: enterprise-grade protection without building it yourself",
            "Consolidation: one platform across an acquired organization or merged business units"
          ]
        },
        { type: "h2", text: "Red flags to listen for (trigger events)" },
        { type: "p", text: "Migration conversations rarely start with 'we want to migrate.' They start with these phrases. When you hear them, the opportunity is active." },
        {
          type: "callouts",
          items: [
            { title: "Our email server is 7+ years old", text: "Aging infrastructure driving a forced decision. Often a wedge into a broader M365 or hybrid conversation." },
            { title: "We are running out of storage", text: "Scalability wall. Migration unlocks elastic storage without refresh-cycle costs." },
            { title: "Our team cannot collaborate remotely", text: "M365 or G-Suite conversation opens here. Often combined with identity modernization." },
            { title: "Our DR plan is backing up to tape", text: "Dated DR practice. Modern backup is cloud-based and tested regularly." },
            { title: "We acquired a company (M&A)", text: "Post-M&A integration is one of the largest migration opportunities available. Fixed deadline, high stakes." },
            { title: "Our cloud cost is too expensive", text: "Cloud-to-cloud migration or cost optimization engagement is in play." }
          ]
        },
        { type: "h2", text: "SmarTek21 migration methodology: our 4-phase delivery model" },
        { type: "p", text: "This phased model is what differentiates us from generic competitors. Each phase has clear deliverables and exit criteria, so customers always know where they are in the program." },
        {
          type: "phases",
          items: [
            { phase: "Phase 1: Discovery", weeks: "Weeks 1 to 2", bullets: ["Environment audit", "Dependency mapping", "Risk identification"] },
            { phase: "Phase 2: Planning", weeks: "Weeks 3 to 4", bullets: ["Target architecture design", "Migration wave planning", "Cutover schedule"] },
            { phase: "Phase 3: Execution", weeks: "Weeks 5 to 8", bullets: ["Pilot migration with test users", "Migration in planned waves", "24/7 support during cutover"] },
            { phase: "Phase 4: Stabilization", weeks: "Weeks 9 to 12", bullets: ["Post-migration support", "User adoption training", "Performance optimization"] }
          ]
        },
        { type: "h2", text: "Risk management in migrations" },
        { type: "p", text: "The biggest migration risks are not technical; they are organizational. Users not knowing what changed, data in unexpected places, integrations nobody documented. Our discovery phase is designed specifically to surface these before execution begins." },
        {
          type: "list",
          items: [
            "Every migration has a documented rollback procedure before cutover",
            "Pilot with a small friendly group before moving broader user populations",
            "Communication plan covering what changes, when, and who to contact if something goes wrong",
            "Adoption training scheduled alongside the migration, not after",
            "Post-migration support window to catch issues users only discover days later"
          ]
        },
        { type: "h2", text: "Sales discovery framework" },
        { type: "p", text: "Every migration conversation follows the same three steps: discovery, positioning, next steps." },
        {
          type: "callouts",
          items: [
            { title: "Current state", text: "Walk me through your current setup. How old is your environment? What systems and how many users?" },
            { title: "Pain points", text: "What keeps you up at night? Any recent outages or data loss? What is driving the conversation now?" }
          ]
        },
        { type: "h2", text: "Positioning SmarTek21" },
        {
          type: "objections",
          items: [
            { obj: "Worried about downtime", resp: "Our phased approach means under 2 hours total downtime across the whole migration, and most is planned during off-hours." },
            { obj: "This sounds expensive", resp: "Cloud typically pays for itself in 18 to 24 months when you factor in hardware refresh avoidance and operational costs." },
            { obj: "Too small for a migration", resp: "Cloud scales down too. There is no size too small to benefit, and smaller migrations are often cleaner because there is less to map." },
            { obj: "Not in the budget", resp: "When is your next budget cycle? We can time the assessment so the proposal lands when decisions are being made." },
            { obj: "We will DIY", resp: "We have done 100+ migrations. Your team focuses on your business; we focus on moving you without downtime. That is the trade." }
          ]
        },
        { type: "key", title: "Next steps to offer", text: "Position a FREE migration assessment. Timeline: 1 to 2 weeks for the assessment. Proposal delivered in 5 business days after. This low-friction opener is how most of our larger migration engagements begin." }
      ]
    },
    dictionary: [
      { term: "Migration", def: "Moving systems, data, or applications from one environment to another. Common examples: email from Exchange to M365, workloads from on-prem to cloud." },
      { term: "M365 (Microsoft 365)", def: "Microsoft's productivity cloud: Outlook, Teams, SharePoint, OneDrive, Office apps. The dominant enterprise productivity suite." },
      { term: "G-Suite / Google Workspace", def: "Google's productivity cloud: Gmail, Drive, Docs, Meet. Microsoft's main competitor in this space." },
      { term: "SharePoint", def: "Microsoft's collaboration and document management platform. Often migrated alongside email." },
      { term: "Teams", def: "Microsoft's chat and meeting tool. Replaced Skype for Business in most enterprises." },
      { term: "OneDrive", def: "Microsoft's personal cloud file storage for M365 users." },
      { term: "Cutover", def: "The specific point in time when a migration goes live. Users are using the new system from this moment." },
      { term: "Wave Migration", def: "Moving users or workloads in planned groups (waves) rather than all at once. Reduces risk." },
      { term: "Pilot", def: "A small first migration to validate the approach before the full rollout. Typically a friendly group of users." },
      { term: "Data Center", def: "A physical facility where servers and networking equipment live. Many migrations eliminate on-prem data centers entirely." },
      { term: "Lift and Shift", def: "Moving workloads to cloud with minimal changes. The fastest migration path." },
      { term: "DR (Disaster Recovery)", def: "Backup and recovery systems. Often improved as part of a cloud migration." },
      { term: "M&A (Mergers and Acquisitions)", def: "When companies combine or one buys another. Post-M&A IT integration is a major migration driver." },
      { term: "TCO (Total Cost of Ownership)", def: "All costs over a system's life. Migration business cases compare current TCO vs projected future TCO." },
    ],
    quiz: [
      {
        q: "What is the correct sequence of our 4-phase migration methodology?",
        options: [
          "Planning, Discovery, Execution, Stabilization",
          "Discovery, Planning, Execution, Stabilization",
          "Execution, Discovery, Planning, Stabilization",
          "Stabilization, Discovery, Planning, Execution"
        ],
        correct: 1,
        why: "Discovery first (audit and dependencies), then Planning (architecture and waves), then Execution (pilot and migrate), then Stabilization."
      },
      {
        q: "A customer says 'our email server is 7+ years old.' What is this?",
        options: [
          "A compliment",
          "A red-flag trigger event signaling a migration opportunity",
          "Irrelevant to sales",
          "A reason to walk away"
        ],
        correct: 1,
        why: "Aging email infrastructure is one of our listed red flags. It forces a decision and opens a migration conversation."
      },
      {
        q: "A customer worries about downtime during a migration. What's the best response?",
        options: [
          "Migrations always have hours of downtime",
          "Our phased approach means under 2 hours total downtime",
          "You will lose all your data",
          "Wait a year before migrating"
        ],
        correct: 1,
        why: "Our phased approach with pilots and waves typically keeps downtime under 2 hours. This is a concrete, reassuring answer."
      },
      {
        q: "Which is NOT listed as a category we migrate?",
        options: [
          "Microsoft 365 / G-Suite",
          "Cloud Infrastructure (AWS, Azure, Google Cloud, Oracle)",
          "Data Center Consolidation",
          "Point-of-sale hardware replacement"
        ],
        correct: 3,
        why: "We migrate M365/G-Suite, cloud infrastructure, and do data center consolidation. Retail POS hardware is not on the list."
      },
      {
        q: "What does our FREE migration assessment typically produce, and on what timeline?",
        options: [
          "A signed contract in one week",
          "An assessment in 1 to 2 weeks, with a proposal delivered 5 business days after",
          "A 12-month roadmap before any action",
          "Nothing until full payment is made"
        ],
        correct: 1,
        why: "Assessment in 1 to 2 weeks, proposal delivered in 5 business days. The low-friction opener that becomes most of our bigger engagements."
      },
      {
        q: "How long does Phase 3 (Execution) typically take in our 4-phase methodology?",
        options: ["1 week", "Weeks 5 to 8", "1 day", "1 year"],
        correct: 1,
        why: "Phase 3 Execution runs weeks 5-8: pilot migration, migration in waves, and 24/7 support during cutover."
      },
      {
        q: "Which trigger phrase most strongly signals an M&A migration opportunity?",
        options: [
          "Our data center lease is up",
          "We acquired a company",
          "We need faster email",
          "Our team prefers Mac"
        ],
        correct: 1,
        why: "Post-M&A integration is a large migration opportunity. Two environments must be consolidated, usually on a deadline."
      },
      {
        q: "What does Phase 1 (Discovery) include?",
        options: [
          "Environment audit, dependency mapping, risk identification",
          "User training and adoption",
          "Performance optimization",
          "Cutover schedule sign-off"
        ],
        correct: 0,
        why: "Phase 1 Discovery (weeks 1-2) covers environment audit, dependency mapping, and risk identification. Sets up the rest of the plan."
      },
      {
        q: "A customer says 'we'll do it ourselves.' What's the best response?",
        options: [
          "Good luck",
          "We have done 100+ migrations - your team focuses on your business, we focus on migration",
          "Walk away from the deal",
          "Offer a steep discount immediately"
        ],
        correct: 1,
        why: "Don't attack the customer's team. Reframe on pattern recognition (100+ migrations) and opportunity cost."
      },
      {
        q: "Which migration category includes Teams, SharePoint, and OneDrive?",
        options: [
          "Microsoft 365 / G-Suite",
          "Cloud Infrastructure",
          "Data Center Consolidation",
          "Legacy Applications"
        ],
        correct: 0,
        why: "Teams, SharePoint, OneDrive, and email are all M365 productivity platform migrations."
      }
    ]
  }
];
