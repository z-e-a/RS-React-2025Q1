import { describe, expect, test, vi } from 'vitest';
import { act, fireEvent, screen } from '@testing-library/react';
import Header from '../widgets/Header';
import styles from '../widgets/Header/ui/Header.module.scss';
import { ThemeContext } from '../app/Contexts';
import { renderWithProviders } from './test-utils';

describe('Header tests', () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);
  test('Render Header without crash', async () => {
    const mockedCallback = vi.fn();

    let component = renderWithProviders(
      <ThemeContext.Provider value={'light'}>
        <Header toggleThemeCallback={mockedCallback} />
      </ThemeContext.Provider>
    );

    const article = screen.getByRole('banner');
    expect(article.classList).toContain(styles.light);

    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('checked', true);
    fireEvent.click(checkbox);
    expect(mockedCallback).toHaveBeenCalledOnce();
    component.unmount();

    try {
      component = renderWithProviders(
        <ThemeContext.Provider value={'dark'}>
          <Header toggleThemeCallback={mockedCallback} />
        </ThemeContext.Provider>
      );
      checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveProperty('checked', false);

      const errorBtn = screen.getByText('Invoke error');

      act(() => {
        errorBtn.click();
      });
    } catch (error) {
      expect(error).toEqual(new Error('Forced error'));
    }
    component.unmount();
  });
  vi.clearAllMocks();
});
