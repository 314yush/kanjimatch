import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { VoiceServiceManager } from '../utils/voiceService';

interface AudioContextType {
  speak: (text: string) => void;
  isReady: boolean;
  isLoading: boolean;
  currentProvider: string;
  availableProviders: Array<{ name: string; quality: number; cost: number }>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// ElevenLabs configuration
const ELEVENLABS_API_KEY = process.env.REACT_APP_ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.REACT_APP_ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Default Japanese voice
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

// Fallback to Web Speech API if ElevenLabs is not configured
const useWebSpeechFallback = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [japaneseVoice, setJapaneseVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (voices.length > 0) {
      const preferredVoice = voices.find(v => v.lang === 'ja-JP' && v.name.includes('Google')) || 
                           voices.find(v => v.lang === 'ja-JP' && v.localService) ||
                           voices.find(v => v.lang === 'ja-JP');
      setJapaneseVoice(preferredVoice || null);
    }
  }, [voices]);

  const speakWithWebSpeech = useCallback((text: string) => {
    if (!japaneseVoice) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ja-JP';
      window.speechSynthesis.speak(utter);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = japaneseVoice;
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  }, [japaneseVoice]);

  return { speakWithWebSpeech, japaneseVoice: !!japaneseVoice };
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProvider, setCurrentProvider] = useState('web-speech');
  const [availableProviders, setAvailableProviders] = useState<Array<{ name: string; quality: number; cost: number }>>([]);
  
  const voiceManagerRef = useRef<VoiceServiceManager | null>(null);

  useEffect(() => {
    // Initialize voice service manager
    voiceManagerRef.current = new VoiceServiceManager();
    
    // Set initial state
    setIsReady(voiceManagerRef.current.isReady);
    setCurrentProvider(voiceManagerRef.current.currentProvider);
    setAvailableProviders(voiceManagerRef.current.getAvailableProviders());

    // Wait for Web Speech API to load voices if that's the only option
    if (voiceManagerRef.current.currentProvider === 'web-speech') {
      const checkVoices = () => {
        if (voiceManagerRef.current?.isReady) {
          setIsReady(true);
          setCurrentProvider(voiceManagerRef.current.currentProvider);
          setAvailableProviders(voiceManagerRef.current.getAvailableProviders());
        } else {
          setTimeout(checkVoices, 100);
        }
      };
      checkVoices();
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!isReady || !voiceManagerRef.current) {
      console.warn('Audio provider not ready');
      return;
    }

    setIsLoading(true);
    try {
      // Stop any currently playing audio
      window.speechSynthesis.cancel();
      
      await voiceManagerRef.current.speak(text);
      setCurrentProvider(voiceManagerRef.current.currentProvider);
    } catch (error) {
      console.error('Voice synthesis failed:', error);
      // Try fallback to Web Speech API
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        window.speechSynthesis.speak(utterance);
      } catch (fallbackError) {
        console.error('Fallback voice synthesis also failed:', fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isReady]);

  return (
    <AudioContext.Provider value={{ 
      speak, 
      isReady, 
      isLoading, 
      currentProvider, 
      availableProviders 
    }}>
      {children}
    </AudioContext.Provider>
  );
}; 