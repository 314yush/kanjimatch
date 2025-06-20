import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AudioContextType {
  speak: (text: string) => void;
  isReady: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [japaneseVoice, setJapaneseVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    // Load voices immediately and on change
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (voices.length > 0) {
      // Find the best available Japanese voice
      const preferredVoice = voices.find(v => v.lang === 'ja-JP' && v.name.includes('Google')) || 
                           voices.find(v => v.lang === 'ja-JP' && v.localService) ||
                           voices.find(v => v.lang === 'ja-JP');

      setJapaneseVoice(preferredVoice || null);
      setIsReady(true);
    }
  }, [voices]);

  const speak = useCallback((text: string) => {
    if (!isReady || !japaneseVoice) {
      console.warn('Speech synthesis not ready or no Japanese voice found.');
      // Fallback to basic synthesis if no preferred voice is found
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ja-JP';
      window.speechSynthesis.speak(utter);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = japaneseVoice;
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  }, [isReady, japaneseVoice]);

  return (
    <AudioContext.Provider value={{ speak, isReady }}>
      {children}
    </AudioContext.Provider>
  );
}; 