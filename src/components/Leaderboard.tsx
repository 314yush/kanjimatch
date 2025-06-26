import React, { useEffect, useState } from 'react';
import { SupabaseService } from '../utils/supabaseService';

interface LeaderboardEntry {
  user_id: string;
  email: string | null;
  total_gems: number;
  current_streak: number;
  longest_streak: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await SupabaseService.getLeaderboard(10);
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="ui-card text-center animate-pop-in">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="ui-card animate-pop-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      
      {leaderboard.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No data available yet.</p>
          <p className="text-sm mt-2">Complete games to appear on the leaderboard!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.user_id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                index === 0 ? 'bg-yellow-50 border-yellow-200' :
                index === 1 ? 'bg-gray-50 border-gray-200' :
                index === 2 ? 'bg-orange-50 border-orange-200' :
                'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0 ? 'bg-yellow-400 text-white' :
                  index === 1 ? 'bg-gray-400 text-white' :
                  index === 2 ? 'bg-orange-400 text-white' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {entry.email ? entry.email.split('@')[0] : 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-500">
                    🔥 {entry.current_streak} day streak
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-yellow-600">
                  💎 {entry.total_gems}
                </p>
                <p className="text-xs text-gray-500">
                  Best: {entry.longest_streak} days
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard; 