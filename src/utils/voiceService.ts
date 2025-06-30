import { getActiveVoiceConfig, ELEVENLABS_CONFIG, AZURE_CONFIG, GOOGLE_CONFIG, POLLY_CONFIG, WEB_SPEECH_CONFIG } from './voiceConfig';

export interface VoiceService {
  speak: (text: string) => Promise<void>;
  isReady: boolean;
  provider: string;
}

class ElevenLabsVoiceService implements VoiceService {
  isReady = true;
  provider = 'elevenlabs';

  async speak(text: string): Promise<void> {
    if (!ELEVENLABS_CONFIG.apiKey || !ELEVENLABS_CONFIG.voiceId) {
      throw new Error('ElevenLabs not configured');
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_CONFIG.voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_CONFIG.apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: ELEVENLABS_CONFIG.model,
        voice_settings: ELEVENLABS_CONFIG.voiceSettings
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };
      audio.play().catch(reject);
    });
  }
}

class AzureVoiceService implements VoiceService {
  isReady = true;
  provider = 'azure';

  async speak(text: string): Promise<void> {
    if (!AZURE_CONFIG.apiKey || !AZURE_CONFIG.region) {
      throw new Error('Azure Speech not configured');
    }

    // Azure requires SSML for better pronunciation
    const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ja-JP">
        <voice name="${AZURE_CONFIG.voiceName}">
          ${text}
        </voice>
      </speak>
    `;

    const response = await fetch(`https://${AZURE_CONFIG.region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_CONFIG.apiKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        'User-Agent': 'KanjiMatch'
      },
      body: ssml,
    });

    if (!response.ok) {
      throw new Error(`Azure Speech API error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };
      audio.play().catch(reject);
    });
  }
}

class GoogleVoiceService implements VoiceService {
  isReady = true;
  provider = 'google';

  async speak(text: string): Promise<void> {
    if (!GOOGLE_CONFIG.apiKey) {
      throw new Error('Google TTS not configured');
    }

    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_CONFIG.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: 'ja-JP',
          name: GOOGLE_CONFIG.voiceName,
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.9,
          pitch: 0,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Google TTS API error: ${response.status}`);
    }

    const data = await response.json();
    const audioContent = data.audioContent;
    const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };
      audio.play().catch(reject);
    });
  }
}

class PollyVoiceService implements VoiceService {
  isReady = true;
  provider = 'polly';

  async speak(text: string): Promise<void> {
    if (!POLLY_CONFIG.accessKeyId || !POLLY_CONFIG.secretAccessKey) {
      throw new Error('Amazon Polly not configured');
    }

    // Note: This is a simplified implementation. In production, you'd need to use AWS SDK
    // or implement proper AWS signature v4 signing
    throw new Error('Amazon Polly implementation requires AWS SDK - not implemented in this demo');
  }
}

class WebSpeechVoiceService implements VoiceService {
  isReady = false;
  provider = 'web-speech';
  private voices: SpeechSynthesisVoice[] = [];
  private japaneseVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.loadVoices();
    window.speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
  }

  private loadVoices() {
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      this.voices = availableVoices;
      this.japaneseVoice = this.voices.find(v => v.lang === 'ja-JP' && v.name.includes('Google')) || 
                          this.voices.find(v => v.lang === 'ja-JP' && v.localService) ||
                          this.voices.find(v => v.lang === 'ja-JP') ||
                          null;
      this.isReady = true;
    }
  }

  async speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        if (this.japaneseVoice) {
          utterance.voice = this.japaneseVoice;
        }
        
        utterance.onend = () => resolve();
        utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));
        
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        reject(error);
      }
    });
  }
}

// Main voice service factory
export class VoiceServiceManager {
  private services: VoiceService[] = [];
  private currentServiceIndex = 0;

  constructor() {
    const config = getActiveVoiceConfig();
    
    // Initialize services based on configuration
    if (ELEVENLABS_CONFIG.apiKey) {
      this.services.push(new ElevenLabsVoiceService());
    }
    if (AZURE_CONFIG.apiKey) {
      this.services.push(new AzureVoiceService());
    }
    if (GOOGLE_CONFIG.apiKey) {
      this.services.push(new GoogleVoiceService());
    }
    if (POLLY_CONFIG.accessKeyId && POLLY_CONFIG.secretAccessKey) {
      this.services.push(new PollyVoiceService());
    }
    
    // Always add Web Speech as fallback
    this.services.push(new WebSpeechVoiceService());
  }

  get isReady(): boolean {
    return this.services.some(service => service.isReady);
  }

  get currentProvider(): string {
    return this.services[this.currentServiceIndex]?.provider || 'none';
  }

  async speak(text: string): Promise<void> {
    if (this.services.length === 0) {
      throw new Error('No voice services available');
    }

    // Try each service in order until one works
    for (let i = 0; i < this.services.length; i++) {
      try {
        this.currentServiceIndex = i;
        await this.services[i].speak(text);
        return;
      } catch (error) {
        console.warn(`Voice service ${this.services[i].provider} failed:`, error);
        if (i === this.services.length - 1) {
          throw error; // All services failed
        }
      }
    }
  }

  // Get available providers for UI
  getAvailableProviders(): Array<{ name: string; quality: number; cost: number }> {
    return this.services.map(service => ({
      name: service.provider,
      quality: this.getQualityScore(service.provider),
      cost: this.getCostScore(service.provider)
    }));
  }

  private getQualityScore(provider: string): number {
    const qualityMap: Record<string, number> = {
      'elevenlabs': 5,
      'azure': 4,
      'google': 4,
      'polly': 3,
      'web-speech': 1
    };
    return qualityMap[provider] || 1;
  }

  private getCostScore(provider: string): number {
    const costMap: Record<string, number> = {
      'elevenlabs': 0.30,
      'azure': 0.16,
      'google': 0.16,
      'polly': 0.16,
      'web-speech': 0.00
    };
    return costMap[provider] || 0.00;
  }
} 