import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import PeopleDetail from '../widgets/PersonDetail';
import styles from '../widgets/PersonDetail/ui/PersonDetail.module.scss';
import loaderStyles from '../shared/Loader/ui/Loader.module.scss';
import { ThemeContext } from '../app/Contexts';
import { renderWithProviders } from './test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { testResponseSinglePerson } from './mockData';

const server = setupServer(
  http.get('https://swapi.dev/api/people/1', () => {
    return HttpResponse.json(testResponseSinglePerson);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Render PeopleDetail without crash', async () => {
  let component = renderWithProviders(
    <ThemeContext.Provider value={'dark'}>
      <MemoryRouter
        initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=lu']}
      >
        <Routes>
          <Route path="*" element={<PeopleDetail />} />
        </Routes>
      </MemoryRouter>
    </ThemeContext.Provider>
  );

  const overlay = component.container.querySelector('div');
  expect(overlay?.classList).toContain(loaderStyles.overlay);
  const spinner = overlay?.querySelector('div');
  expect(spinner?.classList).toContain(loaderStyles.spinner);

  await waitFor(() => {
    const container = screen.getByTestId('container');
    expect(container.classList).not.toContain(styles.light);
  });

  component.unmount();

  component = renderWithProviders(
    <ThemeContext.Provider value={'light'}>
      <MemoryRouter
        initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=lu']}
      >
        <Routes>
          <Route path="*" element={<PeopleDetail />} />
        </Routes>
      </MemoryRouter>
    </ThemeContext.Provider>
  );

  await waitFor(() => {
    const container = screen.getByTestId('container');
    expect(container.classList).toContain(styles.light);
  });
  component.unmount();
});
