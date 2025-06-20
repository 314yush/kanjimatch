export interface StoryCharacter {
  id: string;
  name: string;
  nameJp: string;
  nameRomaji: string;
  description: string;
  avatar?: string;
}

export interface StoryScene {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  background?: string;
  characters: StoryCharacter[];
  dialogue: StoryDialogue[];
  challenges: StoryChallenge[];
}

export interface StoryDialogue {
  id: string;
  characterId: string;
  text: string;
  textJp: string;
  textRomaji: string;
  translation: string;
  audioUrl?: string;
}

export interface StoryChallenge {
  id: string;
  type: 'fill-in-blank' | 'multiple-choice' | 'dialogue-simulation' | 'translation';
  question: string;
  questionJp?: string;
  options?: string[];
  correctAnswer: string;
  correctAnswerJp?: string;
  explanation: string;
  context?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
}

export interface FillInBlankChallenge extends StoryChallenge {
  type: 'fill-in-blank';
  sentence: string;
  sentenceJp: string;
  sentenceRomaji: string;
  blankPosition: number;
  hint?: string;
}

export interface MultipleChoiceChallenge extends StoryChallenge {
  type: 'multiple-choice';
  options: string[];
  optionsJp?: string[];
}

export interface DialogueSimulationChallenge extends StoryChallenge {
  type: 'dialogue-simulation';
  scenario: string;
  scenarioJp?: string;
  userChoices: string[];
  userChoicesJp?: string[];
  correctChoiceIndex: number;
  responses: string[];
  responsesJp?: string[];
}

export interface TranslationChallenge extends StoryChallenge {
  type: 'translation';
  sourceText: string;
  sourceTextJp: string;
  targetLanguage: 'en' | 'jp';
  acceptableAnswers: string[];
}

export interface StoryProgress {
  sceneId: string;
  completedChallenges: string[];
  score: number;
  totalScore: number;
}

export interface StorySession {
  id: string;
  userId?: string;
  sceneId: string;
  progress: StoryProgress;
  startTime: Date;
  endTime?: Date;
} 