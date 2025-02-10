import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Paginator from '../widgets/Paginator';
import styles from '../widgets/Paginator/ui/Paginator.module.scss';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Paginator tests', () => {
  test('Render Paginator without crash', async () => {
    const component = render(
      <MemoryRouter
        initialEntries={['/search/detail?name=Luke+Skywalker&id=1&text=i']}
      >
        <Routes>
          <Route
            path="*"
            element={
              <Paginator currentPage={2} pageSize={10} totalItemsCount={51} />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const secondBnt = screen.getByText('2');
    const nextBnt = screen.getByRole('button');
    expect(secondBnt).toBeInstanceOf(HTMLAnchorElement);
    expect(secondBnt.classList).toContain(styles.currentPageButton);
    expect(nextBnt.textContent).toMatch('>');

    await nextBnt.click();
    const sixthBnt = screen.getByText('6');
    expect(sixthBnt).toBeDefined();
    component.unmount();
  });
});
