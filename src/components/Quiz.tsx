import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Award, RefreshCw, ChevronRight } from 'lucide-react';
import { quizQuestions } from '../content/quiz';

export default function Quiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedAnswerIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswerIdx === null || isSubmitted) return;
    setIsSubmitted(true);
    if (selectedAnswerIdx === quizQuestions[currentQuestionIdx].correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswerIdx(null);
    setIsSubmitted(false);
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  const getPercentage = () => Math.round((score / quizQuestions.length) * 100);

  const getFeedbackMessage = () => {
    const pct = getPercentage();
    if (pct === 100) return "Perfect Score! You know our story inside out. You're officially the ultimate partner!";
    if (pct >= 75) return "Amazing Job! You remember almost everything. We make a pretty great team!";
    if (pct >= 50) return "Not Bad! You got some details right, but we might need a coffee date recap soon!";
    return "Oops! Time to book a road trip and review our memories. Don't worry, I still love you!";
  };

  return (
    <section 
      id="quiz" 
      className="py-24 px-6 bg-zinc-950 border-b border-white/5 relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold font-serif text-zinc-100"
          >
            How Well Do You Know Us?
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[3px] bg-rose-500 mx-auto my-4 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-400 font-light"
          >
            A fun, interactive quiz to test your memory of our favorite milestones and silly details.
          </motion.p>
        </div>

        {/* Quiz Panel Container */}
        <div className="bg-zinc-900/40 border border-white/5 p-6 sm:p-10 rounded-3xl shadow-xl backdrop-blur-md relative min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!showResults ? (
              // QUESTION CARD VIEW
              <motion.div
                key={currentQuestionIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col h-full justify-between gap-6"
              >
                <div>
                  {/* Progress Header */}
                  <div className="flex justify-between items-center text-xs text-zinc-500 mb-6 font-semibold uppercase tracking-wider">
                    <span>Question {currentQuestionIdx + 1} of {quizQuestions.length}</span>
                    <span className="text-rose-400">Score: {score}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-violet-500 transition-all duration-300"
                      style={{ width: `${((currentQuestionIdx + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  {/* Question Text */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-100 text-left mb-8">
                    {quizQuestions[currentQuestionIdx].question}
                  </h3>

                  {/* Option List */}
                  <div className="space-y-3">
                    {quizQuestions[currentQuestionIdx].options.map((option, idx) => {
                      const isSelected = selectedAnswerIdx === idx;
                      const isCorrect = quizQuestions[currentQuestionIdx].correctAnswerIndex === idx;
                      
                      let optionStyle = "bg-white/5 border-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/10";
                      
                      if (isSelected) {
                        optionStyle = "bg-rose-500/10 border-rose-500 text-rose-400";
                      }
                      
                      if (isSubmitted) {
                        if (isCorrect) {
                          optionStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400 cursor-default";
                        } else if (isSelected) {
                          optionStyle = "bg-rose-500/10 border-rose-500 text-rose-400 cursor-default";
                        } else {
                          optionStyle = "bg-zinc-950/40 border-zinc-950/20 text-zinc-600 cursor-default pointer-events-none";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all duration-200 flex items-center justify-between gap-3 ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                          {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation and Buttons */}
                <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-left text-sm font-light leading-relaxed border ${
                        selectedAnswerIdx === quizQuestions[currentQuestionIdx].correctAnswerIndex
                          ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                          : 'bg-rose-950/20 border-rose-500/20 text-rose-300'
                      }`}
                    >
                      <span className="font-semibold block mb-1">
                        {selectedAnswerIdx === quizQuestions[currentQuestionIdx].correctAnswerIndex ? 'Correct!' : 'Not quite!'}
                      </span>
                      {quizQuestions[currentQuestionIdx].explanation}
                    </motion.div>
                  )}

                  <div className="flex justify-end gap-3">
                    {!isSubmitted ? (
                      <button
                        onClick={handleSubmit}
                        disabled={selectedAnswerIdx === null}
                        className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                          selectedAnswerIdx === null
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/10'
                        }`}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold uppercase tracking-wider shadow-lg transition-all duration-300 flex items-center gap-1.5"
                      >
                        <span>{currentQuestionIdx === quizQuestions.length - 1 ? 'See Results' : 'Next Question'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              // SUMMARY RESULTS VIEW
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center justify-between h-full py-6 gap-8"
              >
                <div className="space-y-6">
                  {/* Badge Icon */}
                  <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto animate-float">
                    <Award className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Your Score: <span className="text-rose-400">{score}</span> / {quizQuestions.length}
                    </h3>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
                      {getPercentage()}% Correct Answers
                    </p>
                  </div>

                  <p className="text-zinc-300 text-base max-w-md mx-auto leading-relaxed font-light font-serif italic">
                    "{getFeedbackMessage()}"
                  </p>
                </div>

                <button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
