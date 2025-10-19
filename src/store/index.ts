import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import registrationReducer from './slices/registrationSlice';
import { registrationSaga } from './sagas/registrationSaga';

// Создаем middleware для Saga
const sagaMiddleware = createSagaMiddleware();

// Настраиваем store
export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
  devTools: {
    name: 'Registration App',
    trace: true,
    traceLimit: 25,
  },
});

// Запускаем Saga
sagaMiddleware.run(registrationSaga);

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
