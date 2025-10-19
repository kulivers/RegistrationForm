import React, { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import { Step1BasicInfo } from './steps/Step1BasicInfo';
import { Step2ContactInfo } from './steps/Step2ContactInfo';
import { Step3Security } from './steps/Step3Security';
import { Step4Verification } from './steps/Step4Verification';
import { Step5Profile } from './steps/Step5Profile';
import { Step6Subscription } from './steps/Step6Subscription';
import { Step7Complete } from './steps/Step7Complete';
import { PROGRESS_STEPS } from '../constants/form';
import { RegistrationFormData } from '../types/registration';

interface SimpleMultiStepRegistrationProps {
  illustrationImage: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const initialFormData: RegistrationFormData = {
  // Шаг 1
  fullName: '',
  accountType: '',
  companyName: '',
  
  // Шаг 2
  email: '',
  phone: '',
  country: '',
  timezone: '',
  
  // Шаг 3
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  acceptMarketing: false,
  
  // Шаг 4
  verificationCode: '',
  isVerified: false,
  
  // Шаг 5
  profilePicture: null,
  bio: '',
  preferences: {
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    language: 'en',
    theme: 'light',
  },
  
  // Шаг 6
  subscriptionPlan: '',
  billingCycle: 'monthly',
  paymentMethod: {
    type: 'card',
  },
  
  // Шаг 7
  onboardingCompleted: false,
};

export const SimpleMultiStepRegistration: React.FC<SimpleMultiStepRegistrationProps> = ({
  illustrationImage,
  onSuccess,
  onError,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновляем данные формы
      setFormData(prev => ({ ...prev, ...data }));
      
      // Переходим к следующему шагу
      if (currentStep < 7) {
        setCurrentStep(prev => prev + 1);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Имитация завершения регистрации
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData(prev => ({ ...prev, onboardingCompleted: true }));
      onSuccess?.(formData);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      onError?.(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      onComplete: handleComplete,
      isLoading,
      error,
    };

    switch (currentStep) {
      case 1:
        return <Step1BasicInfo {...stepProps} />;
      case 2:
        return <Step2ContactInfo {...stepProps} />;
      case 3:
        return <Step3Security {...stepProps} />;
      case 4:
        return <Step4Verification {...stepProps} />;
      case 5:
        return <Step5Profile {...stepProps} />;
      case 6:
        return <Step6Subscription {...stepProps} />;
      case 7:
        return <Step7Complete {...stepProps} />;
      default:
        return <Step1BasicInfo {...stepProps} />;
    }
  };

  const getStepTitle = () => {
    const titles = {
      1: 'Basic Information',
      2: 'Contact Details',
      3: 'Security & Privacy',
      4: 'Email Verification',
      5: 'Profile Setup',
      6: 'Choose Plan',
      7: 'Complete Setup',
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
                <span className="text-sm text-slate-500">
                  Step {currentStep} of 7
                </span>
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
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
