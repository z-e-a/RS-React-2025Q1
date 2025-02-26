import React, { useState, useContext } from 'react';

import styles from './SearchBox.module.scss';
import Button from '../../Button';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/compat/router';
import { ThemeContext } from '@/ThemeContext';
import { useSearchParams } from 'next/navigation';

const SearchBox = () => {
  const themeContext = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText = searchParams.get('text');

  const [localSearchText, setLocalSearchText] = useState<string>(
    searchText ?? ''
  );

  const onSearchTextChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLocalSearchText(e.currentTarget.value);
  };

  const onSearchFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (localSearchText) {
      window.localStorage.setItem(
        `${process.env.NEXT_PUBLIC_APP_PREFIX}searchText`,
        JSON.stringify(localSearchText)
      );
    } else {
      window.localStorage.removeItem(
        `${process.env.NEXT_PUBLIC_APP_PREFIX}searchText`
      );
    }

    router.push(`search?text=${localSearchText}`);
  };

  return (
    <form onSubmit={onSearchFormSubmitHandler}>
      <input
        type="search"
        className={[
          styles.searchInput,
          themeContext.theme == 'light' ? styles.light : '',
        ].join(' ')}
        placeholder="type search text here..."
        value={localSearchText}
        onChange={onSearchTextChangeHandler}
      />
      <Button text={'search'} submit={true}></Button>
    </form>
  );
};

export default SearchBox;
