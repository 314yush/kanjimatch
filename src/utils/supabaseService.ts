import { supabase, Database } from './supabaseClient';

type User = Database['public']['Tables']['users']['Row'];
type UserProgress = Database['public']['Tables']['user_progress']['Row'];
type DailyCompletion = Database['public']['Tables']['daily_completions']['Row'];
type GameCompletion = Database['public']['Tables']['game_completions']['Row'];

export class SupabaseService {
  // User management
  static async createUser(privyId: string, email?: string, walletAddress?: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          privy_id: privyId,
          email,
          wallet_address: walletAddress,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  static async getUserByPrivyId(privyId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('privy_id', privyId)
        .single();

      if (error) {
        console.error('Error fetching user:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  static async updateUserLastActive(privyId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .update({ last_active: new Date().toISOString() })
        .eq('privy_id', privyId);

      if (error) {
        console.error('Error updating user last active:', error);
      }
    } catch (error) {
      console.error('Error updating user last active:', error);
    }
  }

  // User progress management
  static async getUserProgress(userId: string): Promise<UserProgress | null> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user progress:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }
  }

  static async updateUserProgress(
    userId: string,
    updates: Partial<Pick<UserProgress, 'total_gems' | 'current_streak' | 'longest_streak' | 'gems_earned_today' | 'last_streak_date'>>
  ): Promise<UserProgress | null> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user progress:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating user progress:', error);
      return null;
    }
  }

  // Daily completions
  static async getDailyCompletion(userId: string, date: string): Promise<DailyCompletion | null> {
    try {
      const { data, error } = await supabase
        .from('daily_completions')
        .select('*')
        .eq('user_id', userId)
        .eq('completion_date', date)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error fetching daily completion:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching daily completion:', error);
      return null;
    }
  }

  static async createOrUpdateDailyCompletion(
    userId: string,
    date: string,
    challengesCompleted: string[]
  ): Promise<DailyCompletion | null> {
    try {
      const { data, error } = await supabase
        .from('daily_completions')
        .upsert({
          user_id: userId,
          completion_date: date,
          challenges_completed: challengesCompleted,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating/updating daily completion:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating/updating daily completion:', error);
      return null;
    }
  }

  // Game completions
  static async recordGameCompletion(
    userId: string,
    gameType: 'tilematch' | 'wordle' | 'story',
    gemsEarned: number = 10
  ): Promise<GameCompletion | null> {
    try {
      const { data, error } = await supabase
        .from('game_completions')
        .insert({
          user_id: userId,
          game_type: gameType,
          gems_earned: gemsEarned,
        })
        .select()
        .single();

      if (error) {
        console.error('Error recording game completion:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error recording game completion:', error);
      return null;
    }
  }

  static async getGameCompletions(userId: string, limit: number = 50): Promise<GameCompletion[]> {
    try {
      const { data, error } = await supabase
        .from('game_completions')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching game completions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching game completions:', error);
      return [];
    }
  }

  // Leaderboard data
  static async getLeaderboard(limit: number = 10): Promise<Array<{
    user_id: string;
    email: string | null;
    total_gems: number;
    current_streak: number;
    longest_streak: number;
  }>> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          user_id,
          total_gems,
          current_streak,
          longest_streak,
          users!inner(email)
        `)
        .order('total_gems', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
      }

      return data?.map((item: any) => ({
        user_id: item.user_id,
        email: item.users?.email || null,
        total_gems: item.total_gems,
        current_streak: item.current_streak,
        longest_streak: item.longest_streak,
      })) || [];
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  // Streak management
  static async updateStreak(userId: string): Promise<UserProgress | null> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const progress = await this.getUserProgress(userId);
      
      if (!progress) return null;

      const lastStreakDate = progress.last_streak_date;
      const currentStreak = progress.current_streak;
      const longestStreak = progress.longest_streak;

      let newStreak = currentStreak;
      let newLongestStreak = longestStreak;

      if (lastStreakDate === today) {
        // Already completed today, no streak change
        return progress;
      } else if (lastStreakDate === this.getYesterday()) {
        // Consecutive day
        newStreak = currentStreak + 1;
        newLongestStreak = Math.max(longestStreak, newStreak);
      } else {
        // Streak broken, reset to 1
        newStreak = 1;
      }

      return await this.updateUserProgress(userId, {
        current_streak: newStreak,
        longest_streak: newLongestStreak,
        last_streak_date: today,
      });
    } catch (error) {
      console.error('Error updating streak:', error);
      return null;
    }
  }

  private static getYesterday(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }
} 