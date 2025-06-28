import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { loadUserProgress, saveUserProgress } from '../utils/userProgress';
import { UserProgress } from '../types/User';
import { SupabaseService } from '../utils/supabaseService';

export interface AuthUser {
  id: string;
  email?: string;
  walletAddress?: string;
  isAuthenticated: boolean;
  supabaseUserId?: string; // Add Supabase user ID
}

export interface UserStats {
  totalGems: number;
  currentStreak: number;
  longestStreak: number;
  gemsEarnedToday: number;
}

export function useAuth() {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkEmail,
    linkWallet,
    unlinkWallet,
    unlinkEmail,
    getAccessToken,
  } = usePrivy();

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && authenticated && user) {
      handleUserAuthentication();
    } else if (ready && !authenticated) {
      setAuthUser(null);
      setUserProgress(null);
      setUserStats(null);
    }
  }, [ready, authenticated, user]);

  const handleUserAuthentication = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Create or get user from Supabase (no JWT needed with RLS disabled)
      let supabaseUser = await SupabaseService.getUserByPrivyId(user.id);
      
      if (!supabaseUser) {
        // Create new user in Supabase
        supabaseUser = await SupabaseService.createUser(
          user.id,
          user.email?.address,
          user.wallet?.address
        );
      } else {
        // Update last active
        await SupabaseService.updateUserLastActive(user.id);
      }

      if (supabaseUser) {
        // Get user stats from Supabase
        const stats = await SupabaseService.getUserProgress(supabaseUser.id);
        
        const authUserData: AuthUser = {
          id: user.id,
          email: user.email?.address,
          walletAddress: user.wallet?.address,
          isAuthenticated: true,
          supabaseUserId: supabaseUser.id,
        };
        
        setAuthUser(authUserData);
        
        if (stats) {
          setUserStats({
            totalGems: stats.total_gems,
            currentStreak: stats.current_streak,
            longestStreak: stats.longest_streak,
            gemsEarnedToday: stats.gems_earned_today,
          });
        }

        // Load local user progress for backward compatibility
        const localProgress = loadUserProgress();
        if (localProgress) {
          setUserProgress(localProgress);
        }
      }
    } catch (error) {
      console.error('Error handling user authentication:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthUser(null);
      setUserProgress(null);
      setUserStats(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUserProgress = (progress: UserProgress) => {
    saveUserProgress(progress);
    setUserProgress(progress);
  };

  const updateUserStats = async (updates: Partial<UserStats>) => {
    if (!authUser?.supabaseUserId) return;

    try {
      const updatedStats = await SupabaseService.updateUserProgress(
        authUser.supabaseUserId,
        {
          total_gems: updates.totalGems,
          current_streak: updates.currentStreak,
          longest_streak: updates.longestStreak,
          gems_earned_today: updates.gemsEarnedToday,
        }
      );

      if (updatedStats) {
        setUserStats({
          totalGems: updatedStats.total_gems,
          currentStreak: updatedStats.current_streak,
          longestStreak: updatedStats.longest_streak,
          gemsEarnedToday: updatedStats.gems_earned_today,
        });
      }
    } catch (error) {
      console.error('Error updating user stats:', error);
    }
  };

  const recordGameCompletion = async (
    gameType: 'tilematch' | 'wordle' | 'story',
    gemsEarned: number = 10
  ) => {
    if (!authUser?.supabaseUserId) return;

    try {
      await SupabaseService.recordGameCompletion(
        authUser.supabaseUserId,
        gameType,
        gemsEarned
      );

      // Update local stats
      if (userStats) {
        await updateUserStats({
          totalGems: userStats.totalGems + gemsEarned,
          gemsEarnedToday: userStats.gemsEarnedToday + gemsEarned,
        });
      }
    } catch (error) {
      console.error('Error recording game completion:', error);
    }
  };

  return {
    ready,
    authenticated,
    user: authUser,
    userProgress,
    userStats,
    loading,
    login: handleLogin,
    logout: handleLogout,
    linkEmail,
    linkWallet,
    unlinkWallet,
    unlinkEmail,
    updateUserProgress,
    updateUserStats,
    recordGameCompletion,
  };
} 