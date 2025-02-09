import React, { useEffect, useState } from 'react';

import styles from './SearchBox.module.scss';
import Button from '../../../shared/Button';

interface ISearchBoxProps {
  searchText: string;
  searchCallback: (text: string) => void;
}

const SearchBox = (props: ISearchBoxProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const onSearchTextChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const onSearchFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.searchCallback(searchText);
  };

  useEffect(() => {
    setSearchText(props.searchText);
  }, [props.searchText]);

  return (
    <form onSubmit={onSearchFormSubmitHandler}>
      <input
        type="search"
        className={styles.searchInput}
        placeholder="type search text here..."
        value={searchText}
        onChange={onSearchTextChangeHandler}
      />
      <Button text={'search'} submit={true}></Button>
    </form>
  );
};

export default SearchBox;
