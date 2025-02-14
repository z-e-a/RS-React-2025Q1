import { useContext, useState } from 'react';

import styles from './Header.module.scss';
import Button from '../../../shared/Button';
import SearchBox from '../../SearchBox';
import { ThemeContext } from '../../../app/Contexts';
import Toggle from '../../../shared/Toggle';

interface IHeaderProps {
  toggleThemeCallback: () => void;
}

const Header = (props: IHeaderProps) => {
  const theme = useContext(ThemeContext);
  const [hasError, setHasError] = useState<boolean>(false);

  const onInvokeErrorClickHandler = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Forced error');
  }

  return (
    <header
      className={[styles.header, theme == 'light' ? styles.light : ''].join(
        ' '
      )}
    >
      <SearchBox />
      <Button
        text={'Invoke error'}
        callback={onInvokeErrorClickHandler}
      ></Button>
      <Toggle
        labelsText={{ left: 'dark', right: 'light' }}
        callback={props.toggleThemeCallback}
        isToggled={theme === 'light'}
      ></Toggle>
    </header>
  );
};

export default Header;
