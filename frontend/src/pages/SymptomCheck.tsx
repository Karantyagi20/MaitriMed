import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Stethoscope, AlertTriangle, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { checkSymptoms, type SymptomResult } from "@/lib/api";

const SYMPTOMS = [
  "Fever", "Cough", "Diarrhoea", "Headache", "Body pain",
  "Vomiting", "Rash", "Chills", "Breathlessness", "Jaundice",
];

const SEVERITIES = [
  { id: "mild", label: "Mild", emoji: "😌", desc: "Manageable, not disruptive" },
  { id: "moderate", label: "Moderate", emoji: "😣", desc: "Uncomfortable, affecting daily life" },
  { id: "severe", label: "Severe", emoji: "😰", desc: "Very painful or debilitating" },
];

const urgencyConfig = {
  emergency: { bg: "bg-destructive/10", border: "border-destructive/30", text: "text-destructive", label: "Emergency" },
  high:      { bg: "bg-orange-50",      border: "border-orange-200",      text: "text-orange-700",   label: "High urgency" },
  medium:    { bg: "bg-yellow-50",      border: "border-yellow-200",      text: "text-yellow-700",   label: "Medium urgency" },
  low:       { bg: "bg-primary/5",      border: "border-primary/20",      text: "text-primary",      label: "Low urgency" },
};

export default function SymptomCheck() {
  const [step, setStep] = useState(1);
  const [primary, setPrimary] = useState("");
  const [duration, setDuration] = useState(1);
  const [severity, setSeverity] = useState("mild");
  const [extra, setExtra] = useState("");
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const data = await checkSymptoms(primary, duration, severity, extra);
      setResult(data);
      setStep(4);
    } catch {
      alert("Could not connect. Make sure the backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1); setPrimary(""); setDuration(1);
    setSeverity("mild"); setExtra(""); setResult(null);
  };

  const steps = ["Symptom", "Duration", "Severity", "Result"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground tracking-tight mb-1">Symptom checker</h1>
            <p className="text-muted-foreground text-sm">3 quick questions to get health guidance</p>
          </div>

          <div className="flex gap-1.5 mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex-1">
                <div className={`h-1 rounded-full transition-all duration-300 ${step > i ? "bg-primary" : step === i + 1 ? "bg-primary/40" : "bg-border"}`} />
                <p className={`text-[10px] mt-1 font-medium transition-colors ${step === i + 1 ? "text-primary" : "text-muted-foreground/50"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
            <AnimatePresence mode="wait">

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <p className="text-sm font-semibold text-foreground mb-4">What is your main symptom?</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {SYMPTOMS.map((s) => (
                      <button key={s} onClick={() => { setPrimary(s); setStep(2); }}
                        className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-150 ${primary === s ? "border-primary bg-primary/[0.08] text-primary" : "border-border bg-background text-foreground hover:border-primary/40"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  <input value={primary} onChange={(e) => setPrimary(e.target.value)}
                    placeholder="Or describe your symptom..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 text-sm bg-background outline-none focus:border-primary/40 transition-colors placeholder:text-muted-foreground/50"
                  />
                  {primary && (
                    <Button onClick={() => setStep(2)} className="mt-4 rounded-full gap-2">
                      Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <p className="text-sm font-semibold text-foreground mb-6">How long have you had <span className="text-primary italic">{primary}</span>?</p>
                  <div className="flex items-center gap-5 mb-2">
                    <input type="range" min="1" max="30" step="1" value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="flex-1 accent-primary h-2 rounded-full" />
                    <div className="text-right min-w-[72px]">
                      <span className="font-display text-3xl font-bold text-primary">{duration}</span>
                      <span className="text-xs text-muted-foreground ml-1">{duration === 1 ? "day" : "days"}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="rounded-full gap-2">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="rounded-full gap-2">
                      Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <p className="text-sm font-semibold text-foreground mb-4">How severe are your symptoms?</p>
                  <div className="flex flex-col gap-2.5 mb-5">
                    {SEVERITIES.map((s) => (
                      <button key={s.id} onClick={() => setSeverity(s.id)}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border text-left transition-all duration-150 ${severity === s.id ? "border-primary bg-primary/[0.06]" : "border-border bg-background hover:border-primary/30"}`}>
                        <span className="text-2xl">{s.emoji}</span>
                        <div>
                          <p className={`text-sm font-semibold ${severity === s.id ? "text-primary" : "text-foreground"}`}>{s.label}</p>
                          <p className="text-xs text-muted-foreground">{s.desc}</p>
                        </div>
                        {severity === s.id && <CheckCircle className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
                      </button>
                    ))}
                  </div>
                  <input value={extra} onChange={(e) => setExtra(e.target.value)}
                    placeholder="Any other symptoms? (optional)"
                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 text-sm bg-background outline-none focus:border-primary/40 mb-5 transition-colors placeholder:text-muted-foreground/50"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep(2)} className="rounded-full gap-2">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button onClick={submit} disabled={loading} className="rounded-full gap-2">
                      {loading ? <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Stethoscope className="w-4 h-4" />}
                      Get health guidance
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && result && (
                <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  {result.is_emergency && (
                    <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/25 rounded-xl p-4 mb-5">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-destructive">{result.emergency_message}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${urgencyConfig[result.urgency].bg} ${urgencyConfig[result.urgency].border} ${urgencyConfig[result.urgency].text}`}>
                      {urgencyConfig[result.urgency].label}
                    </span>
                    <span className="text-xs text-muted-foreground">{result.duration_note}</span>
                  </div>

                  <div className="flex flex-col gap-3 mb-5">
                    {result.results.map((r, i) => (
                      <div key={i} className="bg-primary/[0.04] border border-primary/10 rounded-xl p-4">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="font-semibold text-sm text-foreground">{r.condition}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${r.confidence === "high" ? "bg-primary/10 text-primary border-primary/20" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}>
                            {r.confidence} match
                          </span>
                          {r.has_danger_signs && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-destructive/10 text-destructive border border-destructive/20">
                              ⚠ Danger signs
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{r.advice}</p>
                        <div className="bg-background border border-border/60 rounded-lg px-3 py-2 text-xs text-primary font-medium">
                          🏥 {r.visit}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">{result.general_advice}</p>
                  <Button variant="outline" onClick={reset} className="rounded-full gap-2">
                    <Stethoscope className="w-4 h-4" /> Check again
                  </Button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
