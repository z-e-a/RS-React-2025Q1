import { createContext } from 'react';

export type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: (() => void) | null;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: null,
});
