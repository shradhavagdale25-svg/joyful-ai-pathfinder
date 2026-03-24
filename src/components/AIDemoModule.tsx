import { useState, useEffect, useRef } from "react";
import { aiTasks, getSimulatedResponse } from "@/data/aiTasks";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Loader2, Zap } from "lucide-react";

const flowSteps = ["Input", "API", "Model", "Output"];

const AIDemoModule = () => {
  const [activeTask, setActiveTask] = useState(aiTasks[0].id);
  const [input, setInput] = useState(aiTasks[0].defaultInput);
  const [output, setOutput] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [flowStep, setFlowStep] = useState(-1);
  const typewriterRef = useRef<number | null>(null);

  const task = aiTasks.find((t) => t.id === activeTask)!;

  const handleTaskChange = (taskId: string) => {
    setActiveTask(taskId);
    const t = aiTasks.find((t) => t.id === taskId)!;
    setInput(t.defaultInput);
    setOutput("");
    setDisplayedOutput("");
    setFlowStep(-1);
    if (typewriterRef.current) clearInterval(typewriterRef.current);
  };

  const runDemo = async () => {
    if (!input.trim() || isProcessing) return;
    setIsProcessing(true);
    setOutput("");
    setDisplayedOutput("");

    // Animate flow steps
    for (let i = 0; i < flowSteps.length; i++) {
      setFlowStep(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    const result = getSimulatedResponse(activeTask, input);
    setOutput(result);
    setIsProcessing(false);
  };

  // Typewriter effect
  useEffect(() => {
    if (!output) return;
    let i = 0;
    setDisplayedOutput("");
    typewriterRef.current = window.setInterval(() => {
      i++;
      setDisplayedOutput(output.slice(0, i));
      if (i >= output.length) {
        if (typewriterRef.current) clearInterval(typewriterRef.current);
      }
    }, 15);
    return () => {
      if (typewriterRef.current) clearInterval(typewriterRef.current);
    };
  }, [output]);

  return (
    <div className="space-y-6">
      {/* Task Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {aiTasks.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTaskChange(t.id)}
            className={`hf-card cursor-pointer text-center transition-all !p-4 ${
              activeTask === t.id ? "hf-glow ring-2 ring-primary" : ""
            }`}
          >
            <span className="text-2xl block mb-1">{t.emoji}</span>
            <span className="text-sm font-semibold">{t.title}</span>
          </button>
        ))}
      </div>

      {/* Flow Bar */}
      <div className="flex items-center justify-between px-4">
        {flowSteps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: flowStep === i ? 1.15 : 1,
                backgroundColor:
                  flowStep >= i
                    ? "hsl(36, 100%, 50%)"
                    : "hsl(var(--muted))",
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                color: flowStep >= i ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
              }}
            >
              {flowStep === i && isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                step[0]
              )}
            </motion.div>
            {i < flowSteps.length - 1 && (
              <div className="hidden md:block w-12 lg:w-20 h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full hf-gradient-bg"
                  animate={{ width: flowStep > i ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground text-center">{task.description}</p>

      {/* Input */}
      <div className="hf-card !p-4 space-y-3">
        <label className="text-sm font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={task.placeholder}
          rows={3}
          className="w-full p-3 rounded-lg bg-muted/50 border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
        />
        <button
          onClick={runDemo}
          disabled={isProcessing || !input.trim()}
          className="hf-gradient-bg text-primary-foreground px-6 py-2.5 rounded-lg font-semibold transition-all hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Run
            </>
          )}
        </button>
      </div>

      {/* Output */}
      <AnimatePresence>
        {displayedOutput && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hf-card !p-4"
          >
            <label className="text-sm font-semibold mb-2 block">Output</label>
            <div className="p-4 rounded-lg bg-muted/30 font-mono text-sm whitespace-pre-wrap leading-relaxed">
              {displayedOutput}
              {displayedOutput.length < output.length && (
                <span className="typewriter-cursor" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIDemoModule;
