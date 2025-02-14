import { describe, expect, test, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import Paginator from '../widgets/Paginator';
import styles from '../widgets/Paginator/ui/Paginator.module.scss';
import { renderWithProviders } from './test-utils';
import { ThemeContext } from '../app/Contexts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as actions from '../entities/people/model/peopleViewSlice';

describe('Paginator tests', () => {
  test('Render Paginator without crash', async () => {
    const component = renderWithProviders(
      <ThemeContext.Provider value={'light'}>
        <MemoryRouter
          initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=i']}
        >
          <Routes>
            <Route path="*" element={<Paginator />} />
          </Routes>
        </MemoryRouter>
      </ThemeContext.Provider>,
      {
        preloadedState: {
          peopleView: {
            currentPage: 2,
            totalItemsCount: 51,
            selectedPeople: [],
            searchText: '',
          },
        },
      }
    );

    const link = screen.getByTestId('container');
    expect(link.classList).toContain(styles.light);

    const secondBnt = screen.getByText('2');
    const nextBnt = screen.getByRole('button');
    expect(secondBnt).toBeInstanceOf(HTMLAnchorElement);
    expect(secondBnt.classList).toContain(styles.currentPageButton);
    expect(nextBnt.textContent).toMatch('>');

    await fireEvent.click(nextBnt);

    const sixthBnt = screen.getByText('6');
    expect(sixthBnt).toBeDefined();

    const prevBnt = screen.getByRole('button');
    expect(prevBnt.textContent).toMatch('<');

    await fireEvent.click(prevBnt);

    const firstBnt = screen.getByText('1');

    const mockedSelectFirstPage = vi.spyOn(actions, 'setCurrentPage');

    await fireEvent.click(firstBnt);
    expect(firstBnt.classList).toContain(styles.currentPageButton);

    expect(mockedSelectFirstPage).toHaveBeenCalledWith({ currentPage: 1 });

    component.unmount();
  });
});
