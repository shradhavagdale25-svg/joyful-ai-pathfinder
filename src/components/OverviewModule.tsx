import { motion } from "framer-motion";
import { CheckCircle2, Trophy, BookOpen, Cpu, Database, Rocket } from "lucide-react";
import { lessons } from "@/data/lessons";

interface OverviewModuleProps {
  completedLessons: Set<number>;
}

const concepts = [
  {
    icon: BookOpen,
    title: "Transformers Library",
    description: "Open-source NLP library with 500K+ pre-trained models for text tasks.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Database,
    title: "Model Hub",
    description: "Central repository for sharing and discovering ML models and datasets.",
    color: "text-hf-info",
    bg: "bg-hf-info/10",
  },
  {
    icon: Cpu,
    title: "Inference API",
    description: "Run models in the cloud with simple API calls — no GPU required.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Rocket,
    title: "Fine-Tuning",
    description: "Adapt pre-trained models to your data with PEFT and the Trainer API.",
    color: "text-hf-success",
    bg: "bg-hf-success/10",
  },
];

const flowDiagram = [
  { label: "Data", color: "bg-hf-info" },
  { label: "Pre-train", color: "hf-gradient-bg" },
  { label: "Fine-tune", color: "bg-accent" },
  { label: "Deploy", color: "bg-hf-success" },
];

const OverviewModule = ({ completedLessons }: OverviewModuleProps) => {
  const allComplete = completedLessons.size === lessons.length;
  const progress = (completedLessons.size / lessons.length) * 100;

  return (
    <div className="space-y-6">
      {/* Completion Badge */}
      {allComplete && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="hf-card text-center hf-glow !border-primary/30"
        >
          <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
          <h2 className="text-2xl font-bold hf-gradient-text">🏆 Course Complete!</h2>
          <p className="text-muted-foreground mt-1">
            You've mastered all 5 lessons on Hugging Face. Amazing work!
          </p>
        </motion.div>
      )}

      {/* Concept Cards */}
      <div>
        <h3 className="text-lg font-bold mb-3">Key Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concepts.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="hf-card flex items-start gap-4"
            >
              <div className={`p-3 rounded-xl ${c.bg}`}>
                <c.icon className={`w-6 h-6 ${c.color}`} />
              </div>
              <div>
                <h4 className="font-semibold">{c.title}</h4>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="hf-card">
        <h3 className="text-lg font-bold mb-4">ML Pipeline Flow</h3>
        <div className="flex items-center justify-between">
          {flowDiagram.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 }}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${step.color} flex items-center justify-center text-xs md:text-sm font-bold text-primary-foreground`}
              >
                {step.label}
              </motion.div>
              {i < flowDiagram.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "2rem" }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                  className="hidden md:block h-0.5 hf-gradient-bg"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="hf-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Lesson Progress</h3>
          <span className="text-sm font-mono text-muted-foreground">
            {completedLessons.size}/{lessons.length}
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-muted overflow-hidden mb-4">
          <motion.div
            className="h-full hf-gradient-bg rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="space-y-2">
          {lessons.map((l) => (
            <div
              key={l.id}
              className="flex items-center gap-3 py-1.5"
            >
              {completedLessons.has(l.id) ? (
                <CheckCircle2 className="w-5 h-5 text-hf-success flex-shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
              )}
              <span className="text-sm">{l.emoji} {l.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewModule;
