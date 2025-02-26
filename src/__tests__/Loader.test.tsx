import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '../components/Loader';
import styles from '../components/Loader/ui/Loader.module.scss';

test('Render Loader without crash', async () => {
  const { container } = render(<Loader />);
  const overlay = container.querySelector('div');
  expect(overlay?.classList).toContain(styles.overlay);
  const spinner = overlay?.querySelector('div');
  expect(spinner?.classList).toContain(styles.spinner);
});
