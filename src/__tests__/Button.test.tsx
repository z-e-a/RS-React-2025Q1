import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../shared/Button';

test('Render Button without props', async () => {
  render(<Button text={'test button 1'} />);

  const button = screen.getByText('test button 1');

  expect(button).instanceOf(HTMLButtonElement);
  expect(button).toHaveProperty('type', 'button');
});

test('Render Button with props', async () => {
  render(<Button text={'test button 2'} submit />);

  const button = screen.getByText('test button 2');

  expect(button).instanceOf(HTMLButtonElement);
  expect(button).toHaveProperty('type', 'submit');
});
