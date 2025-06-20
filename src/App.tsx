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
import { getDailyWordleWord } from './data/vocabularyData';
import { getTodaysStorySegment } from './data/storyData';
import { phraseDataset } from './data/phraseData';

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<AppTab>('home');

    const pathMap: { [key: string]: number } = {
        '/': 1,
        '/wordle': 2,
        '/story': 3,
        '/results': 4,
    };
    const currentStep = pathMap[location.pathname] || 0;
    const showProgressBar = activeTab === 'home' && isAuthenticated && currentStep > 0 && currentStep < 4;

    const onLogin = () => {
        setIsAuthenticated(true);
    }

    useEffect(() => {
        if(location.pathname.startsWith('/leaderboard')) {
            setActiveTab('leaderboard');
        } else {
            setActiveTab('home');
        }
    }, [location.pathname]);

  if (!isAuthenticated) {
    return <LoginModal onLogin={onLogin} onContinueAsGuest={onLogin} />;
  }

  return (
    <main className="app-container pb-24">
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
