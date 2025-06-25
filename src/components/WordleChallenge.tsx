import React, { useMemo, useState, useEffect } from 'react';
import { getDailyWordleWord, WordleWord, wordleWords } from '../data/vocabularyData';

const MAX_ATTEMPTS = 6;

// Feedback: 'correct' (green), 'present' (yellow), 'absent' (gray)
type Feedback = 'correct' | 'present' | 'absent';

function getFeedback(guess: string, answer: string): Feedback[] {
  const feedback: Feedback[] = Array(answer.length).fill('absent');
  const answerUsed = Array(answer.length).fill(false);

  // First pass: correct (green)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      feedback[i] = 'correct';
      answerUsed[i] = true;
    }
  }
  
  // Second pass: present (yellow)
  for (let i = 0; i < guess.length; i++) {
    if (feedback[i] === 'correct') continue;
    const idx = answer.indexOf(guess[i]);
    if (idx !== -1 && !answerUsed[idx]) {
      feedback[i] = 'present';
      answerUsed[idx] = true;
    }
  }
  
  return feedback;
}

interface WordleChallengeProps {
  onComplete?: () => void;
}

const WordleChallenge: React.FC<WordleChallengeProps> = ({ onComplete }) => {
  const dailyWord = useMemo(getDailyWordleWord, []);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  useEffect(() => {
    if (guesses.length > 0) {
      const lastGuess = guesses[guesses.length - 1];
      if (lastGuess === dailyWord.romaji) {
        setGameStatus('won');
        setTimeout(() => onComplete?.(), 2000);
      } else if (guesses.length >= MAX_ATTEMPTS) {
        setGameStatus('lost');
        setTimeout(() => onComplete?.(), 3000);
      }
    }
  }, [guesses, dailyWord.romaji, onComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(e.target.value.toLowerCase().replace(/[^a-z\s]/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentGuess.trim() && gameStatus === 'playing') {
      setGuesses([...guesses, currentGuess.trim()]);
      setCurrentGuess('');
    }
  };

  const renderRow = (guess: string, isCurrent?: boolean) => {
    const wordLength = dailyWord.romaji.length;
    let feedback: Feedback[] = Array(wordLength).fill('absent');
    
    if (!isCurrent && guess) {
      feedback = getFeedback(guess, dailyWord.romaji);
    }

    return (
      <div className="flex gap-2 justify-center">
        {Array.from({ length: wordLength }).map((_, i) => {
          const letter = (isCurrent ? currentGuess[i] : guess[i]) || '';
          let tileStyle = 'bg-brand-surface border-2 border-brand-surface-darker';
          
          if (!isCurrent && guess[i]) {
            if (feedback[i] === 'correct') tileStyle = 'bg-success text-white';
            else if (feedback[i] === 'present') tileStyle = 'bg-warning text-white';
            else tileStyle = 'bg-brand-surface-darker text-brand-text-secondary';
          } else if (isCurrent && letter) {
            tileStyle = 'bg-white border-2 border-brand-primary';
          }
          
          return (
            <div
              key={i}
              className={`w-12 h-12 flex items-center justify-center rounded-lg text-lg font-bold transition-all duration-200 ${tileStyle}`}
            >
              {letter.toUpperCase()}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="ui-card w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-brand-text-primary mb-1">KanjiMatch Wordle</h1>
          <p className="text-brand-text-secondary text-sm">Guess the Japanese word in romaji</p>
        </div>

        <div className="mb-6 p-4 bg-brand-secondary/20 rounded-lg text-center flex items-center justify-center gap-4">
            <div className="text-3xl">{dailyWord.hint.emoji || '👥'}</div>
            <p className="text-brand-text-primary text-sm font-medium">{dailyWord.hint.description}</p>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIdx) => (
            <div key={rowIdx}>{renderRow(guesses[rowIdx] ?? '', false)}</div>
          ))}
        </div>

        {gameStatus === 'playing' ? (
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <input
              className="input flex-1"
              placeholder={`e.g. ${dailyWord.romaji.length} letters`}
              value={currentGuess}
              onChange={handleInputChange}
              maxLength={dailyWord.romaji.length}
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={currentGuess.length !== dailyWord.romaji.length}
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center p-4 bg-brand-surface-darker rounded-lg">
             <div className="text-lg font-bold mb-1">{dailyWord.japanese}</div>
             <div className="text-brand-text-secondary font-mono">{dailyWord.romaji}</div>
             <div className="text-sm text-brand-text-primary">{dailyWord.english}</div>
             
             {gameStatus === 'won' && (
                 <p className="text-success font-semibold mt-2">🎉 You got it in {guesses.length} tries!</p>
             )}
             {gameStatus === 'lost' && (
                 <p className="text-error font-semibold mt-2">So close! Better luck next time.</p>
             )}
           </div>
        )}
    </div>
  );
};

export default WordleChallenge; 