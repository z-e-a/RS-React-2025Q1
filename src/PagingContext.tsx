import { createContext } from 'react';

export type PagingContextType = {
  totalItemsCount: number;
  setTotalsCount: (total: number) => void;
};

export const PagingContext = createContext<{
  totalItemsCount: number;
  setTotalsCount: (total: number) => void;
} | null>(null);
