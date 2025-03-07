import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Toggle from '../components/Toggle';
import { ThemeContext } from '@/ThemeContext';
import { darkThemeContextValue } from './test-utils';

describe('Toggle tests', () => {
  test('Render Toggle without crash', async () => {
    const component = render(
      <ThemeContext.Provider value={darkThemeContextValue}>
        <Toggle
          labelsText={{ left: 'dark', right: 'light' }}
          isToggled={true}
        />
      </ThemeContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).haveOwnProperty('checked', true);
    fireEvent.click(checkbox);
    component.unmount();
  });
});
