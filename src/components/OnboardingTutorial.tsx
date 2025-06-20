import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GemIcon from './GemIcon';

const steps = [
  {
    title: 'Welcome to Kanjimatch!',
    content: (
      <>
        <p className="text-lg text-center mb-4">Learn Japanese every day, earn <span className="inline-flex items-center"><GemIcon className="w-5 h-5 inline-block mx-1" />gems</span>, and build your streak <span role="img" aria-label="fire">🔥</span>!</p>
        <p className="text-center text-brand-text-secondary">Play daily, collect rewards, and master new words.</p>
      </>
    ),
    visual: <GemIcon className="w-16 h-16 mx-auto text-blue-400" />,
  },
  {
    title: '3 Fun Game Modes',
    content: (
      <>
        <ul className="space-y-2 text-left">
          <li><span className="font-bold">TileMatch</span>: Match Japanese words to their English meanings 🀄</li>
          <li><span className="font-bold">Wordle</span>: Guess the daily word in romaji 📝</li>
          <li><span className="font-bold">StoryMode</span>: Fill in the blanks in a fun story 📖</li>
        </ul>
      </>
    ),
    visual: (
      <div className="flex justify-center gap-4 mt-4">
        <span className="text-4xl">🀄</span>
        <span className="text-4xl">📝</span>
        <span className="text-4xl">📖</span>
      </div>
    ),
  },
  {
    title: 'How to Win',
    content: (
      <>
        <p className="text-center mb-2">Complete <span className="font-bold">all 3 modes</span> in a day to earn <span className="inline-flex items-center"><GemIcon className="w-5 h-5 inline-block mx-1" />gems</span> and keep your <span role="img" aria-label="fire">🔥</span> streak alive!</p>
        <p className="text-center text-brand-text-secondary">Come back every day to grow your streak and collect more gems.</p>
      </>
    ),
    visual: (
      <div className="flex justify-center gap-4 mt-4">
        <GemIcon className="w-10 h-10" />
        <span className="text-3xl">+</span>
        <span className="text-4xl">🔥</span>
      </div>
    ),
  },
];

const OnboardingTutorial: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const currentStep = steps[step] || steps[steps.length - 1];

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-4 py-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xs mx-auto flex flex-col items-center"
        >
          <div className="mb-4">{currentStep.visual}</div>
          <h2 className="text-2xl font-bold text-center mb-2">{currentStep.title}</h2>
          <div className="mb-6">{currentStep.content}</div>
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          {step < steps.length - 1 ? (
            <button
              className="btn btn-primary w-full py-3 text-lg"
              onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-success w-full py-3 text-lg animate-bounce"
              onClick={onFinish}
            >
              Get Started
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingTutorial; 