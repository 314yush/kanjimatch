import { 
  StoryScene, 
  StoryCharacter, 
  StoryDialogue, 
  FillInBlankChallenge, 
  MultipleChoiceChallenge, 
  DialogueSimulationChallenge, 
  TranslationChallenge 
} from '../types/Story';

// Characters
export const storyCharacters: StoryCharacter[] = [
  {
    id: 'yuki',
    name: 'Yuki',
    nameJp: 'ゆき',
    nameRomaji: 'Yuki',
    description: 'A friendly Japanese exchange student',
    avatar: '👩‍🎓'
  },
  {
    id: 'taro',
    name: 'Taro',
    nameJp: 'たろう',
    nameRomaji: 'Tarou',
    description: 'A helpful local guide',
    avatar: '👨‍💼'
  },
  {
    id: 'sakura',
    name: 'Sakura',
    nameJp: 'さくら',
    nameRomaji: 'Sakura',
    description: 'A café owner',
    avatar: '👩‍🍳'
  },
  {
    id: 'kenji',
    name: 'Kenji',
    nameJp: 'けんじ',
    nameRomaji: 'Kenji',
    description: 'A university student',
    avatar: '👨‍🎓'
  }
];

// Story Scenes
export const storyScenes: StoryScene[] = [
  {
    id: 'airport-arrival',
    title: 'Airport Arrival',
    titleJp: '空港到着',
    description: 'You arrive at Tokyo Airport and meet Yuki, who will help you get settled.',
    background: '🏢',
    characters: [storyCharacters[0]], // Yuki
    dialogue: [
      {
        id: 'd1',
        characterId: 'yuki',
        text: 'Welcome to Japan! I\'m Yuki. Nice to meet you.',
        textJp: '日本へようこそ！私はゆきです。よろしくお願いします。',
        textRomaji: 'Nihon e youkoso! Watashi wa Yuki desu. Yoroshiku onegaishimasu.',
        translation: 'Welcome to Japan! I\'m Yuki. Nice to meet you.'
      },
      {
        id: 'd2',
        characterId: 'yuki',
        text: 'How was your flight?',
        textJp: 'フライトはどうでしたか？',
        textRomaji: 'Furaito wa dou deshita ka?',
        translation: 'How was your flight?'
      }
    ],
    challenges: [
      {
        id: 'c1',
        type: 'fill-in-blank',
        question: 'Complete the greeting response',
        sentence: 'Nice to meet you too. My name is ___ .',
        sentenceJp: 'こちらこそよろしくお願いします。私の名前は___です。',
        sentenceRomaji: 'Kochira koso yoroshiku onegaishimasu. Watashi no namae wa ___ desu.',
        blankPosition: 3,
        correctAnswer: 'John',
        correctAnswerJp: 'ジョン',
        explanation: 'When introducing yourself in Japanese, you say your name followed by です (desu).',
        difficulty: 'beginner',
        points: 10,
        hint: 'Think of a common English name'
      } as FillInBlankChallenge,
      {
        id: 'c2',
        type: 'multiple-choice',
        question: 'How do you respond to "How was your flight?" in Japanese?',
        questionJp: '「フライトはどうでしたか？」にどう答えますか？',
        options: ['It was good', 'It was bad', 'It was okay', 'I don\'t know'],
        optionsJp: ['良かったです', '悪かったです', 'まあまあでした', '分かりません'],
        correctAnswer: 'It was good',
        correctAnswerJp: '良かったです',
        explanation: '良かったです (yokatta desu) means "it was good" and is a polite way to respond.',
        difficulty: 'beginner',
        points: 15
      } as MultipleChoiceChallenge
    ]
  },
  {
    id: 'cafe-conversation',
    title: 'Café Conversation',
    titleJp: 'カフェでの会話',
    description: 'You visit a local café and practice ordering in Japanese.',
    background: '☕',
    characters: [storyCharacters[2]], // Sakura
    dialogue: [
      {
        id: 'd3',
        characterId: 'sakura',
        text: 'Welcome! What would you like to order?',
        textJp: 'いらっしゃいませ！何をお注文されますか？',
        textRomaji: 'Irasshaimase! Nani o gochuumon saremasu ka?',
        translation: 'Welcome! What would you like to order?'
      }
    ],
    challenges: [
      {
        id: 'c3',
        type: 'dialogue-simulation',
        scenario: 'You want to order a coffee. Choose the most appropriate response.',
        scenarioJp: 'コーヒーを注文したいです。最も適切な返答を選んでください。',
        userChoices: [
          'I want coffee',
          'Coffee please',
          'Can I have a coffee?',
          'Give me coffee'
        ],
        userChoicesJp: [
          'コーヒーが欲しい',
          'コーヒーをお願いします',
          'コーヒーをいただけますか？',
          'コーヒーをください'
        ],
        correctChoiceIndex: 2,
        responses: [
          'That\'s too direct',
          'Good, but could be more polite',
          'Perfect! Very polite',
          'Too casual for a café'
        ],
        responsesJp: [
          '少し直接すぎます',
          '良いですが、もっと丁寧にできます',
          '完璧です！とても丁寧です',
          'カフェには少しカジュアルすぎます'
        ],
        correctAnswer: 'Can I have a coffee?',
        correctAnswerJp: 'コーヒーをいただけますか？',
        explanation: 'In Japanese culture, being polite is very important, especially when ordering at restaurants.',
        difficulty: 'intermediate',
        points: 20
      } as DialogueSimulationChallenge,
      {
        id: 'c4',
        type: 'translation',
        question: 'Translate "Thank you very much" to Japanese',
        sourceText: 'Thank you very much',
        sourceTextJp: 'ありがとうございます',
        targetLanguage: 'jp',
        acceptableAnswers: ['ありがとうございます', 'どうもありがとうございます'],
        correctAnswer: 'ありがとうございます',
        explanation: 'ありがとうございます (arigatou gozaimasu) is the polite form of "thank you".',
        difficulty: 'beginner',
        points: 10
      } as TranslationChallenge
    ]
  },
  {
    id: 'university-life',
    title: 'University Life',
    titleJp: '大学生活',
    description: 'You attend your first Japanese class and meet fellow students.',
    background: '🏫',
    characters: [storyCharacters[3]], // Kenji
    dialogue: [
      {
        id: 'd4',
        characterId: 'kenji',
        text: 'Hi! Are you new to this class?',
        textJp: 'こんにちは！このクラスは初めてですか？',
        textRomaji: 'Konnichiwa! Kono kurasu wa hajimete desu ka?',
        translation: 'Hi! Are you new to this class?'
      },
      {
        id: 'd5',
        characterId: 'kenji',
        text: 'I can help you with Japanese if you need it.',
        textJp: '日本語で困ったことがあれば、お手伝いできます。',
        textRomaji: 'Nihongo de komatta koto ga areba, otetsudai dekimasu.',
        translation: 'I can help you with Japanese if you need it.'
      }
    ],
    challenges: [
      {
        id: 'c5',
        type: 'fill-in-blank',
        question: 'Complete the response to "Are you new?"',
        sentence: 'Yes, this is my ___ time here.',
        sentenceJp: 'はい、ここは___回目です。',
        sentenceRomaji: 'Hai, koko wa ___ kai me desu.',
        blankPosition: 2,
        correctAnswer: 'first',
        correctAnswerJp: '初',
        explanation: '初回 (shokai) means "first time" in Japanese.',
        difficulty: 'intermediate',
        points: 15,
        hint: 'Think of ordinal numbers'
      } as FillInBlankChallenge,
      {
        id: 'c6',
        type: 'multiple-choice',
        question: 'What does お手伝い (otetsudai) mean?',
        questionJp: '「お手伝い」はどういう意味ですか？',
        options: ['Help', 'Study', 'Teach', 'Learn'],
        correctAnswer: 'Help',
        correctAnswerJp: '手伝い',
        explanation: 'お手伝い (otetsudai) means "help" or "assistance" in Japanese.',
        difficulty: 'intermediate',
        points: 20
      } as MultipleChoiceChallenge
    ]
  },
  {
    id: 'shopping-adventure',
    title: 'Shopping Adventure',
    titleJp: '買い物の冒険',
    description: 'You go shopping and need to ask for help finding items.',
    background: '🛍️',
    characters: [storyCharacters[1]], // Taro
    dialogue: [
      {
        id: 'd6',
        characterId: 'taro',
        text: 'Can I help you find something?',
        textJp: '何かお探しでしょうか？',
        textRomaji: 'Nanika osagashi deshou ka?',
        translation: 'Can I help you find something?'
      }
    ],
    challenges: [
      {
        id: 'c7',
        type: 'dialogue-simulation',
        scenario: 'You\'re looking for a bookstore. How do you ask?',
        scenarioJp: '本屋を探しています。どう聞きますか？',
        userChoices: [
          'Where is the bookstore?',
          'I need a bookstore',
          'Can you tell me where the bookstore is?',
          'Bookstore please'
        ],
        userChoicesJp: [
          '本屋はどこですか？',
          '本屋が必要です',
          '本屋はどこにあるか教えていただけますか？',
          '本屋をお願いします'
        ],
        correctChoiceIndex: 2,
        responses: [
          'Direct but acceptable',
          'Too direct',
          'Very polite and clear',
          'Not clear enough'
        ],
        responsesJp: [
          '直接的ですが許容できます',
          '少し直接的すぎます',
          'とても丁寧で明確です',
          '十分に明確ではありません'
        ],
        correctAnswer: 'Can you tell me where the bookstore is?',
        correctAnswerJp: '本屋はどこにあるか教えていただけますか？',
        explanation: 'Using 教えていただけますか (oshiete itadakemasu ka) is a very polite way to ask for information.',
        difficulty: 'advanced',
        points: 25
      } as DialogueSimulationChallenge,
      {
        id: 'c8',
        type: 'translation',
        question: 'Translate "I\'m looking for a gift" to Japanese',
        sourceText: 'I\'m looking for a gift',
        sourceTextJp: 'プレゼントを探しています',
        targetLanguage: 'jp',
        acceptableAnswers: ['プレゼントを探しています', '贈り物を探しています'],
        correctAnswer: 'プレゼントを探しています',
        explanation: 'プレゼントを探しています (purezento o sagashite imasu) means "I\'m looking for a gift".',
        difficulty: 'intermediate',
        points: 15
      } as TranslationChallenge
    ]
  }
];

// Helper function to get a scene by ID
export const getSceneById = (sceneId: string): StoryScene | undefined => {
  return storyScenes.find(scene => scene.id === sceneId);
};

// Helper function to get a character by ID
export const getCharacterById = (characterId: string): StoryCharacter | undefined => {
  return storyCharacters.find(character => character.id === characterId);
};

// Helper function to get daily scene (deterministic based on date)
export const getDailyScene = (): StoryScene => {
  const today = new Date().toISOString().split('T')[0];
  const hash = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const sceneIndex = hash % storyScenes.length;
  return storyScenes[sceneIndex];
};

// Story data for "Go for it, Yuta!" (がんばれ、ユウタ！)
// Each day is a segment with 5 new words, simple dialogue, and 5 fill-in-the-blank lines.

export interface StoryTile {
  jp: string;
  romaji: string;
}

export interface StoryLine {
  id: string;
  speaker: 'yuta' | 'friend' | 'teacher';
  avatar: string;
  type: 'normal' | 'fill-blank';
  jp: string; // Japanese (kanji/kana, use ___ for blank)
  hiragana: string[]; // Array of hiragana for each kanji chunk (for popover)
  romaji: string;
  en: string;
  audioUrl?: string;
  // For fill-blank
  tiles?: StoryTile[]; // Draggable options (jp + romaji)
  answer?: StoryTile; // Correct answer (jp + romaji)
}

export interface StoryDay {
  day: number;
  date: string; // YYYY-MM-DD
  title: string;
  titleJp: string;
  newWords: StoryTile[];
  lines: StoryLine[];
}

export const storyDays: StoryDay[] = [
  {
    day: 1,
    date: '2024-08-01',
    title: "A New Friend",
    titleJp: "新しい友達",
    newWords: [
      { jp: 'はじめまして', romaji: 'hajimemashite' },
      { jp: 'ぼく', romaji: 'boku' },
      { jp: 'がくせい', romaji: 'gakusei' },
      { jp: 'よろしく', romaji: 'yoroshiku' },
    ],
    lines: [
      {
        id: '1-1',
        speaker: 'friend',
        avatar: '😄',
        type: 'fill-blank',
        jp: '___、ユウタ！',
        hiragana: ['こんにちは'],
        romaji: '___, Yuta!',
        en: "Hello, Yuta!",
        tiles: [
          { jp: 'こんにちは', romaji: 'konnichiwa' },
          { jp: 'さようなら', romaji: 'sayounara' },
          { jp: 'ありがとう', romaji: 'arigatou' },
        ],
        answer: { jp: 'こんにちは', romaji: 'konnichiwa' },
      },
      {
        id: '1-2',
        speaker: 'yuta',
        avatar: '🙂',
        type: 'normal',
        jp: 'こんにちは！はじめまして。',
        hiragana: ['こんにちは', 'はじめまして'],
        romaji: 'Konnichiwa! Hajimemashite.',
        en: "Hello! Nice to meet you.",
      },
      {
        id: '1-3',
        speaker: 'friend',
        avatar: '😄',
        type: 'fill-blank',
        jp: 'ぼくの名前はさくらです。___は？',
        hiragana: ['ぼく','の','なまえ','は','さくら','です','あなた'],
        romaji: 'Boku no namae wa Sakura desu. ___ wa?',
        en: "My name is Sakura. And you?",
         tiles: [
            { jp: 'あなた', romaji: 'anata' },
            { jp: 'かれ', romaji: 'kare' },
            { jp: 'かのじょ', romaji: 'kanojo' },
        ],
        answer: { jp: 'あなた', romaji: 'anata' },
      },
      {
        id: '1-4',
        speaker: 'yuta',
        avatar: '🙂',
        type: 'normal',
        jp: 'ぼくはユウタです。よろしく！',
        hiragana: ['ぼく','は','ユウタ','です','よろしく'],
        romaji: 'Boku wa Yuta desu. Yoroshiku!',
        en: "I'm Yuta. Nice to meet you!",
      },
       {
          id: '1-5',
          speaker: 'friend',
          avatar: '😄',
          type: 'fill-blank',
          jp: 'ユウタは___ですか？',
          hiragana: ['ユウタ','は','がくせい','ですか'],
          romaji: 'Yuta wa ___ desu ka?',
          en: "Are you a student, Yuta?",
           tiles: [
              { jp: 'がくせい', romaji: 'gakusei' },
              { jp: 'せんせい', romaji: 'sensei' },
              { jp: 'ともだち', romaji: 'tomodachi' },
          ],
          answer: { jp: 'がくせい', romaji: 'gakusei' },
      },
    ]
  },
  // Add more days here...
];

// Helper: get today's story segment (up to today)
export function getTodaysStorySegment(): StoryDay[] {
  const today = new Date().toISOString().split('T')[0];
  return storyDays.filter(day => day.date <= today);
} 