import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBox from '../widgets/SearchBox';

const TEST_STRING = 'test search text';

describe('SearchBox tests', () => {
  test('Render SearchBox without crash', async () => {
    const mockedSearchCallback = vi.fn();
    render(
      <SearchBox
        searchText={TEST_STRING}
        searchCallback={mockedSearchCallback}
      />
    );

    const input = await screen.findByRole('searchbox');
    expect((input as HTMLInputElement).value).toMatch(TEST_STRING);

    const searchBnt = screen.getByRole('button');
    expect(searchBnt.textContent).toMatch('search');
    expect(searchBnt).toHaveProperty('type', 'submit');

    await fireEvent.click(searchBnt);

    expect(mockedSearchCallback).toBeCalledTimes(1);
    expect(mockedSearchCallback).toBeCalledWith(TEST_STRING);

    await fireEvent.input(input, { target: { value: 'new value' } });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
