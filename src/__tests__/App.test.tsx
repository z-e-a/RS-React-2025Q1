import { expect, test } from 'vitest';
import App from '../app/App';
import styles from '../app/App.module.scss';
import { renderWithProviders } from './test-utils';
import { ThemeContext } from '../app/Contexts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { act, screen, waitFor } from '@testing-library/react';

const preloadedState = {
  peopleView: {
    currentPage: 1,
    totalItemsCount: 1,
    selectedPeople: [],
    searchText: 'test',
  },
};

test('Render App component without crashing', () => {
  const component = renderWithProviders(
    <ThemeContext.Provider value={'dark'}>
      <MemoryRouter
        initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=lu']}
      >
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </MemoryRouter>
    </ThemeContext.Provider>,
    { preloadedState }
  );

  expect(component).toMatchSnapshot();
});

test('Render App component with data', () => {
  const component = renderWithProviders(
    <ThemeContext.Provider value={'light'}>
      <MemoryRouter
        initialEntries={['/search/detail?name=Luke+Skywalker&id=1&page=2']}
      >
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </MemoryRouter>
    </ThemeContext.Provider>,
    { preloadedState }
  );
  act(() => {
    waitFor(() => {
      const wrapper = screen.getByTestId('wrapper');
      expect(wrapper.classList).toContain(styles.light);
    });
    component.unmount();
  });
});
