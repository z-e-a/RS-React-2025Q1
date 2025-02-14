import { useContext } from 'react';
import styles from './Toggle.module.scss';
import { ThemeContext } from '../../../app/Contexts';

interface IToggleProps {
  labelsText?: { left: string; right: string };
  callback?: () => void;
  isToggled?: boolean;
}

const Toggle = ({
  labelsText = { left: '', right: '' },
  callback,
  isToggled = false,
}: IToggleProps) => {
  const theme = useContext(ThemeContext);

  return (
    <label
      className={[
        styles.toggleContainer,
        theme == 'light' ? styles.light : '',
      ].join(' ')}
    >
      <span>{labelsText.left}</span>
      <input
        className={styles.input}
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
      />
      <span className={styles.toggle}></span>
      <span>{labelsText.right}</span>
    </label>
  );
};

export default Toggle;
