import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, BookOpen, Cpu, LayoutDashboard } from "lucide-react";
import LearnModule from "@/components/LearnModule";
import AIDemoModule from "@/components/AIDemoModule";
import OverviewModule from "@/components/OverviewModule";

type Tab = "learn" | "demo" | "overview";

const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "demo", label: "AI Demo", icon: Cpu },
  { id: "overview", label: "Overview", icon: LayoutDashboard },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("learn");
  const [darkMode, setDarkMode] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  const toggleDark = () => {
    setDarkMode((d) => !d);
    document.documentElement.classList.toggle("dark");
  };

  const handleLessonComplete = (lessonId: number) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤗</span>
            <h1 className="text-lg md:text-xl font-bold font-display">
              <span className="hf-gradient-text">HF Learning Explorer</span>
            </h1>
          </div>
          <button
            onClick={toggleDark}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="max-w-4xl mx-auto px-4 pt-4">
        <div className="flex gap-1 bg-muted/50 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 hf-gradient-bg rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "learn" && (
              <LearnModule completedLessons={completedLessons} onComplete={handleLessonComplete} />
            )}
            {activeTab === "demo" && <AIDemoModule />}
            {activeTab === "overview" && (
              <OverviewModule completedLessons={completedLessons} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
