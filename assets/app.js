const services = [
  {
    slug: "web-app-development",
    icon: "WA",
    title: "Website & Digital Presence",
    summary: "Business websites, landing pages, redesigns, speed improvements, SEO structure, contact forms, and client-facing pages.",
    heroImage: "/assets/images/service-web-app-development.png",
    heroAlt: "Web and app development workspace with design, code, and responsive interface screens",
    description: "Coordinatez builds practical websites and digital experiences for businesses that need a stronger online presence, clearer customer paths, and reliable inquiry capture. We focus on clean structure, performance, responsive layouts, SEO basics, and forms that support real business conversations.",
    fit: "Businesses that need a new website, a redesign, better contact forms, service pages, landing pages, speed improvements, or a more professional digital presence.",
    deliverables: [
      "Responsive website or page structure",
      "Clear service pages and contact paths",
      "Basic SEO structure and metadata",
      "Launch support and improvement checklist"
    ]
  },
  {
    slug: "ai-data-solution",
    icon: "AD",
    title: "Business Automation",
    summary: "Automated workflows, lead routing, reminders, internal task systems, customer follow-ups, and operational tools.",
    heroImage: "/assets/images/service-ai-data-solution.png",
    heroAlt: "AI and data analytics command center with dashboards and knowledge graph screens",
    description: "Coordinatez helps businesses reduce manual work by connecting forms, requests, reminders, tasks, and follow-ups into simple digital workflows. The goal is to save time, reduce missed opportunities, and make daily operations easier to manage.",
    fit: "Businesses that handle repeated inquiries, manual follow-ups, spreadsheets, task handoffs, scheduling steps, or customer requests that need better routing and tracking.",
    deliverables: [
      "Workflow review and automation plan",
      "Lead routing or request tracking",
      "Reminder and follow-up flows",
      "Internal task or operations tools"
    ]
  },
  {
    slug: "ai-integration-annotation",
    icon: "IA",
    title: "AI & Chatbot Systems",
    summary: "Website chatbots, internal AI assistants, customer support bots, FAQ systems, and workflow-connected AI tools.",
    heroImage: "/assets/images/service-ai-integration-annotation.png",
    heroAlt: "AI annotation and human review workspace with labeled data and model evaluation dashboards",
    description: "Coordinatez designs AI and chatbot systems around business use cases such as customer questions, internal knowledge lookup, lead capture, support routing, and workflow assistance. We keep the experience practical, guided, and connected to human follow-up when needed.",
    fit: "Businesses that want a website chatbot, internal assistant, FAQ automation, customer support bot, or AI workflow that helps staff and customers without creating unnecessary complexity.",
    deliverables: [
      "Chatbot or assistant conversation design",
      "Knowledge base and FAQ setup",
      "Inquiry capture and escalation flow",
      "Testing, handoff, and support notes"
    ]
  },
  {
    slug: "ai-chatbots",
    icon: "CB",
    title: "Customer Portals & Internal Dashboards",
    summary: "Client dashboards, employee dashboards, vendor portals, request tracking, RFQ systems, document access, and reporting dashboards.",
    heroImage: "/assets/images/service-ai-chatbots.png",
    heroAlt: "AI chatbot support workspace with knowledge base, lead capture, and escalation dashboard",
    description: "Coordinatez builds portals and dashboards that help customers, employees, vendors, and managers access the right information in one place. These tools can support requests, documents, reporting, RFQs, project visibility, and business operations.",
    fit: "Businesses that need a customer portal, vendor portal, staff dashboard, request tracker, document access system, reporting view, or internal tool.",
    deliverables: [
      "Portal or dashboard user flow",
      "Data fields and access structure",
      "Request tracking or reporting views",
      "Launch, handoff, and support plan"
    ]
  },
  {
    slug: "pos-consulting",
    icon: "POS",
    title: "POS & Retail Technology Consulting",
    summary: "POS setup, menu/product structure, digital ordering support, retail workflows, reporting, and store technology improvements.",
    heroImage: "/assets/images/service-pos-consulting.png",
    heroAlt: "POS consulting scene with checkout terminal, analytics tablet, and local business owner",
    description: "Coordinatez helps retailers, restaurants, and local operators improve how POS and store technology support day-to-day work. We can help organize menus or products, improve reporting, review workflows, and connect operational tools where appropriate.",
    fit: "Restaurants, retailers, service businesses, and local operators that depend on POS systems for daily revenue and reporting.",
    deliverables: [
      "POS workflow assessment",
      "Menu, product, or catalog structure review",
      "Reporting and export improvements",
      "Store technology improvement checklist"
    ]
  },
  {
    slug: "maintenance-support",
    icon: "MS",
    title: "Data & Reporting",
    summary: "Business reports, dashboards, KPI tracking, sales reporting, customer insights, and operational data organization.",
    heroImage: "/assets/images/service-maintenance-support.png",
    heroAlt: "IT maintenance and support operations desk with monitoring dashboards and ticket triage",
    description: "Coordinatez organizes business data into clearer reports, dashboards, and tracking systems. We help business owners understand sales, customer activity, operations, and performance without relying on scattered files and manual reporting.",
    fit: "Businesses that need sales reports, KPI tracking, POS exports, customer insights, operational dashboards, or cleaner data organization.",
    deliverables: [
      "Data source review and reporting plan",
      "Dashboard or report structure",
      "KPI and metric organization",
      "Documentation and support notes"
    ]
  }
];

const formspreeEndpoint = "https://formspree.io/f/xaqkqeqn";

function setupPreloader() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (sessionStorage.getItem("coordinatezPreloaderShown") === "true") return;

  sessionStorage.setItem("coordinatezPreloaderShown", "true");

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
        <span>Business Systems</span>
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

function setupThemePreview() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("theme") === "dark") {
    document.body.classList.add("theme-dark");
  }
}

const companyKnowledge = [
  "Coordinatez is the public brand of Coordinatez Tech Inc., a technology and business systems company founded in 2026 in Illinois, United States.",
  "Coordinatez email is support@coordinatez.com and the business phone number is +1 (872) 258-2235.",
  "Coordinatez helps businesses with websites, automation, AI and chatbot systems, customer portals, internal dashboards, POS and retail technology consulting, data, reporting, and digital operations.",
  "Coordinatez works with local businesses, retailers, restaurants, contractors, distributors, professional service companies, medical and dental offices, real estate and property businesses, startups, and small businesses.",
  "Coordinatez serves Illinois and remote U.S. clients.",
  "Typical response time for business inquiries is usually within one business day.",
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
  if (!window.location.pathname.startsWith("/services/")) {
    return params.get("service");
  }

  const parts = window.location.pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  return last === "index.html" ? parts[parts.length - 2] : last;
}

const serviceIcons = {
  "ai-data-solution": `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7c0-2 3.6-3.6 8-3.6S20 5 20 7s-3.6 3.6-8 3.6S4 9 4 7Z"/>
      <path d="M4 7v5c0 2 3.6 3.6 8 3.6s8-1.6 8-3.6V7"/>
      <path d="M4 12v5c0 2 3.6 3.6 8 3.6s8-1.6 8-3.6v-5"/>
    </svg>
  `,
  "ai-integration-annotation": `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12a7 7 0 0 1 14 0v5a3 3 0 0 1-3 3h-2"/>
      <path d="M9 20H7a3 3 0 0 1-3-3v-2"/>
      <path d="M8 9h.01M16 9h.01"/>
      <path d="M9 14c1.8 1.3 4.2 1.3 6 0"/>
      <path d="m17 3 1.5 2.5L21 7"/>
    </svg>
  `,
  "web-app-development": `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2"/>
      <path d="M8 22h8"/>
      <path d="M12 18v4"/>
      <path d="m10 9-2 2 2 2"/>
      <path d="m14 9 2 2-2 2"/>
    </svg>
  `,
  "ai-integration": `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v4"/>
      <path d="M12 17v4"/>
      <path d="M3 12h4"/>
      <path d="M17 12h4"/>
      <circle cx="12" cy="12" r="5"/>
      <path d="m15.5 8.5 2-2"/>
      <path d="m6.5 17.5 2-2"/>
      <path d="m8.5 8.5-2-2"/>
      <path d="m17.5 17.5-2-2"/>
    </svg>
  `,
  "ai-chatbots": `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9V7a6 6 0 0 1 12 0v2"/>
      <rect x="4" y="9" width="16" height="11" rx="3"/>
      <path d="M9 14h.01M15 14h.01"/>
      <path d="M10 17h4"/>
      <path d="M12 3V1.5"/>
    </svg>
  `,
  "pos-consulting": `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2"/>
      <path d="M8 7h8"/>
      <path d="M8 11h8"/>
      <path d="M9 16h.01M12 16h.01M15 16h.01"/>
      <path d="M9 19h6"/>
    </svg>
  `,
  "maintenance-support": `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4"/>
      <path d="m15 5 4 4"/>
      <path d="m16 4 4 4"/>
    </svg>
  `
};

function renderServiceList() {
  const list = document.querySelector("[data-service-list]");
  if (!list) return;

  list.innerHTML = services.map(service => `
    <a class="service-card" href="${serviceUrl(service.slug)}" aria-label="View ${service.title} service information">
      <span class="service-icon">${serviceIcons[service.slug] || service.icon}</span>
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

  document.title = `${service.title} | Coordinatez`;
  document.querySelector("[data-service-title]").textContent = service.title;
  document.querySelector("[data-service-summary]").textContent = service.summary;
  const heroImage = document.querySelector("[data-service-hero-image]");
  if (heroImage) {
    heroImage.src = service.heroImage;
    heroImage.alt = service.heroAlt;
  }
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
            company: data.company || "",
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

        status.textContent = "Thanks. Your inquiry was sent to Coordinatez.";
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

function answerGeneralQuestion(question) {
  const lower = question.toLowerCase();
  const now = new Date();

  if (/\b(date|today|day)\b/.test(lower)) {
    return `Today is ${now.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })}.`;
  }

  if (/\b(time|clock)\b/.test(lower)) {
    return `The current time is ${now.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit"
    })}.`;
  }

  if (/\b(hi|hello|hey)\b/.test(lower)) {
    return "Hello. I am CoordiBot. I can help with Coordinatez services, contact details, and general questions.";
  }

  if (/\b(how are you|how do you do|how's it going|how is it going)\b/.test(lower)) {
    return "I am doing well and ready to help. You can ask me about Coordinatez services, contact details, or general questions.";
  }

  if (/\b(thanks|thank you)\b/.test(lower)) {
    return "You are welcome. I am here if you need help choosing a service or contacting Coordinatez.";
  }

  return null;
}

async function askAssistantApi(question) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: question,
        page: window.location.href
      })
    });

    if (!response.ok) return null;
    const result = await response.json();
    return result.answer || null;
  } catch (error) {
    return null;
  }
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

  addChatMessage(messages, "Hi, I am CoordiBot. I can answer questions about Coordinatez, services, contact details, and normal questions like today's date or time. If I do not know, I will create a support ticket.", "bot");

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const input = form.elements.message;
    const question = input.value.trim();
    if (!question) return;

    addChatMessage(messages, question, "user");
    input.value = "";

    const answer = answerFromKnowledge(question) || answerGeneralQuestion(question);
    if (answer) {
      addChatMessage(messages, answer, "bot");
      return;
    }

    addChatMessage(messages, "Let me think about that...", "bot");
    const aiAnswer = await askAssistantApi(question);
    if (aiAnswer) {
      addChatMessage(messages, aiAnswer, "bot");
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

function setupHeader() {
  document.querySelectorAll(".site-header").forEach(header => {
    header.innerHTML = `
      <a class="brand" href="/" aria-label="Coordinatez home">
        <span class="brand-mark"><img src="/assets/images/coordinatez-logo.png" alt=""></span>
        <span>Coordinatez</span>
      </a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16"></path>
          <path d="M4 12h16"></path>
          <path d="M4 17h16"></path>
        </svg>
      </button>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/about.html">About</a>
        <a href="/services/">Services</a>
        <a href="/industries/">Industries</a>
        <a href="/work/">Work</a>
        <a href="/careers/">Careers</a>
        <a href="/contact/">Contact</a>
      </nav>
    `;
  });
}

function setupFooter() {
  document.querySelectorAll(".site-footer").forEach(footer => {
    footer.innerHTML = `
      <div class="footer-main">
        <div class="footer-column footer-brand-text">
          <h2>Coordinatez</h2>
          <p>A brand of Coordinatez Tech Inc.</p>
          <p>Business technology, websites, automation, AI systems, POS consulting, customer portals, and digital operations.</p>
        </div>
        <nav class="footer-column" aria-label="Company links">
          <h2>Links</h2>
          <a href="/">Home</a>
          <a href="/about.html">About</a>
          <a href="/services/">Services</a>
          <a href="/industries/">Industries</a>
          <a href="/work/">Work</a>
          <a href="/careers/">Careers</a>
          <a href="/contact/">Contact</a>
        </nav>
        <nav class="footer-column" aria-label="Service links">
          <h2>What we do</h2>
          <a href="/services/web-app-development/">Website & Digital Presence</a>
          <a href="/services/ai-data-solution/">Business Automation</a>
          <a href="/services/ai-integration-annotation/">AI & Chatbot Systems</a>
          <a href="/services/ai-chatbots/">Customer Portals & Dashboards</a>
          <a href="/services/pos-consulting/">POS Consulting</a>
          <a href="/services/maintenance-support/">Data & Reporting</a>
        </nav>
        <nav class="footer-column" aria-label="Policy links">
          <h2>Policies</h2>
          <a href="/privacy-policy/">Privacy Policy</a>
          <a href="/terms-of-service/">Terms of Service</a>
          <a href="/service-policy/">Service Policy</a>
          <a href="/blog/">Blog</a>
        </nav>
        <div class="footer-column footer-contact">
          <h2>Contact us</h2>
          <p>Illinois, United States</p>
          <a href="mailto:support@coordinatez.com">support@coordinatez.com</a>
          <a href="tel:+18722582235">+1 (872) 258-2235</a>
        </div>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-bottom">
        <p>&copy; 2026 Coordinatez Tech Inc. All rights reserved.</p>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupThemePreview();
  setupPreloader();
  setupHeader();
  setupNav();
  setupFooter();
  renderServiceList();
  renderServicePage();
  hydrateServiceSelects(currentServiceSlug());
  setupInquiryForms();
  setupChatbot();
});
