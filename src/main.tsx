import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MultiStepRegistration } from './components/MultiStepRegistration';
import { store } from './store';
import type { RegistrationFormData } from './types/registration';
import './index.css';

// Import illustration image
const illustrationImage = new URL(
  './assets/0cf28a1525f0ade04d74fc9d8ac5a6919c5d7f2e.png',
  import.meta.url
).href;

/**
 * Main App Component
 * Handles the registration flow with success and error callbacks
 */
const App: React.FC = () => {
  /**
   * Handles successful registration completion
   * @param data - The completed registration form data
   */
  const handleSuccess = (data: RegistrationFormData): void => {
    console.log('Registration successful:', data);
    // TODO: Add redirect logic or notification system
    alert('Registration completed successfully! Welcome to PropertyPro!');
  };

  /**
   * Handles registration errors
   * @param error - Error message describing what went wrong
   */
  const handleError = (error: string): void => {
    console.error('Registration error:', error);
    // TODO: Add error notification system
    alert(`Registration error: ${error}`);
  };

  return (
    <Provider store={store}>
      <MultiStepRegistration
        illustrationImage={illustrationImage}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </Provider>
  );
};

// Initialize React app
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(<App />);
  