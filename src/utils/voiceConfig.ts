// Voice Configuration
export interface VoiceConfig {
  provider: 'elevenlabs' | 'azure' | 'google' | 'polly' | 'web-speech';
  apiKey?: string;
  voiceId?: string;
  region?: string;
  model?: string;
}

// ElevenLabs Configuration
export const ELEVENLABS_CONFIG = {
  provider: 'elevenlabs' as const,
  apiKey: process.env.REACT_APP_ELEVENLABS_API_KEY,
  voiceId: process.env.REACT_APP_ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM', // Default Japanese voice
  model: 'eleven_multilingual_v2',
  voiceSettings: {
    stability: 0.5,
    similarity_boost: 0.75,
    style: 0.0,
    use_speaker_boost: true
  }
};

// Azure Cognitive Services Configuration
export const AZURE_CONFIG = {
  provider: 'azure' as const,
  apiKey: process.env.REACT_APP_AZURE_SPEECH_KEY,
  region: process.env.REACT_APP_AZURE_SPEECH_REGION || 'eastus',
  voiceName: process.env.REACT_APP_AZURE_VOICE_NAME || 'ja-JP-NanamiNeural',
  model: 'neural'
};

// Google Cloud TTS Configuration
export const GOOGLE_CONFIG = {
  provider: 'google' as const,
  apiKey: process.env.REACT_APP_GOOGLE_TTS_API_KEY,
  voiceName: process.env.REACT_APP_GOOGLE_VOICE_NAME || 'ja-JP-Neural2-A',
  model: 'neural2'
};

// Amazon Polly Configuration
export const POLLY_CONFIG = {
  provider: 'polly' as const,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  voiceId: process.env.REACT_APP_POLLY_VOICE_ID || 'Mizuki',
  engine: 'neural'
};

// Web Speech API (fallback)
export const WEB_SPEECH_CONFIG = {
  provider: 'web-speech' as const,
  language: 'ja-JP',
  preferredVoices: ['Google', 'Microsoft', 'Apple']
};

// Get the active voice configuration based on environment
export const getActiveVoiceConfig = (): VoiceConfig => {
  // Priority order: ElevenLabs > Azure > Google > Polly > Web Speech
  if (ELEVENLABS_CONFIG.apiKey) {
    return ELEVENLABS_CONFIG;
  }
  if (AZURE_CONFIG.apiKey) {
    return AZURE_CONFIG;
  }
  if (GOOGLE_CONFIG.apiKey) {
    return GOOGLE_CONFIG;
  }
  if (POLLY_CONFIG.accessKeyId && POLLY_CONFIG.secretAccessKey) {
    return POLLY_CONFIG;
  }
  return WEB_SPEECH_CONFIG;
};

// Voice quality comparison
export const VOICE_QUALITY_RANKING = {
  'elevenlabs': 5, // Best quality, most natural
  'azure': 4,      // Very good quality
  'google': 4,     // Very good quality
  'polly': 3,      // Good quality
  'web-speech': 1  // Basic quality, robotic
};

// Cost comparison (per 1000 characters)
export const VOICE_COST_RANKING = {
  'elevenlabs': 0.30,  // $0.30 per 1000 characters
  'azure': 0.16,       // $0.16 per 1000 characters
  'google': 0.16,      // $0.16 per 1000 characters
  'polly': 0.16,       // $0.16 per 1000 characters
  'web-speech': 0.00   // Free
}; 