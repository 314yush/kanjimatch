export interface UserPhrase {
  id: string;
  mastery: number; // Number of times answered correctly
  lastSeen: string; // ISO date string
  addedOn: string; // ISO date string
  mastered: boolean;
}

export interface UserProgress {
  phrasePool: UserPhrase[];
  lastActive: string; // ISO date string
  userId?: string; // Add user ID for authenticated users
} 