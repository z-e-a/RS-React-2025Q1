import { describe, expect, test, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Header from '../components/Header';
import styles from '../components/Header/ui/Header.module.scss';
import { ThemeContext } from '@/ThemeContext';
import { darkThemeContextValue, lightThemeContextValue } from './test-utils';

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

const mockedRouterPush = vi.fn();

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/compat/router');
  return {
    ...actual,
    useRouter: () => ({
      push: mockedRouterPush,
    }),
  };
});

describe('Header tests', () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);
  test('Render Header without crash', async () => {
    let component = render(
      <ThemeContext.Provider value={lightThemeContextValue}>
        <Header />
      </ThemeContext.Provider>
    );

    const article = screen.getByRole('banner');
    expect(article.classList).toContain(styles.light);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('checked', false);
    fireEvent.click(checkbox);
    expect(lightThemeContextValue.toggleTheme).toHaveBeenCalledOnce();
    component.unmount();

    try {
      component = render(
        <ThemeContext.Provider value={darkThemeContextValue}>
          <Header />
        </ThemeContext.Provider>
      );

      const errorBtn = screen.getByText('Invoke error');

      act(() => {
        errorBtn.click();
      });
    } catch (error) {
      expect(error).toEqual(new Error('Forced error'));
    }
    component.unmount();
  });
  vi.clearAllMocks();
});
