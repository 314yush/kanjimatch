# Supabase Setup Guide for KanjiMatch

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Privy Account**: Already configured for authentication

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose your organization and project name
3. Set a secure database password
4. Choose a region close to your users
5. Wait for the project to be created (usually takes 1-2 minutes)

## Step 2: Set Up Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire SQL schema from your `supabase-schema.sql` file
4. Click **Run** to execute the schema

## Step 3: Configure Environment Variables

1. In your Supabase project, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

3. Create or update your `.env` file in the project root:
```env
REACT_APP_PRIVY_APP_ID=your_privy_app_id_here
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Step 4: Configure Row Level Security (RLS)

The SQL schema includes RLS policies, but you need to ensure they're working correctly:

1. Go to **Authentication** → **Policies** in your Supabase dashboard
2. Verify that RLS is enabled for all tables:
   - `users`
   - `user_progress`
   - `daily_completions`
   - `game_completions`

## Step 5: Test the Integration

1. Start your development server: `npm start`
2. Sign in with Privy
3. Check that user data is being created in Supabase:
   - Go to **Table Editor** → **users**
   - You should see a new row when you sign in

## Step 6: Verify Game Completion Tracking

1. Complete a game in the app
2. Check the **game_completions** table in Supabase
3. Verify that gems and streaks are being updated in **user_progress**

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Ensure your `.env` file has the correct Supabase URL and anon key
   - Restart your development server after updating `.env`

2. **"Error creating user"**
   - Check that the `users` table exists and has the correct schema
   - Verify RLS policies are not blocking inserts

3. **"Error fetching leaderboard"**
   - Ensure the join between `user_progress` and `users` tables is working
   - Check that users have completed games to appear on leaderboard

4. **Authentication issues**
   - Verify Privy App ID is correct
   - Check that Supabase RLS policies are using `auth.uid()` correctly

### Database Schema Verification

Run this query in the SQL Editor to verify your schema:

```sql
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'user_progress', 'daily_completions', 'game_completions')
ORDER BY table_name, ordinal_position;
```

### RLS Policy Verification

Check that RLS policies are working:

```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'user_progress', 'daily_completions', 'game_completions');

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

## Production Deployment

1. **Environment Variables**: Ensure all environment variables are set in your production environment
2. **CORS Settings**: In Supabase dashboard, go to **Settings** → **API** and add your production domain to allowed origins
3. **Database Backups**: Set up automated backups in Supabase dashboard
4. **Monitoring**: Use Supabase's built-in monitoring to track performance and errors

## Security Best Practices

1. **Never expose service role key** in client-side code
2. **Use RLS policies** to ensure users can only access their own data
3. **Validate input data** on both client and server side
4. **Monitor for unusual activity** in Supabase dashboard
5. **Regular security audits** of your RLS policies

## Performance Optimization

1. **Indexes**: The schema includes indexes for common queries
2. **Connection Pooling**: Supabase handles this automatically
3. **Caching**: Consider implementing client-side caching for frequently accessed data
4. **Query Optimization**: Monitor slow queries in Supabase dashboard

## Support

- **Supabase Documentation**: [docs.supabase.com](https://docs.supabase.com)
- **Supabase Discord**: [discord.supabase.com](https://discord.supabase.com)
- **Privy Documentation**: [docs.privy.io](https://docs.privy.io) 