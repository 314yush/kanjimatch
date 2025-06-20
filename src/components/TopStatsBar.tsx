import React, { useEffect, useState } from 'react';
import { Gem, Flame } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getSupabaseUserId, fetchUserProgress } from '../utils/xpStreak';

const TopStatsBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animateGems, setAnimateGems] = useState(false);
  const [animateStreak, setAnimateStreak] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const userId = await getSupabaseUserId(user.id);
        const prog = await fetchUserProgress(userId);
        if (progress) {
          if (prog.total_gems !== progress.total_gems) {
            setAnimateGems(true);
            setTimeout(() => setAnimateGems(false), 600);
          }
          if (prog.current_streak !== progress.current_streak) {
            setAnimateStreak(true);
            setTimeout(() => setAnimateStreak(false), 600);
          }
        }
        setProgress(prog);
      } catch (err: any) {
        setError('Could not load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
    const interval = setInterval(fetchProgress, 10000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className={`w-full flex items-center justify-between px-4 py-2 bg-white/90 backdrop-blur sticky top-0 z-30 ${className}`} style={{minHeight: 56}}>
      {/* Center: Streak */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className={`text-orange-500 text-lg font-bold flex items-center transition-transform duration-300 ${animateStreak ? 'scale-110' : ''}`}
          >
          <Flame className="w-6 h-6 mr-1 text-orange-500" />
          <span>{loading ? '—' : error ? '—' : progress?.current_streak ?? 0}</span>
        </span>
        <span className="text-xs text-gray-500 font-medium">Streak</span>
      </div>
      {/* Right: Gems */}
      <div className="ml-auto flex items-center gap-1">
        <Gem className={`w-6 h-6 md:w-7 md:h-7 text-blue-500 transition-transform duration-300 ${animateGems ? 'scale-125' : ''}`} />
        <span className="text-blue-600 text-lg font-bold ml-1">{loading ? '—' : error ? '—' : progress?.total_gems ?? 0}</span>
      </div>
    </div>
  );
};

export default TopStatsBar; 