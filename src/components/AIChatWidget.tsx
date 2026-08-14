"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageCircle, X, Send, Bot, Phone } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm Speedo's AI assistant. I can give you a real cost estimate, explain how our routes work, or help you get set up as a partner. What brings you here today?",
};

const QUICK_REPLIES = [
  "What's my monthly cost as a pharmacy?",
  "How fast is a STAT delivery?",
  "Do you handle cold-chain / specimens?",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [isOpen]);

  async function send(text: string) {
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: accumulated };
          return copy;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please call **780-807-0000** or visit our contact page.",
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    /* Stack: chat window on top, trigger button below — flex-col-reverse keeps button at bottom */
    <div className="fixed bottom-40 right-4 lg:bottom-24 lg:right-6 z-[60] flex flex-col-reverse items-end gap-3">
      {/* ── Trigger button ── */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 relative shrink-0"
        style={{ background: isOpen ? "#0D1B3E" : "#1B6FEB" }}
      >
        {pulse && !isOpen && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "#1B6FEB", opacity: 0.35 }}
          />
        )}
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
      </button>

      {/* ── Chat window ── */}
      {isOpen && (
        <div
          className="flex flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width: 360,
            maxWidth: "calc(100vw - 32px)",
            height: "min(520px, calc(100svh - 220px))",
            background: "white",
            border: "1px solid rgba(13,27,62,0.12)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ background: "#0D1B3E" }}
          >
            <div
              className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
              style={{ background: "#1B6FEB" }}
            >
              <Bot size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">Speedo AI</p>
              <p className="text-blue-300 text-[11px] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online · Medical Couriers Edmonton
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ background: "#F7F9FC" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5"
                    style={{ background: "#1B6FEB" }}
                  >
                    <Bot size={12} className="text-white" />
                  </div>
                )}
                <div
                  className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? {
                          background: "#1B6FEB",
                          color: "white",
                          borderBottomRightRadius: 4,
                        }
                      : {
                          background: "white",
                          color: "#0D1B3E",
                          borderBottomLeftRadius: 4,
                          border: "1px solid #E2E8F0",
                        }
                  }
                >
                  {msg.content || (
                    <span className="flex gap-1 items-center py-0.5">
                      {[0, 150, 300].map((d) => (
                        <span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: `${d}ms` }}
                        />
                      ))}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies (only before first user message) */}
          {messages.length === 1 && (
            <div
              className="px-4 py-2.5 flex flex-wrap gap-2 shrink-0"
              style={{ borderTop: "1px solid #E2E8F0", background: "white" }}
            >
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-colors hover:bg-blue-50"
                  style={{ borderColor: "#1B6FEB", color: "#1B6FEB", background: "#EBF3FF" }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 px-3 py-3 shrink-0"
            style={{ borderTop: "1px solid #E2E8F0", background: "white" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our services…"
              disabled={isStreaming}
              className="flex-1 text-sm outline-none px-3 py-2 rounded-xl"
              style={{
                background: "#F7F9FC",
                border: "1px solid #E2E8F0",
                color: "#0D1B3E",
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0"
              style={{
                background: input.trim() && !isStreaming ? "#1B6FEB" : "#E2E8F0",
                color: input.trim() && !isStreaming ? "white" : "#94A3B8",
              }}
              aria-label="Send"
            >
              <Send size={15} />
            </button>
          </form>

          {/* Footer */}
          <div
            className="flex items-center justify-center gap-1.5 py-2 text-[10px] font-medium shrink-0"
            style={{
              background: "#F7F9FC",
              borderTop: "1px solid #E2E8F0",
              color: "#94A3B8",
            }}
          >
            <Phone size={10} />
            Need help now? Call{" "}
            <a
              href="tel:7808070000"
              className="font-bold"
              style={{ color: "#1B6FEB" }}
            >
              780-807-0000
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
