import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string[]) => {
  const [storedValue, setStoredValue] = useState<string[]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  const setValue = (value: string[] | ((value: string[]) => void)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore as string[]);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleVisitedCountry = (countryCode: string) => {
    if (storedValue.includes(countryCode)) {
      setValue(storedValue.filter((storedCode) => storedCode !== countryCode));
    } else {
      setValue([...storedValue, countryCode]);
    }
  };

  return [storedValue, toggleVisitedCountry];
};
