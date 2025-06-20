import React, { useState } from 'react';
import { Phrase } from '../types/Phrase';

interface MatchTheFollowingProps {
  phrases: Phrase[];
  onComplete: () => void;
}

const shuffle = <T,>(arr: T[]): T[] => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const MatchTheFollowing: React.FC<MatchTheFollowingProps> = ({ phrases, onComplete }) => {
  const [englishOrder] = useState(() => shuffle(phrases));
  const [japaneseOrder] = useState(() => shuffle(phrases));
  const [selectedEng, setSelectedEng] = useState<string | null>(null);
  const [selectedJp, setSelectedJp] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [engId: string]: string }>({});
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleEngClick = (id: string) => {
    if (matches[id]) return; // already matched
    setSelectedEng(id);
    setFeedback(null);
  };

  const handleJpClick = (id: string) => {
    if (Object.values(matches).includes(id)) return; // already matched
    setSelectedJp(id);
    setFeedback(null);
    if (selectedEng) {
      if (selectedEng === id) {
        setMatches(prev => ({ ...prev, [selectedEng]: id }));
        setFeedback('correct');
      } else {
        setFeedback('wrong');
      }
      setTimeout(() => {
        setSelectedEng(null);
        setSelectedJp(null);
        setFeedback(null);
      }, 700);
    }
  };

  const allMatched = Object.keys(matches).length === phrases.length;

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded shadow p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Match the Following</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2 text-center">English</h3>
          {englishOrder.map((p) => (
            <button
              key={p.id}
              className={`w-full mb-2 p-2 rounded border text-left transition
                ${matches[p.id] ? 'bg-green-100 border-green-400 text-gray-400' : ''}
                ${selectedEng === p.id ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'}
              `}
              disabled={!!matches[p.id]}
              onClick={() => handleEngClick(p.id)}
            >
              {p.en}
            </button>
          ))}
        </div>
        <div>
          <h3 className="font-bold mb-2 text-center">Japanese</h3>
          {japaneseOrder.map((p) => {
            const romanji = p.romanji;
            const hiragana = p.hiragana;
            return (
              <button
                key={p.id}
                className={`w-full mb-2 p-2 rounded border text-left transition
                  ${Object.values(matches).includes(p.id) ? 'bg-green-100 border-green-400 text-gray-400' : ''}
                  ${selectedJp === p.id ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'}
                `}
                disabled={Object.values(matches).includes(p.id)}
                onClick={() => handleJpClick(p.id)}
              >
                <div>{p.jp}</div>
                <div className="text-xs text-blue-400 mt-1">{hiragana}</div>
                <div className="text-xs text-gray-400 italic mt-1">{romanji}</div>
              </button>
            );
          })}
        </div>
      </div>
      {feedback === 'correct' && <div className="text-green-600 text-center mt-4">Correct!</div>}
      {feedback === 'wrong' && <div className="text-red-600 text-center mt-4">Try again!</div>}
      {allMatched && (
        <button
          className="mt-6 w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600"
          onClick={onComplete}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default MatchTheFollowing; 