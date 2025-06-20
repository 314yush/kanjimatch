import React, { useState } from 'react';
import { useAudio } from '../contexts/AudioProvider';
import { ClockIcon, SparklesIcon, ShareIcon, CheckIcon } from '@heroicons/react/24/outline';

interface EndScreenProps {
  wordsLearned: string[];
  timeTaken: number;
  onRestart: () => void;
}

const StatCard: React.FC<{ icon: React.ElementType, label: string, value: string | number }> = ({ icon: Icon, label, value }) => (
    <div className="bg-brand-surface rounded-xl p-4 flex items-center gap-4">
        <div className="bg-brand-secondary/30 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-brand-primary" />
        </div>
        <div>
            <div className="text-sm text-brand-text-secondary">{label}</div>
            <div className="text-2xl font-bold text-brand-text-primary">{value}</div>
        </div>
    </div>
);

const EndScreen: React.FC<EndScreenProps> = ({ wordsLearned, timeTaken, onRestart }) => {
    const [copied, setCopied] = useState(false);
    const { speak } = useAudio();

    const handleShare = () => {
        const shareText = `I just learned ${wordsLearned.length} Japanese words in ${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s on KanjiMatch! Check it out!`;
        navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-full p-4 text-center">
        <h1 className="text-3xl font-bold text-brand-text-primary mb-2">Challenge Complete!</h1>
        <p className="text-brand-text-secondary mb-8">Here's your summary for today's session.</p>

        <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-8">
            <StatCard icon={ClockIcon} label="Time Taken" value={`${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`} />
            <StatCard icon={SparklesIcon} label="Words Learned" value={wordsLearned.length} />
        </div>

        <div className="w-full max-w-md bg-brand-surface rounded-xl p-4 mb-8">
            <h3 className="font-bold text-brand-text-primary text-left mb-3">Words You Practiced</h3>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                 {wordsLearned.map((word, index) => (
                    <div key={index} onClick={() => speak(word)} className="flex items-center justify-between bg-brand-background p-3 rounded-lg cursor-pointer hover:bg-brand-secondary/20 transition-colors">
                        <span className="font-semibold text-brand-text-primary">{word}</span>
                    </div>
                ))}
                 {wordsLearned.length === 0 && (
                    <p className="text-brand-text-secondary text-center py-4">No new words recorded.</p>
                )}
            </div>
        </div>
        
        <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
             <button
                onClick={onRestart}
                className="btn btn-primary w-full"
            >
                Play Again
            </button>
            <button
                onClick={handleShare}
                className="btn btn-secondary w-full"
            >
                {copied ? <CheckIcon className="w-5 h-5 mr-2" /> : <ShareIcon className="w-5 h-5 mr-2" />}
                {copied ? 'Copied!' : 'Share'}
            </button>
        </div>
      </div>
    );
};

export default EndScreen; 