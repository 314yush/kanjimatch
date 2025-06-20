import React from 'react';
import { motion } from 'framer-motion';

interface VocabularyCardProps {
  word: string;
  type: 'english' | 'japanese';
  id: string;
  isSelected: boolean;
  isMatched: boolean;
  onClick: () => void;
  feedback?: 'correct' | 'wrong' | null;
  hiragana?: string;
  romanji?: string;
}

const heartbeatVariants = {
  correct: {
    scale: [1, 1.15, 0.95, 1.1, 1],
    boxShadow: [
      '0 0 0px 0px #22c55e',
      '0 0 8px 4px #22c55e',
      '0 0 0px 0px #22c55e',
      '0 0 6px 2px #22c55e',
      '0 0 0px 0px #22c55e',
    ],
    transition: { duration: 0.6, times: [0, 0.2, 0.5, 0.8, 1] },
  },
  wrong: {
    scale: [1, 1.15, 0.95, 1.1, 1],
    boxShadow: [
      '0 0 0px 0px #ef4444',
      '0 0 8px 4px #ef4444',
      '0 0 0px 0px #ef4444',
      '0 0 6px 2px #ef4444',
      '0 0 0px 0px #ef4444',
    ],
    transition: { duration: 0.6, times: [0, 0.2, 0.5, 0.8, 1] },
  },
  none: {},
};

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  type,
  id,
  isSelected,
  isMatched,
  onClick,
  feedback = null,
  hiragana,
  romanji,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)', borderColor: '#2563eb' }}
      whileTap={{ scale: 0.98 }}
      animate={feedback ? feedback : 'none'}
      variants={heartbeatVariants}
      className={`
        p-4 rounded-lg shadow cursor-pointer
        ${isMatched 
          ? 'bg-green-100 border-green-500' 
          : isSelected 
            ? 'bg-blue-100 border-blue-500' 
            : 'bg-white border-gray-200'
        }
        border-2 transition-colors duration-200 focus:outline-none
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      style={{ boxShadow: undefined }}
    >
      <div className="text-center font-medium">
        {word}
      </div>
      {type === 'japanese' && (hiragana || romanji) && (
        <div className="text-xs text-gray-500 text-center mt-1">
          {hiragana ? hiragana : ''} {romanji ? `(${romanji})` : ''}
        </div>
      )}
    </motion.div>
  );
};

export default VocabularyCard; 