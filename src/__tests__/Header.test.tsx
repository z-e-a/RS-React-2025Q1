import { describe, expect, test } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Header from '../widgets/Header';

describe('Header tests', () => {
  test('Render Header without crash', async () => {
    const mockedSearchCallback = vi.fn();
    const component = render(
      <Header searchText={''} searchCallback={mockedSearchCallback} />
    );

    const searchBtn = screen.getByText('search');
    fireEvent.click(searchBtn);
    expect(mockedSearchCallback).toBeCalledTimes(1);
    component.unmount();
  });

  test('Render Header with crash', async () => {
    const component = render(
      <Header searchText={''} searchCallback={() => {}} />
    );

    act(async () => {
      const errBtn = component.getByText('Invoke error');
      expect(errBtn).instanceOf(HTMLButtonElement);
      errBtn.click();
    });
  });
});
