import { useContext, useState } from 'react';

import styles from './Header.module.scss';
import Button from '../../Button';
import SearchBox from '../../SearchBox';
import Toggle from '../../Toggle';
import { ThemeContext } from '@/ThemeContext';

const Header = () => {
  const themeContext = useContext(ThemeContext);

  const [hasError, setHasError] = useState<boolean>(false);

  const onInvokeErrorClickHandler = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Forced error');
  }

  return (
    <header
      className={[
        styles.header,
        themeContext.theme == 'light' ? styles.light : '',
      ].join(' ')}
    >
      <SearchBox />
      <Button
        text={'Invoke error'}
        callback={onInvokeErrorClickHandler}
      ></Button>
      <Toggle labelsText={{ left: 'dark', right: 'light' }}></Toggle>
    </header>
  );
};

export default Header;
