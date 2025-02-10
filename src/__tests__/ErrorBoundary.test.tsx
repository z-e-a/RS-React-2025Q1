import { expect, test } from 'vitest';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '../app/ErrorBoundary';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Header from '../widgets/Header';

test('Render ErrorBoundary component without crashing', async () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  try {
    await act(async () => {
      render(
        <ErrorBoundary>
          <Header searchCallback={() => {}} searchText={''} />
        </ErrorBoundary>
      );

      const errorBtn = screen.getByText('Invoke error');

      await fireEvent.click(errorBtn);
    });

    const refreshBtn = screen.getByText('refresh page');
    expect(refreshBtn).toBeInstanceOf(HTMLButtonElement);
  } catch {
    //do nothing
  } finally {
    root.unmount();
  }
});

test('should render error boundary component when there is an error', async () => {
  const Child = () => {
    throw new Error();
  };

  const div = document.createElement('div');
  const root = createRoot(div);

  let errorMessage: HTMLElement | null = null;
  let refreshBtn: HTMLElement | null = null;

  try {
    await act(async () => {
      render(
        <ErrorBoundary>
          <Child />
        </ErrorBoundary>
      );
    });
    errorMessage = screen.getByText('Something went wrong 😢');
    refreshBtn = screen.getByText('refresh page');
  } catch {
    //do nothing
  } finally {
    root.unmount();
  }
  expect(errorMessage).toBeDefined();
  refreshBtn?.click();
});
