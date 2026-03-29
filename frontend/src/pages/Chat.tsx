import { useState, useRef, useEffect } from "react";
import { ArrowUp, Globe, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { sendChat, type ChatResponse } from "@/lib/api";

const DISEASES = [
  "Dengue", "Malaria", "Cholera", "TB", "Typhoid",
  "Diarrhoea", "Pneumonia", "Hepatitis", "COVID-19", "Leptospirosis",
];

interface Message {
  role: "user" | "assistant";
  text: string;
  sources?: { name: string; topic: string }[];
  error?: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Namaste! I'm MaitriMed 🌿 — your caring health companion.\n\nAsk me about disease symptoms, prevention, or free government health services. You can also write in Hindi!\n\nनमस्ते! मैं MaitriMed हूं — आपका स्वास्थ्य साथी।",
      sources: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((p) => [...p, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const data: ChatResponse = await sendChat(text, sessionId, lang);
      setSessionId(data.session_id);
      setMessages((p) => [
        ...p,
        { role: "assistant", text: data.answer, sources: data.sources },
      ]);
    } catch (e: any) {
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          text: `Could not connect to MaitriMed backend. Make sure it's running on port 8000.\n\nError: ${e.message}`,
          sources: [],
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl flex flex-col gap-6">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {DISEASES.map((d, i) => (
            <motion.button
              key={d}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.25 }}
              onClick={() => send(`Tell me about ${d} — symptoms, prevention and treatment`)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:bg-primary/[0.06] hover:border-primary/30 hover:shadow-sm active:scale-[0.97]"
            >
              {d}
            </motion.button>
          ))}
        </motion.div>

        <div className="flex-1 bg-card rounded-2xl border border-border/80 shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 min-h-[420px] max-h-[520px]">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-primary/20">
                        <span className="text-primary-foreground text-xs">🌿</span>
                      </div>
                      <span className="text-xs font-semibold text-primary">MaitriMed</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : m.error
                        ? "bg-destructive/10 text-destructive border border-destructive/20 rounded-bl-sm"
                        : "bg-muted/60 text-foreground border border-border/40 rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.sources && m.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {m.sources.map((s, si) => (
                        <span
                          key={si}
                          className="inline-flex items-center gap-1 text-[10px] bg-primary/[0.06] text-primary border border-primary/15 px-2 py-0.5 rounded-full font-medium"
                        >
                          <FileText className="w-2.5 h-2.5" />
                          {s.name}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">🌿</span>
                </div>
                <div className="bg-muted/60 border border-border/40 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-border/60 bg-muted/20 flex gap-2 items-center">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/60 text-xs font-medium text-muted-foreground hover:bg-accent transition-colors flex-shrink-0"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === "en" ? "EN" : "HI"}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={
                lang === "hi"
                  ? "अपना सवाल लिखें..."
                  : "Ask about symptoms, diseases, or health services..."
              }
              className="flex-1 bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/40 transition-colors placeholder:text-muted-foreground/60"
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              {loading ? (
                <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
