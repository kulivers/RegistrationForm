// Типы для формы регистрации
export interface RegistrationFormData {
  fullName: string;
  companyName: string;
}

// Типы для валидации
export interface FormValidation {
  fullName: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
  accountType: {
    required: boolean;
  };
  companyName: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
}

// Типы для ошибок формы
export interface FormErrors {
  fullName?: string;
  accountType?: string;
  companyName?: string;
}

// Типы для опций селекта
export interface SelectOption {
  value: string;
  label: string;
}

// Типы для шагов прогресса
export interface ProgressStep {
  number: number;
  title: string;
  active: boolean;
}

// Типы для пропсов компонентов
export interface FormFieldProps {
  label: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

export interface SelectFieldProps extends FormFieldProps {
  options: SelectOption[];
}

export interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
}
