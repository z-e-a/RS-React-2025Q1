import { useCallback, useState } from 'react';

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

  const setValue = useCallback(
    (value: string[] | ((value: string[]) => void)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore as string[]);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        console.error(err);
      }
    },
    [key, storedValue]
  );

  const toggleVisitedCountry = useCallback(
    (countryCode: string) => {
      if (storedValue.includes(countryCode)) {
        setValue(
          storedValue.filter((storedCode) => storedCode !== countryCode)
        );
      } else {
        setValue([...storedValue, countryCode]);
      }
    },
    [setValue, storedValue]
  );

  return [storedValue, toggleVisitedCountry];
};
