const companyContext = `
Coordinatez is the public brand of Coordinatez Tech Inc., a technology and business systems company founded in 2026 in Illinois, United States.
Company email: support@coordinatez.com.
Phone: +1 (872) 258-2235.
Services: Website & Digital Presence, Business Automation, AI & Chatbot Systems, Customer Portals & Internal Dashboards, POS & Retail Technology Consulting, Data & Reporting.
Business areas: IT Solution services and Import Export.
Import Export categories: Food & Supplements, Home Textile & Decor Items, Metal Scrap including aluminium, copper, brass, and steel, and Automobile Scrap.
Industries: retail stores, restaurants and cafes, service businesses, healthcare and wellness, professional services, startups, and growing teams.
The company helps businesses modernize operations with practical websites, automation, AI systems, portals, POS workflows, data reporting, digital operations, and selected import/export trade inquiries.
`;

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    send(res, 405, { error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    send(res, 200, {
      answer: null,
      fallback: true,
      message: "OPENAI_API_KEY is not configured."
    });
    return;
  }

  try {
    const body = await readBody(req);
    const question = String(body.message || "").trim().slice(0, 1000);
    if (!question) {
      send(res, 400, { error: "Message is required." });
      return;
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        reasoning: { effort: "low" },
        instructions: [
          "You are CoordiBot, the website assistant for Coordinatez.",
          "Write in a professional, calm, concise tone.",
          "Answer normal daily-life and general knowledge questions helpfully when they are safe to answer.",
          "Keep most answers to two to five short sentences unless the user asks for detail.",
          "For Coordinatez-specific questions, use only the company context and do not invent facts, pricing, certifications, guarantees, shipping capacity, or partnerships.",
          "For Coordinatez services or import/export questions, answer briefly and suggest the relevant website page or support@coordinatez.com for the next step.",
          "If a user asks for legal, medical, financial, safety, immigration, or emergency advice, give cautious general information and recommend a qualified professional or emergency service when appropriate.",
          "If you do not know an answer about Coordinatez, say that Coordinatez can confirm it at support@coordinatez.com."
        ].join(" "),
        input: [
          {
            role: "developer",
            content: companyContext
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const result = await response.json();
    if (!response.ok) {
      send(res, 200, {
        answer: null,
        fallback: true,
        message: result.error?.message || "OpenAI request failed."
      });
      return;
    }

    const answer = result.output_text
      || result.output?.flatMap(item => item.content || []).map(item => item.text).filter(Boolean).join(" ")
      || null;

    send(res, 200, { answer });
  } catch (error) {
    send(res, 200, {
      answer: null,
      fallback: true,
      message: error.message || "Chat endpoint failed."
    });
  }
}
