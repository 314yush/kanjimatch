import React from 'react';
import { motion } from 'framer-motion';

interface LoginModalProps {
  onLogin: () => void;
  onContinueAsGuest: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onContinueAsGuest }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to KanjiMatch</h2>
          <p className="text-gray-600 mb-6">
            Sign in to track your progress and continue learning Japanese phrases
          </p>
          
          <div className="space-y-4">
            <button
              onClick={onLogin}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In / Sign Up
            </button>
            
            <button
              onClick={onContinueAsGuest}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Continue as Guest
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            By signing in, you agree to our terms of service and privacy policy
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal; 