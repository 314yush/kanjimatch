-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (linked to Privy)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    privy_id TEXT UNIQUE NOT NULL,
    email TEXT,
    wallet_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    total_gems INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    gems_earned_today INTEGER DEFAULT 0,
    last_streak_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create daily_completions table
CREATE TABLE IF NOT EXISTS daily_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    completion_date DATE NOT NULL,
    challenges_completed TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, completion_date)
);

-- Create game_completions table
CREATE TABLE IF NOT EXISTS game_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    game_type TEXT CHECK (game_type IN ('tilematch', 'wordle', 'story')),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gems_earned INTEGER DEFAULT 10
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_privy_id ON users(privy_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_completions_user_date ON daily_completions(user_id, completion_date);
CREATE INDEX IF NOT EXISTS idx_game_completions_user_id ON game_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_game_completions_completed_at ON game_completions(completed_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_completions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid()::text = privy_id);

CREATE POLICY "Users can insert their own data" ON users
    FOR INSERT WITH CHECK (auth.uid()::text = privy_id);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid()::text = privy_id);

-- Create RLS policies for user_progress table
CREATE POLICY "Users can view their own progress" ON user_progress
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM users WHERE privy_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can insert their own progress" ON user_progress
    FOR INSERT WITH CHECK (
        user_id IN (
            SELECT id FROM users WHERE privy_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can update their own progress" ON user_progress
    FOR UPDATE USING (
        user_id IN (
            SELECT id FROM users WHERE privy_id = auth.uid()::text
        )
    );

-- Create RLS policies for daily_completions table
CREATE POLICY "Users can view their own daily completions" ON daily_completions
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM users WHERE privy_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can insert their own daily completions" ON daily_completions
    FOR INSERT WITH CHECK (
        user_id IN (
            SELECT id FROM users WHERE privy_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can update their own daily completions" ON daily_completions
    FOR UPDATE USING (
        user_id IN (
            SELECT id FROM users WHERE privy_id = auth.uid()::text
        )
    );

-- Create RLS policies for game_completions table
CREATE POLICY "Users can view their own game completions" ON game_completions
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM users WHERE privy_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can insert their own game completions" ON game_completions
    FOR INSERT WITH CHECK (
        user_id IN (
            SELECT id FROM users WHERE privy_id = auth.uid()::text
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_user_progress_updated_at 
    BEFORE UPDATE ON user_progress 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_completions_updated_at 
    BEFORE UPDATE ON daily_completions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically create user_progress when user is created
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_progress (user_id, total_gems, current_streak, longest_streak)
    VALUES (NEW.id, 0, 0, 0);
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for new users
CREATE TRIGGER on_user_created
    AFTER INSERT ON users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user(); 

-- Create function to reset daily gems
CREATE OR REPLACE FUNCTION reset_daily_gems()
RETURNS void AS $$
BEGIN
    UPDATE user_progress 
    SET gems_earned_today = 0 
    WHERE last_streak_date < CURRENT_DATE;
END;
$$ language 'plpgsql';

-- Create a scheduled job to reset daily gems (requires pg_cron extension)
-- SELECT cron.schedule('reset-daily-gems', '0 0 * * *', 'SELECT reset_daily_gems();'); 