import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

const mockedUseNavigate = vi.fn();
const mockedUseRouteError = vi
  .fn()
  .mockReturnValue({ statusText: 'Test error' });
const mockedIsRouteErrorResponse = vi.fn().mockReturnValue(true);
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedUseNavigate,
  useRouteError: () => mockedUseRouteError,
  isRouteErrorResponse: () => mockedIsRouteErrorResponse,
}));

describe('NotFound tests', () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);
  test('Render NotFound with error', async () => {
    render(<NotFound />);

    expect(screen.getByText('404')).instanceOf(HTMLSpanElement);
    const button = screen.getByText('Home');

    expect(button).instanceOf(HTMLButtonElement);
    expect(button).toHaveProperty('type', 'submit');

    const p = screen.getByRole('paragraph');
    expect(p).toBeInstanceOf(HTMLParagraphElement);

    fireEvent.click(button);
    expect(mockedUseNavigate).toBeCalledTimes(1);

    const backButton = screen.getByText('Go back');
    fireEvent.click(backButton);
    expect(mockedUseNavigate).toBeCalledTimes(2);
    expect(mockedUseNavigate).toBeCalledWith(-1);
  });
  vi.clearAllMocks();
});
