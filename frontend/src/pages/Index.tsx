import { ArrowRight, Stethoscope, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HealthTopics from "@/components/HealthTopics";
import StatsSection from "@/components/StatsSection";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 py-20 max-w-5xl">
        {/* Badge */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            SIH 2025 · PS SIH25049 · Govt of Odisha
          </span>
        </motion.div>

        {/* Hero + Topics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div className="space-y-7">
            <motion.h1
              className="font-display text-4xl md:text-[3.25rem] font-bold leading-[1.1] text-foreground tracking-tight"
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              Your caring{" "}
              <span className="text-primary relative">
                health companion
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
                </svg>
              </span>{" "}
              in your language
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg leading-relaxed max-w-md"
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              AI-powered disease awareness for Odisha's 45 million citizens.
              Ask in Hindi or English, get clear answers instantly.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-1"
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Button
              size="lg"
              onClick={() => navigate("/chat")}
              className="rounded-full gap-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-shadow"
            >
                Ask a health question
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/symptom-check")}
              className="rounded-full gap-2 hover:bg-accent transition-colors"
              >
                <Stethoscope className="w-4 h-4" />
                Check symptoms
              </Button>
            </motion.div>

            {/* Trust indicator */}
            <motion.div
              className="flex items-center gap-2 pt-2"
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex -space-x-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-background bg-accent flex items-center justify-center"
                  >
                    <Heart className="w-3 h-3 text-primary" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Trusted by <span className="font-semibold text-foreground">2,400+</span> users this month
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HealthTopics />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <StatsSection />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 bg-muted/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-medium text-foreground">MaitriMed</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              SIH 2025 · PS SIH25049 · For awareness only · Always consult a qualified doctor · Emergency: 108
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
