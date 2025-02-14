import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../../app/Contexts';

import styles from './SearchBox.module.scss';
import Button from '../../../shared/Button';
import {
  IPeopleViewState,
  setCurrentPage,
  setSearchText,
} from '../../../entities/people/model/peopleViewSlice';
import { RootStateType, useAppSelector } from '../../../app/store';
import { useDispatch } from 'react-redux';

const SearchBox = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { searchText }: IPeopleViewState = useAppSelector<
    RootStateType,
    IPeopleViewState
  >((store): IPeopleViewState => store.peopleView);

  const [localSearchText, setLocalSearchText] = useState<string>(
    searchText ?? ''
  );

  const onSearchTextChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLocalSearchText(e.currentTarget.value);
  };

  const onSearchFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchText({ searchText: localSearchText }));
    dispatch(setCurrentPage({ currentPage: 1 }));
  };

  useEffect(() => {
    setLocalSearchText(searchText);
  }, [searchText]);

  return (
    <form onSubmit={onSearchFormSubmitHandler}>
      <input
        type="search"
        className={[
          styles.searchInput,
          theme == 'light' ? styles.light : '',
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
