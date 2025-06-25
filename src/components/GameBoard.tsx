import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useGameState from '../hooks/useGameState';
import useDailyChallenge from '../hooks/useDailyChallenge';
import VocabularyCard from './VocabularyCard';
import { motion, AnimatePresence } from 'framer-motion';

const GameBoard: React.FC = () => {
  const { challenge, loading, error } = useDailyChallenge();
  const {
    gameState,
    startGame,
    selectCard,
    makeMatch,
    resetSelection,
    handleFailedAttempt,
    isMatchValid,
    getGameTime,
  } = useGameState();
  const [feedback, setFeedback] = useState<{
    ids: string[];
    type: 'correct' | 'wrong' | null;
  }>({ ids: [], type: null });

  useEffect(() => {
    if (challenge && !loading) {
      startGame(challenge);
    }
  }, [challenge, loading, startGame]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading challenge: {error}
      </div>
    );
  }

  if (!gameState.currentChallenge) {
    return null;
  }

  const { vocabulary } = gameState.currentChallenge;
  const englishWords = vocabulary.filter(word => word.english);
  const japaneseWords = vocabulary.filter(word => word.japanese);

  const handleCardClick = (cardId: string, type: 'english' | 'japanese') => {
    if (gameState.gameStatus !== 'playing') return;

    if (!gameState.selectedCard) {
      selectCard(cardId);
    } else {
      const [firstType, firstId] = gameState.selectedCard.split('-');
      const secondType = type;
      const secondId = cardId;

      if (firstType === secondType) {
        resetSelection();
        return;
      }

      const englishId = firstType === 'english' ? firstId : secondId;
      const japaneseId = firstType === 'japanese' ? firstId : secondId;

      if (isMatchValid(englishId, japaneseId)) {
        setFeedback({ ids: [`${firstType}-${firstId}`, `${secondType}-${secondId}`], type: 'correct' });
        setTimeout(() => setFeedback({ ids: [], type: null }), 600);
        makeMatch(englishId, japaneseId);
      } else {
        setFeedback({ ids: [`${firstType}-${firstId}`, `${secondType}-${secondId}`], type: 'wrong' });
        setTimeout(() => setFeedback({ ids: [], type: null }), 600);
        handleFailedAttempt();
        resetSelection();
      }
    }
  };

  const isCardSelected = (cardId: string) => gameState.selectedCard === cardId;
  const isCardMatched = (cardId: string) => 
    Object.values(gameState.userMatches).includes(cardId) ||
    Object.keys(gameState.userMatches).includes(cardId);

  // Progress calculation
  const totalMatches = gameState.currentChallenge ? gameState.currentChallenge.vocabulary.length : 0;
  const matchedCount = Object.keys(gameState.userMatches).length;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-2 flex flex-col items-center">
          <div className="flex justify-between items-center w-full max-w-lg mb-1">
            <h1 className="text-2xl font-bold">KanjiMatch</h1>
            <div className="flex gap-2 items-center">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Attempts: {gameState.attemptsLeft}</span>
              <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">Time: {getGameTime()}s</span>
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-2 text-center">Match the English word to its Japanese equivalent!</div>
          <div className="w-full max-w-lg flex justify-end mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Progress: {matchedCount}/{totalMatches}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* English Words */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">English</h2>
            <div className="grid grid-cols-1 gap-2">
              {englishWords.map((word) => (
                <VocabularyCard
                  key={word.id}
                  word={word.english}
                  type="english"
                  id={`english-${word.id}`}
                  isSelected={isCardSelected(`english-${word.id}`)}
                  isMatched={isCardMatched(`english-${word.id}`)}
                  onClick={() => handleCardClick(word.id, 'english')}
                  feedback={feedback.ids.includes(`english-${word.id}`) ? feedback.type : null}
                />
              ))}
            </div>
          </div>

          {/* Japanese Words */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Japanese</h2>
            <div className="grid grid-cols-1 gap-2">
              {japaneseWords.map((word) => (
                <VocabularyCard
                  key={word.id}
                  word={word.japanese}
                  type="japanese"
                  id={`japanese-${word.id}`}
                  isSelected={isCardSelected(`japanese-${word.id}`)}
                  isMatched={isCardMatched(`japanese-${word.id}`)}
                  onClick={() => handleCardClick(word.id, 'japanese')}
                  feedback={feedback.ids.includes(`japanese-${word.id}`) ? feedback.type : null}
                  hiragana={word.hiragana}
                  romanji={word.romanji}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Game Status Messages */}
        <AnimatePresence>
          {gameState.gameStatus === 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Congratulations!</h2>
                <p className="mb-4">You completed the challenge in {getGameTime()} seconds!</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}

          {gameState.gameStatus === 'failed' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Game Over</h2>
                <p className="mb-4">You've run out of attempts!</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DndProvider>
  );
};

export default GameBoard; 