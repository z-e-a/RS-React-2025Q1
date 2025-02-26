'use client';

import React, { useCallback, useState } from 'react';

import { ThemeContext } from './ThemeContext';
import { PagingContext } from './PagingContext';
import { IPeople } from './SWApi';
import { SelectionContext } from './SelectionContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  const setTotals = useCallback(
    (count: number) => {
      setTotalItemsCount(count);
    },
    [setTotalItemsCount]
  );

  const [selectedPeople, setSelectedPeople] = useState<IPeople[]>([]);

  const togglePeopleSelection = useCallback(
    (people: IPeople) => {
      if (!selectedPeople.some((p) => p.name === people.name)) {
        setSelectedPeople([...selectedPeople, people]);
      } else {
        setSelectedPeople(selectedPeople.filter((p) => p.name !== people.name));
      }
    },
    [setSelectedPeople, selectedPeople]
  );

  const unselectAllPeople = useCallback(() => {
    setSelectedPeople([]);
  }, [setSelectedPeople]);

  return (
    <PagingContext.Provider
      value={{ totalItemsCount: totalItemsCount, setTotalsCount: setTotals }}
    >
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <SelectionContext.Provider
          value={{ selectedPeople, togglePeopleSelection, unselectAllPeople }}
        >
          {children}
        </SelectionContext.Provider>
      </ThemeContext.Provider>
    </PagingContext.Provider>
  );
}
