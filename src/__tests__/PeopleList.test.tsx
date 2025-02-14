import { describe, expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import PeopleList from '../widgets/PeopleList';
import styles from '../widgets/PeopleList/ui/PeopleList.module.scss';
import { renderWithProviders } from './test-utils';
import { ThemeContext } from '../app/Contexts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { testPeopleArray2 } from './mockData';

describe('PeopleList tests', () => {
  test('PeopleList without data', async () => {
    const component = renderWithProviders(
      <ThemeContext.Provider value={'light'}>
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
    const component = renderWithProviders(
      <ThemeContext.Provider value={'dark'}>
        <MemoryRouter
          initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=i']}
        >
          <Routes>
            <Route
              path="*"
              element={
                <PeopleList people={testPeopleArray2}>
                  <footer>children</footer>
                </PeopleList>
              }
            />
          </Routes>
        </MemoryRouter>
      </ThemeContext.Provider>
    );

    const main = screen.getByRole('main');
    expect(main.classList).not.toContain(styles.light);

    component.unmount();
  });
});
