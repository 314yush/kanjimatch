import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { loadUserProgress, saveUserProgress } from '../utils/userProgress';
import { UserProgress } from '../types/User';

export interface AuthUser {
  id: string;
  email?: string;
  walletAddress?: string;
  isAuthenticated: boolean;
}

export function useAuth() {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkEmail,
    linkWallet,
    unlinkWallet,
    unlinkEmail,
  } = usePrivy();

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    if (ready && authenticated && user) {
      const authUserData: AuthUser = {
        id: user.id,
        email: user.email?.address,
        walletAddress: user.wallet?.address,
        isAuthenticated: true,
      };
      setAuthUser(authUserData);

      // Load user progress for authenticated user
      const progress = loadUserProgress();
      if (progress) {
        setUserProgress(progress);
      }
    } else if (ready && !authenticated) {
      setAuthUser(null);
      setUserProgress(null);
    }
  }, [ready, authenticated, user]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setAuthUser(null);
      setUserProgress(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUserProgress = (progress: UserProgress) => {
    saveUserProgress(progress);
    setUserProgress(progress);
  };

  return {
    ready,
    authenticated,
    user: authUser,
    userProgress,
    login: handleLogin,
    logout: handleLogout,
    linkEmail,
    linkWallet,
    unlinkWallet,
    unlinkEmail,
    updateUserProgress,
  };
} 