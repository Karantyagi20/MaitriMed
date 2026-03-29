import { Users, BookOpen, Languages } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Users,
    value: "45M+",
    label: "Citizens served",
    sub: "Across Odisha",
    gradient: "from-primary/10 to-health-mint/40",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: BookOpen,
    value: "10",
    label: "Disease areas",
    sub: "Knowledge base",
    gradient: "from-health-mint/30 to-accent/60",
    iconBg: "bg-health-mint",
    iconColor: "text-primary",
  },
  {
    icon: Languages,
    value: "EN + HI",
    label: "Bilingual",
    sub: "Ask in your language",
    gradient: "from-health-warm/40 to-accent/30",
    iconBg: "bg-health-warm",
    iconColor: "text-foreground",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const StatsSection = () => {
  return (
    <section className="relative">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
          Impact at a glance
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/[0.04] hover:border-primary/20 cursor-default"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Corner number */}
            <span className="absolute top-4 right-5 text-[11px] font-mono font-medium text-muted-foreground/40 tracking-wider">
              0{i + 1}
            </span>

            <div className="relative">
              <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className={`w-[18px] h-[18px] ${stat.iconColor}`} />
              </div>

              <p className="font-display text-3xl font-bold text-foreground tracking-tight leading-none">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-foreground mt-2.5">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
