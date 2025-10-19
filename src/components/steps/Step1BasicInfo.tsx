import React from 'react';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { StepProps } from '../../types/registration';
import {SelectField} from "../SelectField";

export const Step1BasicInfo: React.FC<StepProps> = ({
  formData,
  onNext,
  isLoading,
  error,
}) => {
  const [localData, setLocalData] = React.useState({
    fullName: formData.fullName,
    email: formData.email,
    country: formData.country,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!localData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (localData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!localData.email.trim()) {
      newErrors.email = 'Email is required1';
    } else if (!/\S+@\S+\.\S+/.test(localData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!localData.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(localData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Let's get started</h2>
        <p className="text-slate-600">Tell us a bit about yourself</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <FormField
        label="Full Name"
        placeholder="Enter your full name"
        required
        error={errors.fullName}
        value={localData.fullName}
        onChange={(value) => setLocalData(prev => ({ ...prev, fullName: value }))}
        icon={
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      <FormField
        label="Email Address"
        placeholder="Enter your email address"
        type="email"
        required
        error={errors.email}
        value={localData.email}
        onChange={(value) => setLocalData(prev => ({ ...prev, email: value }))}
        icon={
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />

      <SelectField
        label="Country"
        placeholder="Select your country"
        required
        error={errors.country}
        value={localData.country}
        onChange={(value) => setLocalData(prev => ({ ...prev, country: value }))}
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'au', label: 'Australia' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
          { value: 'es', label: 'Spain' },
          { value: 'it', label: 'Italy' },
          { value: 'nl', label: 'Netherlands' },
          { value: 'se', label: 'Sweden' },
        ]}
      />

      <Button
        onClick={handleNext}
        disabled={isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? 'Saving...' : 'Continue'}
      </Button>
    </div>
  );
};
