import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import PersonCard from '../components/PersonCard';
import styles from '../components/PersonCard/ui/PersonCard.module.scss';
import { ThemeContext } from '@/ThemeContext';
import { testSinglePerson, testSinglePerson2 } from './mockData';
import { darkThemeContextValue, lightThemeContextValue } from './test-utils';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => ({
      get: (param: string) => {
        if (param == 'id') return '1';
        if (param == 'name') return 'Luke Skywalker';
        if (param == 'text') return 'lu';
      },
      forEach: (
        callbackFn: (arg0: string, arg1: string, arg2: number) => void
      ) => {
        callbackFn('1', 'id', 0);
        callbackFn('Luke+Skywalker', 'name', 1);
        callbackFn('lu', 'text', 2);
      },
    }),
  };
});

describe('PersonCard tests', () => {
  test('Render PersonCard without crash', async () => {
    let component = render(
      <ThemeContext.Provider value={lightThemeContextValue}>
        <PersonCard person={testSinglePerson} />
      </ThemeContext.Provider>
    );

    const article = screen.getByRole('article');
    expect(article.classList).toContain(styles._selected);

    const link = screen.getByRole('link');

    expect(link.getAttribute('href')?.split('?')[1]).toMatch('text=lu');
    expect(link.classList).toContain(styles.light);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInstanceOf(HTMLHeadingElement);
    expect(heading.textContent).toMatch(`${testSinglePerson.name}`);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('checked', false);
    fireEvent.click(checkbox);
    expect(checkbox).toHaveProperty('checked', true);

    component.unmount();

    component = render(
      <ThemeContext.Provider value={darkThemeContextValue}>
        <PersonCard person={testSinglePerson2} />
      </ThemeContext.Provider>
    );

    const newLink = screen.getByRole('link');
    expect(newLink.classList).not.toContain(styles.light);

    const article2 = screen.getByRole('article');
    expect(article2.classList).not.toContain(styles._selected);

    component.unmount();
  });
});
