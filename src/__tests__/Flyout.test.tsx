import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Flyout from '../components/Flyout';
import { testPeopleArray2 } from './mockData';
import { SelectionContext, SelectionContextType } from '@/SelectionContext';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => ({
      get: (param: string) => {
        if (param == 'id') return '1';
        if (param == 'name') return 'Luke+Skywalker';
        if (param == 'text') return 'test';
      },
      forEach: (
        callbackFn: (arg0: string, arg1: string, arg2: number) => void
      ) => {
        callbackFn('id', '1', 0);
        callbackFn('name', 'Luke+Skywalker', 1);
        callbackFn('text', 'test', 2);
      },
    }),
  };
});

const mockedRouterPush = vi.fn();

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/compat/router');
  return {
    ...actual,
    useRouter: () => ({
      push: mockedRouterPush,
    }),
  };
});

describe('Flyout tests', () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);
  test('Render Flyout without crash', async () => {
    const mockedUnselectAllPeople = vi.fn();

    const selectionContextValue: SelectionContextType = {
      selectedPeople: testPeopleArray2,
      togglePeopleSelection: vi.fn(),
      unselectAllPeople: mockedUnselectAllPeople,
    };

    render(
      <SelectionContext.Provider value={selectionContextValue}>
        <Flyout />
      </SelectionContext.Provider>
    );

    const label = screen.getByText('2 items selected');
    expect(label).toBeDefined();
    const unselectBtn = screen.getByText('Unselect all');
    expect(unselectBtn).toBeInstanceOf(HTMLButtonElement);

    const downloadBtn = screen.getByText('Download');
    expect(downloadBtn).toBeInstanceOf(HTMLButtonElement);

    await fireEvent.click(downloadBtn);

    fireEvent.click(unselectBtn);
    expect(mockedUnselectAllPeople).toHaveBeenCalledTimes(1);
  });
  vi.clearAllMocks();
});
