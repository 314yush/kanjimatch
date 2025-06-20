import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the service role key
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getUserIdFromPrivyId(privyId: string): Promise<string | null> {
    const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('privy_id', privyId)
        .single();
    if (error || !data) {
        console.error('Error fetching user by privy_id:', error);
        return null;
    }
    return data.id;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { privyId } = req.body;

  if (!privyId) {
    return res.status(400).json({ error: 'privyId is required' });
  }

  try {
    const userId = await getUserIdFromPrivyId(privyId);

    if (!userId) {
        return res.status(404).json({ error: 'User not found for the given privyId.' });
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('total_gems, current_streak, longest_streak')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      // Don't expose detailed error messages to the client
      return res.status(500).json({ error: 'Internal server error while fetching progress.' });
    }

    if (!data) {
        return res.status(404).json({ error: 'User progress not found.' });
    }

    return res.status(200).json({
      totalGems: data.total_gems,
      currentStreak: data.current_streak,
      longestStreak: data.longest_streak,
    });

  } catch (e) {
    console.error('Unexpected error:', e);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
} 