import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';

// Простой store без Saga для тестирования
export const simpleStore = configureStore({
  reducer: {
    registration: registrationReducer,
  },
  devTools: {
    name: 'Simple Registration App',
    trace: true,
    traceLimit: 25,
  },
});

// Типы для TypeScript
export type SimpleRootState = ReturnType<typeof simpleStore.getState>;
export type SimpleAppDispatch = typeof simpleStore.dispatch;
