import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PeopleDetail from '../widgets/PersonDetail';
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
  const component = render(
    <MemoryRouter
      initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=lu']}
    >
      <Routes>
        <Route path="*" element={<PeopleDetail />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByRole('heading').textContent).toEqual('Loading...');

  await waitFor(() => {
    const details = screen.getByTestId('details');
    expect(details?.querySelector('h2')?.textContent).toEqual('Luke Skywalker');
  });

  component.unmount();
});
