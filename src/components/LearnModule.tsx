import { useState, useCallback } from "react";
import { lessons } from "@/data/lessons";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, BookOpen } from "lucide-react";

interface LearnModuleProps {
  completedLessons: Set<number>;
  onComplete: (lessonId: number) => void;
}

const LearnModule = ({ completedLessons, onComplete }: LearnModuleProps) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const lesson = lessons[currentLesson];
  const isCorrect = selectedAnswer === lesson.quiz.correctAnswer;

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF9D00", "#FF6D00", "#FFD700", "#FFA500"],
    });
  }, []);

  const handleAnswer = (label: string) => {
    if (answered) return;
    setSelectedAnswer(label);
    setAnswered(true);
    if (label === lesson.quiz.correctAnswer) {
      onComplete(lesson.id);
      fireConfetti();
    }
  };

  const goToLesson = (index: number) => {
    setCurrentLesson(index);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      goToLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      goToLesson(currentLesson - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-3">
        {lessons.map((l, i) => (
          <button
            key={l.id}
            onClick={() => goToLesson(i)}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              i === currentLesson
                ? "hf-gradient-bg text-primary-foreground scale-110 hf-glow"
                : completedLessons.has(l.id)
                ? "bg-hf-success/20 text-hf-success border-2 border-hf-success"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {completedLessons.has(l.id) ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              i + 1
            )}
          </button>
        ))}
      </div>

      {/* Lesson Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLesson}-${showQuiz}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="hf-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{lesson.emoji}</span>
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Lesson {lesson.id} of {lessons.length}
              </p>
              <h2 className="text-xl font-bold font-display">{lesson.title}</h2>
            </div>
            {completedLessons.has(lesson.id) && (
              <span className="ml-auto text-hf-success text-sm font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Complete
              </span>
            )}
          </div>

          {!showQuiz ? (
            <>
              <div className="space-y-3 mb-6">
                {lesson.content.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-foreground/80 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="hf-gradient-bg text-primary-foreground px-6 py-2.5 rounded-lg font-semibold transition-all hover:opacity-90 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Take Quiz
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{lesson.quiz.question}</h3>
              <div className="grid gap-3">
                {lesson.quiz.options.map((opt) => {
                  const isSelected = selectedAnswer === opt.label;
                  const isRight = opt.label === lesson.quiz.correctAnswer;
                  let optionClass = "border bg-card hover:bg-muted/50";
                  if (answered) {
                    if (isRight) optionClass = "border-2 border-hf-success bg-hf-success/10";
                    else if (isSelected && !isRight) optionClass = "border-2 border-hf-error bg-hf-error/10";
                  } else if (isSelected) {
                    optionClass = "border-2 border-primary bg-primary/5";
                  }
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(opt.label)}
                      disabled={answered}
                      className={`flex items-center gap-3 p-4 rounded-lg text-left transition-all ${optionClass}`}
                    >
                      <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-mono font-bold text-sm">
                        {opt.label}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {answered && isRight && <CheckCircle2 className="w-5 h-5 text-hf-success" />}
                      {answered && isSelected && !isRight && <XCircle className="w-5 h-5 text-hf-error" />}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg ${
                    isCorrect ? "bg-hf-success/10 border border-hf-success/30" : "bg-hf-error/10 border border-hf-error/30"
                  }`}
                >
                  <p className="font-semibold">
                    {isCorrect ? "🎉 Correct! Well done!" : "❌ Not quite. The correct answer is " + lesson.quiz.correctAnswer + "."}
                  </p>
                  {isCorrect && <p className="text-sm text-muted-foreground mt-1">Lesson marked as complete!</p>}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevLesson}
          disabled={currentLesson === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground disabled:opacity-30 transition-all hover:bg-secondary/80"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={nextLesson}
          disabled={currentLesson === lessons.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground disabled:opacity-30 transition-all hover:bg-secondary/80"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LearnModule;
