export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Insight = {
  slug: string;
  title: string;
  category: "AI & Technology" | "Engineering" | "Perspective";
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  body: InsightBlock[];
};

// Original editorial content by the Coordinatez team — no fabricated case studies,
// clients, or statistics. Keep new posts to the same standard.
export const insights: Insight[] = [
  {
    slug: "ai-agents-in-back-office-operations",
    title: "Where AI Agents Actually Pay Off in Back-Office Operations",
    category: "AI & Technology",
    excerpt:
      "Most agent demos automate a task. The real return comes from automating a process — with checkpoints where judgment matters.",
    date: "2026-06-18",
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "The demos are everywhere: an AI agent books a meeting, drafts an email, renames some files. Impressive for thirty seconds, and largely irrelevant to how a business actually loses time. The hours don't disappear one task at a time — they disappear in processes: multi-step, multi-system sequences that someone has to shepherd from start to finish.",
      },
      {
        type: "p",
        text: "Consider what happens after a purchase order arrives. Someone checks it against the quote, keys it into the ERP, confirms stock or lead time, emails the customer, chases the supplier, and updates a spreadsheet nobody admits still exists. No single step is hard. The cost is the sequence — and the fact that a person has to carry state between systems that don't talk to each other.",
      },
      { type: "h2", text: "Processes, not tasks" },
      {
        type: "p",
        text: "That is the shape of work agents are actually good at: read a document, cross-check systems, take the routine action, and escalate the exception. The agent carries the state; people supply the judgment. In our experience, three design decisions separate agents that survive contact with production from those that don't.",
      },
      {
        type: "ul",
        items: [
          "Explicit tools and permissions — the agent can only touch what the process needs, and every action is logged.",
          "Human checkpoints where stakes are real — approvals sit before irreversible steps, not after failures.",
          "Honest failure paths — when the agent isn't confident, the work routes to a person with full context attached, not a cryptic error.",
        ],
      },
      { type: "h2", text: "Where to start" },
      {
        type: "p",
        text: "Pick a process that is frequent, rule-heavy, and annoying — order status chasing, document intake, reconciliations. Measure the hours it consumes today. Automate the 80% that is routine, keep people on the 20% that isn't, and expand from there. That sequencing sounds obvious; it's also the difference between an AI line-item that survives budget review and one that doesn't.",
      },
    ],
  },
  {
    slug: "custom-software-vs-saas",
    title: "Custom Software or Another SaaS Subscription? A Practical Test",
    category: "Engineering",
    excerpt:
      "A simple rule: buy software for problems you share with everyone, build it for the workflow that makes you different.",
    date: "2026-04-22",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "Every growing company hits the moment: the spreadsheet has become load-bearing, the team is juggling five tools, and someone asks whether it's time to 'build our own system.' The honest answer is usually: partly.",
      },
      { type: "h2", text: "Buy the commodity, build the differentiator" },
      {
        type: "p",
        text: "Accounting, email, payroll, document storage — these problems are identical across millions of companies, and SaaS vendors solve them better than any custom build will. The calculus flips for the workflow that is your business: how you quote, how you schedule, how you track material through your yard, how your pricing actually works. Forcing that into a generic tool means permanent workarounds — and workarounds compound.",
      },
      { type: "h2", text: "The test" },
      {
        type: "ul",
        items: [
          "Do we keep maintaining spreadsheets alongside the tool? The tool doesn't fit.",
          "Are we paying for 40 seats because the pricing page said so, using 12?",
          "Have we changed our process to match software, and lost something in the change?",
          "Is our data split across tools that require manual reconciliation?",
        ],
      },
      {
        type: "p",
        text: "Two or more yes answers and a custom core system — integrated with the SaaS you keep — usually pays for itself. Modern development practices, and honestly AI-assisted engineering, have cut the cost of a well-scoped internal system dramatically. The mistake isn't building; it's building everything, or building without ruthless scoping.",
      },
    ],
  },
  {
    slug: "why-technology-and-trade-belong-together",
    title: "Why We Run Technology and Trade Under One Roof",
    category: "Perspective",
    excerpt:
      "Software and shipping containers look unrelated — until you notice both businesses are really about moving information reliably across borders.",
    date: "2026-03-19",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "People ask why a company builds AI systems on Monday and moves containers of industrial material on Tuesday. Fair question. The answer is that both businesses run on the same underlying discipline: getting accurate information — specifications, statuses, documents, commitments — across borders, time zones, and organizations without it degrading along the way.",
      },
      {
        type: "p",
        text: "International trade is an information business wearing a logistics costume. What ruins a transaction is rarely the ocean freight; it's a specification that meant different things in two countries, a document that arrived late, a status nobody communicated. These are precisely the failure modes good software eliminates.",
      },
      { type: "h2", text: "Each side makes the other better" },
      {
        type: "p",
        text: "Our trading operation runs on tooling our technology division builds — document pipelines, status tracking, counterparty records. And our technology division prices, scopes, and ships client work with the operational seriousness that physical trade demands, where a mistake isn't a bug ticket but a container sitting at a port. The technology business keeps trade transparent; the trade business keeps technology honest.",
      },
      {
        type: "p",
        text: "Coordinatez is built around that overlap — connecting technology, intelligence, and global commerce. Not as a slogan, but as one operating system for two businesses.",
      },
    ],
  },
  {
    slug: "getting-your-data-ready-for-ai",
    title: "Before the AI Project: Five Data Questions Worth Answering",
    category: "AI & Technology",
    excerpt:
      "Most 'AI readiness' problems are ordinary data problems wearing a new name. Five questions reveal how much groundwork you need.",
    date: "2026-02-25",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "The fastest way to waste an AI budget is to point a model at data nobody trusts. Before any AI engagement, we walk clients through five questions. None of them mention AI — that's the point.",
      },
      {
        type: "ul",
        items: [
          "Where does this data live, and who can actually access it? If the answer includes 'Rakesh's laptop,' start there.",
          "Do two systems disagree about the same fact? Pick the system of record before automating on top of either.",
          "Is history retained, or overwritten? Models and analytics both need the trail, not just the current state.",
          "What's the real quality level? Sample 50 records by hand; the error rate you find is the error rate AI will learn.",
          "What are we allowed to do with it? Customer data, supplier terms, and regulated records carry obligations that don't disappear because a model is involved.",
        ],
      },
      { type: "h2", text: "The good news" },
      {
        type: "p",
        text: "Fixing these is unglamorous but fast — weeks, not years, for most SMEs. And the payoff is double: the AI initiative lands on solid ground, and ordinary reporting gets better immediately. Data groundwork is the rare project that pays off even if you never ship the model.",
      },
    ],
  },
  {
    slug: "ai-agents-for-business-explained",
    title: "What AI Agents Actually Do for a Business (and What They Don't)",
    category: "AI & Technology",
    excerpt:
      "An agent is not a smarter chatbot. It's software that carries out a multi-step process across systems — which is exactly where the value and the risks both live.",
    date: "2026-07-20",
    readMinutes: 7,
    body: [
      {
        type: "p",
        text: "'AI agent' has become one of those terms that means everything and therefore nothing. Vendors attach it to chatbots, to single clever prompts, and to genuinely autonomous software, and a decision-maker trying to budget for any of it is left guessing what they're actually buying. The distinction is worth getting right, because the three things behave differently, cost differently, and fail differently.",
      },
      { type: "h2", text: "Prompt, chatbot, agent" },
      {
        type: "p",
        text: "A single prompt is one question and one answer: draft this email, summarise this document. Useful, but you drive every step. A chatbot wraps that in conversation and memory, so it can hold a thread and answer follow-ups — still fundamentally you asking and it responding. An agent is different in kind: you give it a goal, and it plans and executes a sequence of steps toward that goal, using tools — reading a system, taking an action, checking a result, deciding what to do next. The shift is from something that answers to something that does.",
      },
      { type: "h2", text: "Where agents genuinely pay off" },
      {
        type: "p",
        text: "The return doesn't come from automating a single task; it comes from automating a process — a multi-step, multi-system sequence that today requires a person to carry state between tools that don't talk to each other. Think of an order arriving that has to be checked against a quote, entered into an ERP, confirmed for stock, acknowledged to the customer, and chased with a supplier. No individual step is hard; the cost is the sequence and the context-switching. That is the shape of work agents are actually good at: read the input, cross-check the systems, take the routine action, and escalate the exception.",
      },
      {
        type: "p",
        text: "Which means agents pay off when a process is frequent, rule-heavy, spans several systems, and consumes real hours in exactly that plumbing. They pay off far less on tasks that are rare, that hinge on genuine human judgement, or that a simple integration or script would handle more cheaply and predictably.",
      },
      { type: "h2", text: "The guardrails that actually matter" },
      {
        type: "p",
        text: "Because an agent takes actions rather than just producing text, the engineering that keeps it safe is not optional — it is the product. Three guardrails separate agents that survive in production from demos that don't:",
      },
      {
        type: "ul",
        items: [
          "Explicit permissions and tools — the agent can only touch the specific systems and actions the process requires, nothing broader, and its access is scoped and revocable.",
          "Human checkpoints before irreversible steps — approvals sit in front of actions that spend money, send external messages, or can't be undone, not after something has already gone wrong.",
          "Audit trails — every action the agent takes is logged with enough context to reconstruct what happened and why, which is what makes the system reviewable and trustworthy.",
        ],
      },
      { type: "h2", text: "Realistic expectations" },
      {
        type: "p",
        text: "A well-built agent does not eliminate the people in a process; it automates the routine 80% and routes the ambiguous 20% to a person with full context attached. It will occasionally be wrong, which is why the checkpoints and audit trails exist. It needs maintenance as the systems it touches change. And it delivers the most value when it is aimed at a specific, measured process rather than deployed as a vague 'AI assistant' and left to find its own purpose. The businesses that get real return start narrow, measure the hours saved, keep a person on the exceptions, and expand from a base that already works.",
      },
    ],
  },
];
