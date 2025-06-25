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
import { getDailyWordleWord } from './data/vocabularyData';
import { getTodaysStorySegment } from './data/storyData';
import { phraseDataset } from './data/phraseData';
import { useAuth } from './hooks/useAuth';

import './styles/index.css';

const GameRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      const tileMatchWords = phraseDataset.slice(0, 5).map(p => p.jp);
      setWordsLearned(prev => Array.from(new Set([...prev, ...tileMatchWords])));
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
      <Route path="/" element={<TileMatch onComplete={() => navigate('/wordle')} />} />
      <Route path="/wordle" element={<WordleChallenge onComplete={() => navigate('/story')} />} />
      <Route path="/story" element={<StoryMode onComplete={() => {
        setEndTime(Date.now());
        navigate('/results');
      }} />} />
      <Route path="/results" element={<EndScreen 
          wordsLearned={wordsLearned}
          timeTaken={startTime && endTime ? Math.round((endTime - startTime) / 1000) : 0}
          onRestart={resetGame} 
        />} />
    </Routes>
  );
};


const App: React.FC = () => {
    const { ready, authenticated, login } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<AppTab>('home');
    const [showLoginModal, setShowLoginModal] = useState(false);

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

    // Show login modal if not authenticated
    if (!authenticated && showLoginModal) {
        return <LoginModal onLogin={handleLogin} onContinueAsGuest={handleContinueAsGuest} />;
    }

    return (
        <main className="app-container pb-24">
            {/* Header with User Profile */}
            {authenticated && (
                <header className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-900">KanjiMatch</h1>
                    <UserProfile />
                </header>
            )}
            
            {showProgressBar && <ProgressBar currentStep={currentStep} totalSteps={4} />}
            <div className={showProgressBar ? "mt-4" : ""}>
                <Routes>
                    <Route path="/*" element={<GameRoutes />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </div>
            <BottomNavBar activeTab={activeTab} />
        </main>
    );
};

export default App;
