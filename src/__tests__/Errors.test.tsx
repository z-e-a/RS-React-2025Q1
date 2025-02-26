import Custom404 from '@/pages/404';
import Custom500 from '@/pages/500';
import Error from '@/pages/_error';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Error pages component', () => {
  test('should render Custom 404-error page without crash', async () => {
    render(<Custom404 />);

    const header = await screen.findByRole('heading');
    expect(header.textContent).toEqual('404 - Page Not Found');
  });

  test('should render Custom 500-error page without crash', async () => {
    render(<Custom500 />);

    const header = await screen.findByRole('heading');
    expect(header.textContent).toEqual('500 - Server-side error occurred');
  });

  test('should render common error page without crash', async () => {
    render(<Error />);

    const header = await screen.findByText('An error occurred on client');
    expect(header).toBeDefined();
  });

  test('should render common error page without crash', async () => {
    render(<Error statusCode={500} />);

    const header = await screen.findByText('An error 500 occurred on server');
    expect(header).toBeDefined();
  });
});
