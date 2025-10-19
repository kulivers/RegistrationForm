import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
  submitStep,
  submitStepSuccess,
  submitStepFailure,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailure,
  completeRegistration,
  completeRegistrationSuccess,
  completeRegistrationFailure,
  RegistrationState,
} from '../slices/registrationSlice';

// API функции (заглушки)
const api = {
  // Сохранение шага
  saveStep: async (step: number, data: any) => {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Имитация возможных ошибок
    if (Math.random() < 0.1) { // 10% вероятность ошибки
      throw new Error('Network error occurred');
    }

    return { success: true, data };
  },

  // Отправка кода верификации
  sendVerificationCode: async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (Math.random() < 0.05) { // 5% вероятность ошибки
      throw new Error('Failed to send verification code');
    }

    return { success: true, message: 'Verification code sent' };
  },

  // Проверка кода верификации
  verifyCode: async (email: string, code: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Имитация проверки кода (в реальном приложении код проверяется на сервере)
    if (code !== '123456') {
      throw new Error('Invalid verification code');
    }

    return { success: true, verified: true };
  },

  // Завершение регистрации
  completeRegistration: async (formData: any) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (Math.random() < 0.05) { // 5% вероятность ошибки
      throw new Error('Registration failed');
    }

    return {
      success: true,
      user: {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        createdAt: new Date().toISOString(),
      }
    };
  },
};

// Saga для сохранения шага
function* handleSubmitStep(action: ReturnType<typeof submitStep>) {
  try {
    const { step, data } = action.payload;

    // Получаем текущее состояние
    const state: RegistrationState = yield select((state: any) => state.registration);

    // Валидация в зависимости от шага
    const validationResult = yield call(validateStep, step, data, state.formData);

    if (!validationResult.isValid) {
      yield put(submitStepFailure(validationResult.errors[Object.keys(validationResult.errors)[0]]));
      return;
    }

    // Сохраняем данные на сервере
    const result = yield call(api.saveStep, step, data);

    if (result.success) {
      yield put(submitStepSuccess(data));
    } else {
      yield put(submitStepFailure('Failed to save step data'));
    }
  } catch (error: any) {
    yield put(submitStepFailure(error.message || 'An error occurred'));
  }
}

// Saga для отправки кода верификации
function* handleVerifyEmail() {
  try {
    const state: RegistrationState = yield select((state: any) => state.registration);
    const { email } = state.formData;

    if (!email) {
      yield put(verifyEmailFailure('Email is required3'));
      return;
    }

    const result = yield call(api.sendVerificationCode, email);

    if (result.success) {
      yield put(verifyEmailSuccess());
    } else {
      yield put(verifyEmailFailure('Failed to send verification code'));
    }
  } catch (error: any) {
    yield put(verifyEmailFailure(error.message || 'Failed to send verification code'));
  }
}

// Saga для завершения регистрации
function* handleCompleteRegistration() {
  try {
    const state: RegistrationState = yield select((state: any) => state.registration);
    const { formData } = state;

    // Финальная валидация
    const validationResult = yield call(validateCompleteForm, formData);

    if (!validationResult.isValid) {
      yield put(completeRegistrationFailure(validationResult.errors[Object.keys(validationResult.errors)[0]]));
      return;
    }

    const result = yield call(api.completeRegistration, formData);

    if (result.success) {
      yield put(completeRegistrationSuccess());
    } else {
      yield put(completeRegistrationFailure('Registration failed'));
    }
  } catch (error: any) {
    yield put(completeRegistrationFailure(error.message || 'Registration failed'));
  }
}

// Функции валидации
function* validateStep(step: number, data: any, currentFormData: any) {
  const errors: Record<string, string> = {};

  switch (step) {
    case 1:
      if (!data.fullName?.trim()) errors.fullName = 'Full name is required';
      if (!data.email?.trim()) errors.email = 'Email is required4';
      else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Invalid email format';
      if (!data.country) errors.country = 'Country is required';
      break;

    case 2:
      if (!data.password?.trim()) errors.password = 'Password is required';
      else if (data.password.length < 8) errors.password = 'Password must be at least 8 characters';
      if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
      if (!data.acceptTerms) errors.acceptTerms = 'You must accept the terms and conditions';
      break;

    case 3:
      if (!data.verificationCode?.trim()) errors.verificationCode = 'Verification code is required';
      else if (data.verificationCode.length !== 6) errors.verificationCode = 'Verification code must be 6 digits';
      break;

    case 4:
      // Шаг 5 опциональный, валидация не требуется
      break;

    default:
      break;
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

function* validateCompleteForm(formData: any) {
  const errors: Record<string, string> = {};

  // Проверяем все обязательные поля
  if (!formData.fullName?.trim()) errors.fullName = 'Full name is required';
  if (!formData.email?.trim()) errors.email = 'Email is required';
  if (!formData.password?.trim()) errors.password = 'Password is required';
  if (!formData.acceptTerms) errors.acceptTerms = 'You must accept the terms and conditions';
  if (!formData.isVerified) errors.verification = 'Email must be verified';

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Root saga
export function* registrationSaga() {
  yield takeEvery(submitStep.type, handleSubmitStep);
  yield takeEvery(verifyEmail.type, handleVerifyEmail);
  yield takeEvery(completeRegistration.type, handleCompleteRegistration);
}
