import React, { useState, useEffect } from 'react';
import { useAudio } from '../contexts/AudioProvider';
import { ClockIcon, SparklesIcon, ShareIcon, CheckIcon } from '@heroicons/react/24/outline';
import {
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon
} from 'react-share';
import { SupabaseService } from '../utils/supabaseService';
import { useAuth } from '../hooks/useAuth';
import { getTodayDateString } from '../utils/dailyContent';

interface EndScreenProps {
  wordsLearned: string[];
  timeTaken: number;
  onRestart: () => void;
  userStats?: {
    totalGems: number;
    currentStreak: number;
  };
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

const EndScreen: React.FC<EndScreenProps> = ({ wordsLearned, timeTaken, onRestart, userStats }) => {
    const [copied, setCopied] = useState(false);
    const [completedToday, setCompletedToday] = useState(false);
    const [checking, setChecking] = useState(true);
    const { speak, isLoading } = useAudio();
    const { user } = useAuth();

    const shareUrl = window.location.origin + '/';
    const streak = userStats?.currentStreak || 0;
    const gems = userStats?.totalGems || 0;
    const shareText = `I just learned ${wordsLearned.length} Japanese words in ${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s on KanjiMatch!\nStreak: ${streak} days, Gems: ${gems}.\nJoin me and level up your Japanese!`;

    useEffect(() => {
      const checkCompletion = async () => {
        if (!user?.supabaseUserId) {
          setChecking(false);
          return;
        }
        const today = getTodayDateString();
        const completion = await SupabaseService.getDailyCompletion(user.supabaseUserId, today);
        if (completion && completion.challenges_completed && completion.challenges_completed.length >= 3) {
          setCompletedToday(true);
        }
        setChecking(false);
      };
      checkCompletion();
    }, [user?.supabaseUserId]);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(shareText + '\n' + shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            alert('Could not copy to clipboard. Please make sure your browser tab is focused.');
        }
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
                    <div 
                        key={index} 
                        onClick={() => !isLoading && speak(word)} 
                        className={`flex items-center justify-between bg-brand-background p-3 rounded-lg transition-colors ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-brand-secondary/20'
                        }`}
                    >
                        <span className="font-semibold text-brand-text-primary">{word}</span>
                        {isLoading && (
                          <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                        )}
                    </div>
                ))}
                 {wordsLearned.length === 0 && (
                    <p className="text-brand-text-secondary text-center py-4">No new words recorded.</p>
                )}
            </div>
        </div>
        
        <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 mb-4">
             <button
                onClick={onRestart}
                className="btn btn-primary w-full"
                disabled={completedToday || checking}
            >
                {checking ? 'Checking...' : completedToday ? 'Come back tomorrow!' : 'Play Again'}
            </button>
            <button
                onClick={handleShare}
                className={`btn btn-secondary w-full transition-all duration-200 ${copied ? 'scale-105 bg-success/80 text-white' : ''}`}
            >
                {copied ? <CheckIcon className="w-5 h-5 mr-2" /> : <ShareIcon className="w-5 h-5 mr-2" />}
                {copied ? 'Copied!' : 'Copy Share Text'}
            </button>
        </div>

        {/* Social Share Buttons */}
        <div className="flex gap-4 justify-center mb-4">
          <TwitterShareButton url={shareUrl} title={shareText}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl} title={shareText} separator="\n">
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>

        {(copied) && (
          <div className={`mt-4 px-4 py-2 rounded-lg text-sm font-semibold bg-brand-secondary/40 text-brand-text-primary`} role="status">
            Copied to clipboard!
          </div>
        )}
      </div>
    );
};

export default EndScreen; 