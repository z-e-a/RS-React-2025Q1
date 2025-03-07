import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PeopleDetail from '../components/PersonDetail';
import styles from '../components/PersonDetail/ui/PersonDetail.module.scss';
import { ThemeContext } from '../ThemeContext';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { testResponseSinglePerson } from './mockData';
import { lightThemeContextValue } from './test-utils';
const server = setupServer(
  http.get('https://swapi.dev/api/people/1', () => {
    return HttpResponse.json(testResponseSinglePerson);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => ({
      get: (param: string) => {
        if (param == 'id') return '1';
        if (param == 'name') return 'Luke+Skywalker';
        if (param == 'text') return 'lu';
      },
      forEach: (
        callbackFn: (arg0: string, arg1: string, arg2: number) => void
      ) => {
        callbackFn('id', '1', 0);
        callbackFn('name', 'Luke+Skywalker', 1);
        callbackFn('text', 'lu', 2);
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

process.env.NEXT_PUBLIC_API_URL = 'https://swapi.dev/api';

vi.spyOn(console, 'error').mockImplementation(() => null);

test('Render PeopleDetail without crash', async () => {
  const component = render(
    <ThemeContext.Provider value={lightThemeContextValue}>
      <PeopleDetail />
    </ThemeContext.Provider>
  );

  await waitFor(() => {
    const container = screen.getByTestId('details');
    expect(container.classList).toContain(styles.light);

    const heading = screen.getByRole('heading');
    expect(heading.textContent).toEqual('Luke Skywalker');

    const closeBtn = screen.getByTitle('close');
    expect(closeBtn).toBeDefined();
    closeBtn.click();
  });
  component.unmount();
});

vi.clearAllMocks();
