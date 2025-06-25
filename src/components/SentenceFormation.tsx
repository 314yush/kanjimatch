import React, { useState } from 'react';
import { Phrase } from '../types/Phrase';

interface SentenceFormationProps {
  phrase: Phrase;
  onComplete: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const SentenceFormation: React.FC<SentenceFormationProps> = ({ phrase, onComplete }) => {
  const [available, setAvailable] = useState(() => shuffle(phrase.jp_tiles.map((tile, i) => ({
    jp: tile,
    hiragana: phrase.hiragana_tiles[i],
    romanji: phrase.romanji_tiles[i],
    idx: i,
  }))));
  const [selected, setSelected] = useState<typeof available>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleTileClick = (idx: number) => {
    const tile = available[idx];
    setSelected([...selected, tile]);
    setAvailable(available.filter((_, i) => i !== idx));
    setFeedback(null);
  };

  const handleRemoveSelected = (idx: number) => {
    const tile = selected[idx];
    setAvailable([...available, tile]);
    setSelected(selected.filter((_, i) => i !== idx));
    setFeedback(null);
  };

  const handleSubmit = () => {
    const correct = phrase.jp_tiles.join('') === selected.map(t => t.jp).join('');
    if (correct) {
      setFeedback('correct');
      setTimeout(() => {
        setFeedback(null);
        setSelected([]);
        setAvailable(shuffle(phrase.jp_tiles.map((tile, i) => ({
          jp: tile,
          hiragana: phrase.hiragana_tiles[i],
          romanji: phrase.romanji_tiles[i],
          idx: i,
        }))));
        onComplete();
      }, 1000);
    } else {
      setFeedback('wrong');
      setShowAnswer(true);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded shadow p-4 mt-6">
      <h2 className="text-lg font-semibold mb-2 text-center">Form the Japanese sentence</h2>
      <div className="mb-4 text-center text-gray-700">{phrase.en}</div>
      <div className="flex flex-wrap gap-2 justify-center mb-4 min-h-[48px]">
        {selected.map((tile, i) => (
          <button
            key={i}
            className="px-3 py-2 rounded bg-blue-100 border border-blue-400 text-lg font-medium flex flex-col items-center"
            onClick={() => handleRemoveSelected(i)}
          >
            <span>{tile.jp}</span>
            <span className="text-xs text-blue-400">{tile.hiragana}</span>
            <span className="text-xs text-gray-400 italic">{tile.romanji}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {available.map((tile, i) => (
          <button
            key={i}
            className="px-3 py-2 rounded bg-gray-100 border border-gray-300 text-lg font-medium flex flex-col items-center hover:bg-blue-50"
            onClick={() => handleTileClick(i)}
          >
            <span>{tile.jp}</span>
            <span className="text-xs text-blue-400">{tile.hiragana}</span>
            <span className="text-xs text-gray-400 italic">{tile.romanji}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="bg-green-500 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
          disabled={selected.length !== phrase.jp_tiles.length}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {feedback === 'correct' && <div className="text-green-600 text-center mt-4">Correct!</div>}
      {feedback === 'wrong' && (
        <div className="text-red-600 text-center mt-4">
          Try again!<br />
          {showAnswer && (
            <div className="mt-2 text-sm text-gray-700">
              Correct: {phrase.jp_tiles.map((jp, i) => (
                <span key={i} className="inline-block mx-1 p-1 bg-gray-200 rounded">
                  {jp}
                  <span className="block text-xs text-blue-400">{phrase.hiragana_tiles[i]}</span>
                  <span className="block text-xs text-gray-400 italic">{phrase.romanji_tiles[i]}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SentenceFormation; 