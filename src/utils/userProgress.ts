import { Phrase } from '../types/Phrase';
import { UserPhrase, UserProgress } from '../types/User';
import { phraseDataset } from '../data/phraseData';

const USER_PROGRESS_KEY_PREFIX = 'kanjimatch_user_progress';

function getUserProgressKey(userId?: string): string {
  return userId ? `${USER_PROGRESS_KEY_PREFIX}_${userId}` : USER_PROGRESS_KEY_PREFIX;
}

export function loadUserProgress(userId?: string): UserProgress | null {
  const key = getUserProgressKey(userId);
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    const progress = JSON.parse(data);
    // Ensure userId is set for backward compatibility
    if (userId && !progress.userId) {
      progress.userId = userId;
    }
    return progress;
  } catch {
    return null;
  }
}

export function saveUserProgress(progress: UserProgress, userId?: string) {
  const key = getUserProgressKey(userId);
  const progressToSave = { ...progress, userId: userId || progress.userId };
  localStorage.setItem(key, JSON.stringify(progressToSave));
}

export function initializeUserProgress(initialPhrases: Phrase[], userId?: string): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const phrasePool: UserPhrase[] = initialPhrases.map(p => ({
    id: p.id,
    mastery: 0,
    lastSeen: today,
    addedOn: today,
    mastered: false,
  }));
  const progress: UserProgress = {
    phrasePool,
    lastActive: today,
    userId,
  };
  saveUserProgress(progress, userId);
  return progress;
}

export function addPhrasesToUserProgress(progress: UserProgress, newPhrases: Phrase[], userId?: string): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const newUserPhrases: UserPhrase[] = newPhrases.map(p => ({
    id: p.id,
    mastery: 0,
    lastSeen: today,
    addedOn: today,
    mastered: false,
  }));
  const updatedPool = [...progress.phrasePool, ...newUserPhrases];
  const updated = { ...progress, phrasePool: updatedPool, userId: userId || progress.userId };
  saveUserProgress(updated, userId);
  return updated;
}

// Function to clear user progress (useful for logout)
export function clearUserProgress(userId?: string) {
  const key = getUserProgressKey(userId);
  localStorage.removeItem(key);
}

// Function to migrate old progress to new user-specific storage
export function migrateUserProgress(oldProgress: UserProgress, userId: string): UserProgress {
  const migratedProgress = { ...oldProgress, userId };
  saveUserProgress(migratedProgress, userId);
  // Clear old storage
  localStorage.removeItem(USER_PROGRESS_KEY_PREFIX);
  return migratedProgress;
} 