import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Paginator from '../components/Paginator';
import styles from '../components/Paginator/ui/Paginator.module.scss';
import { ThemeContext } from '@/ThemeContext';
import { PagingContext, PagingContextType } from '@/PagingContext';
import { lightThemeContextValue } from './test-utils';

const mockedRouterPush = vi.fn();

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    ...actual,
    useRouter: () => ({
      push: mockedRouterPush,
    }),
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => ({
      get: (param: string) => {
        if (param == 'id') return '1';
        if (param == 'name') return 'Luke+Skywalker';
        if (param == 'text') return 'test';
        if (param == 'page') return '2';
      },
      forEach: (
        callbackFn: (arg0: string, arg1: string, arg2: number) => void
      ) => {
        callbackFn('id', '1', 0);
        callbackFn('name', 'Luke+Skywalker', 1);
        callbackFn('text', 'test', 2);
        callbackFn('page', '2', 3);
      },
    }),
  };
});

describe('Paginator tests', () => {
  test('Render Paginator without crash', async () => {
    const pagingContextValue: PagingContextType = {
      totalItemsCount: 51,
      setTotalsCount: vi.fn(),
    };

    const component = render(
      <PagingContext.Provider value={pagingContextValue}>
        <ThemeContext.Provider value={lightThemeContextValue}>
          <Paginator />
        </ThemeContext.Provider>
      </PagingContext.Provider>
    );

    const link = screen.getByTestId('paginator');
    expect(link.classList).toContain(styles.light);

    const secondBtn = screen.getByText('2');
    const nextBtn = screen.getByRole('button');
    expect(secondBtn).toBeInstanceOf(HTMLAnchorElement);
    expect(secondBtn.classList).toContain(styles.currentPageButton);
    expect(nextBtn.textContent).toMatch('>');

    fireEvent.click(nextBtn);

    const sixthBtn = screen.getByText('6');
    expect(sixthBtn).toBeDefined();

    const prevBtn = screen.getByRole('button');
    expect(prevBtn.textContent).toMatch('<');

    fireEvent.click(prevBtn);

    component.unmount();
  });
});
