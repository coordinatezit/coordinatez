"use client";

import dynamic from "next/dynamic";

// Lazy-load the chat widget on the client only, so it never blocks or bloats
// the initial page load. The floating button appears shortly after hydration.
const ChatWidget = dynamic(
  () => import("@/components/chat/chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
);

export function ChatWidgetLoader() {
  return <ChatWidget />;
}
