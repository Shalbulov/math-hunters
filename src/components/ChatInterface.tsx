"use client";

import { useRef, useState } from "react";
import { Send, User } from "lucide-react";
import { MathText } from "@/components/Math";

type Msg = { role: "user" | "model"; content: string };

export function ChatInterface({ topicId }: { topicId: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "model",
      content:
        "I'm your tutor. Ask anything about this topic — I'll explain step by step.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, topicId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat failed");
      setMessages([...next, { role: "model", content: data.reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setMessages([...next, { role: "model", content: `⚠ ${msg}` }]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
      }, 50);
    }
  }

  return (
    <div className="border border-border-default bg-surface overflow-hidden flex flex-col h-[460px]">
      <div className="px-4 py-2.5 border-b border-border-default flex items-center justify-between bg-bg">
        <div className="font-display text-[10px] tracking-[0.25em] text-text-muted">
          ◢ TUTOR · GEMINI
        </div>
        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-accent text-bg font-medium"
                  : "bg-surface-elev border border-border-default text-text-primary"
              }`}
            >
              <MathText text={m.content} />
            </div>
            {m.role === "user" && (
              <div className="w-6 h-6 bg-accent-soft border border-accent/40 flex items-center justify-center flex-shrink-0">
                <User size={12} className="text-accent" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 justify-start">
            <div className="bg-surface-elev border border-border-default px-3 py-2 text-xs text-text-muted">
              …
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="border-t border-border-default p-2.5 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything…"
          className="flex-1 bg-bg border border-border-default focus:border-accent outline-none px-3 py-2 text-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-3 bg-accent text-bg font-display font-bold hover:bg-accent-dim transition-colors disabled:opacity-30"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
