import React from 'react';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { StepProps } from '../../types/registration';

export const Step4Verification: React.FC<StepProps> = ({
  formData,
  onNext,
  onPrevious,
  isLoading,
  error,
}) => {
  const [localData, setLocalData] = React.useState({
    verificationCode: formData.verificationCode,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isResending, setIsResending] = React.useState(false);
  const [resendCooldown, setResendCooldown] = React.useState(0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!localData.verificationCode.trim()) {
      newErrors.verificationCode = 'Verification code is required';
    } else if (localData.verificationCode.length !== 6) {
      newErrors.verificationCode = 'Verification code must be 6 digits';
    } else if (!/^\d{6}$/.test(localData.verificationCode)) {
      newErrors.verificationCode = 'Verification code must contain only numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(localData);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      // Здесь будет API вызов для повторной отправки кода
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Устанавливаем кулдаун на 60 секунд
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to resend code:', error);
    } finally {
      setIsResending(false);
    }
  };

  const formatEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    return `${username.substring(0, 2)}${'*'.repeat(username.length - 2)}@${domain}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify your email</h2>
        <p className="text-slate-600">
          We've sent a 6-digit verification code to{' '}
          <span className="font-medium text-slate-900">{formatEmail(formData.email)}</span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <FormField
          label="Verification Code"
          placeholder="Enter 6-digit code"
          required
          error={errors.verificationCode}
          value={localData.verificationCode}
          onChange={(value) => {
            // Ограничиваем ввод только цифрами и максимум 6 символов
            const numericValue = value.replace(/\D/g, '').substring(0, 6);
            setLocalData(prev => ({ ...prev, verificationCode: numericValue }));
          }}
          icon={
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <div className="text-center">
          <p className="text-sm text-slate-600 mb-3">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResending || resendCooldown > 0}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:text-slate-400 disabled:cursor-not-allowed"
          >
            {isResending ? 'Sending...' : 
             resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 
             'Resend code'}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">Check your spam folder</h4>
            <p className="text-sm text-blue-700">
              Sometimes verification emails end up in your spam or junk folder. 
              If you don't see the email, please check there as well.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={isLoading || localData.verificationCode.length !== 6}
          size="lg"
          className="flex-1"
        >
          {isLoading ? 'Verifying...' : 'Verify & Continue'}
        </Button>
      </div>
    </div>
  );
};
