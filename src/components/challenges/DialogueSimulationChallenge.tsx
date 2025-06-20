import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DialogueSimulationChallenge as DialogueSimulationChallengeType } from '../../types/Story';

interface DialogueSimulationChallengeProps {
  challenge: DialogueSimulationChallengeType;
  onComplete: (challengeId: string, isCorrect: boolean, points: number) => void;
  challengeNumber: number;
  totalChallenges: number;
}

const DialogueSimulationChallenge: React.FC<DialogueSimulationChallengeProps> = ({
  challenge,
  onComplete,
  challengeNumber,
  totalChallenges
}) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleChoiceSelect = (choiceIndex: number) => {
    if (showFeedback) return; // Prevent changing after submission
    setSelectedChoice(choiceIndex);
  };

  const handleSubmit = () => {
    if (selectedChoice === null) return;

    const correct = selectedChoice === challenge.correctChoiceIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Show the response after a short delay
    setTimeout(() => {
      setShowResponse(true);
    }, 1000);

    setTimeout(() => {
      onComplete(challenge.id, correct, correct ? challenge.points : 0);
    }, 3000);
  };

  const getChoiceClass = (choiceIndex: number) => {
    if (!showFeedback) {
      return selectedChoice === choiceIndex
        ? 'bg-blue-100 border-blue-500 text-blue-700'
        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50';
    }

    if (choiceIndex === challenge.correctChoiceIndex) {
      return 'bg-green-100 border-green-500 text-green-700';
    }

    if (selectedChoice === choiceIndex && choiceIndex !== challenge.correctChoiceIndex) {
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
          {/* Scenario */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Scenario:</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800">{challenge.scenario}</p>
              {challenge.scenarioJp && (
                <p className="text-gray-600 mt-2 italic">{challenge.scenarioJp}</p>
              )}
            </div>
          </div>

          {/* Your Choices */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose your response:</h3>
            <div className="space-y-3">
              {challenge.userChoices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${getChoiceClass(index)}`}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{choice}</div>
                      {challenge.userChoicesJp && challenge.userChoicesJp[index] && (
                        <div className="text-sm opacity-75 mt-1">{challenge.userChoicesJp[index]}</div>
                      )}
                    </div>
                    {showFeedback && index === challenge.correctChoiceIndex && (
                      <div className="flex-shrink-0 text-green-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    {showFeedback && selectedChoice === index && index !== challenge.correctChoiceIndex && (
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

          {/* Response (shown after feedback) */}
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Response:</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-800">{challenge.responses[selectedChoice!]}</p>
                {challenge.responsesJp && challenge.responsesJp[selectedChoice!] && (
                  <p className="text-gray-600 mt-2 italic">{challenge.responsesJp[selectedChoice!]}</p>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Submit Button */}
        {!showFeedback && (
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={selectedChoice === null}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Choice
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
              {isCorrect ? 'Great choice!' : 'Not quite right'}
            </h3>
            <p className="text-gray-700 mb-3">
              {isCorrect ? 'You chose the most appropriate response!' : `The best choice was: "${challenge.userChoices[challenge.correctChoiceIndex]}"`}
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

export default DialogueSimulationChallenge; 