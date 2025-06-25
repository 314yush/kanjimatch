import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FillInBlankChallenge as FillInBlankChallengeType } from '../../types/Story';

interface FillInBlankChallengeProps {
  challenge: FillInBlankChallengeType;
  onComplete: (challengeId: string, isCorrect: boolean, points: number) => void;
  challengeNumber: number;
  totalChallenges: number;
}

const FillInBlankChallenge: React.FC<FillInBlankChallengeProps> = ({
  challenge,
  onComplete,
  challengeNumber,
  totalChallenges
}) => {
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const correct = answer.trim().toLowerCase() === challenge.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);

    setTimeout(() => {
      onComplete(challenge.id, correct, correct ? challenge.points : 0);
    }, 2000);
  };

  const renderSentence = () => {
    const words = challenge.sentence.split(' ');
    return words.map((word, index) => {
      if (index === challenge.blankPosition - 1) {
        return (
          <span key={index} className="inline-block">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-24 px-2 py-1 border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-center font-semibold"
              placeholder="___"
              autoFocus
            />
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
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
          {/* English Sentence */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Complete the sentence:</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-lg">
              {renderSentence()}
            </div>
          </div>

          {/* Japanese Translation */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Japanese:</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-lg mb-1">{challenge.sentenceJp}</div>
              <div className="text-sm text-gray-600 italic">{challenge.sentenceRomaji}</div>
            </div>
          </div>

          {/* Hint */}
          {challenge.hint && (
            <div className="mb-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Hint:</strong> {challenge.hint}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Form */}
        {!showFeedback && (
          <form onSubmit={handleSubmit} className="text-center">
            <button
              type="submit"
              disabled={!answer.trim()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Answer
            </button>
          </form>
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

export default FillInBlankChallenge; 