import { useContext } from 'react';
import styles from './Toggle.module.scss';
import { ThemeContext } from '../../../ThemeContext';

interface IToggleProps {
  labelsText?: { left: string; right: string };
  isToggled?: boolean;
}

const Toggle = ({
  labelsText = { left: '', right: '' },
  isToggled = false,
}: IToggleProps) => {
  const themeContext = useContext(ThemeContext);

  const onClickHandler = () => {
    if (themeContext.toggleTheme) themeContext.toggleTheme();
  };

  return (
    <label
      className={[
        styles.toggleContainer,
        themeContext.theme == 'light' ? styles.light : '',
      ].join(' ')}
    >
      <span>{labelsText.left}</span>
      <input
        className={styles.input}
        type="checkbox"
        defaultChecked={isToggled}
        onClick={onClickHandler}
      />
      <span className={styles.toggle}></span>
      <span>{labelsText.right}</span>
    </label>
  );
};

export default Toggle;
