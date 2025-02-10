import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PeopleList from '../widgets/PeopleList';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { testPeopleArray2 } from './mockData';

describe('PeopleList tests', () => {
  test('PeopleList loading', async () => {
    const component = render(
      <PeopleList people={[]} isLoading={true}>
        <article>children</article>
      </PeopleList>
    );

    const stub = screen.getByText('loading...');
    expect(stub).toBeDefined();

    component.unmount();
  });

  test('PeopleList without data', async () => {
    const component = render(
      <PeopleList people={[]} isLoading={false}>
        <article>children</article>
      </PeopleList>
    );

    // Check that an appropriate message is displayed if no cards are present
    const stub = screen.getByText('no items found...');
    expect(stub).toBeDefined();

    component.unmount();
  });

  test('PeopleList with data', async () => {
    // await act(async () => {
    const component = render(
      <MemoryRouter
        initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=i']}
      >
        <Routes>
          <Route
            path="*"
            element={
              <PeopleList people={testPeopleArray2} isLoading={false}>
                <footer>children</footer>
              </PeopleList>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const cards = screen.getAllByRole('link');
    expect(cards.length).toEqual(2);

    // Ensure that the card component renders the relevant card data
    expect(cards[0].textContent).toEqual(
      'Name: Luke SkywalkerYear of birth: 19BBYEye color: blue'
    );

    cards[0].click();
    component.unmount();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
