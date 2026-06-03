const services = [
  {
    slug: "ai-data-solution",
    icon: "AD",
    title: "AI & Data Solution",
    summary: "Turn scattered business data into dashboards, workflows, and AI-ready knowledge.",
    description: "Coordinatez helps local businesses collect, clean, organize, and use their operational data. We can create dashboards, reporting pipelines, document knowledge bases, RAG-ready content libraries, and decision support tools that make business data easier to trust.",
    fit: "Businesses that have useful data in spreadsheets, POS exports, documents, CRMs, or web tools and want better reporting, automation, or AI search.",
    deliverables: [
      "Data discovery and source mapping",
      "Clean reporting datasets and dashboards",
      "AI-ready knowledge base structure",
      "Data quality checks and maintenance plan"
    ]
  },
  {
    slug: "ai-integration-annotation",
    icon: "IA",
    title: "AI Integration & Annotation",
    summary: "Connect AI into workflows and prepare labeled data for model improvement.",
    description: "We support AI integration projects that need both software delivery and high-quality human review. Coordinatez can help define labels, prepare annotation guidelines, manage datasets, and connect approved AI outputs into your daily operations.",
    fit: "Teams that need document classification, image or text labeling, quality review, model evaluation, or AI workflow pilots.",
    deliverables: [
      "Annotation taxonomy and review guidelines",
      "Dataset preparation and quality checks",
      "AI workflow integration plan",
      "Human-in-the-loop review process"
    ]
  },
  {
    slug: "web-app-development",
    icon: "WA",
    title: "Web & App Development",
    summary: "Launch responsive websites, customer portals, internal tools, and mobile-ready apps.",
    description: "Coordinatez builds websites, web apps, and app experiences for businesses that need modern customer touchpoints or better internal tools. We focus on fast interfaces, usable admin workflows, secure forms, and integrations with existing systems.",
    fit: "Businesses that need a new website, booking flow, customer portal, inventory tool, staff dashboard, or mobile-friendly business app.",
    deliverables: [
      "Responsive UI and user flows",
      "Frontend and backend implementation",
      "Forms, dashboards, and integrations",
      "Launch support and documentation"
    ]
  },
  {
    slug: "ai-integration",
    icon: "AI",
    title: "AI Integration",
    summary: "Add AI assistance, search, automation, and content intelligence to existing systems.",
    description: "We design AI integrations around clear business cases: document search, workflow automation, lead triage, staff assistants, summarization, and structured data extraction. We build with guardrails so the system knows when to answer and when to escalate.",
    fit: "Companies that already have systems in place and want to add AI without replacing everything.",
    deliverables: [
      "AI use-case discovery and risk review",
      "RAG or automation architecture",
      "Integration with business tools",
      "Escalation, logging, and support workflow"
    ]
  },
  {
    slug: "ai-chatbots",
    icon: "CB",
    title: "AI Chatbots",
    summary: "Create helpful assistants for customers, staff, sales, service, and support.",
    description: "Coordinatez builds chatbots that can answer common questions, collect lead details, recommend services, and escalate unknown issues. Retrieval-based knowledge keeps answers grounded in company information while ticket creation protects customers when the assistant is unsure.",
    fit: "Businesses that want 24/7 inquiry capture, faster customer support, lead qualification, or staff knowledge search.",
    deliverables: [
      "Chatbot conversation design",
      "Company knowledge base setup",
      "Inquiry and ticket escalation",
      "Testing, training, and analytics"
    ]
  },
  {
    slug: "pos-consulting",
    icon: "POS",
    title: "POS Consulting",
    summary: "Improve point-of-sale setup, reporting, integrations, and operational reliability.",
    description: "We help local businesses evaluate, configure, and improve POS workflows. Coordinatez can support menu or catalog setup, reporting exports, hardware planning, payment workflow review, inventory connections, and staff adoption.",
    fit: "Restaurants, retailers, service businesses, and local operators that depend on POS systems for daily revenue and reporting.",
    deliverables: [
      "POS workflow assessment",
      "System configuration recommendations",
      "Reporting and export improvements",
      "Staff handoff and support checklist"
    ]
  },
  {
    slug: "maintenance-support",
    icon: "MS",
    title: "Maintenance & Support",
    summary: "Keep websites, apps, AI tools, forms, and business systems healthy after launch.",
    description: "Technology needs care after it goes live. Coordinatez provides maintenance, issue triage, updates, monitoring, content changes, small improvements, and support planning for business-critical digital systems.",
    fit: "Businesses that need dependable technical support without hiring a full in-house engineering team.",
    deliverables: [
      "Website and app maintenance",
      "Bug fixes and small enhancements",
      "Monitoring and issue triage",
      "Monthly support plan and reporting"
    ]
  }
];

const formspreeEndpoint = "https://formspree.io/f/xaqkqeqn";

function setupPreloader() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.body.classList.add("preloader-active");
  const preloader = document.createElement("div");
  preloader.className = "site-preloader";
  preloader.setAttribute("aria-hidden", "true");
  preloader.innerHTML = `
    <div class="preloader-inner">
      <div class="preloader-logo-frame">
        <img class="preloader-logo" src="/assets/images/coordinatez-logo.png" alt="">
      </div>
      <div class="preloader-title">
        <strong>Coordinatez</strong>
        <span>IT Solution</span>
      </div>
      <div class="preloader-progress"></div>
    </div>
  `;

  document.body.prepend(preloader);

  window.setTimeout(() => {
    preloader.classList.add("is-hidden");
    document.body.classList.remove("preloader-active");
  }, 2200);

  window.setTimeout(() => {
    preloader.remove();
  }, 2850);
}

const companyKnowledge = [
  "Coordinatez IT Solution is an AI and IT services company founded in 2026 in Illinois, United States.",
  "Coordinatez IT Solution's email address is support@coordinatez.com.",
  "Coordinatez serves local businesses with AI and data solutions, AI integration, annotation, web and app development, AI chatbots, POS consulting, maintenance, and support.",
  "The company helps local businesses use AI with practical guardrails, retrieval-based knowledge, inquiry capture, and escalation when the chatbot cannot answer.",
  "Coordinatez can build web apps, customer portals, internal dashboards, forms, integrations, and mobile-ready business tools.",
  "Coordinatez provides POS consulting for restaurants, retailers, service businesses, reporting workflows, catalog setup, integrations, and staff handoff.",
  "Coordinatez maintenance and support includes issue triage, updates, monitoring, content changes, small enhancements, and support planning.",
  "Coordinatez works with industries including retail stores, restaurants and cafes, service businesses, healthcare and wellness, professional services, startups, and growing teams.",
  "Coordinatez publishes blog articles about RAG, AI for local business, AI chatbots, business digital transformation, POS data and reporting, and website maintenance.",
  ...services.map(service => `${service.title}: ${service.summary} ${service.description}`)
];

function serviceUrl(slug) {
  return `/services/${encodeURIComponent(slug)}`;
}

function getServiceBySlug(slug) {
  return services.find(service => service.slug === slug) || services[0];
}

function currentServiceSlug() {
  const params = new URLSearchParams(window.location.search);
  return window.location.pathname.startsWith("/services/")
    ? window.location.pathname.split("/").filter(Boolean).pop()
    : params.get("service");
}

function renderServiceList() {
  const list = document.querySelector("[data-service-list]");
  if (!list) return;

  list.innerHTML = services.map(service => `
    <a class="service-card" href="${serviceUrl(service.slug)}" aria-label="View ${service.title} service information">
      <span class="service-icon">${service.icon}</span>
      <span class="service-label">Capability</span>
      <h3>${service.title}</h3>
      <p>${service.summary}</p>
      <span class="card-link">Explore service</span>
    </a>
  `).join("");
}

function hydrateServiceSelects(selectedSlug) {
  document.querySelectorAll("[data-service-select]").forEach(select => {
    select.innerHTML = services.map(service => `
      <option value="${service.title}" ${service.slug === selectedSlug ? "selected" : ""}>${service.title}</option>
    `).join("");
  });
}

function renderServicePage() {
  const page = document.querySelector("[data-service-page]");
  if (!page) return;

  const service = getServiceBySlug(currentServiceSlug());

  document.title = `${service.title} | Coordinatez IT Solution`;
  document.querySelector("[data-service-title]").textContent = service.title;
  document.querySelector("[data-service-summary]").textContent = service.summary;
  document.querySelector("[data-service-heading]").textContent = `Coordinatez ${service.title}`;
  document.querySelector("[data-service-description]").textContent = service.description;
  document.querySelector("[data-service-fit]").textContent = service.fit;
  document.querySelector("[data-service-deliverables]").innerHTML = service.deliverables
    .map(item => `<li>${item}</li>`)
    .join("");

  hydrateServiceSelects(service.slug);
}

function setupInquiryForms() {
  document.querySelectorAll("[data-inquiry-form]").forEach(form => {
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", async event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const button = form.querySelector("button[type='submit']");
      button.disabled = true;
      status.textContent = "Sending inquiry...";

      try {
        const response = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "Website inquiry",
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            message: data.message,
            source: window.location.href,
            _subject: `Coordinatez inquiry: ${data.service}`
          })
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to send inquiry.");
        }

        status.textContent = "Thanks. Your inquiry was sent to Coordinatez IT Solution.";
        form.reset();
        hydrateServiceSelects(new URLSearchParams(window.location.search).get("service"));
      } catch (error) {
        status.textContent = `${error.message} You can also email support@coordinatez.com directly.`;
      } finally {
        button.disabled = false;
      }
    });
  });
}

const stopWords = new Set([
  "can", "you", "the", "and", "for", "with", "about", "what", "where", "when",
  "how", "does", "your", "are", "is", "need", "tell", "share", "info", "help"
]);

function normalizeQuestion(query) {
  const lower = query.toLowerCase();
  if (/\b(where|location|located|address|based)\b/.test(lower)) {
    return `${lower} illinois united states location`;
  }
  if (/\b(email|contact|reach)\b/.test(lower)) {
    return `${lower} support@coordinatez.com email contact`;
  }
  if (/\b(found|founded|start|started)\b/.test(lower)) {
    return `${lower} founded 2026`;
  }
  return lower;
}

function scoreText(query, text) {
  const terms = normalizeQuestion(query)
    .split(/[^a-z0-9@.]+/)
    .filter(term => term.length > 2 && !stopWords.has(term));
  const haystack = text.toLowerCase();
  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
}

function answerFromKnowledge(question) {
  const ranked = companyKnowledge
    .map(text => ({ text, score: scoreText(question, text) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (!ranked.length || ranked[0].score < 2) {
    return null;
  }

  return ranked.map(item => item.text).join(" ");
}

function addChatMessage(container, text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

function setupChatbot() {
  const chatbot = document.querySelector("[data-chatbot]");
  if (!chatbot) return;

  const launcher = chatbot.querySelector(".chat-launcher");
  const close = chatbot.querySelector(".chat-close");
  const messages = chatbot.querySelector("[data-chat-messages]");
  const form = chatbot.querySelector("[data-chat-form]");

  launcher.addEventListener("click", () => chatbot.classList.add("open"));
  close.addEventListener("click", () => chatbot.classList.remove("open"));

  addChatMessage(messages, "Hi. I can answer questions about Coordinatez IT Solution, services, location, and contact details. If I do not know, I will create a support ticket.", "bot");

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const input = form.elements.message;
    const question = input.value.trim();
    if (!question) return;

    addChatMessage(messages, question, "user");
    input.value = "";

    const answer = answerFromKnowledge(question);
    if (answer) {
      addChatMessage(messages, answer, "bot");
      return;
    }

    addChatMessage(messages, "I do not have a confident answer for that. I am creating a support ticket for support@coordinatez.com.", "bot");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "Chatbot escalation",
          name: "Website chatbot visitor",
          contact: "Not provided in chat",
          service: "Chatbot escalation",
          message: question,
          source: window.location.href,
          _subject: "Coordinatez chatbot ticket"
        })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Ticket could not be created.");
      }
      addChatMessage(messages, "A support ticket was created. For faster help, email support@coordinatez.com with your contact detail.", "bot");
    } catch (error) {
      addChatMessage(messages, `I could not create the ticket automatically. Please email support@coordinatez.com. ${error.message}`, "bot");
    }
  });
}

function setupNav() {
  const header = document.querySelector(".site-header");
  const button = document.querySelector(".nav-toggle");
  if (!header || !button) return;

  button.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    button.setAttribute("aria-expanded", String(open));
  });
}

function setupFooter() {
  document.querySelectorAll(".site-footer").forEach(footer => {
    footer.innerHTML = `
      <div class="footer-main">
        <div class="footer-brand-panel">
          <img src="/assets/images/coordinatez-footer-logo.png" alt="Coordinatez IT Solution">
        </div>
        <nav class="footer-column" aria-label="Company links">
          <h2>Company</h2>
          <a href="/about.html">About Coordinatez</a>
          <a href="/#contact">Contact us</a>
          <a href="/industries/">Industries</a>
          <a href="/blog/">Blog</a>
          <a href="/#services">Services</a>
        </nav>
        <nav class="footer-column" aria-label="Service links">
          <h2>What we do</h2>
          <a href="/services/ai-data-solution/">AI & Data Solution</a>
          <a href="/services/ai-integration/">AI Integration</a>
          <a href="/services/ai-chatbots/">AI Chatbots</a>
          <a href="/services/web-app-development/">Web & App Development</a>
          <a href="/services/pos-consulting/">POS Consulting</a>
        </nav>
        <nav class="footer-column" aria-label="Insights links">
          <h2>Insights</h2>
          <a href="/blog/rag-for-business-knowledge/">RAG for Business</a>
          <a href="/blog/ai-for-local-business/">AI for Local Business</a>
          <a href="/blog/ai-chatbots-for-customer-support/">AI Chatbots</a>
          <a href="/blog/business-digital-transformation/">Digital Transformation</a>
          <a href="/blog/website-maintenance-and-support/">Maintenance & Support</a>
        </nav>
        <div class="footer-column footer-contact">
          <h2>Contact us</h2>
          <a href="mailto:support@coordinatez.com">support@coordinatez.com</a>
          <a href="tel:+18722582235">+1 (872) 258-2235</a>
          <p>Illinois, United States</p>
        </div>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-bottom">
        <p>© 2026 Coordinatez IT Solution. All rights reserved.</p>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupPreloader();
  setupNav();
  setupFooter();
  renderServiceList();
  renderServicePage();
  hydrateServiceSelects(currentServiceSlug());
  setupInquiryForms();
  setupChatbot();
});
