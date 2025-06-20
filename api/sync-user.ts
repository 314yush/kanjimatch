import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// This log runs when the function is initialized
console.log('Initializing Supabase client for sync-user');
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('--- /api/sync-user endpoint hit ---');

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user } = req.body;
  console.log('Received request body:', req.body);

  if (!user || !user.id) {
    console.log('Validation failed: User data or user.id is missing.');
    return res.status(400).json({ error: 'User data is required' });
  }

  const { id: privy_id, email, wallet } = user;
  const wallet_address = wallet?.address;
  const userEmail = email?.address;

  console.log(`Extracted user data: privy_id=${privy_id}, email=${userEmail}, wallet=${wallet_address}`);

  try {
    console.log(`Attempting to upsert user with privy_id: ${privy_id}`);
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert(
        {
          privy_id: privy_id,
          email: userEmail,
          wallet_address: wallet_address,
          last_active: new Date().toISOString(),
        },
        { onConflict: 'privy_id' }
      )
      .select()
      .single();

    if (userError) {
      console.error('Supabase error during user upsert:', userError);
      throw userError; // This will be caught by the outer catch block
    }
    console.log('Successfully upserted user. Supabase user ID:', userData.id);

    console.log(`Attempting to upsert user_progress for user_id: ${userData.id}`);
    const { error: progressError } = await supabase
      .from('user_progress')
      .upsert({ user_id: userData.id }, { onConflict: 'user_id' });

    if (progressError) {
      // This is not ideal, but we can consider it non-fatal for now
      console.error('Supabase user progress init error:', progressError);
    } else {
      console.log('Successfully ensured user_progress record exists.');
    }

    console.log('--- Sync successful ---');
    return res.status(200).json({ success: true, user: userData });

  } catch (error) {
    console.error('--- CRITICAL ERROR in /api/sync-user ---');
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
} 