import { VocabularyPair, DailyChallenge } from '../types/Vocabulary';
import { getDailyContent } from '../utils/dailyContent';

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
  return getDailyContent(wordleWords);
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

export const vocabularyPairs: VocabularyPair[] = [
  // Day 1 (5 pairs)
  { id: '1-1', english: 'Hello', japanese: 'こんにちは', hiragana: 'こんにちは', romanji: 'konnichiwa', category: 'Greetings', jlptLevel: 'N5' },
  { id: '1-2', english: 'Thank you', japanese: 'ありがとう', hiragana: 'ありがとう', romanji: 'arigatou', category: 'Greetings', jlptLevel: 'N5' },
  { id: '1-3', english: 'Good morning', japanese: 'おはよう', hiragana: 'おはよう', romanji: 'ohayou', category: 'Greetings', jlptLevel: 'N5' },
  { id: '1-4', english: 'Goodbye', japanese: 'さようなら', hiragana: 'さようなら', romanji: 'sayounara', category: 'Greetings', jlptLevel: 'N5' },
  { id: '1-5', english: 'Good night', japanese: 'おやすみ', hiragana: 'おやすみ', romanji: 'oyasumi', category: 'Greetings', jlptLevel: 'N5' },

  // Day 2 (3 new + 2 from day 1)
  { id: '2-1', english: 'Excuse me', japanese: 'すみません', hiragana: 'すみません', romanji: 'sumimasen', category: 'Greetings', jlptLevel: 'N5' },
  { id: '2-2', english: "You're welcome", japanese: 'どういたしまして', hiragana: 'どういたしまして', romanji: 'dou itashimashite', category: 'Greetings', jlptLevel: 'N5' },
  { id: '2-3', english: 'Please', japanese: 'おねがいします', hiragana: 'おねがいします', romanji: 'onegaishimasu', category: 'Greetings', jlptLevel: 'N5' },
  // Keep: こんにちは, ありがとう

  // Day 3 (3 new + 2 from day 2)
  { id: '3-1', english: 'Yes', japanese: 'はい', hiragana: 'はい', romanji: 'hai', category: 'Basic', jlptLevel: 'N5' },
  { id: '3-2', english: 'No', japanese: 'いいえ', hiragana: 'いいえ', romanji: 'iie', category: 'Basic', jlptLevel: 'N5' },
  { id: '3-3', english: 'I understand', japanese: 'わかりました', hiragana: 'わかりました', romanji: 'wakarimashita', category: 'Basic', jlptLevel: 'N5' },
  // Keep: すみません, どういたしまして

  // Day 4 (3 new + 2 from day 3)
  { id: '4-1', english: 'Delicious', japanese: 'おいしい', hiragana: 'おいしい', romanji: 'oishii', category: 'Food', jlptLevel: 'N5' },
  { id: '4-2', english: 'Food', japanese: 'たべもの', hiragana: 'たべもの', romanji: 'tabemono', category: 'Food', jlptLevel: 'N5' },
  { id: '4-3', english: 'Drink', japanese: 'のみもの', hiragana: 'のみもの', romanji: 'nomimono', category: 'Food', jlptLevel: 'N5' },
  // Keep: はい, いいえ

  // Day 5 (3 new + 2 from day 4)
  { id: '5-1', english: 'Water', japanese: 'みず', hiragana: 'みず', romanji: 'mizu', category: 'Food', jlptLevel: 'N5' },
  { id: '5-2', english: 'Tea', japanese: 'おちゃ', hiragana: 'おちゃ', romanji: 'ocha', category: 'Food', jlptLevel: 'N5' },
  { id: '5-3', english: 'Rice/Meal', japanese: 'ごはん', hiragana: 'ごはん', romanji: 'gohan', category: 'Food', jlptLevel: 'N5' },
  // Keep: おいしい, たべもの

  // Day 6 (3 new + 2 from day 5)
  { id: '6-1', english: 'Dog', japanese: 'いぬ', hiragana: 'いぬ', romanji: 'inu', category: 'Animals', jlptLevel: 'N5' },
  { id: '6-2', english: 'Cat', japanese: 'ねこ', hiragana: 'ねこ', romanji: 'neko', category: 'Animals', jlptLevel: 'N5' },
  { id: '6-3', english: 'Bird', japanese: 'とり', hiragana: 'とり', romanji: 'tori', category: 'Animals', jlptLevel: 'N5' },
  // Keep: みず, おちゃ

  // Day 7 (3 new + 2 from day 6)
  { id: '7-1', english: 'Sea', japanese: 'うみ', hiragana: 'うみ', romanji: 'umi', category: 'Nature', jlptLevel: 'N5' },
  { id: '7-2', english: 'Mountain', japanese: 'やま', hiragana: 'やま', romanji: 'yama', category: 'Nature', jlptLevel: 'N5' },
  { id: '7-3', english: 'River', japanese: 'かわ', hiragana: 'かわ', romanji: 'kawa', category: 'Nature', jlptLevel: 'N5' },
  // Keep: いぬ, ねこ

  // Day 8 (3 new + 2 from day 7)
  { id: '8-1', english: 'Sky', japanese: 'そら', hiragana: 'そら', romanji: 'sora', category: 'Nature', jlptLevel: 'N5' },
  { id: '8-2', english: 'Moon', japanese: 'つき', hiragana: 'つき', romanji: 'tsuki', category: 'Nature', jlptLevel: 'N5' },
  { id: '8-3', english: 'Star', japanese: 'ほし', hiragana: 'ほし', romanji: 'hoshi', category: 'Nature', jlptLevel: 'N5' },
  // Keep: うみ, やま

  // Day 9 (3 new + 2 from day 8)
  { id: '9-1', english: 'Rain', japanese: 'あめ', hiragana: 'あめ', romanji: 'ame', category: 'Weather', jlptLevel: 'N5' },
  { id: '9-2', english: 'Snow', japanese: 'ゆき', hiragana: 'ゆき', romanji: 'yuki', category: 'Weather', jlptLevel: 'N5' },
  { id: '9-3', english: 'Wind', japanese: 'かぜ', hiragana: 'かぜ', romanji: 'kaze', category: 'Weather', jlptLevel: 'N5' },
  // Keep: そら, つき

  // Day 10 (3 new + 2 from day 9)
  { id: '10-1', english: 'Flower', japanese: 'はな', hiragana: 'はな', romanji: 'hana', category: 'Nature', jlptLevel: 'N5' },
  { id: '10-2', english: 'Tree', japanese: 'き', hiragana: 'き', romanji: 'ki', category: 'Nature', jlptLevel: 'N5' },
  { id: '10-3', english: 'Grass', japanese: 'くさ', hiragana: 'くさ', romanji: 'kusa', category: 'Nature', jlptLevel: 'N5' },
  // Keep: あめ, ゆき

  // Day 11 (3 new + 2 from day 10)
  { id: '11-1', english: 'Car', japanese: 'くるま', hiragana: 'くるま', romanji: 'kuruma', category: 'Transport', jlptLevel: 'N5' },
  { id: '11-2', english: 'Bicycle', japanese: 'じてんしゃ', hiragana: 'じてんしゃ', romanji: 'jitensha', category: 'Transport', jlptLevel: 'N5' },
  { id: '11-3', english: 'Train', japanese: 'でんしゃ', hiragana: 'でんしゃ', romanji: 'densha', category: 'Transport', jlptLevel: 'N5' },
  // Keep: はな, き

  // Day 12 (3 new + 2 from day 11)
  { id: '12-1', english: 'House', japanese: 'いえ', hiragana: 'いえ', romanji: 'ie', category: 'Home', jlptLevel: 'N5' },
  { id: '12-2', english: 'Window', japanese: 'まど', hiragana: 'まど', romanji: 'mado', category: 'Home', jlptLevel: 'N5' },
  { id: '12-3', english: 'Door', japanese: 'と', hiragana: 'と', romanji: 'to', category: 'Home', jlptLevel: 'N5' },
  // Keep: くるま, じてんしゃ

  // Day 13 (3 new + 2 from day 12)
  { id: '13-1', english: 'Book', japanese: 'ほん', hiragana: 'ほん', romanji: 'hon', category: 'School', jlptLevel: 'N5' },
  { id: '13-2', english: 'Pencil', japanese: 'えんぴつ', hiragana: 'えんぴつ', romanji: 'enpitsu', category: 'School', jlptLevel: 'N5' },
  { id: '13-3', english: 'Paper', japanese: 'かみ', hiragana: 'かみ', romanji: 'kami', category: 'School', jlptLevel: 'N5' },
  // Keep: いえ, まど

  // Day 14 (3 new + 2 from day 13)
  { id: '14-1', english: 'Sound', japanese: 'おと', hiragana: 'おと', romanji: 'oto', category: 'Music', jlptLevel: 'N5' },
  { id: '14-2', english: 'Music', japanese: 'おんがく', hiragana: 'おんがく', romanji: 'ongaku', category: 'Music', jlptLevel: 'N5' },
  { id: '14-3', english: 'Song', japanese: 'うた', hiragana: 'うた', romanji: 'uta', category: 'Music', jlptLevel: 'N5' },
  // Keep: ほん, えんぴつ

  // Day 15 (3 new + 2 from day 14)
  { id: '15-1', english: 'Play', japanese: 'あそび', hiragana: 'あそび', romanji: 'asobi', category: 'Activities', jlptLevel: 'N5' },
  { id: '15-2', english: 'Study', japanese: 'べんきょう', hiragana: 'べんきょう', romanji: 'benkyou', category: 'Activities', jlptLevel: 'N5' },
  { id: '15-3', english: 'Work', japanese: 'しごと', hiragana: 'しごと', romanji: 'shigoto', category: 'Activities', jlptLevel: 'N5' },
  // Keep: おと, おんがく

  // Day 16 (3 new + 2 from day 15)
  { id: '16-1', english: 'Friend', japanese: 'ともだち', hiragana: 'ともだち', romanji: 'tomodachi', category: 'People', jlptLevel: 'N5' },
  { id: '16-2', english: 'Family', japanese: 'かぞく', hiragana: 'かぞく', romanji: 'kazoku', category: 'People', jlptLevel: 'N5' },
  { id: '16-3', english: 'Teacher', japanese: 'せんせい', hiragana: 'せんせい', romanji: 'sensei', category: 'People', jlptLevel: 'N5' },
  // Keep: あそび, べんきょう

  // Day 17 (3 new + 2 from day 16)
  { id: '17-1', english: 'Mother', japanese: 'おかあさん', hiragana: 'おかあさん', romanji: 'okaasan', category: 'Family', jlptLevel: 'N5' },
  { id: '17-2', english: 'Father', japanese: 'おとうさん', hiragana: 'おとうさん', romanji: 'otousan', category: 'Family', jlptLevel: 'N5' },
  { id: '17-3', english: 'Older sister', japanese: 'おねえさん', hiragana: 'おねえさん', romanji: 'oneesan', category: 'Family', jlptLevel: 'N5' },
  // Keep: ともだち, かぞく

  // Day 18 (3 new + 2 from day 17)
  { id: '18-1', english: 'Older brother', japanese: 'おにいさん', hiragana: 'おにいさん', romanji: 'oniisan', category: 'Family', jlptLevel: 'N5' },
  { id: '18-2', english: 'Younger sister', japanese: 'いもうと', hiragana: 'いもうと', romanji: 'imouto', category: 'Family', jlptLevel: 'N5' },
  { id: '18-3', english: 'Younger brother', japanese: 'おとうと', hiragana: 'おとうと', romanji: 'otouto', category: 'Family', jlptLevel: 'N5' },
  // Keep: おかあさん, おとうさん

  // Day 19 (3 new + 2 from day 18)
  { id: '19-1', english: 'Eye', japanese: 'め', hiragana: 'め', romanji: 'me', category: 'Body', jlptLevel: 'N5' },
  { id: '19-2', english: 'Ear', japanese: 'みみ', hiragana: 'みみ', romanji: 'mimi', category: 'Body', jlptLevel: 'N5' },
  { id: '19-3', english: 'Nose', japanese: 'はな', hiragana: 'はな', romanji: 'hana', category: 'Body', jlptLevel: 'N5' },
  // Keep: おにいさん, いもうと

  // Day 20 (3 new + 2 from day 19)
  { id: '20-1', english: 'Mouth', japanese: 'くち', hiragana: 'くち', romanji: 'kuchi', category: 'Body', jlptLevel: 'N5' },
  { id: '20-2', english: 'Hand', japanese: 'て', hiragana: 'て', romanji: 'te', category: 'Body', jlptLevel: 'N5' },
  { id: '20-3', english: 'Foot', japanese: 'あし', hiragana: 'あし', romanji: 'ashi', category: 'Body', jlptLevel: 'N5' },
  // Keep: め, みみ

  // Day 21 (3 new + 2 from day 20)
  { id: '21-1', english: 'Head', japanese: 'あたま', hiragana: 'あたま', romanji: 'atama', category: 'Body', jlptLevel: 'N5' },
  { id: '21-2', english: 'Hair', japanese: 'かみ', hiragana: 'かみ', romanji: 'kami', category: 'Body', jlptLevel: 'N5' },
  { id: '21-3', english: 'Face', japanese: 'かお', hiragana: 'かお', romanji: 'kao', category: 'Body', jlptLevel: 'N5' },
  // Keep: くち, て

  // Day 22 (3 new + 2 from day 21)
  { id: '22-1', english: 'Red', japanese: 'あかい', hiragana: 'あかい', romanji: 'akai', category: 'Colors', jlptLevel: 'N5' },
  { id: '22-2', english: 'Blue', japanese: 'あおい', hiragana: 'あおい', romanji: 'aoi', category: 'Colors', jlptLevel: 'N5' },
  { id: '22-3', english: 'Yellow', japanese: 'きいろい', hiragana: 'きいろい', romanji: 'kiiroi', category: 'Colors', jlptLevel: 'N5' },
  // Keep: あたま, かみ

  // Day 23 (3 new + 2 from day 22)
  { id: '23-1', english: 'Green', japanese: 'みどり', hiragana: 'みどり', romanji: 'midori', category: 'Colors', jlptLevel: 'N5' },
  { id: '23-2', english: 'Black', japanese: 'くろい', hiragana: 'くろい', romanji: 'kuroi', category: 'Colors', jlptLevel: 'N5' },
  { id: '23-3', english: 'White', japanese: 'しろい', hiragana: 'しろい', romanji: 'shiroi', category: 'Colors', jlptLevel: 'N5' },
  // Keep: あかい, あおい

  // Day 24 (3 new + 2 from day 23)
  { id: '24-1', english: 'Big', japanese: 'おおきい', hiragana: 'おおきい', romanji: 'ookii', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '24-2', english: 'Small', japanese: 'ちいさい', hiragana: 'ちいさい', romanji: 'chiisai', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '24-3', english: 'Long', japanese: 'ながい', hiragana: 'ながい', romanji: 'nagai', category: 'Adjectives', jlptLevel: 'N5' },
  // Keep: みどり, くろい

  // Day 25 (3 new + 2 from day 24)
  { id: '25-1', english: 'Short', japanese: 'みじかい', hiragana: 'みじかい', romanji: 'mijikai', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '25-2', english: 'High/Expensive', japanese: 'たかい', hiragana: 'たかい', romanji: 'takai', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '25-3', english: 'Low', japanese: 'ひくい', hiragana: 'ひくい', romanji: 'hikui', category: 'Adjectives', jlptLevel: 'N5' },
  // Keep: おおきい, ちいさい

  // Day 26 (3 new + 2 from day 25)
  { id: '26-1', english: 'New', japanese: 'あたらしい', hiragana: 'あたらしい', romanji: 'atarashii', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '26-2', english: 'Old', japanese: 'ふるい', hiragana: 'ふるい', romanji: 'furui', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '26-3', english: 'Beautiful', japanese: 'きれい', hiragana: 'きれい', romanji: 'kirei', category: 'Adjectives', jlptLevel: 'N5' },
  // Keep: みじかい, たかい

  // Day 27 (3 new + 2 from day 26)
  { id: '27-1', english: 'Beautiful', japanese: 'うつくしい', hiragana: 'うつくしい', romanji: 'utsukushii', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '27-2', english: 'Cute', japanese: 'かわいい', hiragana: 'かわいい', romanji: 'kawaii', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '27-3', english: 'Cool', japanese: 'かっこいい', hiragana: 'かっこいい', romanji: 'kakkoii', category: 'Adjectives', jlptLevel: 'N5' },
  // Keep: あたらしい, ふるい

  // Day 28 (3 new + 2 from day 27)
  { id: '28-1', english: 'Fun', japanese: 'たのしい', hiragana: 'たのしい', romanji: 'tanoshii', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '28-2', english: 'Happy', japanese: 'うれしい', hiragana: 'うれしい', romanji: 'ureshii', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '28-3', english: 'Sad', japanese: 'かなしい', hiragana: 'かなしい', romanji: 'kanashii', category: 'Adjectives', jlptLevel: 'N5' },
  // Keep: うつくしい, かわいい

  // Day 29 (3 new + 2 from day 28)
  { id: '29-1', english: 'Interesting', japanese: 'おもしろい', hiragana: 'おもしろい', romanji: 'omoshiroi', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '29-2', english: 'Difficult', japanese: 'むずかしい', hiragana: 'むずかしい', romanji: 'muzukashii', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '29-3', english: 'Easy/Kind', japanese: 'やさしい', hiragana: 'やさしい', romanji: 'yasashii', category: 'Adjectives', jlptLevel: 'N5' },
  // Keep: たのしい, うれしい

  // Day 30 (3 new + 2 from day 29)
  { id: '30-1', english: 'Fast', japanese: 'はやい', hiragana: 'はやい', romanji: 'hayai', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '30-2', english: 'Slow', japanese: 'おそい', hiragana: 'おそい', romanji: 'osoi', category: 'Adjectives', jlptLevel: 'N5' },
  { id: '30-3', english: 'Strong', japanese: 'つよい', hiragana: 'つよい', romanji: 'tsuyoi', category: 'Adjectives', jlptLevel: 'N5' },
  // Keep: おもしろい, むずかしい
]; 