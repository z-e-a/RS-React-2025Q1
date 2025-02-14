import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../shared/Button';
import { ThemeContext } from '../app/Contexts';
import styles from '../shared/Button/ui/Button.module.scss';

test('Render Button without props', async () => {
  render(
    <ThemeContext.Provider value={'dark'}>
      <Button text={'test button 1'} />
    </ThemeContext.Provider>
  );

  const button = screen.getByText('test button 1');

  expect(button).instanceOf(HTMLButtonElement);
  expect(button).toHaveProperty('type', 'button');
  expect(button.classList).not.toContain(styles.light);
});

test('Render Button with props', async () => {
  render(
    <ThemeContext.Provider value={'light'}>
      <Button text={'test button 2'} submit />
    </ThemeContext.Provider>
  );

  const button = screen.getByText('test button 2');

  expect(button).instanceOf(HTMLButtonElement);
  expect(button).toHaveProperty('type', 'submit');
  expect(button.classList).toContain(styles.light);
});
