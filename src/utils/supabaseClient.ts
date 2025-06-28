import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

// Create a simple client without JWT authentication for testing
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };

// Database types based on your schema
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          privy_id: string;
          email: string | null;
          wallet_address: string | null;
          created_at: string;
          last_active: string;
        };
        Insert: {
          id?: string;
          privy_id: string;
          email?: string | null;
          wallet_address?: string | null;
          created_at?: string;
          last_active?: string;
        };
        Update: {
          id?: string;
          privy_id?: string;
          email?: string | null;
          wallet_address?: string | null;
          created_at?: string;
          last_active?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          total_gems: number;
          current_streak: number;
          longest_streak: number;
          gems_earned_today: number;
          last_streak_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_gems?: number;
          current_streak?: number;
          longest_streak?: number;
          gems_earned_today?: number;
          last_streak_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_gems?: number;
          current_streak?: number;
          longest_streak?: number;
          gems_earned_today?: number;
          last_streak_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      daily_completions: {
        Row: {
          id: string;
          user_id: string;
          completion_date: string;
          challenges_completed: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          completion_date: string;
          challenges_completed?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          completion_date?: string;
          challenges_completed?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      game_completions: {
        Row: {
          id: string;
          user_id: string;
          game_type: 'tilematch' | 'wordle' | 'story';
          completed_at: string;
          gems_earned: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          game_type: 'tilematch' | 'wordle' | 'story';
          completed_at?: string;
          gems_earned?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          game_type?: 'tilematch' | 'wordle' | 'story';
          completed_at?: string;
          gems_earned?: number;
        };
      };
    };
  };
} 