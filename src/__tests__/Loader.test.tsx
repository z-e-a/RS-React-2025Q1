import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Loader from '../shared/Loader';
import styles from '../shared/Loader/ui/Loader.module.scss';

test('Render Loader without crash', async () => {
  const { container } = render(<Loader />);
  const spinner = container.querySelector('div');
  expect(spinner?.classList).toContain(styles.spinner);
});
