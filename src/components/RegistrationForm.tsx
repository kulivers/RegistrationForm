import React from 'react';
import { FormField } from './FormField';
import { SelectField } from './SelectField';
import { Button } from './Button';
import { ProgressIndicator } from './ProgressIndicator';
import { useRegistrationForm } from '../hooks/useRegistrationForm';
import { REGISTRATION_TEXTS, ACCOUNT_TYPES, PROGRESS_STEPS } from '../constants/form';

interface RegistrationFormProps {
  illustrationImage: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  illustrationImage,
  onSuccess,
  onError,
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    submitForm,
  } = useRegistrationForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await submitForm();
    if (success) {
      onSuccess?.(formData);
    } else {
      onError?.('Form submission failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden border border-slate-200">
        <div className="flex">
          {/* Left Side - Illustration */}
          <div className="w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 p-12 flex flex-col justify-center items-center relative">
            <div className="absolute top-8 left-8">
              <div className="text-2xl font-bold text-slate-800">
                {REGISTRATION_TEXTS.brand.name}
              </div>
            </div>
            <div className="text-center">
              <img
                src={illustrationImage}
                alt="Property Management Illustration"
                className="w-full max-w-md mx-auto object-contain"
              />
              <h3 className="text-2xl font-semibold text-slate-800 mt-8 mb-4">
                Welcome to {REGISTRATION_TEXTS.brand.name}
              </h3>
              <p className="text-slate-600 text-lg">
                {REGISTRATION_TEXTS.brand.tagline}
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 p-12 flex flex-col justify-center">
            {/* Login Link */}
            <div className="text-right mb-8">
              <span className="text-sm text-slate-600">
                {REGISTRATION_TEXTS.navigation.signInText}{' '}
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  {REGISTRATION_TEXTS.navigation.signInLink}
                </a>
              </span>
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {REGISTRATION_TEXTS.form.title}
              </h1>
              <p className="text-slate-600">
                {REGISTRATION_TEXTS.form.subtitle}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <ProgressIndicator steps={PROGRESS_STEPS} currentStep={1} />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <FormField
                label={REGISTRATION_TEXTS.fields.fullName.label}
                placeholder={REGISTRATION_TEXTS.fields.fullName.placeholder}
                required={REGISTRATION_TEXTS.fields.fullName.required}
                error={errors.fullName}
                value={formData.fullName}
                onChange={(value) => updateField('fullName', value)}
                icon={
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />

              {/* Account Type */}
              {/*<SelectField*/}
              {/*  label={REGISTRATION_TEXTS.fields.accountType.label}*/}
              {/*  placeholder={REGISTRATION_TEXTS.fields.accountType.placeholder}*/}
              {/*  required={REGISTRATION_TEXTS.fields.accountType.required}*/}
              {/*  error={errors.accountType}*/}
              {/*  value={formData.accountType}*/}
              {/*  onChange={(value) => updateField('accountType', value)}*/}
              {/*  options={ACCOUNT_TYPES}*/}
              {/*/>*/}

              {/* Company Name */}
              <FormField
                label={REGISTRATION_TEXTS.fields.companyName.label}
                placeholder={REGISTRATION_TEXTS.fields.companyName.placeholder}
                required={REGISTRATION_TEXTS.fields.companyName.required}
                error={errors.companyName}
                value={formData.companyName}
                onChange={(value) => updateField('companyName', value)}
                icon={
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
              />

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Processing...' : REGISTRATION_TEXTS.form.buttonText}
              </Button>
            </form>

            {/* Terms */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                {REGISTRATION_TEXTS.form.termsText}{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  {REGISTRATION_TEXTS.form.termsLink}
                </a>
                {' '}{REGISTRATION_TEXTS.form.and}{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  {REGISTRATION_TEXTS.form.privacyLink}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
