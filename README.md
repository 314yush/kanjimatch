# KanjiMatch

A Japanese language learning app that helps you master phrases through interactive matching games.

## Features

- **Interactive Matching**: Match Japanese phrases with their English translations
- **Sentence Formation**: Practice forming sentences with learned phrases
- **Daily Challenges**: New phrases added daily to expand your vocabulary
- **Progress Tracking**: Track your learning progress over time
- **User Authentication**: Secure login with Privy (email and wallet support)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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

3. Set up Privy Authentication:
   - Go to [Privy Console](https://console.privy.io/)
   - Create a new app
   - Copy your app ID
   - Create a `.env` file in the root directory:
   ```
   REACT_APP_PRIVY_APP_ID=your_privy_app_id_here
   ```

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Authentication

This app uses Privy for authentication, supporting:
- Email login
- Wallet login (Web3)
- Guest mode (limited functionality)

### User Progress

- User progress is stored locally and tied to your authentication
- Progress is automatically migrated when you first sign in
- Each user has their own separate progress tracking

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Technology Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Privy
- **Animations**: Framer Motion
- **Drag & Drop**: React DnD

## Project Structure

```
src/
├── components/          # React components
│   ├── LoginModal.tsx   # Authentication modal
│   ├── UserProfile.tsx  # User profile dropdown
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   └── ...
├── utils/              # Utility functions
│   ├── userProgress.ts # User progress management
│   └── ...
└── App.tsx             # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

For Privy authentication, visit the [Privy documentation](https://docs.privy.io/).
