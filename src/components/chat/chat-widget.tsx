"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Minus, Send, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type Role = "user" | "assistant";
type ChatMessage = { id: string; role: Role; content: string };

const STORAGE_KEY = "coordinatez-chat";
const SUPPORT_EMAIL = "support@coordinatez.com";
const FRIENDLY_ERROR =
  "Sorry, I'm having trouble responding right now. Please try again in a moment or contact our team directly at support@coordinatez.com.";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm the Coordinatez AI Assistant. I can help you learn about our IT services, AI solutions, business automation, software development, digital marketing, and import/export business. How can I help you today?",
};

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "I need an AI solution",
  "I want to build a website",
  "Tell me about your import/export business",
  "I want to contact your team",
];

let idCounter = 0;
const nextId = () => `m${Date.now()}-${idCounter++}`;

/** Lightweight inline renderer: **bold**, internal /paths as links, emails as mailto. */
function InlineText({ text }: { text: string }) {
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {boldParts.map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) {
          return <strong key={i}>{linkify(part.slice(2, -2))}</strong>;
        }
        return <span key={i}>{linkify(part)}</span>;
      })}
    </>
  );
}

function linkify(text: string) {
  const pattern =
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const value = match[0];
    if (value.includes("@")) {
      nodes.push(
        <a key={key++} href={`mailto:${value}`} className="font-medium text-brand-royal underline underline-offset-2">
          {value}
        </a>
      );
    } else {
      nodes.push(
        <Link key={key++} href={value} className="font-medium text-brand-royal underline underline-offset-2">
          {value}
        </Link>
      );
    }
    last = match.index + value.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function RichMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let key = 0;

  const flush = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul${key++}`} className="my-1.5 space-y-1 pl-1">
          {list.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-brand-sky" />
              <span>
                <InlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^[-*]\s+/.test(line)) {
      list.push(line.replace(/^[-*]\s+/, ""));
    } else if (line.trim() === "") {
      flush();
    } else {
      flush();
      blocks.push(
        <p key={`p${key++}`} className="my-1 first:mt-0 last:mb-0">
          <InlineText text={line} />
        </p>
      );
    }
  }
  flush();
  return <div className="leading-relaxed">{blocks}</div>;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  // Hydrate from this browser session only (widget is client-only, so this runs on the client).
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [WELCOME];
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      const parsed = saved ? (JSON.parse(saved) as ChatMessage[]) : null;
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch {
      /* ignore */
    }
    return [WELCOME];
  });
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const hasSentRef = useRef(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      /* ignore */
    }
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open, scrollToBottom]);

  // Focus the input on open; Escape to close; return focus to the trigger.
  useEffect(() => {
    if (open) {
      trackEvent("chatbot_opened");
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;

      if (!hasSentRef.current) {
        hasSentRef.current = true;
        trackEvent("chatbot_first_message");
      }
      if (/contact|inquiry|quote|email|reach|talk to|get in touch/i.test(trimmed)) {
        trackEvent("chatbot_contact_intent");
      }

      const userMsg: ChatMessage = { id: nextId(), role: "user", content: trimmed };
      const assistantId = nextId();
      const history = [...messages, userMsg];
      setMessages([...history, { id: assistantId, role: "assistant", content: "" }]);
      setInput("");
      setSending(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            messages: history.map((m) => ({ role: m.role, content: m.content })),
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => null);
          const msg = (data as { error?: string } | null)?.error || FRIENDLY_ERROR;
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: msg } : m))
          );
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
          );
        }
        if (!acc.trim()) {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: FRIENDLY_ERROR } : m))
          );
        }
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: FRIENDLY_ERROR } : m))
        );
      } finally {
        setSending(false);
        abortRef.current = null;
      }
    },
    [messages, sending]
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function closePanel() {
    abortRef.current?.abort();
    setOpen(false);
    setTimeout(() => fabRef.current?.focus(), 0);
  }

  const showQuickReplies = messages.length <= 1 && !sending;
  const lastAssistantStreaming =
    sending && messages[messages.length - 1]?.role === "assistant" &&
    messages[messages.length - 1]?.content === "";

  return (
    <>
      {/* Floating trigger */}
      <button
        ref={fabRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Coordinatez AI Assistant" : "Open Coordinatez AI Assistant"}
        aria-expanded={open}
        className={cn(
          "group fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full text-white shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2",
          open && "scale-0 opacity-0"
        )}
        style={{ background: "linear-gradient(135deg, #14417f 0%, #2e8fca 100%)" }}
      >
        <span
          aria-hidden
          className="absolute inline-flex size-14 rounded-full opacity-40 motion-safe:animate-ping"
          style={{ background: "#2e8fca" }}
        />
        <MessageSquare className="relative size-6" />
        <span className="pointer-events-none absolute right-[4.25rem] hidden whitespace-nowrap rounded-md bg-[#0b0e33] px-3 py-1.5 text-xs font-medium opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Ask the Coordinatez AI Assistant
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            role="dialog"
            aria-modal="false"
            aria-label="Coordinatez AI Assistant"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn(
              "fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-[var(--ink-panel-border)] bg-background shadow-2xl",
              // mobile: near-fullscreen, leaving the navbar visible
              "inset-x-3 bottom-3 top-20",
              // desktop: docked bottom-right panel
              "sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(38rem,calc(100vh-6rem))] sm:w-[24rem] sm:top-auto"
            )}
          >
            {/* Header */}
            <div className="ink-panel flex items-center gap-3 border-b border-[var(--ink-panel-border)] px-4 py-3">
              <div className="relative">
                <Image src="/logo-mark.svg" alt="" width={36} height={36} className="size-9" />
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[var(--ink-panel)] bg-emerald-400"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-medium text-white">
                  Coordinatez AI Assistant
                </p>
                <p className="flex items-center gap-1.5 text-[0.7rem] text-[var(--ink-panel-muted)]">
                  <span className="size-1.5 rounded-full bg-emerald-400" /> Online now
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Minimize chat"
                className="flex size-8 items-center justify-center rounded-md text-[var(--ink-panel-muted)] transition-colors hover:bg-white/10 hover:text-white"
              >
                <Minus className="size-4" />
              </button>
              <button
                onClick={closePanel}
                aria-label="Close chat"
                className="flex size-8 items-center justify-center rounded-md text-[var(--ink-panel-muted)] transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-muted/30 px-4 py-4"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                      m.role === "user"
                        ? "rounded-br-sm bg-brand-royal text-white"
                        : "rounded-bl-sm border bg-card text-foreground"
                    )}
                  >
                    {m.role === "assistant" ? (
                      m.content ? (
                        <RichMessage content={m.content} />
                      ) : (
                        <TypingDots />
                      )
                    ) : (
                      <span className="whitespace-pre-wrap">{m.content}</span>
                    )}
                  </div>
                </div>
              ))}
              {lastAssistantStreaming && null}

              {showQuickReplies && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-brand-sky/40 bg-brand-sky/[0.06] px-3 py-1.5 text-xs font-medium text-brand-royal transition-colors hover:bg-brand-sky/15"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Inquiry CTA */}
            <div className="border-t bg-background px-4 py-2">
              <Link
                href="/contact"
                onClick={() => trackEvent("chatbot_inquiry_cta")}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-royal/[0.06] py-2 text-xs font-semibold text-brand-royal transition-colors hover:bg-brand-royal/10"
              >
                Send an Inquiry <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="flex items-end gap-2 border-t bg-background p-3">
              <label htmlFor="chat-input" className="sr-only">
                Type your message
              </label>
              <textarea
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={2000}
                placeholder="Ask about our services…"
                className="max-h-28 min-h-[2.5rem] flex-1 resize-none rounded-xl border bg-card px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send message"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-royal text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
            <p className="bg-background pb-2 text-center text-[0.62rem] text-muted-foreground">
              AI assistant — may be imperfect. For important matters, email {SUPPORT_EMAIL}.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-muted-foreground/60 motion-safe:animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
