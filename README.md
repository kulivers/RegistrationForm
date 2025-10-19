# PropertyPro Multi-Step Registration

Современная многошаговая форма регистрации для Property Management SaaS приложения, созданная с использованием React, TypeScript, Redux Saga и Tailwind CSS.

## 🚀 Особенности

- **7-шаговый процесс регистрации** - пошаговое заполнение формы
- **Redux Saga** - управление состоянием и асинхронными операциями
- **Современный дизайн** - соответствует лучшим практикам UX/UI
- **TypeScript** - полная типизация для надежности
- **Модульная архитектура** - легко переиспользовать компоненты
- **Валидация форм** - встроенная валидация с отображением ошибок
- **Адаптивный дизайн** - работает на всех устройствах
- **Кастомные хуки** - переиспользуемая логика форм
- **Прогресс-индикатор** - визуальное отображение прогресса

## 📁 Структура проекта

```
src/
├── components/           # React компоненты
│   ├── FormField.tsx    # Поле ввода
│   ├── SelectField.tsx  # Поле выбора
│   ├── Button.tsx       # Кнопка
│   ├── ProgressIndicator.tsx # Индикатор прогресса
│   ├── RegistrationForm.tsx  # Простая форма
│   ├── MultiStepRegistration.tsx # Многошаговая форма
│   ├── steps/           # Компоненты шагов
│   │   ├── Step1BasicInfo.tsx
│   │   ├── Step2ContactInfo.tsx
│   │   ├── Step3Security.tsx
│   │   ├── Step4Verification.tsx
│   │   ├── Step5Profile.tsx
│   │   ├── Step6Subscription.tsx
│   │   └── Step7Complete.tsx
│   └── index.ts         # Экспорт компонентов
├── store/               # Redux store
│   ├── index.ts         # Настройка store
│   ├── slices/          # Redux slices
│   │   └── registrationSlice.ts
│   └── sagas/           # Redux sagas
│       └── registrationSaga.ts
├── constants/           # Константы
│   ├── theme.ts         # Цвета, размеры, шрифты
│   ├── form.ts          # Тексты и опции формы
│   └── index.ts         # Экспорт констант
├── types/               # TypeScript типы
│   ├── form.ts          # Типы для простой формы
│   ├── registration.ts  # Типы для многошаговой регистрации
│   └── index.ts         # Экспорт типов
├── hooks/               # Кастомные хуки
│   ├── useRegistrationForm.ts # Хук для простой формы
│   ├── redux.ts         # Redux хуки
│   └── index.ts         # Экспорт хуков
├── assets/              # Изображения
└── main.tsx            # Точка входа
```

## 🛠 Установка и запуск

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Запустите проект:**
   ```bash
   npm run dev
   ```

3. **Откройте браузер:**
   ```
   http://localhost:3001
   ```

## 📋 Шаги регистрации

1. **Основная информация** - Имя, тип аккаунта, название компании
2. **Контактная информация** - Email, телефон, страна, часовой пояс
3. **Безопасность** - Пароль, подтверждение пароля, согласие с условиями
4. **Верификация email** - Подтверждение email адреса
5. **Настройки профиля** - Био, язык, тема, уведомления (опционально)
6. **Выбор подписки** - План подписки и биллинг
7. **Завершение** - Сводка и активация аккаунта

## 📦 Использование в своем проекте

### Многошаговая регистрация (рекомендуется)

```tsx
import { Provider } from 'react-redux';
import { MultiStepRegistration } from './components/MultiStepRegistration';
import { store } from './store';
import illustrationImage from './path/to/your/image.png';

function App() {
  return (
    <Provider store={store}>
      <MultiStepRegistration
        illustrationImage={illustrationImage}
        onSuccess={(data) => console.log('Success:', data)}
        onError={(error) => console.error('Error:', error)}
      />
    </Provider>
  );
}
```

### Простая форма

```tsx
import { RegistrationForm } from './components/RegistrationForm';
import illustrationImage from './path/to/your/image.png';

function App() {
  return (
    <RegistrationForm
      illustrationImage={illustrationImage}
      onSuccess={(data) => console.log('Success:', data)}
      onError={(error) => console.error('Error:', error)}
    />
  );
}
```

### Использование отдельных компонентов

```tsx
import { FormField, Button, SelectField } from './components';
import { useRegistrationForm } from './hooks';

function MyForm() {
  const { formData, updateField, submitForm } = useRegistrationForm();
  
  return (
    <form onSubmit={submitForm}>
      <FormField
        label="Full Name"
        placeholder="Enter your name"
        value={formData.fullName}
        onChange={(value) => updateField('fullName', value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## 🎨 Кастомизация

### Изменение цветовой схемы

Отредактируйте файл `src/constants/theme.ts`:

```typescript
export const COLORS = {
  primary: {
    600: '#your-color', // Основной цвет
    700: '#your-darker-color', // Темнее для hover
  },
  // ... другие цвета
};
```

### Изменение текстов

Отредактируйте файл `src/constants/form.ts`:

```typescript
export const REGISTRATION_TEXTS = {
  brand: {
    name: 'Your Brand Name',
    tagline: 'Your tagline here',
  },
  // ... другие тексты
};
```

### Добавление новых полей

1. Обновите типы в `src/types/form.ts`
2. Добавьте константы в `src/constants/form.ts`
3. Обновите хук `useRegistrationForm`
4. Добавьте поле в компонент `RegistrationForm`

## 🔧 API

### MultiStepRegistration Props

| Prop | Type | Description |
|------|------|-------------|
| `illustrationImage` | `string` | Путь к изображению иллюстрации |
| `onSuccess` | `(data: RegistrationFormData) => void` | Колбэк при успешной регистрации |
| `onError` | `(error: string) => void` | Колбэк при ошибке |

### Redux Store

Store содержит следующие состояния:

- `currentStep` - текущий шаг (1-7)
- `formData` - данные формы
- `isLoading` - состояние загрузки
- `error` - ошибки
- `isCompleted` - завершена ли регистрация

### Redux Actions

- `submitStep` - сохранение шага
- `verifyEmail` - отправка кода верификации
- `completeRegistration` - завершение регистрации
- `nextStep` / `previousStep` - навигация по шагам
- `updateFormData` - обновление данных формы

### Redux Saga

Saga обрабатывает:

- Валидацию данных на каждом шаге
- API вызовы для сохранения данных
- Отправку кода верификации
- Завершение регистрации
- Обработку ошибок

### useRegistrationForm Hook (для простой формы)

Возвращает объект с:

- `formData` - данные формы
- `errors` - ошибки валидации
- `isSubmitting` - состояние отправки
- `updateField` - функция обновления поля
- `submitForm` - функция отправки формы
- `resetForm` - функция сброса формы
- `validateForm` - функция валидации

## 📱 Адаптивность

Форма автоматически адаптируется под разные размеры экранов:

- **Desktop** - двухколоночный макет
- **Tablet** - адаптивный макет
- **Mobile** - одноколоночный макет

## 🎯 Валидация

Встроенная валидация включает:

- Обязательные поля
- Минимальная длина текста
- Проверка формата email (если используется)
- Отображение ошибок в реальном времени

## 🚀 Развертывание

```bash
# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 📄 Лицензия

MIT License - используйте свободно в своих проектах!

## 🤝 Вклад в проект

1. Fork проекта
2. Создайте feature branch
3. Commit изменения
4. Push в branch
5. Создайте Pull Request

---

**Создано с ❤️ для Property Management SaaS**