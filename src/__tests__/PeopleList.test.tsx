import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PeopleList from '../components/PeopleList';
import styles from '../components/PeopleList/ui/PeopleList.module.scss';
import { ThemeContext, ThemeContextType } from '@/ThemeContext';
import { testPeopleArray2 } from './mockData';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => ({
      get: (param: string) => {
        if (param == 'id') return '1';
        if (param == 'name') return 'Luke Skywalker';
        if (param == 'text') return 'lu';
      },
      forEach: (
        callbackFn: (arg0: string, arg1: string, arg2: number) => void
      ) => {
        callbackFn('1', 'id', 0);
        callbackFn('Luke+Skywalker', 'name', 1);
        callbackFn('lu', 'text', 2);
      },
    }),
  };
});

describe('PeopleList tests', () => {
  test('PeopleList without data', async () => {
    const lightThemeContextValue: ThemeContextType = {
      theme: 'light',
      toggleTheme: () => {},
    };

    const component = render(
      <ThemeContext.Provider value={lightThemeContextValue}>
        <PeopleList people={[]}>
          <article>children</article>
        </PeopleList>
      </ThemeContext.Provider>
    );

    const stub = screen.getByText('no items found...');
    expect(stub).toBeDefined();

    component.unmount();
  });

  test('PeopleList with data', async () => {
    const darkThemeContextValue: ThemeContextType = {
      theme: 'dark',
      toggleTheme: () => {},
    };

    const component = render(
      <ThemeContext.Provider value={darkThemeContextValue}>
        <PeopleList people={testPeopleArray2}>
          <article>children</article>
        </PeopleList>
      </ThemeContext.Provider>
    );

    const main = screen.getByRole('main');
    expect(main.classList).not.toContain(styles.light);

    component.unmount();
  });
});
