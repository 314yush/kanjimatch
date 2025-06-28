# KanjiMatch

A Japanese language learning app that helps you master phrases through interactive matching games.

## Features

- **Interactive Matching**: Match Japanese phrases with their English translations
- **Sentence Formation**: Practice forming sentences with learned phrases
- **Daily Challenges**: New phrases added daily to expand your vocabulary
- **Progress Tracking**: Track your learning progress over time with gems and streaks
- **User Authentication**: Secure login with Privy (email and wallet support)
- **Leaderboard**: Compare your progress with other learners
- **Cross-device Sync**: Your progress is saved in the cloud

## Daily Content System

The app features a sophisticated daily content system that ensures all users see the same content on the same day, with content changing every 24 hours:

### How It Works

- **Deterministic Content**: Content is generated based on the current date using a hash function
- **Consistent Experience**: All users worldwide see the same daily word, story, and vocabulary on any given day
- **24-Hour Rotation**: Content automatically refreshes at midnight in the user's local timezone
- **No Server Dependency**: Content generation happens client-side, ensuring reliability

### Daily Content Types

1. **Daily Wordle Word**: A Japanese word with hints and emoji clues
2. **Daily Story**: Interactive dialogue with fill-in-the-blank exercises
3. **Daily Vocabulary**: Set of Japanese-English word pairs for matching games

### Testing Daily Content

You can test the daily content system by visiting `/test` in the app. This allows you to:
- Preview content for different dates
- Verify content consistency
- Test the daily rotation system

### Technical Implementation

The daily content system uses:
- `src/utils/dailyContent.ts` - Core utility functions for date-based content generation
- `src/hooks/useDailyContent.ts` - React hooks for managing daily content state
- Deterministic hash functions to ensure consistent content selection

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Privy
- **Backend**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **Drag & Drop**: React DnD

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Privy account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kanjimatch
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_PRIVY_APP_ID=your_privy_app_id_here
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. Set up Supabase:
   - Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md)
   - Run the SQL schema from `supabase-schema.sql`

5. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Authentication

This app uses Privy for authentication, supporting:
- Email login
- Wallet login (Web3)
- Guest mode (limited functionality)

### User Progress & Stats

- **Gems System**: Earn gems by completing games
- **Streak Tracking**: Build daily streaks for consistent learning
- **Cross-device Sync**: Progress is saved to Supabase and syncs across devices
- **Leaderboard**: Compare your stats with other learners

## Database Schema

The app uses Supabase with the following main tables:

- **users**: User profiles linked to Privy authentication
- **user_progress**: Gems, streaks, and overall progress
- **daily_completions**: Daily challenge completions
- **game_completions**: Individual game completion records

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # React components
│   ├── LoginModal.tsx   # Authentication modal
│   ├── UserProfile.tsx  # User profile dropdown
│   ├── Leaderboard.tsx  # Leaderboard component
│   ├── DailyContentTest.tsx # Daily content testing component
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication & Supabase integration
│   ├── useDailyContent.ts # Daily content management
│   └── ...
├── utils/              # Utility functions
│   ├── dailyContent.ts # Daily content generation utilities
│   ├── supabaseClient.ts    # Supabase client configuration
│   ├── supabaseService.ts   # Database operations
│   ├── userProgress.ts      # Local progress management
│   └── ...
└── App.tsx             # Main application component
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_PRIVY_APP_ID` | Your Privy application ID | Yes |
| `REACT_APP_SUPABASE_URL` | Your Supabase project URL | Yes |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Privy documentation](https://docs.privy.io/)
- [Supabase documentation](https://docs.supabase.com/)
- [Supabase Setup Guide](./SUPABASE_SETUP.md)
