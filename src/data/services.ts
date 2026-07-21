export type Service = {
  id: string;
  title: string;
  category: "Build" | "Intelligence" | "Scale" | "Grow";
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  benefits: string[];
  useCases: string[];
};

export const serviceCategories = [
  { id: "Build", label: "Build", note: "Product & platform engineering" },
  { id: "Intelligence", label: "Intelligence", note: "AI, data & machine learning" },
  { id: "Scale", label: "Scale", note: "Cloud, APIs & automation" },
  { id: "Grow", label: "Grow", note: "Marketing & search visibility" },
] as const;

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    category: "Build",
    description:
      "Fast, secure, search-friendly websites and web applications — from corporate sites and e-commerce to complex customer portals.",
    problem:
      "A slow, dated, or hard-to-maintain website costs credibility and conversions, and every workaround adds technical debt.",
    solution:
      "We build modern, component-driven web platforms with performance, accessibility, and SEO engineered in from the first commit — not patched on later.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    benefits: [
      "Sub-second page loads and strong Core Web Vitals",
      "Content teams can update without developers",
      "Built-in technical SEO and analytics",
      "Scales from brochure site to full web application",
    ],
    useCases: [
      "Corporate and marketing websites",
      "E-commerce storefronts",
      "Customer and partner portals",
      "Booking and quotation platforms",
    ],
  },
  {
    id: "mobile-applications",
    title: "Mobile Applications",
    category: "Build",
    description:
      "Native-quality iOS and Android apps from a single codebase — designed for real usage patterns, offline conditions, and app-store approval.",
    problem:
      "Maintaining two separate native apps doubles cost and slows every release, while a poor mobile experience quietly loses customers.",
    solution:
      "Cross-platform development with shared business logic and platform-true UI, backed by a release pipeline that keeps updates frequent and safe.",
    technologies: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "GraphQL"],
    benefits: [
      "One codebase, both app stores",
      "Faster release cycles at lower cost",
      "Offline-first data handling where it matters",
      "Analytics and crash reporting wired in from day one",
    ],
    useCases: [
      "Customer-facing service apps",
      "Field-team and workforce tools",
      "Order tracking and delivery apps",
      "Internal operations dashboards",
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software",
    category: "Build",
    description:
      "Purpose-built systems for the workflows off-the-shelf software can't handle — ERPs, CRMs, quoting engines, and operational platforms.",
    problem:
      "Businesses outgrow spreadsheets and generic SaaS: processes get forced into tools that don't fit, and critical data ends up scattered.",
    solution:
      "We map your actual operations first, then build software around them — a single source of truth with the workflows, permissions, and reports your team really uses.",
    technologies: ["TypeScript", "Node.js", "Python", "PostgreSQL", "Redis", "Docker"],
    benefits: [
      "Software that matches your process, not the reverse",
      "One system of record instead of scattered tools",
      "Owned code — no per-seat license lock-in",
      "Extensible as the business evolves",
    ],
    useCases: [
      "Inventory and order management",
      "Custom CRMs and quoting tools",
      "Trade & logistics operations systems",
      "Compliance and reporting platforms",
    ],
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    category: "Intelligence",
    description:
      "Practical integration of large language models and AI services into the products and internal tools you already run.",
    problem:
      "Teams know AI could remove hours of manual work, but stitching models into real systems — securely, reliably, at sane cost — is where projects stall.",
    solution:
      "We identify the highest-leverage workflows, then integrate the right models with proper guardrails: evaluation, fallback behavior, cost controls, and monitoring.",
    technologies: ["Anthropic Claude", "OpenAI", "LangChain", "Vector databases", "Python", "TypeScript"],
    benefits: [
      "Hours of manual processing reduced to seconds",
      "AI features shipped inside existing tools",
      "Guardrails, evals, and cost monitoring included",
      "Vendor-flexible architecture — no model lock-in",
    ],
    useCases: [
      "Document extraction and summarization",
      "Email and ticket triage",
      "AI-assisted search over company knowledge",
      "Content and proposal drafting",
    ],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    category: "Intelligence",
    description:
      "Autonomous and semi-autonomous agents that execute multi-step business workflows — researching, deciding, and acting under defined guardrails.",
    problem:
      "Single-prompt AI helps with tasks; it doesn't complete processes. Work that spans systems, steps, and decisions still lands on people.",
    solution:
      "We design agent workflows with clear tools, permissions, and human-approval checkpoints — so agents handle the process and people handle the exceptions.",
    technologies: ["Claude Agent SDK", "MCP", "LangGraph", "Function calling", "Workflow orchestration"],
    benefits: [
      "End-to-end processes handled, not just single tasks",
      "Human-in-the-loop checkpoints where stakes are high",
      "Full audit trail of every agent action",
      "Scales without linear headcount growth",
    ],
    useCases: [
      "Order processing and status chasing",
      "Supplier/lead research and qualification",
      "Report assembly from multiple systems",
      "Back-office data reconciliation",
    ],
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    category: "Intelligence",
    description:
      "Customer-facing and internal assistants grounded in your real content — answering accurately, escalating gracefully, and available 24/7.",
    problem:
      "Support queues fill with repetitive questions, response times stretch, and legacy rule-based bots frustrate more than they help.",
    solution:
      "Retrieval-grounded assistants trained on your documentation and policies, with honest 'I don't know' behavior and clean hand-off to humans.",
    technologies: ["RAG pipelines", "Anthropic Claude", "Vector search", "WhatsApp/Web/Slack channels"],
    benefits: [
      "Instant answers around the clock",
      "Grounded responses — no invented policies",
      "Deflects repetitive tickets, escalates real issues",
      "Every conversation logged and analyzable",
    ],
    useCases: [
      "Customer support on web and WhatsApp",
      "Internal HR and IT helpdesk",
      "Product selection and pre-sales guidance",
      "Order status and FAQ automation",
    ],
  },
  {
    id: "business-automation",
    title: "Business Automation",
    category: "Scale",
    description:
      "Connecting the systems you already use and removing the copy-paste work between them — reliably, with error handling and visibility.",
    problem:
      "Growth multiplies manual handoffs: re-keyed orders, emailed spreadsheets, swivel-chair work between tools — each one slow and error-prone.",
    solution:
      "We map the process, then automate it end-to-end with proper queues, retries, and alerting — so automations keep working when an API hiccups.",
    technologies: ["n8n", "Make", "Zapier", "Custom Node.js services", "Webhooks", "Message queues"],
    benefits: [
      "Hours of repetitive work eliminated weekly",
      "Fewer data-entry errors between systems",
      "Processes documented as living workflows",
      "Failures alert someone instead of silently dropping",
    ],
    useCases: [
      "Quote-to-invoice pipelines",
      "CRM ↔ accounting ↔ inventory sync",
      "Document generation and filing",
      "Onboarding and approval workflows",
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    category: "Intelligence",
    description:
      "Turning scattered operational data into dashboards and reports leadership actually uses to decide.",
    problem:
      "The numbers exist — across ERPs, spreadsheets, and SaaS exports — but assembling a trustworthy monthly picture takes days and still gets questioned.",
    solution:
      "We consolidate sources into a governed data model with automated refresh, then build dashboards around the decisions each team makes.",
    technologies: ["Python", "SQL", "dbt", "BigQuery/PostgreSQL", "Power BI", "Metabase"],
    benefits: [
      "One agreed version of the numbers",
      "Reports refresh themselves",
      "Drill-down from KPI to transaction",
      "Foundation ready for ML when you are",
    ],
    useCases: [
      "Sales and margin dashboards",
      "Trade and logistics KPI tracking",
      "Inventory and demand reporting",
      "Finance close automation",
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    category: "Intelligence",
    description:
      "Predictive models for forecasting, classification, and anomaly detection — built pragmatically and only where they beat simpler methods.",
    problem:
      "Pricing, demand, churn, and risk decisions rely on gut feel because historical data sits unused — or past ML pilots never left the notebook.",
    solution:
      "We start with the decision, validate against honest baselines, and deploy models with monitoring and retraining — production systems, not experiments.",
    technologies: ["Python", "scikit-learn", "PyTorch", "MLflow", "Vertex AI / SageMaker"],
    benefits: [
      "Forecasts grounded in your own history",
      "Models monitored for drift after launch",
      "Clear accuracy reporting vs. baseline",
      "No ML for ML's sake — we'll say when it's overkill",
    ],
    useCases: [
      "Demand and price forecasting",
      "Lead and credit scoring",
      "Anomaly detection in transactions",
      "Quality prediction in operations",
    ],
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    category: "Scale",
    description:
      "Cloud architecture, migration, and DevOps — infrastructure that scales with demand and doesn't page you at 3 a.m.",
    problem:
      "Aging servers, fragile deployments, and surprise cloud bills — infrastructure decisions made years ago now slow every release.",
    solution:
      "Right-sized cloud architecture with infrastructure-as-code, CI/CD, monitoring, and cost governance — boring, reliable, and documented.",
    technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
    benefits: [
      "Deployments become routine, not events",
      "Costs visible and controlled per workload",
      "Security and backups by default",
      "Scales up for peaks, down for quiet weeks",
    ],
    useCases: [
      "Legacy-to-cloud migration",
      "CI/CD pipeline setup",
      "High-availability hosting",
      "Disaster-recovery design",
    ],
  },
  {
    id: "api-development",
    title: "API Development",
    category: "Scale",
    description:
      "Well-documented REST and GraphQL APIs that let your systems, partners, and products talk to each other safely.",
    problem:
      "Data locked in one system can't power the next product, partner integration, or mobile app — and ad-hoc integrations keep breaking.",
    solution:
      "We design versioned, authenticated, rate-limited APIs with real documentation — the stable contract everything else builds on.",
    technologies: ["Node.js", "REST", "GraphQL", "OpenAPI", "OAuth 2.0", "API gateways"],
    benefits: [
      "One integration surface instead of point-to-point glue",
      "Partners onboard from docs, not meetings",
      "Auth, quotas, and audit logging built in",
      "Versioning prevents breaking downstream apps",
    ],
    useCases: [
      "Partner and supplier integrations",
      "Mobile/web backend APIs",
      "Internal service architecture",
      "Public developer APIs",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    category: "Grow",
    description:
      "Measurable acquisition across search, social, and email — strategy, campaigns, and analytics tied to revenue, not vanity metrics.",
    problem:
      "Ad spend disperses across channels with no clear picture of what actually produces customers — so budgets get set by habit.",
    solution:
      "Full-funnel tracking first, then campaigns optimized against cost-per-acquisition — with reporting that shows exactly what each channel returns.",
    technologies: ["Google Ads", "Meta Ads", "LinkedIn Ads", "GA4", "Tag Manager", "Email automation"],
    benefits: [
      "Every campaign measured to lead or sale",
      "Budget shifts to what demonstrably works",
      "Landing pages and creative tested, not guessed",
      "Monthly reporting in business terms",
    ],
    useCases: [
      "B2B lead generation",
      "E-commerce sales campaigns",
      "Product and service launches",
      "Remarketing programs",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    category: "Grow",
    description:
      "Technical and content SEO that compounds — earning the searches your customers already make, month after month.",
    problem:
      "Competitors own the first page for the exact services you sell, while paid ads are the only thing keeping the pipeline alive.",
    solution:
      "Technical foundation, intent-mapped content, and authority building — executed consistently and reported against rankings, traffic, and leads.",
    technologies: ["Technical audits", "Schema markup", "Core Web Vitals", "Content strategy", "Search Console"],
    benefits: [
      "Traffic that compounds instead of stopping with spend",
      "Rankings for buying-intent queries",
      "Site health issues found before Google penalizes",
      "Transparent monthly movement reports",
    ],
    useCases: [
      "Local and national service SEO",
      "E-commerce category rankings",
      "Site-migration SEO protection",
      "International/multilingual SEO",
    ],
  },
];
