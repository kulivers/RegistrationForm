import { useState, useCallback } from 'react';
import { RegistrationFormData, FormErrors } from '../types/form';

const initialFormData: RegistrationFormData = {
  fullName: '',
  companyName: '',
};

const initialErrors: FormErrors = {};

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Валидация формы
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Валидация имени
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Валидация типа аккаунта
    // if (!formData.accountType) {
    //   newErrors.accountType = 'Account type is required';
    // }

    // Валидация названия компании (опционально)
    if (formData.companyName && formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Обновление поля формы
  const updateField = useCallback((field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Очистка ошибки при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  // Отправка формы
  const submitForm = useCallback(async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      // Здесь будет логика отправки данных на сервер
      console.log('Submitting form data:', formData);

      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));

      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  // Сброс формы
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors(initialErrors);
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    submitForm,
    resetForm,
    validateForm,
  };
};
