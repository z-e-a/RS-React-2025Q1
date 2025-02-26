import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBox from '../components/SearchBox';
import { ThemeContext, ThemeContextType } from '@/ThemeContext';

const mocketRouterPush = vi.fn();

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    ...actual,
    useRouter: () => ({
      push: mocketRouterPush,
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
      },
      forEach: (
        callbackFn: (arg0: string, arg1: string, arg2: number) => void
      ) => {
        callbackFn('id', '1', 0);
        callbackFn('name', 'Luke+Skywalker', 1);
        callbackFn('text', 'test', 2);
      },
    }),
  };
});

describe('SearchBox tests', async () => {
  test('Render SearchBox without crash', async () => {
    const lightThemeContextValue: ThemeContextType = {
      theme: 'light',
      toggleTheme: () => {},
    };

    const component = render(
      <ThemeContext.Provider value={lightThemeContextValue}>
        <SearchBox />
      </ThemeContext.Provider>
    );

    const input = await screen.findByRole('searchbox');
    expect((input as HTMLInputElement).value).toMatch('test');

    await fireEvent.input(input, { target: { value: 'new' } });

    const searchBnt = screen.getByRole('button');
    expect(searchBnt.textContent).toMatch('search');
    expect(searchBnt).toHaveProperty('type', 'submit');

    await fireEvent.click(searchBnt);
    expect(mocketRouterPush).toBeCalledWith('search?text=new');

    component.unmount();
  });

  vi.clearAllMocks();
});
