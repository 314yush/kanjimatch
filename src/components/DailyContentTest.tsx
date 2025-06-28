import React from 'react';
import { useDailyContentTest } from '../hooks/useDailyContent';
import { getDailyContent, getDailyItems, getDateStringForDaysAgo } from '../utils/dailyContent';
import { wordleWords } from '../data/vocabularyData';
import { storyDays } from '../data/storyData';
import { vocabularyDatabase } from '../data/vocabularyData';

const DailyContentTest: React.FC = () => {
  const { testMode, testDate, effectiveDate, setTestDate, resetToToday, enableTestMode } = useDailyContentTest();

  const todayWordle = getDailyContent(wordleWords, effectiveDate);
  const todayStory = getDailyContent(storyDays, effectiveDate);
  const todayVocab = getDailyItems(vocabularyDatabase, 3, effectiveDate);

  // Set your cycle start date here (e.g., 2024-01-01)
  const cycleStartDate = new Date('2024-01-01');
  const testDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(cycleStartDate);
    date.setDate(cycleStartDate.getDate() + i);
    return {
      label: `Day ${i + 1}`,
      date: date.toISOString().split('T')[0],
    };
  });

  return (
    <div className="ui-card w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-brand-text-primary">
        Daily Content Test
      </h2>
      
      <div className="mb-6 p-4 bg-brand-secondary/20 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-brand-text-secondary">
              Current Date: <span className="font-semibold">{effectiveDate}</span>
            </p>
            <p className="text-sm text-brand-text-secondary">
              Test Mode: <span className={`font-semibold ${testMode ? 'text-warning' : 'text-success'}`}>
                {testMode ? 'Enabled' : 'Disabled'}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={enableTestMode}
              className="btn btn-secondary btn-sm"
              disabled={testMode}
            >
              Enable Test Mode
            </button>
            <button
              onClick={resetToToday}
              className="btn btn-primary btn-sm"
              disabled={!testMode}
            >
              Reset to Today
            </button>
          </div>
        </div>

        {testMode && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-brand-text-primary">Test Different Days:</p>
            <div className="flex flex-wrap gap-2">
              {testDates.map(({ label, date }) => (
                <button
                  key={date}
                  onClick={() => setTestDate(date)}
                  className={`px-3 py-1 rounded text-sm border ${
                    testDate === date
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-white text-brand-text-primary border-brand-surface-darker hover:bg-brand-secondary/20'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wordle Word */}
        <div className="ui-card p-4">
          <h3 className="font-bold text-lg mb-3 text-brand-text-primary">Daily Wordle</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Japanese:</span> {todayWordle.japanese}</p>
            <p><span className="font-semibold">Romaji:</span> {todayWordle.romaji}</p>
            <p><span className="font-semibold">English:</span> {todayWordle.english}</p>
            <p><span className="font-semibold">Hint:</span> {todayWordle.hint.description}</p>
            <p><span className="font-semibold">Emoji:</span> {todayWordle.hint.emoji}</p>
          </div>
        </div>

        {/* Story */}
        <div className="ui-card p-4">
          <h3 className="font-bold text-lg mb-3 text-brand-text-primary">Daily Story</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Title:</span> {todayStory.title}</p>
            <p><span className="font-semibold">Title (JP):</span> {todayStory.titleJp}</p>
            <p><span className="font-semibold">New Words:</span></p>
            <ul className="list-disc list-inside ml-2">
              {todayStory.newWords.map((word, index) => (
                <li key={index} className="text-sm">
                  {word.jp} ({word.romaji})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vocabulary */}
        <div className="ui-card p-4">
          <h3 className="font-bold text-lg mb-3 text-brand-text-primary">Daily Vocabulary</h3>
          <div className="space-y-2">
            {todayVocab.map((vocab, index) => (
              <div key={vocab.id} className="border-b border-brand-surface-darker pb-2 last:border-b-0">
                <p><span className="font-semibold">English:</span> {vocab.english}</p>
                <p><span className="font-semibold">Japanese:</span> {vocab.japanese}</p>
                <p><span className="font-semibold">Romaji:</span> {vocab.romanji}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-brand-surface rounded-lg">
        <h4 className="font-semibold mb-2 text-brand-text-primary">How it works:</h4>
        <ul className="text-sm text-brand-text-secondary space-y-1">
          <li>• Content changes every 24 hours based on the current date</li>
          <li>• All users see the same content on the same day</li>
          <li>• Content is deterministic - same date always produces same content</li>
          <li>• Use test mode to preview content for different dates</li>
        </ul>
      </div>
    </div>
  );
};

export default DailyContentTest; 