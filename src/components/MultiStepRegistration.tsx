import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ProgressIndicator } from './ProgressIndicator';
import { Step1BasicInfo } from './steps/Step1BasicInfo';
// Step2 removed after merging into Step1
import { Step3Security } from './steps/Step3Security';
import { Step4Verification } from './steps/Step4Verification';
import {
  submitStep,
  verifyEmail,
  completeRegistration,
  nextStep,
  previousStep,
  updateFormData,
} from '../store/slices/registrationSlice';
import { PROGRESS_STEPS } from '../constants/form';
import {Step6Complete} from "./steps/Step6Complete";
import {Step5Complete} from "./steps/Step5Complete";
import { TermsOfService } from './TermsOfService';
import { PrivacyPolicy } from './PrivacyPolicy';

interface MultiStepRegistrationProps {
  illustrationImage: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export const MultiStepRegistration: React.FC<MultiStepRegistrationProps> = ({
  illustrationImage,
  onSuccess,
  onError,
}) => {
  const dispatch = useAppDispatch();
  const { currentStep, formData, isLoading, error, isCompleted } = useAppSelector(
    (state) => state.registration
  );

  const [showTerms, setShowTerms] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);

  const handleNext = (data: any) => {
    dispatch(submitStep({ step: currentStep, data }));
  };

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handleComplete = async () => {
    dispatch(completeRegistration());
  };

  const handleVerifyEmail = () => {
    dispatch(verifyEmail());
  };

  // Обработка успешного завершения
  React.useEffect(() => {
    if (isCompleted) {
      onSuccess?.(formData);
    }
  }, [isCompleted, formData, onSuccess]);

  // Обработка ошибок
  React.useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  const renderStep = () => {
    const stepProps = {
      formData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      onComplete: handleComplete,
      isLoading,
      error,
      onShowTerms: () => setShowTerms(true),
      onShowPrivacy: () => setShowPrivacy(true),
    };

    switch (currentStep) {
      case 1:
        return <Step1BasicInfo {...stepProps} />;
      case 2:
        return <Step3Security {...stepProps} />;
      case 3:
        return <Step4Verification {...stepProps} />;
      case 4:
        return <Step5Complete {...stepProps} />;
      default:
        return <Step1BasicInfo {...stepProps} />;
    }
  };

  const getStepTitle = () => {
    const titles = {
      1: 'Basic Information',
      2: 'Security & Privacy',
      3: 'Email Verification',
      4: 'Complete Setup',
    };
    return titles[currentStep as keyof typeof titles] || 'Registration';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden border border-slate-200">
        <div className="flex">
          {/* Left Side - Illustration */}
          <div className="w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 p-12 flex flex-col justify-center items-center relative">
            <div className="absolute top-8 left-8">
              <div className="text-2xl font-bold text-slate-800">PropertyPro</div>
            </div>
            <div className="text-center">
              <img
                src={illustrationImage}
                alt="Property Management Illustration"
                className="w-full max-w-md mx-auto object-contain"
              />
              <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                Welcome to PropertyPro
              </h3>
              <p className="text-slate-600 text-lg">
                Streamline your property management with our comprehensive SaaS platform
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 p-12 flex flex-col justify-center">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-slate-900">
                  {getStepTitle()}
                </h1>
                <span className="text-sm text-slate-500">Step {currentStep} of 4</span>
              </div>
              <ProgressIndicator steps={PROGRESS_STEPS} currentStep={currentStep} />
            </div>

            {/* Step Content */}
            <div className="flex-1">
              {renderStep()}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-500">
                By continuing, you agree to our{' '}
                <button 
                  onClick={() => setShowTerms(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button 
                  onClick={() => setShowPrivacy(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
            <TermsOfService onBack={() => setShowTerms(false)} />
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
            <PrivacyPolicy onBack={() => setShowPrivacy(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
