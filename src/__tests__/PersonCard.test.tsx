import { describe, expect, test } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import PersonCard from '../features/PersonCard';
import styles from '../features/PersonCard/ui/PersonCard.module.scss';
import { renderWithProviders } from './test-utils';
import { ThemeContext } from '../app/Contexts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { testPeopleArray2, testSinglePerson } from './mockData';

describe('PersonCard tests', () => {
  test('Render PersonCard without crash', async () => {
    const component = renderWithProviders(
      <ThemeContext.Provider value={'light'}>
        <MemoryRouter
          initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=i']}
        >
          <Routes>
            <Route
              path="*"
              element={<PersonCard person={testSinglePerson} />}
            />
          </Routes>
        </MemoryRouter>
      </ThemeContext.Provider>,
      {
        preloadedState: {
          people: {
            peopleList: testPeopleArray2,
          },
          peopleView: {
            currentPage: 1,
            totalItemsCount: 10,
            selectedPeople: testPeopleArray2,
            searchText: '',
          },
        },
      }
    );

    const article = screen.getByRole('article');
    expect(article.classList).toContain(styles._selected);

    const link = screen.getByRole('link');

    expect(link.getAttribute('href')?.split('?')[1]).toMatch('text=i');
    expect(link.classList).toContain(styles.light);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInstanceOf(HTMLHeadingElement);
    expect(heading.textContent).toMatch(`${testSinglePerson.name}`);

    component.unmount();

    renderWithProviders(
      <ThemeContext.Provider value={'dark'}>
        <MemoryRouter
          initialEntries={[
            '/search/detail?name=Leia+Organa&id=5&text=i&page=2',
          ]}
        >
          <Routes>
            <Route
              path="*"
              element={<PersonCard person={testSinglePerson} />}
            />
          </Routes>
        </MemoryRouter>
      </ThemeContext.Provider>,
      {
        preloadedState: {
          peopleView: {
            currentPage: 2,
            totalItemsCount: 10,
            selectedPeople: testPeopleArray2,
            searchText: '',
          },
        },
      }
    );

    const newLink = screen.getByRole('link');
    expect(newLink.getAttribute('href')?.split('?')[1]).toMatch(
      'name=Luke+Skywalker&id=1&text=i'
    );
    expect(newLink.classList).not.toContain(styles.light);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('checked', true);
    fireEvent.click(checkbox);
    expect(checkbox).toHaveProperty('checked', false);
  });
});
