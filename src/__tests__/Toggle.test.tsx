import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Toggle from '../components/Toggle';
import { ThemeContext } from '@/ThemeContext';

describe('Toggle tests', () => {
  const mockedCallback = vi.fn();
  const themeContextValue: ThemeContextType = {
    theme: 'dark',
    toggleTheme: mockedCallback,
  };

  test('Render Toggle without crash', async () => {
    // const mockedCallback = vi.fn();
    const component = render(
      <ThemeContext.Provider value={themeContextValue}>
        <Toggle
          labelsText={{ left: 'dark', right: 'light' }}
          isToggled={true}
        />
      </ThemeContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).haveOwnProperty('checked', true);

    fireEvent.click(checkbox);
    // expect(mockedCallback).toBeCalledTimes(1);

    component.unmount();
  });
});
