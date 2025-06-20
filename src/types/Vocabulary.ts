export interface VocabularyPair {
  id: string; // Unique ID for each vocabulary item
  english: string;
  japanese: string;
  hiragana?: string;
  romanji?: string;
  category: string; // e.g., "N5", "Food", "Travel"
  jlptLevel?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface DailyChallenge {
  id: string;
  date: string; // YYYY-MM-DD
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  vocabulary: VocabularyPair[];
  theme?: string;
} 