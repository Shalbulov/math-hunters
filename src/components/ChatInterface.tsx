"use client";

import { useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { MathText } from "@/components/Math";

type Msg = { role: "user" | "model"; content: string };

export function ChatInterface({ topicId }: { topicId: string }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "model",
      content:
        "Hi! I'm your AI tutor. Ask me anything about this topic — I'll explain step by step.",
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
      setMessages([
        ...next,
        { role: "model", content: `⚠️ ${msg}` },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
      }, 50);
    }
  }

  return (
    <div className="rounded-lg bg-primary border border-border-default overflow-hidden flex flex-col h-[480px]">
      <div className="px-4 py-3 border-b border-border-default flex items-center gap-2 bg-primary-light">
        <Bot className="text-accent-blue" size={18} />
        <span className="font-semibold text-sm">AI Tutor</span>
        <span className="ml-auto text-xs text-text-secondary">Gemini 2.5 Flash</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "model" && (
              <div className="w-7 h-7 rounded-full bg-primary-dark border border-accent-blue/50 flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-accent-blue" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-accent-blue text-primary-dark"
                  : "bg-primary-light text-text-primary"
              }`}
            >
              <MathText text={m.content} />
            </div>
            {m.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-accent-blue/20 border border-accent-blue/50 flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-accent-blue" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 justify-start">
            <div className="w-7 h-7 rounded-full bg-primary-dark border border-accent-blue/50 flex items-center justify-center">
              <Bot size={14} className="text-accent-blue" />
            </div>
            <div className="bg-primary-light rounded-lg px-3 py-2 text-sm text-text-secondary">
              Thinking…
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="border-t border-border-default p-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about this topic…"
          className="flex-1 bg-primary-dark border border-border-default rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent-blue"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-3 py-2 rounded-md bg-accent-blue text-primary-dark font-medium hover:bg-accent-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
