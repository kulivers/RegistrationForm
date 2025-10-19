import React from 'react';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { StepProps } from '../../types/registration';

export const Step3Security: React.FC<StepProps> = ({
  formData,
  onNext,
  onPrevious,
  isLoading,
  error,
}) => {
  const [localData, setLocalData] = React.useState({
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    acceptTerms: formData.acceptTerms,
    acceptMarketing: formData.acceptMarketing,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!localData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (localData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(localData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!localData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (localData.password !== localData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!localData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(localData);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(localData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Security & Privacy</h2>
        <p className="text-slate-600">Create a secure password and review our policies</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <FormField
        label="Password"
        placeholder="Create a strong password"
        type={showPassword ? 'text' : 'password'}
        required
        error={errors.password}
        value={localData.password}
        onChange={(value) => setLocalData(prev => ({ ...prev, password: value }))}
        icon={
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
      />

      {localData.password && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Password strength:</span>
            <span className={`font-medium ${
              passwordStrength < 2 ? 'text-red-600' :
              passwordStrength < 3 ? 'text-orange-600' :
              passwordStrength < 4 ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {strengthLabels[passwordStrength - 1] || 'Very Weak'}
            </span>
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-2 flex-1 rounded-full ${
                  level <= passwordStrength
                    ? strengthColors[passwordStrength - 1] || 'bg-gray-300'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <FormField
          label="Confirm Password"
          placeholder="Confirm your password"
          type={showConfirmPassword ? 'text' : 'password'}
          required
          error={errors.confirmPassword}
          value={localData.confirmPassword}
          onChange={(value) => setLocalData(prev => ({ ...prev, confirmPassword: value }))}
          icon={
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={localData.acceptTerms}
            onChange={(e) => setLocalData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="acceptTerms" className="text-sm text-slate-700">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-red-500 ml-7">{errors.acceptTerms}</p>
        )}

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="acceptMarketing"
            checked={localData.acceptMarketing}
            onChange={(e) => setLocalData(prev => ({ ...prev, acceptMarketing: e.target.checked }))}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="acceptMarketing" className="text-sm text-slate-700">
            I would like to receive marketing emails and updates (optional)
          </label>
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
          disabled={isLoading}
          size="lg"
          className="flex-1"
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
