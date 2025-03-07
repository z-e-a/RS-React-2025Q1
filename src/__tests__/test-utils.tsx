import { ThemeContextType } from '@/ThemeContext';
import { vi } from 'vitest';

export function mockRouter() {
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
  return {
    mockedRouterPush,
  };
}

export type mockNavigationDataType = {
  id?: string;
  name?: string;
  text?: string;
  page?: string;
};

const defaultMockNavigationData: mockNavigationDataType = {
  id: '1',
  name: 'Luke+Skywalker',
  text: 'test',
  page: '2',
};

export function mockNavigation(
  navData: mockNavigationDataType = defaultMockNavigationData
) {
  return function () {
    vi.mock('next/navigation', async () => {
      const actual = await vi.importActual('next/navigation');
      return {
        ...actual,
        useSearchParams: () => ({
          get: (param: string) => {
            if (param == 'id') return navData.id;
            if (param == 'name') return navData.name;
            if (param == 'text') return navData.text;
            if (param == 'page') return navData.page;
          },
          forEach: (
            callbackFn: (arg0: string, arg1: string, arg2: number) => void
          ) => {
            callbackFn('id', navData.id ?? '1', 0);
            callbackFn('name', navData.name ?? 'Luke+Skywalker', 1);
            callbackFn('text', navData.text ?? 'test', 2);
            callbackFn('page', navData.page ?? '2', 3);
          },
        }),
      };
    });
  };
}

export const lightThemeContextValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: vi.fn(),
};

export const darkThemeContextValue: ThemeContextType = {
  theme: 'dark',
  toggleTheme: vi.fn(),
};
