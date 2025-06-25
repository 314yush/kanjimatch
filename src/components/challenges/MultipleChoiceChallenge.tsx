import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MultipleChoiceChallenge as MultipleChoiceChallengeType } from '../../types/Story';

interface MultipleChoiceChallengeProps {
  challenge: MultipleChoiceChallengeType;
  onComplete: (challengeId: string, isCorrect: boolean, points: number) => void;
  challengeNumber: number;
  totalChallenges: number;
}

const MultipleChoiceChallenge: React.FC<MultipleChoiceChallengeProps> = ({
  challenge,
  onComplete,
  challengeNumber,
  totalChallenges
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return; // Prevent changing after submission
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === challenge.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete(challenge.id, correct, correct ? challenge.points : 0);
    }, 2000);
  };

  const getOptionClass = (option: string) => {
    if (!showFeedback) {
      return selectedAnswer === option
        ? 'bg-blue-100 border-blue-500 text-blue-700'
        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';
    }

    if (option === challenge.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700';
    }

    if (selectedAnswer === option && option !== challenge.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-700';
    }

    return 'bg-gray-100 border-gray-300 text-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-sm text-gray-500 mb-2">
            Challenge {challengeNumber} of {totalChallenges}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{challenge.question}</h2>
          {challenge.questionJp && (
            <p className="text-gray-600">{challenge.questionJp}</p>
          )}
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
            {challenge.difficulty} • {challenge.points} points
          </div>
        </div>

        {/* Challenge Content */}
        <div className="mb-8">
          {/* Options */}
          <div className="space-y-3">
            {challenge.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${getOptionClass(option)}`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-semibold">
                    {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option}</div>
                    {challenge.optionsJp && challenge.optionsJp[index] && (
                      <div className="text-sm opacity-75 mt-1">{challenge.optionsJp[index]}</div>
                    )}
                  </div>
                  {showFeedback && option === challenge.correctAnswer && (
                    <div className="flex-shrink-0 text-green-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {showFeedback && selectedAnswer === option && option !== challenge.correctAnswer && (
                    <div className="flex-shrink-0 text-red-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        {!showFeedback && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Answer
            </button>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center p-6 rounded-lg ${
              isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="text-4xl mb-2">
              {isCorrect ? '✅' : '❌'}
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </h3>
            <p className="text-gray-700 mb-3">
              {isCorrect ? 'Great job!' : `The correct answer was: "${challenge.correctAnswer}"`}
            </p>
            <div className="bg-white rounded p-4 mb-4">
              <p className="text-sm text-gray-600">{challenge.explanation}</p>
            </div>
            <div className="text-sm text-gray-500">
              {isCorrect ? `+${challenge.points} points` : '+0 points'}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MultipleChoiceChallenge; 