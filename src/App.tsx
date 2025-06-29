import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import TileMatch from './components/TileMatch';
import StoryMode from './components/StoryMode';
import WordleChallenge from './components/WordleChallenge';
import EndScreen from './components/EndScreen';
import ProgressBar from './components/ProgressBar';
import BottomNavBar, { AppTab } from './components/BottomNavBar';
import Leaderboard from './components/Leaderboard';
import UserProfile from './components/UserProfile';
import DailyContentTest from './components/DailyContentTest';
import { getDailyWordleWord } from './data/vocabularyData';
import { getTodaysStorySegment } from './data/storyData';
import { phraseDataset } from './data/phraseData';
import { useAuth } from './hooks/useAuth';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import './styles/index.css';

const GameRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recordGameCompletion, userStats, updateUserStats } = useAuth();

  const [wordsLearned, setWordsLearned] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const handleWordLearned = useCallback((word: string) => {
    setWordsLearned(prev => Array.from(new Set([...prev, word])));
  }, []);

  const resetGame = useCallback(() => {
    setWordsLearned([]);
    setStartTime(Date.now());
    setEndTime(null);
    navigate('/');
  },[navigate]);

  const handleGameComplete = useCallback(async (gameType: 'tilematch' | 'wordle' | 'story') => {
    const streak = userStats?.currentStreak || 0;
    let gems = 1;
    if (streak >= 14) {
      gems = 5;
    } else if (streak >= 7) {
      gems = 3;
    } else if (streak >= 3) {
      gems = 2;
    }

    // Award milestone bonuses only once per milestone
    let milestoneBonus = 0;
    // We'll use localStorage to track if the user has received the milestone bonus for this streak
    const userId = userStats ? `${userStats.totalGems}_${userStats.currentStreak}_${userStats.longestStreak}` : '';
    if (streak === 7 && !localStorage.getItem('streak7bonus_' + userId)) {
      milestoneBonus = 10;
      localStorage.setItem('streak7bonus_' + userId, 'true');
    } else if (streak === 30 && !localStorage.getItem('streak30bonus_' + userId)) {
      milestoneBonus = 25;
      localStorage.setItem('streak30bonus_' + userId, 'true');
    }

    await recordGameCompletion(gameType, gems + milestoneBonus);

    // Optionally, update userStats immediately for UI feedback
    if (milestoneBonus > 0 && userStats) {
      await updateUserStats({
        totalGems: userStats.totalGems + gems + milestoneBonus,
        gemsEarnedToday: userStats.gemsEarnedToday + gems + milestoneBonus,
      });
    }
  }, [recordGameCompletion, userStats, updateUserStats]);
  
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      const tileMatchWords = phraseDataset.slice(0, 5).map(p => p.jp);
      setWordsLearned(prev => Array.from(new Set([...prev, ...tileMatchWords])));
      setStartTime(prev => prev ?? Date.now());
    } else if (path === '/wordle') {
      const wordle = getDailyWordleWord();
      handleWordLearned(wordle.japanese);
    } else if (path === '/story') {
        const story = getTodaysStorySegment();
        const storyWords = story.flatMap(s => s.newWords.map(w => w.jp));
        setWordsLearned(prev => Array.from(new Set([...prev, ...storyWords])));
    }
  }, [location.pathname, handleWordLearned]);

  return (
    <Routes>
      <Route path="/" element={
        <TileMatch 
          onComplete={() => {
            handleGameComplete('tilematch');
            navigate('/wordle');
          }} 
        />
      } />
      <Route path="/wordle" element={
        <WordleChallenge 
          onComplete={() => {
            handleGameComplete('wordle');
            navigate('/story');
          }} 
        />
      } />
      <Route path="/story" element={
        <StoryMode 
          onComplete={() => {
            handleGameComplete('story');
            setEndTime(Date.now());
            navigate('/results');
          }} 
        />
      } />
      <Route path="/results" element={<EndScreen 
          wordsLearned={wordsLearned}
          timeTaken={startTime && endTime ? Math.round((endTime - startTime) / 1000) : 0}
          onRestart={resetGame} 
          userStats={userStats ?? undefined}
        />} />
    </Routes>
  );
};

const UserStatsDisplay: React.FC = () => {
  const { userStats } = useAuth();

  if (!userStats) return null;

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">💎</span>
        <span className="font-semibold">{userStats.totalGems}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-orange-500">🔥</span>
        <span className="font-semibold">{userStats.currentStreak}</span>
      </div>
    </div>
  );
};

const InfoModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-brand-primary"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2 text-brand-text-primary flex items-center gap-2">
          <InformationCircleIcon className="w-6 h-6 text-brand-primary" />
          How KanjiMatch Works
        </h2>
        <div className="text-brand-text-secondary text-sm space-y-3">
          <div>
            <span className="font-semibold text-brand-text-primary">Daily Games:</span> Each day, play <span className="font-semibold">Tile Match</span>, <span className="font-semibold">Wordle</span>, and <span className="font-semibold">Story Mode</span> to learn new Japanese words and phrases.
          </div>
          <div>
            <span className="font-semibold text-brand-text-primary">Streaks:</span> Play every day to build your streak <span className="text-orange-500">🔥</span>. The longer your streak, the more gems you earn!
          </div>
          <div>
            <span className="font-semibold text-brand-text-primary">Gem System:</span>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Streak 1–2: <span className="font-semibold">1 gem</span> per game</li>
              <li>Streak 3–6: <span className="font-semibold">2 gems</span> per game</li>
              <li>Streak 7–13: <span className="font-semibold">3 gems</span> per game</li>
              <li>Streak 14+: <span className="font-semibold">5 gems</span> per game</li>
              <li><span className="font-semibold">Milestone bonuses:</span> 10 gems at 7-day streak, 25 gems at 30-day streak</li>
            </ul>
          </div>
          <div>
            <span className="font-semibold text-brand-text-primary">Leaderboard:</span> Compete with others by earning more gems and keeping your streak alive!
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
    const { ready, authenticated, login, loading } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<AppTab>('home');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const pathMap: { [key: string]: number } = {
        '/': 1,
        '/wordle': 2,
        '/story': 3,
        '/results': 4,
    };
    const currentStep = pathMap[location.pathname] || 0;
    const showProgressBar = activeTab === 'home' && authenticated && currentStep > 0 && currentStep < 4;

    const handleLogin = async () => {
        try {
            await login();
            setShowLoginModal(false);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleContinueAsGuest = () => {
        setShowLoginModal(false);
    };

    useEffect(() => {
        if(location.pathname.startsWith('/leaderboard')) {
            setActiveTab('leaderboard');
        } else {
            setActiveTab('home');
        }
    }, [location.pathname]);

    // Show login modal if not authenticated and Privy is ready
    useEffect(() => {
        if (ready && !authenticated) {
            setShowLoginModal(true);
        } else if (authenticated) {
            setShowLoginModal(false);
        }
    }, [ready, authenticated]);

    // Don't render anything until Privy is ready
    if (!ready) {
        return <div className="app-container flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
            </div>
        </div>;
    }

    // Show loading while authenticating with Supabase
    if (loading) {
        return <div className="app-container flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Setting up your account...</p>
            </div>
        </div>;
    }

    // Show login modal if not authenticated
    if (!authenticated && showLoginModal) {
        return <LoginModal onLogin={handleLogin} onContinueAsGuest={handleContinueAsGuest} />;
    }

    return (
        <main className="app-container pb-24">
            {/* Header with User Profile and Stats */}
            {authenticated && (
                <header className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          KanjiMatch
                          <button
                            className="ml-1 p-1 rounded-full hover:bg-brand-secondary/20 text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            onClick={() => setShowInfo(true)}
                            aria-label="How KanjiMatch Works"
                          >
                            <InformationCircleIcon className="w-5 h-5" />
                          </button>
                        </h1>
                        <UserStatsDisplay />
                    </div>
                    <UserProfile />
                </header>
            )}
            {showInfo && <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />}
            {showProgressBar && <ProgressBar currentStep={currentStep} totalSteps={4} />}
            <div className={showProgressBar ? "mt-4" : ""}>
                <Routes>
                    <Route path="/*" element={<GameRoutes />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    {process.env.NODE_ENV === 'development' && (
                      <Route path="/test" element={<DailyContentTest />} />
                    )}
                </Routes>
            </div>
            <BottomNavBar activeTab={activeTab} />
        </main>
    );
};

export default App;
