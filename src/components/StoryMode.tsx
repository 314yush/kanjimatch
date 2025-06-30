import React, { useState, useMemo, useEffect } from 'react';
import { getTodaysStorySegment, StoryLine, StoryTile } from '../data/storyData';
import { SpeakerWaveIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAudio } from '../contexts/AudioProvider';

// Utility to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

interface StoryModeProps {
  onComplete: () => void;
}

const StoryMode: React.FC<StoryModeProps> = ({ onComplete }) => {
  const { speak, isLoading } = useAudio();
  const todaySegments = useMemo(() => getTodaysStorySegment(), []);

  // Initialize selectedAnswers with null for all fill-blank questions
  const initialSelectedAnswers = useMemo(() => {
    const answers: { [lineId: string]: string | null } = {};
    todaySegments.forEach(day => {
      day.lines.forEach(line => {
        if (line.type === 'fill-blank') {
          answers[line.id] = null;
        }
      });
    });
    return answers;
  }, [todaySegments]);

  // State
  const [selectedAnswers, setSelectedAnswers] = useState<{ [lineId: string]: string | null }>(initialSelectedAnswers);
  const [currentAttempt, setCurrentAttempt] = useState<{ [lineId: string]: string | null }>({});
  const [incorrectAttempts, setIncorrectAttempts] = useState<{ [lineId: string]: number }>({});
  const [shuffledTiles, setShuffledTiles] = useState<{ [lineId: string]: StoryTile[] }>({});

  // Memoize shuffled tiles so they don't re-shuffle on every render
  useEffect(() => {
    const newShuffledTiles: { [lineId: string]: StoryTile[] } = {};
    todaySegments.forEach(day => {
      day.lines.forEach(line => {
        if (line.type === 'fill-blank' && line.tiles) {
            newShuffledTiles[line.id] = shuffleArray(line.tiles);
        }
      });
    });
    setShuffledTiles(newShuffledTiles);
  }, [todaySegments]);

  const handleAnswerSelect = (line: StoryLine, selectedTile: StoryTile) => {
    if (currentAttempt[line.id] || selectedAnswers[line.id]) return;

    const isCorrect = selectedTile.jp === line.answer?.jp;
    setCurrentAttempt(prev => ({ ...prev, [line.id]: selectedTile.jp }));

    if (isCorrect) {
      setSelectedAnswers(prev => ({ ...prev, [line.id]: selectedTile.jp }));
    } else {
      setTimeout(() => {
        setCurrentAttempt(prev => ({ ...prev, [line.id]: null }));
      }, 1000); // Reset after 1s shake animation
    }
  };

  // --- Progress Calculation ---
  const storyInfo = useMemo(() => {
    const linesWithBlanks = todaySegments.flatMap(day => day.lines.filter(l => l.type === 'fill-blank'));
    const totalBlanks = linesWithBlanks.length;
    const correctBlanks = linesWithBlanks.filter(line => selectedAnswers[line.id] === line.answer?.jp).length;
    const allCorrect = correctBlanks === totalBlanks && totalBlanks > 0;
    const currentDayData = todaySegments[todaySegments.length - 1];

    const allLines = todaySegments.flatMap(day => day.lines);
    const lastLineId = allLines[allLines.length - 1]?.id;

    return { totalBlanks, correctBlanks, allCorrect, currentDayData, lastLineId };
  }, [todaySegments, selectedAnswers]);

  const { totalBlanks, correctBlanks, allCorrect, currentDayData, lastLineId } = storyInfo;
  
  const currentDialogueIndex = useMemo(() => {
    return todaySegments.flatMap(d => d.lines).findIndex(line => {
        return line.type === 'fill-blank' && selectedAnswers[line.id] !== line.answer?.jp;
    });
  }, [selectedAnswers, todaySegments]);


  const renderDialogue = (line: StoryLine, isLastLine: boolean) => {
    const isFillBlank = line.type === 'fill-blank';
    const isCorrectlyAnswered = isFillBlank && selectedAnswers[line.id] === line.answer?.jp;
    const isIncorrectAttempt = isFillBlank && currentAttempt[line.id] && !isCorrectlyAnswered;
    const filledInAnswer = isCorrectlyAnswered ? selectedAnswers[line.id] : null;

    return (
       <div key={line.id} className="flex flex-col gap-4 mb-4">
        {/* Dialogue Bubble */}
        <div className={`flex items-end gap-2 ${line.speaker === 'yuta' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="mb-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 text-2xl select-none font-bold ${line.speaker === 'yuta' ? 'bg-brand-secondary/30 border-brand-secondary text-brand-primary' : 'bg-pink-100 border-pink-300 text-pink-700'}`}>
                    {line.avatar}
                </div>
            </div>
            <div className={`flex-1 max-w-[85vw] sm:max-w-[80%]`}>
                <div className={`ui-card !p-3 mb-1 relative flex flex-col ${line.speaker === 'yuta' ? 'items-start' : 'items-end'}
                    ${isFillBlank && isCorrectlyAnswered ? '!bg-success/10 !border-success' : ''}
                    ${isFillBlank && isIncorrectAttempt ? '!bg-error/10 !border-error animate-shake' : ''}
                `}>
                     <button
                        onClick={() => speak(line.jp.replace('___', filledInAnswer || '___'))}
                        disabled={isLoading}
                        className="absolute top-2 left-2 p-1 rounded-full hover:bg-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-primary z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Play audio"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <SpeakerWaveIcon className="w-5 h-5 text-brand-primary" />
                        )}
                      </button>

                    <div className="text-base font-bold text-brand-text-primary mb-1 pl-7 pr-2 w-full break-words">
                        {line.jp.split('___').map((part, i) => (
                            <React.Fragment key={i}>
                                {part}
                                {i < line.jp.split('___').length - 1 && (
                                    <span className={`inline-block w-20 h-7 text-center leading-7 rounded-md mx-1 align-middle
                                        ${isFillBlank && isCorrectlyAnswered ? 'bg-success/20 text-success-dark' : 'bg-yellow-100 border-b-2 border-yellow-400'}`}>
                                        {filledInAnswer || '___'}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="text-xs text-brand-text-secondary mb-1 pl-7 w-full break-words">
                        {line.romaji.replace('___', filledInAnswer ? (line.tiles?.find(t=>t.jp === filledInAnswer)?.romaji || '...') : '___')}
                    </div>
                    <div className="text-sm text-brand-text-primary/80 pl-7 w-full break-words">
                        {line.en.replace('___', filledInAnswer || '___')}
                    </div>
                    
                    {isFillBlank && isCorrectlyAnswered && (
                         <div className="flex items-center gap-1 mt-2 text-success font-semibold">
                          <CheckIcon className="w-5 h-5 text-success" />
                          Correct!
                        </div>
                    )}
                     {isFillBlank && isIncorrectAttempt && (
                        <div className="flex items-center gap-1 mt-2 text-error font-semibold">
                          <XMarkIcon className="w-5 h-5 text-error" />
                          Try again!
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Answer Tiles */}
        {isFillBlank && !isCorrectlyAnswered && (
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            {(shuffledTiles[line.id] || line.tiles)?.map((tile) => (
              <button
                key={tile.jp}
                onClick={() => handleAnswerSelect(line, tile)}
                disabled={currentAttempt[line.id] != null}
                className={`px-4 py-2 rounded-xl border-2 text-base font-semibold bg-brand-surface text-brand-text-primary shadow cursor-pointer select-none transition-all duration-150 flex flex-col items-center w-32 
                    ${currentAttempt[line.id] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-primary/10 hover:border-brand-primary'}`}
              >
                <span className="text-lg">{tile.jp}</span>
                <span className="text-xs text-brand-text-secondary">{tile.romaji}</span>
              </button>
            ))}
          </div>
        )}

        {isLastLine && allCorrect && (
             <div className="w-full mt-8 pb-24">
                 <button
                    className="btn btn-primary w-full !py-4 !text-lg !tracking-wide"
                    onClick={onComplete}
                >
                    Finish
                </button>
             </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col">
        {/* Header */}
        <div className="text-center my-4 px-4">
            <h1 className="text-2xl font-bold text-brand-text-primary">{currentDayData.titleJp}</h1>
            <h2 className="text-md font-semibold text-brand-text-secondary">{currentDayData.title}</h2>
             <div className="w-full max-w-md mx-auto mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 bg-brand-surface-darker rounded-full overflow-hidden">
                    <div
                    className="h-2 bg-brand-primary rounded-full transition-all duration-300"
                    style={{ width: `${totalBlanks > 0 ? (correctBlanks / totalBlanks) * 100 : 0}%` }}
                    />
                </div>
                <span className="text-xs text-brand-text-secondary ml-2">{correctBlanks}/{totalBlanks}</span>
            </div>
        </div>
        
        <div className="text-center text-brand-text-secondary text-xs mb-4 px-4">
          New words: {currentDayData.newWords.map(w => `${w.jp} (${w.romaji})`).join(', ')}
        </div>

      {/* Dialogue */}
      <div className="flex-1 w-full max-w-md mx-auto px-4">
        {todaySegments.flatMap(day => day.lines).map((line, index, allLines) => {
            const isLastLine = index === allLines.length - 1;
            return renderDialogue(line, isLastLine);
        })}
      </div>
    </div>
  );
};

export default StoryMode; 