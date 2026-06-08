const companyContext = `
Coordinatez IT Solution is an AI and IT services company founded in 2026 in Illinois, United States.
Company email: support@coordinatez.com.
Phone: +1 (872) 258-2235.
Services: Web & App Development, AI & Data Solution, AI Integration & Annotation, AI Chatbots, POS Consulting, Maintenance & Support.
Industries: retail stores, restaurants and cafes, service businesses, healthcare and wellness, professional services, startups, and growing teams.
The company helps local businesses modernize operations with practical AI, data, software, chatbot, POS, and support systems.
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
          "You are CoordiBot, the website assistant for Coordinatez IT Solution.",
          "Answer normal visitor questions helpfully and briefly.",
          "For Coordinatez-specific questions, use the company context.",
          "If a user asks for legal, medical, financial, or emergency advice, give a cautious general answer and recommend a qualified professional.",
          "If you do not know an answer about Coordinatez, say support@coordinatez.com can help."
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
