import styles from './Button.module.scss';

interface IButtonProps {
  text: string;
  callback?: () => void;
  disabled?: boolean;
  submit?: boolean;
}

const Button = ({
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

export default Button;
