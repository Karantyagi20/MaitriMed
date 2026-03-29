import { motion } from "framer-motion";
import { Phone, Heart, Ambulance, Pill, Microscope, Smartphone, HeadphonesIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

const SERVICES = [
  {
    icon: Heart,
    name: "Biju Swasthya Kalyan Yojana",
    short: "BSKY",
    desc: "Free treatment up to ₹5 lakh per family per year at empanelled government and private hospitals.",
    contact: "104",
    color: "bg-primary/[0.08] text-primary",
    border: "border-primary/15",
  },
  {
    icon: Phone,
    name: "108 Ambulance",
    short: "",
    desc: "Free emergency ambulance service available 24 hours a day, 7 days a week across Odisha.",
    contact: "108",
    color: "bg-destructive/[0.08] text-destructive",
    border: "border-destructive/15",
  },
  {
    icon: Smartphone,
    name: "Mo Swasthya",
    short: "",
    desc: "Mobile health units reaching remote and rural areas of Odisha with essential care.",
    contact: "104",
    color: "bg-blue-500/[0.08] text-blue-600",
    border: "border-blue-500/15",
  },
  {
    icon: Microscope,
    name: "Nikshay (TB Programme)",
    short: "",
    desc: "Free TB testing and complete 6-month medicine course under the government's DOTS programme.",
    contact: "1800-11-6666",
    color: "bg-purple-500/[0.08] text-purple-600",
    border: "border-purple-500/15",
  },
  {
    icon: Pill,
    name: "National Health Mission",
    short: "NHM",
    desc: "Free medicines available at all government health facilities and PHCs across India.",
    contact: "PHC",
    color: "bg-orange-500/[0.08] text-orange-600",
    border: "border-orange-500/15",
  },
  {
    icon: HeadphonesIcon,
    name: "Health Helpline",
    short: "",
    desc: "Free teleconsultation 24 hours a day. Talk directly to a health expert from anywhere.",
    contact: "104",
    color: "bg-teal-500/[0.08] text-teal-600",
    border: "border-teal-500/15",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function HealthServices() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight mb-2">Free health services</h1>
          <p className="text-muted-foreground text-sm max-w-md">
            All services below are completely free for citizens of Odisha. No registration required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${s.color} ${s.border}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-bold">
                    {s.contact}
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">
                  {s.name}
                  {s.short && <span className="text-muted-foreground font-normal ml-1.5 text-xs">({s.short})</span>}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-primary rounded-2xl p-6 flex items-center justify-between"
        >
          <div>
            <h2 className="font-display text-xl font-bold text-primary-foreground mb-1">In an emergency?</h2>
            <p className="text-primary-foreground/75 text-sm">Call 108 for a free ambulance. Available 24/7 across Odisha.</p>
          </div>
          <div className="text-right">
            <p className="font-display text-5xl font-bold text-primary-foreground">108</p>
            <p className="text-primary-foreground/60 text-xs mt-0.5">Free · 24/7</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
