import { useState, useEffect } from 'react';
import { getTodayDateString, shouldRefreshContent } from '../utils/dailyContent';

/**
 * Hook to manage daily content and track when content should refresh
 */
export function useDailyContent() {
  const [currentDate, setCurrentDate] = useState(getTodayDateString());
  const [lastRefreshDate, setLastRefreshDate] = useState<string | null>(null);

  // Check if content should refresh
  const shouldRefresh = shouldRefreshContent(lastRefreshDate || undefined);

  // Update current date every minute to check for date changes
  useEffect(() => {
    const interval = setInterval(() => {
      const today = getTodayDateString();
      if (today !== currentDate) {
        setCurrentDate(today);
        setLastRefreshDate(today);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [currentDate]);

  // Initialize last refresh date
  useEffect(() => {
    if (!lastRefreshDate) {
      setLastRefreshDate(currentDate);
    }
  }, [currentDate, lastRefreshDate]);

  return {
    currentDate,
    lastRefreshDate,
    shouldRefresh,
    refreshContent: () => setLastRefreshDate(currentDate),
  };
}

/**
 * Hook for testing daily content with specific dates
 */
export function useDailyContentTest(testDate?: string) {
  const [testMode, setTestMode] = useState(false);
  const [testDateState, setTestDateState] = useState(testDate || getTodayDateString());

  const getEffectiveDate = () => {
    return testMode ? testDateState : getTodayDateString();
  };

  const setTestDate = (date: string) => {
    setTestDateState(date);
    setTestMode(true);
  };

  const resetToToday = () => {
    setTestMode(false);
    setTestDateState(getTodayDateString());
  };

  return {
    testMode,
    testDate: testDateState,
    effectiveDate: getEffectiveDate(),
    setTestDate,
    resetToToday,
    enableTestMode: () => setTestMode(true),
    disableTestMode: () => setTestMode(false),
  };
} 