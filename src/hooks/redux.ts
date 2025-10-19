import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Типизированные хуки с проверкой
export const useAppDispatch = () => {
  try {
    return useDispatch<AppDispatch>();
  } catch (error) {
    console.error('useAppDispatch must be used within a Redux Provider:', error);
    throw error;
  }
};

export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) => {
  try {
    return useSelector(selector);
  } catch (error) {
    console.error('useAppSelector must be used within a Redux Provider:', error);
    throw error;
  }
};
