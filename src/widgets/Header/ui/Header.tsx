import { useState } from 'react';

import styles from './Header.module.scss';
import Button from '../../../shared/Button';
import SearchBox from '../../SearchBox';

interface IHeaderProps {
  searchText: string;
  searchCallback: (text: string) => void;
}

const Header = (props: IHeaderProps) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const onInvokeErrorClickHandler = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Forced error');
  }

  return (
    <header className={styles.header}>
      <SearchBox
        searchText={props.searchText}
        searchCallback={props.searchCallback}
      ></SearchBox>
      <Button
        text={'Invoke error'}
        callback={onInvokeErrorClickHandler}
      ></Button>
    </header>
  );
};

export default Header;
