import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { fetchENS } from '../utils/ens';
import VoiceSettings from './VoiceSettings';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [ensName, setEnsName] = useState<string | null>(null);

  useEffect(() => {
    const getENS = async () => {
      if (user?.walletAddress) {
        const ens = await fetchENS(user.walletAddress);
        setEnsName(ens);
      }
    };
    getENS();
  }, [user?.walletAddress]);

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  // Display logic: ENS > wallet > email > fallback
  let displayName = 'User';
  if (ensName) {
    displayName = ensName;
  } else if (user.walletAddress) {
    displayName = `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`;
  } else if (user.email) {
    displayName = user.email;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">
            {displayName[0]?.toUpperCase() || 'U'}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {displayName}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {displayName[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {displayName}
                  </p>
                  <p className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</p>
                </div>
              </div>

              {/* Only show wallet address if ENS is not available */}
              {user.walletAddress && !ensName && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Wallet Address</p>
                  <p className="text-sm font-mono text-gray-700 break-all">
                    {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                  </p>
                </div>
              )}

              {/* Voice Settings */}
              <div className="mb-4">
                <VoiceSettings />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile; 