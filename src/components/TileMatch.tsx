import React, { useState, useMemo, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { getDailyVocabularyContent } from '../utils/dailyContent';
import { InformationCircleIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { useAudio } from '../contexts/AudioProvider';

interface TileMatchProps {
  onComplete: () => void;
  numPairs?: number;
}

const JapaneseTile = ({ tile, index, onInfoClick, showInfo }: { tile: any; index: number; onInfoClick: () => void; showInfo: boolean; }) => {
  const { speak } = useAudio();

  return (
    <Draggable draggableId={tile.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`btn btn-outline !border-brand-surface-darker w-full !justify-between text-left min-h-[56px] relative transition-all group
            ${snapshot.isDragging ? 'shadow-lg scale-105' : 'shadow-sm'}`}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div className="flex items-center gap-4">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    speak(tile.japanese);
                }}
                className="p-1 rounded-full hover:bg-brand-secondary/30 text-brand-text-secondary hover:text-brand-primary"
            >
                <SpeakerWaveIcon className="w-5 h-5" />
            </button>
            <span className="jp-text text-base" {...provided.dragHandleProps}>{tile.japanese}</span>
          </div>
          
          <div className="relative">
              <button
                  onClick={(e) => {
                      e.stopPropagation();
                      onInfoClick();
                  }}
                  className="p-1 rounded-full hover:bg-brand-secondary/30 text-brand-text-secondary hover:text-brand-primary"
              >
                  <InformationCircleIcon className="w-5 h-5" />
              </button>
              {showInfo && (
                  <div className="absolute bottom-full right-0 mb-2 w-max max-w-xs bg-white rounded-lg shadow-lg p-3 border border-brand-surface-darker z-10">
                      <p className="text-sm text-brand-text-primary font-mono">{tile.romanji}</p>
                  </div>
              )}
          </div>

        </div>
      )}
    </Draggable>
  );
};

const EnglishTarget = ({ tile, onDrop, isMatched, matchedWord }: { tile: any; onDrop: (id: string) => void; isMatched: boolean; matchedWord: string | null }) => (
  <Droppable droppableId={tile.id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`btn w-full !justify-start text-left min-h-[68px] relative transition-all flex flex-col items-start
          ${isMatched ? 'btn-outline border-success/50 bg-success/20 !text-success-dark' : ''}
          ${snapshot.isDraggingOver && !isMatched ? 'bg-brand-secondary/30 ring-2 ring-brand-primary' : ''}
          ${!isMatched ? 'btn-outline !border-brand-surface-darker bg-brand-surface' : ''}
        `}
      >
        <span className="font-semibold">{tile.text}</span>
        {isMatched && matchedWord && (
          <span className="text-sm font-bold jp-text mt-1">{matchedWord}</span>
        )}
        {!isMatched && snapshot.isDraggingOver && (
            <span className="text-xs font-semibold text-brand-primary mt-1">Drop here</span>
        )}
      </div>
    )}
  </Droppable>
);

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const TileMatch: React.FC<TileMatchProps> = ({ onComplete, numPairs = 5 }) => {
  const pairs = useMemo(() => {
    // Use daily content system to get consistent pairs for the day
    const today = new Date();
    return getDailyVocabularyContent(today);
  }, []);

  // Shuffle English and Japanese tiles independently, ensuring no pair is aligned
  const [englishTiles, japaneseTilesData] = useMemo(() => {
    let english: { id: string, text: string }[];
    let japanese: { id: string, japanese: string, romanji: string }[];
    let attempts = 0;
    do {
      english = shuffle(pairs.map(p => ({ id: p.id, text: p.english })));
      japanese = shuffle(pairs.map(p => ({ id: p.id, japanese: p.japanese, romanji: p.romanji || '' })));
      attempts++;
      // Check if any pair is aligned
      // If so, reshuffle
    } while (
      english.some((e, idx) => e.id === japanese[idx].id) && attempts < 20
    );
    return [english, japanese];
  }, [pairs]);

  const [japaneseTiles, setJapaneseTiles] = useState(japaneseTilesData);
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: string }>({});
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showRomaji, setShowRomaji] = useState<string | null>(null);

  const handleDrop = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (draggableId === destination.droppableId) {
      setMatchedPairs(prev => ({ ...prev, [destination.droppableId]: draggableId }));
      setJapaneseTiles(prev => prev.filter(t => t.id !== draggableId));
      setActiveInfo(null);
    }
  };

  const allMatched = Object.keys(matchedPairs).length === pairs.length;
  useEffect(() => {
    if (allMatched && onComplete) {
      setTimeout(onComplete, 1000);
    }
  }, [allMatched, onComplete]);
  

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <div className="ui-card w-full max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-center text-brand-text-primary">Match the words</h2>
        <p className="text-brand-text-secondary mb-8 text-center">Drag the Japanese word to its English translation.</p>
        
        <div className="w-full grid grid-cols-2 gap-x-4 sm:gap-x-8">
            {/* English Targets */}
            <div className="flex-1 flex flex-col gap-3">
                <h3 className="font-bold text-center mb-2 text-brand-text-secondary">English</h3>
                {englishTiles.map(tile => (
                    <EnglishTarget
                    key={tile.id}
                    tile={tile}
                    onDrop={() => {}}
                    isMatched={!!matchedPairs[tile.id]}
                    matchedWord={matchedPairs[tile.id] ? japaneseTilesData.find(t => t.id === matchedPairs[tile.id])?.japanese ?? null : null}
                    />
                ))}
            </div>

            {/* Japanese Draggables */}
            <Droppable droppableId="japanese-tiles">
              {(provided, snapshot) => (
                <div 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                  className="flex-1 flex flex-col gap-3"
                >
                  <h3 className="font-bold text-center mb-2 text-brand-text-secondary">Japanese</h3>
                  {japaneseTiles.map((tile, index) => (
                    <JapaneseTile 
                        key={tile.id}
                        tile={tile} 
                        index={index} 
                        showInfo={activeInfo === tile.id}
                        onInfoClick={() => setActiveInfo(activeInfo === tile.id ? null : tile.id)}
                    />
                  ))}
                  {provided.placeholder}
                  {japaneseTiles.length === 0 && (
                    <div className="text-center text-brand-text-secondary p-4 rounded-lg bg-brand-surface mt-4">
                        All matched!
                    </div>
                  )}
                </div>
              )}
            </Droppable>
        </div>
        
        {/* Continue Button */}
        <div className="mt-8 w-full flex justify-center">
          <button
            className="btn btn-primary w-full max-w-sm"
            disabled={!allMatched}
            onClick={onComplete}
          >
            {allMatched ? "Great Job! Continue" : "Complete the matches"}
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TileMatch; 