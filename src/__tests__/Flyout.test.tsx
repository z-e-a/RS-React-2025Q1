import { describe, expect, test, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import Flyout from '../widgets/Flyout';
import { renderWithProviders } from './test-utils';
import * as actions from '../entities/people/model/peopleViewSlice';
import { testPeopleArray2 } from './mockData';

describe('Flyout tests', () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);
  test('Render Flyout without crash', async () => {
    renderWithProviders(<Flyout />, {
      preloadedState: {
        peopleView: {
          currentPage: 1,
          totalItemsCount: 10,
          selectedPeople: testPeopleArray2,
          searchText: '',
        },
      },
    });

    const label = screen.getByText('2 items selected');
    expect(label).toBeDefined();
    const unselectBnt = screen.getByText('Unselect all');
    expect(unselectBnt).toBeInstanceOf(HTMLButtonElement);

    const downloadBnt = screen.getByText('Download');
    expect(downloadBnt).toBeInstanceOf(HTMLButtonElement);

    fireEvent.click(downloadBnt);

    const mockedUnselectAll = vi.spyOn(actions, 'unselectAllPeople');

    fireEvent.click(unselectBnt);
    expect(mockedUnselectAll).toHaveBeenCalledTimes(1);
  });
  vi.clearAllMocks();
});
