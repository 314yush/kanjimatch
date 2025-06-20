import { VocabularyPair, DailyChallenge } from '../types/Vocabulary';

export interface WordleWord {
  id: string;
  japanese: string;
  romaji: string;
  english: string;
  category: string;
  jlptLevel: string;
  hint: {
    description: string;
    imageUrl?: string;
    emoji?: string;
  };
}

export const wordleWords: WordleWord[] = [
  {
    id: 'wordle-1',
    japanese: 'りんご',
    romaji: 'ringo',
    english: 'apple',
    category: 'Food',
    jlptLevel: 'N5',
    hint: {
      description: 'A red fruit that grows on trees',
      emoji: '🍎'
    }
  },
  {
    id: 'wordle-2',
    japanese: 'いぬ',
    romaji: 'inu',
    english: 'dog',
    category: 'Animals',
    jlptLevel: 'N5',
    hint: {
      description: "Man's best friend, a loyal pet",
      emoji: '🐕',
      imageUrl: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
    }
  },
  {
    id: 'wordle-3',
    japanese: 'ねこ',
    romaji: 'neko',
    english: 'cat',
    category: 'Animals',
    jlptLevel: 'N5',
    hint: {
      description: 'A furry pet that purrs',
      emoji: '🐱'
    }
  },
  {
    id: 'wordle-4',
    japanese: 'みず',
    romaji: 'mizu',
    english: 'water',
    category: 'Drinks',
    jlptLevel: 'N5',
    hint: {
      description: 'Essential liquid for life',
      emoji: '💧'
    }
  },
  {
    id: 'wordle-5',
    japanese: 'いえ',
    romaji: 'ie',
    english: 'house',
    category: 'Places',
    jlptLevel: 'N5',
    hint: {
      description: 'Where people live',
      emoji: '🏠'
    }
  },
  {
    id: 'wordle-6',
    japanese: 'くるま',
    romaji: 'kuruma',
    english: 'car',
    category: 'Transportation',
    jlptLevel: 'N5',
    hint: {
      description: 'Four-wheeled vehicle for transportation',
      emoji: '🚗'
    }
  },
  {
    id: 'wordle-7',
    japanese: 'ほん',
    romaji: 'hon',
    english: 'book',
    category: 'Objects',
    jlptLevel: 'N5',
    hint: {
      description: 'Contains stories and knowledge',
      emoji: '📚'
    }
  },
  {
    id: 'wordle-8',
    japanese: 'でんわ',
    romaji: 'denwa',
    english: 'telephone',
    category: 'Technology',
    jlptLevel: 'N5',
    hint: {
      description: 'Device for making calls',
      emoji: '📞'
    }
  },
  {
    id: 'wordle-9',
    japanese: 'がっこう',
    romaji: 'gakkou',
    english: 'school',
    category: 'Places',
    jlptLevel: 'N5',
    hint: {
      description: 'Where students learn',
      emoji: '🏫'
    }
  },
  {
    id: 'wordle-10',
    japanese: 'ともだち',
    romaji: 'tomodachi',
    english: 'friend',
    category: 'People',
    jlptLevel: 'N5',
    hint: {
      description: 'Someone you like and trust',
      emoji: '👥'
    }
  },
  {
    id: 'wordle-11',
    japanese: 'おかね',
    romaji: 'okane',
    english: 'money',
    category: 'Finance',
    jlptLevel: 'N5',
    hint: {
      description: 'Used to buy things',
      emoji: '💰'
    }
  },
  {
    id: 'wordle-12',
    japanese: 'じかん',
    romaji: 'jikan',
    english: 'time',
    category: 'Concepts',
    jlptLevel: 'N5',
    hint: {
      description: 'What clocks measure',
      emoji: '⏰'
    }
  },
  {
    id: 'wordle-13',
    japanese: 'てんき',
    romaji: 'tenki',
    english: 'weather',
    category: 'Nature',
    jlptLevel: 'N5',
    hint: {
      description: 'Sunny, rainy, or cloudy conditions',
      emoji: '🌤️'
    }
  },
  {
    id: 'wordle-14',
    japanese: 'しごと',
    romaji: 'shigoto',
    english: 'work',
    category: 'Activities',
    jlptLevel: 'N5',
    hint: {
      description: 'What you do to earn money',
      emoji: '💼'
    }
  },
  {
    id: 'wordle-15',
    japanese: 'やすみ',
    romaji: 'yasumi',
    english: 'rest',
    category: 'Activities',
    jlptLevel: 'N5',
    hint: {
      description: 'Taking a break from work',
      emoji: '😴'
    }
  }
];

// Function to get the daily word based on date (global for all users)
export function getDailyWordleWord(): WordleWord {
  // TEMP: Always return 'tomodachi' (friend) for testing
  return wordleWords[9];
  // const today = new Date().toISOString().split('T')[0];
  // const hash = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  // return wordleWords[hash % wordleWords.length];
}

// Original vocabulary data for backward compatibility
export const vocabularyDatabase: VocabularyPair[] = [
  { id: 'vocab-1', english: 'Hello', japanese: 'こんにちは', hiragana: 'こんにちは', romanji: 'konnichiwa', category: 'Greetings', jlptLevel: 'N5' },
  { id: 'vocab-2', english: 'Goodbye', japanese: 'さようなら', hiragana: 'さようなら', romanji: 'sayounara', category: 'Greetings', jlptLevel: 'N5' },
  { id: 'vocab-3', english: 'Thank you', japanese: 'ありがとう', hiragana: 'ありがとう', romanji: 'arigato', category: 'Phrases', jlptLevel: 'N5' },
  { id: 'vocab-4', english: 'Yes', japanese: 'はい', hiragana: 'はい', romanji: 'hai', category: 'Responses', jlptLevel: 'N5' },
  { id: 'vocab-5', english: 'No', japanese: 'いいえ', hiragana: 'いいえ', romanji: 'iie', category: 'Responses', jlptLevel: 'N5' },
  { id: 'vocab-6', english: 'Apple', japanese: 'りんご', hiragana: 'りんご', romanji: 'ringo', category: 'Food', jlptLevel: 'N5' },
  { id: 'vocab-7', english: 'Water', japanese: '水', hiragana: 'みず', romanji: 'mizu', category: 'Drinks', jlptLevel: 'N5' },
  { id: 'vocab-8', english: 'House', japanese: '家', hiragana: 'いえ', romanji: 'ie', category: 'Places', jlptLevel: 'N5' },
  { id: 'vocab-9', english: 'Dog', japanese: '犬', hiragana: 'いぬ', romanji: 'inu', category: 'Animals', jlptLevel: 'N5' },
  { id: 'vocab-10', english: 'Cat', japanese: '猫', hiragana: 'ねこ', romanji: 'neko', category: 'Animals', jlptLevel: 'N5' },
  { id: 'vocab-11', english: 'Person', japanese: '人', hiragana: 'ひと', romanji: 'hito', category: 'People', jlptLevel: 'N5' },
  { id: 'vocab-12', english: 'Book', japanese: '本', hiragana: 'ほん', romanji: 'hon', category: 'Objects', jlptLevel: 'N5' },
  { id: 'vocab-13', english: 'Car', japanese: '車', hiragana: 'くるま', romanji: 'kuruma', category: 'Transportation', jlptLevel: 'N5' },
  { id: 'vocab-14', english: 'Today', japanese: '今日', hiragana: 'きょう', romanji: 'kyou', category: 'Time', jlptLevel: 'N5' },
  { id: 'vocab-15', english: 'Tomorrow', japanese: '明日', hiragana: 'あした', romanji: 'ashita', category: 'Time', jlptLevel: 'N5' },
];

// Function to get a subset of vocabulary, could be used by useDailyChallenge
export const getVocabularySample = (count: number): VocabularyPair[] => {
  const shuffled = [...vocabularyDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 