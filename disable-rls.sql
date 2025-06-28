-- Disable RLS for testing purposes
-- WARNING: This removes security - only use for local development/testing

-- Disable RLS on all tables
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_completions DISABLE ROW LEVEL SECURITY;
ALTER TABLE game_completions DISABLE ROW LEVEL SECURITY;

-- Drop all RLS policies (optional, but recommended for clean state)
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;

DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON user_progress;

DROP POLICY IF EXISTS "Users can view their own daily completions" ON daily_completions;
DROP POLICY IF EXISTS "Users can insert their own daily completions" ON daily_completions;
DROP POLICY IF EXISTS "Users can update their own daily completions" ON daily_completions;

DROP POLICY IF EXISTS "Users can view their own game completions" ON game_completions;
DROP POLICY IF EXISTS "Users can insert their own game completions" ON game_completions;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('users', 'user_progress', 'daily_completions', 'game_completions'); 