import { useEffect, useState } from 'react';
import { phraseDataset } from '../data/phraseData';
import { loadUserProgress, saveUserProgress, initializeUserProgress, addPhrasesToUserProgress, migrateUserProgress } from '../utils/userProgress';
import { Phrase } from '../types/Phrase';
import { UserProgress, UserPhrase } from '../types/User';

const STARTER_PHRASE_COUNT = 5;
const DAILY_NEW_PHRASE_COUNT = 3;

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getGlobalPhrasesForDay(dayOffset: number, count: number): Phrase[] {
  // Deterministically select phrases for all users based on day offset
  // (e.g., day 0: phrases 0-2, day 1: 3-5, etc.)
  const start = (STARTER_PHRASE_COUNT + dayOffset * count) % phraseDataset.length;
  const phrases: Phrase[] = [];
  for (let i = 0; i < count; i++) {
    phrases.push(phraseDataset[(start + i) % phraseDataset.length]);
  }
  return phrases;
}

export default function useDailyPhrases(userId?: string) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [todaysPhrases, setTodaysPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userProgress = loadUserProgress(userId);
    const today = getToday();
    let isNewUser = false;

    // Handle migration for authenticated users
    if (userId && !userProgress) {
      // Check if there's old progress to migrate
      const oldProgress = loadUserProgress();
      if (oldProgress) {
        userProgress = migrateUserProgress(oldProgress, userId);
      }
    }

    // 1. New user: assign starter phrases
    if (!userProgress) {
      const starterPhrases = phraseDataset.slice(0, STARTER_PHRASE_COUNT);
      userProgress = initializeUserProgress(starterPhrases, userId);
      isNewUser = true;
    }

    // 2. If new day, add 3 new phrases
    if (userProgress.lastActive !== today) {
      // Remove mastered phrases
      const unmastered = userProgress.phrasePool.filter(p => !p.mastered);
      // Calculate day offset (days since first use)
      const firstDay = userProgress.phrasePool.reduce((min, p) => p.addedOn < min ? p.addedOn : min, today);
      const dayOffset = Math.floor((new Date(today).getTime() - new Date(firstDay).getTime()) / (1000 * 60 * 60 * 24));
      // Get new phrases for today
      const newPhrases = getGlobalPhrasesForDay(dayOffset, DAILY_NEW_PHRASE_COUNT);
      // Only add phrases not already in pool
      const newToAdd = newPhrases.filter(np => !unmastered.some(up => up.id === np.id));
      const updatedProgress = addPhrasesToUserProgress({ ...userProgress, phrasePool: unmastered, lastActive: today }, newToAdd, userId);
      setProgress(updatedProgress);
      userProgress = updatedProgress;
    } else {
      setProgress(userProgress);
    }

    // 3. Find today's new phrases (those added today)
    const todays = userProgress.phrasePool
      .filter(p => p.addedOn === today)
      .map(p => phraseDataset.find(ph => ph.id === p.id)!)
      .filter(Boolean);
    setTodaysPhrases(todays);
    setLoading(false);
  }, [userId]);

  return {
    loading,
    progress,
    todaysPhrases,
    phrasePool: progress?.phrasePool.map(p => phraseDataset.find(ph => ph.id === p.id)!) || [],
    refresh: () => window.location.reload(),
  };
} 