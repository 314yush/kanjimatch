import { useEffect, useState } from 'react';
import type { DailyChallenge, VocabularyPair } from '../types/Vocabulary';
import { getVocabularySample, vocabularyDatabase } from '../data/vocabularyData';

// Re-defining interfaces here for now, can be moved to a central types file later
// interface VocabularyPair { ... } // Remove this
// interface DailyChallenge { ... } // Remove this

// Placeholder for vocabulary data - this will come from vocabularyData.ts
// const allVocabulary: VocabularyPair[] = [ ... ]; // This should now use the imported VocabularyPair and likely vocabularyDatabase from vocabularyData.ts
// For now, I will keep the local allVocabulary to ensure the hook still functions, but will use the imported types.
// A proper fix would be to import `getVocabularySample` or `vocabularyDatabase` from `vocabularyData.ts`.

const allVocabulary: VocabularyPair[] = [
  { id: 'temp-1', english: 'Apple', japanese: 'りんご', category: 'Fruit' },
  { id: 'temp-2', english: 'Water', japanese: '水', category: 'Essential' },
  { id: 'temp-3', english: 'House', japanese: '家', category: 'Place' },
  // Add more vocabulary pairs here
];

const getChallengeForDate = (date: string): DailyChallenge => {
  // Simple seed-based generation placeholder
  // In a real app, this would be more sophisticated and might involve a server
  // or a more complex local algorithm using the date as a seed.
  // const seed = date.split('-').reduce((sum, val) => sum + parseInt(val, 10), 0); // Seed not used with getVocabularySample yet
  
  // Use getVocabularySample to get a defined number of words
  const selectedVocab = getVocabularySample(3); // Get 3 words for the challenge
  
  return {
    id: `challenge-${date}`,
    date,
    difficulty: 'beginner', // Placeholder
    vocabulary: selectedVocab, 
    theme: 'General',
  };
};

const useDailyChallenge = () => {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    try {
      const dailyChallenge = getChallengeForDate(today);
      setChallenge(dailyChallenge);
    } catch (err) {
      setError('Failed to load daily challenge.');
      console.error(err);
    }
    setLoading(false);
  }, []);

  return { challenge, loading, error };
};

export default useDailyChallenge; 