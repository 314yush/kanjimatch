import React from 'react';
import { useAudio } from '../contexts/AudioProvider';
import { SpeakerWaveIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const VoiceSettings: React.FC = () => {
  const { currentProvider, availableProviders, isLoading, speak } = useAudio();

  const getProviderInfo = (provider: string) => {
    const info = {
      'elevenlabs': {
        name: 'ElevenLabs',
        quality: '⭐⭐⭐⭐⭐',
        description: 'Most natural-sounding Japanese voices',
        cost: '$0.30 per 1000 characters'
      },
      'azure': {
        name: 'Microsoft Azure',
        quality: '⭐⭐⭐⭐',
        description: 'High-quality neural voices',
        cost: '$0.16 per 1000 characters'
      },
      'google': {
        name: 'Google Cloud TTS',
        quality: '⭐⭐⭐⭐',
        description: 'Excellent neural voices',
        cost: '$0.16 per 1000 characters'
      },
      'polly': {
        name: 'Amazon Polly',
        quality: '⭐⭐⭐',
        description: 'Good quality neural voices',
        cost: '$0.16 per 1000 characters'
      },
      'web-speech': {
        name: 'Web Speech API',
        quality: '⭐',
        description: 'Basic system voices (robotic)',
        cost: 'Free'
      }
    };
    return info[provider as keyof typeof info] || info['web-speech'];
  };

  const currentInfo = getProviderInfo(currentProvider);

  return (
    <div className="bg-brand-surface rounded-xl p-4 border border-brand-surface-darker">
      <div className="flex items-center gap-3 mb-4">
        <SpeakerWaveIcon className="w-6 h-6 text-brand-primary" />
        <h3 className="text-lg font-semibold text-brand-text-primary">Voice Settings</h3>
        {isLoading && (
          <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Current Provider */}
      <div className="mb-4">
        <div className="text-sm text-brand-text-secondary mb-2">Current Voice Provider</div>
        <div className="bg-brand-background rounded-lg p-3 border border-brand-surface-darker">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-brand-text-primary">{currentInfo.name}</div>
              <div className="text-sm text-brand-text-secondary">{currentInfo.description}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-brand-text-secondary">{currentInfo.quality}</div>
              <div className="text-xs text-brand-text-secondary">{currentInfo.cost}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Providers */}
      {availableProviders.length > 1 && (
        <div className="mb-4">
          <div className="text-sm text-brand-text-secondary mb-2">Available Providers</div>
          <div className="space-y-2">
            {availableProviders.map((provider) => {
              const info = getProviderInfo(provider.name);
              const isActive = provider.name === currentProvider;
              
              return (
                <div 
                  key={provider.name}
                  className={`p-2 rounded-lg text-sm border ${
                    isActive 
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' 
                      : 'bg-brand-background border-brand-surface-darker text-brand-text-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{info.name}</span>
                    <span className="text-xs">{info.quality}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Setup Instructions */}
      {currentProvider === 'web-speech' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <InformationCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-yellow-800 mb-1">
                Improve Voice Quality
              </div>
              <div className="text-xs text-yellow-700">
                You're currently using the basic Web Speech API. For much better Japanese pronunciation, 
                consider setting up ElevenLabs, Azure, or Google Cloud TTS. See VOICE_SETUP.md for instructions.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Button */}
      <div className="mt-4">
        <button
          onClick={() => speak('こんにちは')}
          disabled={isLoading}
          className="btn btn-outline w-full text-sm"
        >
          {isLoading ? 'Generating...' : 'Test Voice (こんにちは)'}
        </button>
      </div>
    </div>
  );
};

export default VoiceSettings; 