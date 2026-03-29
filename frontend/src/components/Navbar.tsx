import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Ask MaitriMed", path: "/chat" },
  { label: "Symptom Check", path: "/symptom-check" },
  { label: "Health Services", path: "/health-services" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground tracking-tight">
              MaitriMed
            </span>
          </button>

          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
