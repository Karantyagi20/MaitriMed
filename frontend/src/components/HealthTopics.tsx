import {
  Bug,
  Thermometer,
  Droplets,
  Wind,
  Flame,
  CircleDot,
  Shield,
  Activity,
  ShieldAlert,
  Waves,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const topics = [
  { name: "Dengue", icon: Bug },
  { name: "Malaria", icon: Bug },
  { name: "Cholera", icon: Droplets },
  { name: "TB", icon: Wind },
  { name: "Typhoid", icon: Thermometer },
  { name: "Diarrhoea", icon: Waves },
  { name: "Pneumonia", icon: Flame },
  { name: "Hepatitis", icon: Activity },
  { name: "COVID-19", icon: ShieldAlert },
  { name: "Leptospirosis", icon: CircleDot },
];

const HealthTopics = () => {
  const navigate = useNavigate();

  const handleTopicClick = (topicName: string) => {
    navigate(`/chat?topic=${encodeURIComponent(topicName)}`);
  };

  return (
    <div className="bg-card rounded-2xl border border-border/80 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-5">
        Common Health Topics
      </p>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, i) => (
          <motion.button
            key={topic.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
            onClick={() => handleTopicClick(topic.name)}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-primary/[0.06] hover:border-primary/30 hover:shadow-sm active:scale-[0.97]"
          >
            <topic.icon className="w-3.5 h-3.5 text-primary" />
            {topic.name}
          </motion.button>
        ))}
      </div>

      {/* Bot card */}
      <div className="mt-5 flex items-center gap-3.5 rounded-xl bg-primary/[0.05] border border-primary/10 p-3.5 cursor-pointer hover:bg-primary/[0.08] transition-colors"
        onClick={() => navigate("/chat")}>
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary/20">
          <Shield className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">
            मैं MaitriMed हूं — I'm MaitriMed
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ask me anything about your health...
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthTopics;
