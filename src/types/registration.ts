// Типы для многошаговой регистрации
export interface RegistrationState {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  error: string | null;
  formData: RegistrationFormData;
  isCompleted: boolean;
}

export interface RegistrationFormData {
  // Шаг 1: Основная информация
  fullName: string;
  // accountType удален
  // companyName удален
  
  // Шаг 2: Контактная информация
  email: string;
  // phone удален
  country: string;
  // timezone удален
  
  // Шаг 3: Пароль и безопасность
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
  
  // Шаг 4: Верификация
  verificationCode: string;
  isVerified: boolean;
  
  // Шаг 5-8: Настройки профиля
  profilePicture: string | null;
  bio: string;
  preferences: UserPreferences;
  
  // Шаг 9: Завершение
  onboardingCompleted: boolean;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'bank';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

// Типы для шагов
export interface StepProps {
  formData: RegistrationFormData;
  onNext: (data: Partial<RegistrationFormData>) => void;
  onPrevious: () => void;
  onComplete: () => void;
  isLoading: boolean;
  error: string | null;
  onShowTerms?: () => void;
  onShowPrivacy?: () => void;
}

// Типы для валидации
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Типы для API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Типы для подписок
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
}
