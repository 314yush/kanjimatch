/**
 * Daily Content Utility
 * 
 * This utility provides deterministic daily content generation based on the current date.
 * Content changes every 24 hours and is consistent across all users for the same date.
 */

import { storyDays } from '../data/storyData';
import { vocabularyPairs } from '../data/vocabularyData';

// Set the cycle start date to today
export const CYCLE_START_DATE = new Date(new Date().toISOString().split('T')[0]); // Today as Day 1

/**
 * Get a deterministic hash from a date string (YYYY-MM-DD)
 */
export function getDateHash(dateString: string): number {
  return dateString.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

/**
 * Get today's date string in YYYY-MM-DD format
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get a deterministic index from an array based on date
 */
export function getDailyIndex<T>(array: T[], dateString?: string): number {
  const targetDate = dateString || getTodayDateString();
  const hash = getDateHash(targetDate);
  return hash % array.length;
}

/**
 * Get daily content from an array based on date
 */
export function getDailyContent<T>(array: T[], dateString?: string): T {
  const index = getDailyIndex(array, dateString);
  return array[index];
}

/**
 * Get multiple daily items from an array (for when you need multiple items)
 */
export function getDailyItems<T>(array: T[], count: number, dateString?: string): T[] {
  const targetDate = dateString || getTodayDateString();
  const hash = getDateHash(targetDate);
  
  // Use different seeds for each item to get variety
  const items: T[] = [];
  for (let i = 0; i < count; i++) {
    const seed = hash + (i * 1000); // Different seed for each item
    const index = seed % array.length;
    items.push(array[index]);
  }
  
  return items;
}

/**
 * Check if content should refresh (useful for debugging or testing)
 */
export function shouldRefreshContent(lastDate?: string): boolean {
  const today = getTodayDateString();
  return lastDate !== today;
}

/**
 * Get a date string for a specific number of days ago
 */
export function getDateStringForDaysAgo(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

/**
 * Get content for a specific date (useful for testing or historical content)
 */
export function getContentForDate<T>(array: T[], dateString: string): T {
  return getDailyContent(array, dateString);
}

// Wordle words for 30 days
const wordleWords = [
  'こんにちは', 'ありがとう', 'おはよう', 'さようなら', 'おやすみ',
  'すみません', 'どういたしまして', 'おねがいします', 'はい', 'いいえ',
  'わかりました', 'おいしい', 'たべもの', 'のみもの', 'みず',
  'おちゃ', 'ごはん', 'いぬ', 'ねこ', 'とり',
  'うみ', 'やま', 'かわ', 'そら', 'つき',
  'ほし', 'あめ', 'ゆき', 'かぜ', 'はな'
];

// Function to get daily story content
export const getDailyStoryContent = (date: Date): typeof storyDays[0] | null => {
  const dayOfYear = Math.floor((date.getTime() - CYCLE_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const storyIndex = (dayOfYear) % storyDays.length;
  return storyDays[storyIndex] || null;
};

// Function to get daily vocabulary pairs (5 pairs per day with 3 new + 2 old pattern)
export const getDailyVocabularyContent = (date: Date): typeof vocabularyPairs[0][] => {
  const dayOfYear = Math.floor((date.getTime() - CYCLE_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const dayIndex = (dayOfYear) % 30; // 30-day cycle
  
  if (dayIndex === 0) {
    // Day 1: First 5 pairs
    return vocabularyPairs.slice(0, 5);
  }
  
  // For other days: 3 new pairs + 2 from previous day
  const startIndex = dayIndex * 3 - 1; // Start from the 3rd pair of previous day
  const newPairs = vocabularyPairs.slice(startIndex, startIndex + 3);
  
  // Get 2 pairs from previous day (keeping them)
  const previousDayStart = Math.max(0, (dayIndex - 1) * 3 - 1);
  const keptPairs = vocabularyPairs.slice(previousDayStart, previousDayStart + 2);
  
  return [...newPairs, ...keptPairs];
};

// Function to get daily wordle word
export const getDailyWordleContent = (date: Date): string => {
  const dayOfYear = Math.floor((date.getTime() - CYCLE_START_DATE.getTime()) / (1000 * 60 * 60 * 24));
  const wordIndex = (dayOfYear) % wordleWords.length;
  return wordleWords[wordIndex] || wordleWords[0];
};

// Function to get all daily content for a specific date
export const getAllDailyContent = (date: Date) => {
  return {
    story: getDailyStoryContent(date),
    vocabulary: getDailyVocabularyContent(date),
    wordle: getDailyWordleContent(date),
    date: date.toISOString().split('T')[0]
  };
};

// Function to get content for a specific day number (for testing)
export const getContentForDayNumber = (dayNumber: number) => {
  const testDate = new Date(2024, 0, dayNumber); // January dayNumber, 2024
  return getAllDailyContent(testDate);
}; 