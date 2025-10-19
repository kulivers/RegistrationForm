import React from 'react';
import { FormField } from '../FormField';
import { SelectField } from '../SelectField';
import { Button } from '../Button';
import { StepProps } from '../../types/registration';

const COUNTRIES = [
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
];

const TIMEZONES = [
  { value: 'utc-12', label: 'UTC-12:00 (Baker Island)' },
  { value: 'utc-11', label: 'UTC-11:00 (American Samoa)' },
  { value: 'utc-10', label: 'UTC-10:00 (Hawaii)' },
  { value: 'utc-9', label: 'UTC-09:00 (Alaska)' },
  { value: 'utc-8', label: 'UTC-08:00 (Pacific Time)' },
  { value: 'utc-7', label: 'UTC-07:00 (Mountain Time)' },
  { value: 'utc-6', label: 'UTC-06:00 (Central Time)' },
  { value: 'utc-5', label: 'UTC-05:00 (Eastern Time)' },
  { value: 'utc-4', label: 'UTC-04:00 (Atlantic Time)' },
  { value: 'utc-3', label: 'UTC-03:00 (Brazil)' },
  { value: 'utc-2', label: 'UTC-02:00 (Mid-Atlantic)' },
  { value: 'utc-1', label: 'UTC-01:00 (Azores)' },
  { value: 'utc+0', label: 'UTC+00:00 (Greenwich Mean Time)' },
  { value: 'utc+1', label: 'UTC+01:00 (Central European Time)' },
  { value: 'utc+2', label: 'UTC+02:00 (Eastern European Time)' },
  { value: 'utc+3', label: 'UTC+03:00 (Moscow Time)' },
  { value: 'utc+4', label: 'UTC+04:00 (Gulf Standard Time)' },
  { value: 'utc+5', label: 'UTC+05:00 (Pakistan Standard Time)' },
  { value: 'utc+6', label: 'UTC+06:00 (Bangladesh Standard Time)' },
  { value: 'utc+7', label: 'UTC+07:00 (Indochina Time)' },
  { value: 'utc+8', label: 'UTC+08:00 (China Standard Time)' },
  { value: 'utc+9', label: 'UTC+09:00 (Japan Standard Time)' },
  { value: 'utc+10', label: 'UTC+10:00 (Australian Eastern Time)' },
  { value: 'utc+11', label: 'UTC+11:00 (Solomon Islands)' },
  { value: 'utc+12', label: 'UTC+12:00 (New Zealand)' },
];

export const Step2ContactInfo: React.FC<StepProps> = ({
  formData,
  onNext,
  onPrevious,
  isLoading,
  error,
}) => {
  const [localData, setLocalData] = React.useState({
    email: formData.email,
    country: formData.country,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!localData.email.trim()) {
      newErrors.email = 'Email is required2';//todo
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
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Contact Information</h2>
        <p className="text-slate-600">How can we reach you?</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

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
        options={COUNTRIES}
      />

      {/* Timezone and Phone removed as requested */}

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
