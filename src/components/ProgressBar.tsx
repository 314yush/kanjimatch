import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepNames = ['Tile Match', 'Wordle', 'Story Mode', 'Results'];

const ProgressNode: React.FC<{ step: number; name: string; isActive: boolean; isCompleted: boolean }> = ({ step, name, isActive, isCompleted }) => {
    const nodeColor = isCompleted || isActive ? 'bg-orange-400' : 'bg-gray-200';
    const textColor = isCompleted || isActive ? 'text-orange-500' : 'text-gray-500';

    return (
        <div className="flex flex-col items-center text-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${nodeColor}`}>
                {isCompleted ? (
                    <CheckIcon className="w-5 h-5 text-white" />
                ) : (
                    <span className={`font-bold text-white`}>{step}</span>
                )}
            </div>
            <p className={`mt-2 text-xs font-semibold transition-all duration-300 ${textColor}`}>
                {name}
            </p>
        </div>
    );
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="ui-card !bg-brand-surface !p-4 mb-4">
      <div className="flex items-center justify-between">
        {stepNames.slice(0, totalSteps).map((name, index) => {
          const step = index + 1;
          const isLastStep = step === totalSteps;

          return (
            <React.Fragment key={name}>
              <ProgressNode 
                step={step}
                name={name}
                isActive={step === currentStep}
                isCompleted={step < currentStep}
              />
              {!isLastStep && <div className={`flex-1 h-1 mx-2 rounded-full ${step < currentStep ? 'bg-orange-400' : 'bg-gray-200'}`} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar; 