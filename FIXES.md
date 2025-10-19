# Исправления ошибок

## Проблема с Redux хуками

**Ошибка:** `Invalid hook call. Hooks can only be called inside of the body of a function component.`

**Причина:** Redux хуки использовались в компонентах, которые не были обернуты в Redux Provider, или были проблемы с версиями React/Redux.

**Решение:** Создана упрощенная версия многошаговой формы без Redux:

### Файлы:
- `src/components/SimpleMultiStepRegistration.tsx` - упрощенная версия без Redux
- `src/main.tsx` - обновлен для использования простой версии

### Что изменилось:
1. Убрали Redux Provider из main.tsx
2. Создали SimpleMultiStepRegistration с локальным состоянием
3. Исправили импорт изображения
4. Добавили типы для ассетов

## Исправления импортов

**Проблема:** TypeScript не мог найти модули изображений

**Решение:** 
1. Создали `src/types/assets.d.ts` с декларациями типов
2. Использовали `new URL()` для правильного импорта изображений в Vite

## Текущее состояние

✅ Проект запускается без ошибок
✅ Многошаговая форма работает
✅ Все 7 шагов реализованы
✅ Валидация работает
✅ Адаптивный дизайн

## Как использовать

```tsx
import { SimpleMultiStepRegistration } from './components/SimpleMultiStepRegistration';

<SimpleMultiStepRegistration
  illustrationImage={imageUrl}
  onSuccess={(data) => console.log('Success!', data)}
  onError={(error) => console.error('Error:', error)}
/>
```

## Redux версия

Redux версия все еще доступна в файлах:
- `src/components/MultiStepRegistration.tsx`
- `src/store/`
- `src/sagas/`

Для использования Redux версии нужно:
1. Убедиться, что все зависимости установлены
2. Обернуть приложение в Redux Provider
3. Проверить совместимость версий React/Redux
