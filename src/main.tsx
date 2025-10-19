
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { MultiStepRegistration } from "./components/MultiStepRegistration";
import { store } from "./store";
import "./index.css";

// Импорт изображения
const illustrationImage = new URL('./assets/0cf28a1525f0ade04d74fc9d8ac5a6919c5d7f2e.png', import.meta.url).href;

const App = () => {
  const handleSuccess = (data: any) => {
    console.log('Registration successful:', data);
    // Здесь можно добавить логику перенаправления или уведомления
    alert('Registration completed successfully! Welcome to PropertyPro!');
  };

  const handleError = (error: string) => {
    console.error('Registration error:', error);
    // Здесь можно добавить логику показа ошибки пользователю
    alert(`Registration error: ${error}`);
  };

  return (
    <Provider store={store}>
      <MultiStepRegistration
        illustrationImage={illustrationImage}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
  