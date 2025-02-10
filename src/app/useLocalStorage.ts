import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(
        `${import.meta.env.VITE_APP_PREFIX}${key}`
      );
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setValue = (value: string | ((value: string) => void)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(
        `${import.meta.env.VITE_APP_PREFIX}${key}`,
        JSON.stringify(valueToStore)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue];
};
