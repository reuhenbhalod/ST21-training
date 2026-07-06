import { useState, useRef, useEffect } from "react";
import { MessageSquare, ChevronDown, Send, Bot, Sparkles } from "lucide-react";

// Floating AI assistant. Available on every authenticated page. Talks to
// /api/chat (Amazon Nova Lite), which answers strictly from the training
// modules. Reuses the app's apiCall helper (adds the Entra token + 401 retry).

const SUGGESTIONS = [
  "Teach me more about module 13, AWS migrations",
  "How do I handle the 'too expensive' objection?",
  "Summarize the cloud modernization module",
];

export default function ChatPanel({ apiCall, activeSectionId }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { role: "user"|"assistant", text }
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Set when the server rate-limits us (429): { scope: "minute"|"day", seconds }.
  // While active, sending is disabled and a notice with a countdown is shown;
  // `seconds` ticks down to 0, at which point cooldown clears itself.
  const [cooldown, setCooldown] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // Tick the cooldown countdown once a second and clear it when it expires.
  useEffect(() => {
    if (!cooldown) return;
    const timer = setInterval(() => {
      setCooldown((c) => (!c || c.seconds <= 1 ? null : { ...c, seconds: c.seconds - 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading || cooldown) return;
    const priorHistory = messages.slice(-10);
    setMessages((m) => [...m, { role: "user", text: content }]);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message: content,
          history: priorHistory,
          moduleId: activeSectionId || undefined,
        }),
      });
      setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
    } catch (err) {
      if (err?.status === 429) {
        setCooldown({
          scope: err.body?.scope === "day" ? "day" : "minute",
          seconds: Math.max(1, err.body?.retryAfterSeconds || 60),
        });
        // Undo the optimistic append and give the user their text back, so
        // the transcript holds no unanswered question and nothing typed is lost.
        setMessages((m) => m.slice(0, -1));
        setInput(content);
      } else {
        setError("Sorry, something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open the training assistant"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#E66433] px-5 py-3 text-white shadow-lg hover:bg-[#C94F22] transition-colors"
      >
        <MessageSquare size={20} />
        <span className="font-semibold text-sm hidden sm:inline">Ask the Assistant</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-xl border border-[#E5E5E5] shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#E66433] text-white shrink-0">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <div>
            <div className="font-bold text-sm leading-tight">Training Assistant</div>
            <div className="text-[11px] text-white/80 leading-tight">Ask about any module</div>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Minimize the assistant"
          className="p-1 rounded hover:bg-white/20 transition-colors"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FDF1EC] mb-3">
              <Sparkles size={22} className="text-[#E66433]" />
            </div>
            <p className="text-sm text-[#4A4A4A] mb-4">
              Hi! I can help you learn the SmarTek21 sales-training modules. Try one of these:
            </p>
            <div className="space-y-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  disabled={loading || !!cooldown}
                  className="block w-full text-left text-sm px-3 py-2 rounded-lg border border-[#E5E5E5] hover:border-[#E66433] hover:bg-[#FDF1EC] text-[#2A2A2A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-[#E66433] text-white rounded-br-sm"
                  : "bg-[#F4F4F4] text-[#1A1A1A] rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#F4F4F4] px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#B0B0B0] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#B0B0B0] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#B0B0B0] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-sm text-[#8A2C12] bg-[#FBE9E4] border border-[#E66433]/40 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {cooldown && (
          <div className="text-sm text-[#8A2C12] bg-[#FBE9E4] border border-[#E66433]/40 rounded-lg px-3 py-2">
            {cooldown.scope === "day"
              ? "You've reached today's limit for the assistant. It resets at midnight UTC."
              : `You're sending messages quickly — you can ask again in ${cooldown.seconds}s.`}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[#E5E5E5] p-3 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            disabled={!!cooldown}
            placeholder={cooldown ? "The assistant is cooling down..." : "Ask about a module..."}
            className="flex-1 resize-none max-h-28 px-3 py-2 text-sm rounded-lg border border-[#E5E5E5] focus:border-[#E66433] focus:outline-none disabled:bg-[#FAFAFA] disabled:cursor-not-allowed"
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim() || !!cooldown}
            aria-label="Send message"
            className="p-2.5 rounded-lg bg-[#E66433] text-white hover:bg-[#C94F22] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
