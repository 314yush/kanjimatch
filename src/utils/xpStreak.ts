import { supabase } from './supabaseClient';

const ALL_MODES = ['tilematch', 'wordle', 'story'];

// Get Supabase user UUID from privy_id
export async function getSupabaseUserId(privyId: string): Promise<string> {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('privy_id', privyId)
    .single();
  if (error || !data) throw error || new Error('User not found');
  return data.id;
}

// Fetch user progress from Supabase
export async function fetchUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return data;
}

// Update XP (total_gems and gems_earned_today)
export async function updateXP(userId: string, xpEarned: number) {
  const progress = await fetchUserProgress(userId);
  const { error } = await supabase
    .from('user_progress')
    .update({
      total_gems: (progress.total_gems || 0) + xpEarned,
      gems_earned_today: (progress.gems_earned_today || 0) + xpEarned,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);
  if (error) throw error;
}

// Update daily_completions for a mode
export async function updateDailyCompletions(userId: string, mode: string) {
  const today = new Date().toISOString().slice(0, 10);
  // Fetch today's completion
  const { data, error } = await supabase
    .from('daily_completions')
    .select('*')
    .eq('user_id', userId)
    .eq('completion_date', today)
    .single();

  let newChallenges: string[] = [mode];
  if (data) {
    // Already exists, update array if not present
    if (!data.challenges_completed.includes(mode)) {
      newChallenges = [...data.challenges_completed, mode];
    } else {
      newChallenges = data.challenges_completed;
    }
    const { error: updateError } = await supabase
      .from('daily_completions')
      .update({ challenges_completed: newChallenges })
      .eq('id', data.id);
    if (updateError) throw updateError;
  } else {
    // Insert new row
    const { error: insertError } = await supabase
      .from('daily_completions')
      .insert({
        user_id: userId,
        completion_date: today,
        challenges_completed: [mode],
      });
    if (insertError) throw insertError;
  }
}

// Check if all modes are completed for today
export async function checkIfAllModesCompleted(userId: string): Promise<boolean> {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('daily_completions')
    .select('challenges_completed')
    .eq('user_id', userId)
    .eq('completion_date', today)
    .single();
  if (error || !data) return false;
  return ALL_MODES.every(mode => data.challenges_completed.includes(mode));
}

// Update streak if daily challenge is complete
export async function updateStreakIfDailyChallengeComplete(userId: string) {
  const allDone = await checkIfAllModesCompleted(userId);
  if (!allDone) return;
  const progress = await fetchUserProgress(userId);
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let newStreak = progress.current_streak || 0;
  let newLongest = progress.longest_streak || 0;
  if (progress.last_streak_date === yesterday) {
    newStreak += 1;
    if (newStreak > newLongest) newLongest = newStreak;
  } else if (progress.last_streak_date !== today) {
    newStreak = 1;
  }
  const { error } = await supabase
    .from('user_progress')
    .update({
      current_streak: newStreak,
      longest_streak: newLongest,
      last_streak_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);
  if (error) throw error;
}

// Shared handler for mode completion
export async function handleModeComplete(mode: string, privyId: string, xp: number) {
  const userId = await getSupabaseUserId(privyId);
  await updateDailyCompletions(userId, mode);
  await updateXP(userId, xp);
  await updateStreakIfDailyChallengeComplete(userId);
} 