import React from 'react';
import { ProgressIndicatorProps } from '../types/form';

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all
                ${step.number <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'border-2 border-slate-300 text-slate-400'
                }
              `}
            >
              <span className="text-xs font-semibold">{step.number}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  w-10 md:w-16 lg:w-20 h-1 ml-2 md:ml-3 transition-all
                  ${step.number < currentStep ? 'bg-blue-600' : 'bg-slate-200'}
                `}
              />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
