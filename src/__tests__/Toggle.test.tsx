import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Toggle from '../shared/Toggle';

describe('Toggle tests', () => {
  test('Render Toggle without crash', async () => {
    const mockedCallback = vi.fn();
    const component = render(
      <Toggle
        labelsText={{ left: 'dark', right: 'light' }}
        callback={mockedCallback}
        isToggled={true}
      />
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).haveOwnProperty('checked', true);

    fireEvent.click(checkbox);
    expect(mockedCallback).toBeCalledTimes(1);

    component.unmount();
  });
});
