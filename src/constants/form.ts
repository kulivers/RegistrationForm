// Тексты для формы регистрации
export const REGISTRATION_TEXTS = {
  brand: {
    name: 'PropertyPro',
    tagline: 'Streamline your property management with our comprehensive SaaS platform',
  },
  navigation: {
    signInText: 'Already have an account?',
    signInLink: 'Sign in',
  },
  form: {
    title: 'Create your account',
    subtitle: 'Get started with PropertyPro in just a few steps',
    buttonText: 'Continue to Step 2',
    termsText: 'By creating an account, you agree to our',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
    and: 'and',
  },
  fields: {
    fullName: {
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
    },
    accountType: {
      label: 'Account Type',
      placeholder: 'Select your account type',
      required: true,
    },
    companyName: {
      label: 'Company/Organization Name',
      placeholder: 'Enter your company or organization name',
      required: false,
    },
  },
} as const;

// Опции для типа аккаунта
export const ACCOUNT_TYPES = [
  { value: 'property-manager', label: 'Property Manager' },
  { value: 'real-estate-agent', label: 'Real Estate Agent' },
  { value: 'property-owner', label: 'Property Owner' },
  { value: 'property-developer', label: 'Property Developer' },
] as const;

// Шаги прогресса
export const PROGRESS_STEPS = [
  { number: 1, title: 'Account Setup', active: true },
  { number: 2, title: 'Security', active: false },
  { number: 3, title: 'Verification', active: false },
  { number: 4, title: 'Complete', active: false },
] as const;
