import { memo } from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
  text: string;
  callback?: () => void;
  disabled?: boolean;
  submit?: boolean;
}

const ButtonInner = ({
  text,
  callback,
  disabled = false,
  submit = false,
}: IButtonProps) => {
  return (
    <button
      className={styles.button}
      type={submit ? 'submit' : 'button'}
      onClick={callback}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export const Button = memo(ButtonInner);
