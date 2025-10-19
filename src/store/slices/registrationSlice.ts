import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationState, RegistrationFormData } from '../../types/registration';

const initialState: RegistrationState = {
  currentStep: 1,
  totalSteps: 4,
  isLoading: false,
  error: null,
  isCompleted: false,
  formData: {
    // Шаг 1
    fullName: '',
    
    // Шаг 2
    email: '',
    country: '',
    
    // Шаг 3
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false,
    
    // Шаг 4
    verificationCode: '',
    isVerified: false,
    
    // Шаг 5
    profilePicture: null,
    bio: '',
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
    },
    
    // Шаг 6
    onboardingCompleted: false,
  },
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    // Навигация по шагам
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    
    // Обновление данных формы
    updateFormData: (state, action: PayloadAction<Partial<RegistrationFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    
    // Состояние загрузки
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Ошибки
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Завершение регистрации
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
    
    // Сброс формы
    resetRegistration: () => initialState,
    
    // Действия для Saga
    submitStep: (state, action: PayloadAction<{ step: number; data: Partial<RegistrationFormData> }>) => {
      state.isLoading = true;
      state.error = null;
    },
    
    submitStepSuccess: (state, action: PayloadAction<Partial<RegistrationFormData>>) => {
      state.isLoading = false;
      state.formData = { ...state.formData, ...action.payload };
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    
    submitStepFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // Верификация
    verifyEmail: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    verifyEmailSuccess: (state) => {
      state.isLoading = false;
      state.formData.isVerified = true;
    },
    
    verifyEmailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // Завершение регистрации
    completeRegistration: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    completeRegistrationSuccess: (state) => {
      state.isLoading = false;
      state.isCompleted = true;
      state.formData.onboardingCompleted = true;
    },
    
    completeRegistrationFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
  setLoading,
  setError,
  setCompleted,
  resetRegistration,
  submitStep,
  submitStepSuccess,
  submitStepFailure,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailure,
  completeRegistration,
  completeRegistrationSuccess,
  completeRegistrationFailure,
} = registrationSlice.actions;

export default registrationSlice.reducer;
