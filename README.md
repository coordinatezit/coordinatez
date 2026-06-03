# Coordinatez IT Solution Website

A dynamic website for Coordinatez IT Solution, founded in 2026 in Illinois, United States.

## Run Locally

```bash
node server.js
```

Then open:

```text
http://localhost:4173
```

The site has:

- Home page with animated hero, service cards, and inquiry form
- About page with company details
- Service information pages powered by `service.html?service=<slug>`
- Inquiry API at `/api/inquiry`
- Chatbot ticket API at `/api/ticket`
- RAG-style chatbot that answers from company/service knowledge and creates a ticket when it is unsure
- One-page technical capabilities doc in [`TECHNICAL_CAPABILITIES.md`](TECHNICAL_CAPABILITIES.md)

## Form Delivery

All inquiries and chatbot tickets are addressed to:

```text
support@coordinatez.com
```

The public inquiry forms and chatbot escalation flow submit directly to Formspree:

```text
https://formspree.io/f/xaqkqeqn
```

Submitted fields include `type`, `name`, `contact`, `service`, `message`, `source`, and `_subject`.

The local `server.js` also keeps `/api/inquiry` and `/api/ticket` endpoints available as a backup if you later want server-side storage or direct email delivery.

## Deploy

This site can deploy as static files because public forms submit directly to Formspree.

Recommended free option: Netlify.

- Publish directory: `.`
- Build command: leave empty
- Included config: `netlify.toml`

Vercel is also supported with `vercel.json`.
