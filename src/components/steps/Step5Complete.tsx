import React from 'react';
import { Button } from '../Button';
import { StepProps } from '../../types/registration';

export const Step5Complete: React.FC<StepProps> = ({
  formData,
  onComplete,
  onPrevious,
  isLoading,
  error,
}) => {
  const [isCompleting, setIsCompleting] = React.useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await onComplete();
    } finally {
      setIsCompleting(false);
    }
  };

  const getSelectedPlan = () => {
    return 'Professional Plan'; // Default plan since subscription step was removed
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">You're all set!</h2>
        <p className="text-slate-600 text-lg">
          Welcome to PropertyPro. Let's get you started with your account.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Summary */}
      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Summary</h3>
        
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-2">Personal Information</h4>
          <div className="space-y-1 text-sm text-slate-600">
            <p><span className="font-medium">Name:</span> {formData.fullName}</p>
            <p><span className="font-medium">Email:</span> {formData.email}</p>
            {/* Account type and company removed */}
            <p><span className="font-medium">Plan:</span> {getSelectedPlan()}</p>
            <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Active</span></p>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { key: 'email', label: 'Email notifications', description: 'Receive updates via email' },
            { key: 'sms', label: 'SMS notifications', description: 'Receive updates via text message' },
            { key: 'push', label: 'Push notifications', description: 'Receive browser notifications' },
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-blue-900">{notification.label}</div>
                <div className="text-xs text-blue-700">{notification.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.preferences.notifications[notification.key as keyof typeof formData.preferences.notifications]}
                  onChange={() => {}} // Read-only for display
                  className="sr-only peer"
                  disabled
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="text-center">
        <p className="text-sm text-slate-600 mb-4">
          Need help getting started? Our support team is here to assist you.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            📧 Email Support
          </a>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            💬 Live Chat
          </a>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            📚 Help Center
          </a>
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
          onClick={handleComplete}
          disabled={isLoading || isCompleting}
          size="lg"
          className="flex-1"
        >
          {isLoading || isCompleting ? 'Creating Account...' : 'Complete Setup'}
        </Button>
      </div>
    </div>
  );
};


