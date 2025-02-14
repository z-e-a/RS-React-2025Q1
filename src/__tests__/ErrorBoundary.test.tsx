import { expect, test } from 'vitest';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '../app/ErrorBoundary';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import Header from '../widgets/Header';

const preloadedState = {
  peopleView: {
    currentPage: 1,
    totalItemsCount: 1,
    selectedPeople: [],
    searchText: 'test',
  },
};

test('Render ErrorBoundary component without crashing', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);
  const div = document.createElement('div');
  const root = createRoot(div);

  renderWithProviders(
    <ErrorBoundary>
      <Header toggleThemeCallback={() => {}} />
    </ErrorBoundary>,
    { preloadedState }
  );

  await act(async () => {
    try {
      const errorBtn = screen.getByText('Invoke error');
      await act(async () => {
        await fireEvent.click(errorBtn);
        waitFor(async () => {
          const refreshBtn = screen.getByText('refresh page');
          expect(refreshBtn).toBeInstanceOf(HTMLButtonElement);
          await fireEvent.click(refreshBtn);
        });
      });
    } catch (error) {
      console.log(error);
    }
  });
  root.unmount();
  vi.clearAllMocks();
});
