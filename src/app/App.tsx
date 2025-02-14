import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Header from '../widgets/Header';
import PeopleList from '../widgets/PeopleList';
import Paginator from '../widgets/Paginator';
import { Outlet, useSearchParams } from 'react-router-dom';
import { ThemeContext } from './Contexts';
import { useDispatch } from 'react-redux';
import {
  IPeopleViewState,
  setCurrentPage,
  setSearchText,
  setTotalItemsCount,
} from '../entities/people/model/peopleViewSlice';
import { RootStateType, useAppSelector } from './store';
import { IPeopleResponse, usePeopleMutation } from './swApi';
import Loader from '../shared/Loader';
import { IPeople } from '../SWApi';
import { setPeople } from '../entities/people';
import Flyout from '../widgets/Flyout';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { currentPage, searchText }: IPeopleViewState = useAppSelector<
    RootStateType,
    IPeopleViewState
  >((store): IPeopleViewState => store.peopleView);

  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const [requestPeople, { isLoading }] = usePeopleMutation();

  const people: IPeople[] = useAppSelector<RootStateType, IPeople[]>(
    (state: RootStateType): IPeople[] => state.people.peopleList
  );

  useEffect(() => {
    const paramsSearchText = searchParams.get('text') ?? '';
    const trimmedText = paramsSearchText.trim();
    if (paramsSearchText && paramsSearchText !== searchText) {
      dispatch(setSearchText({ searchText: trimmedText }));
    } else {
      const item = window.localStorage.getItem(
        `${import.meta.env.VITE_APP_PREFIX}searchText`
      );
      if (item) {
        const value = JSON.parse(item) ?? '';
        dispatch(setSearchText({ searchText: value }));
      }
    }

    const paramsCurrentPage = parseInt(searchParams.get('page') ?? '1');
    dispatch(setCurrentPage({ currentPage: paramsCurrentPage }));
  }, []);

  useEffect(() => {
    const redusedSearchParams: URLSearchParams = new URLSearchParams();
    searchParams.forEach((v, k) => {
      if (k !== 'text' && k !== 'page') {
        redusedSearchParams.set(k, v);
      }
    });

    if (searchText) {
      redusedSearchParams.set('text', searchText);
    }
    if (currentPage !== 1) {
      redusedSearchParams.set('page', String(currentPage));
    }

    setSearchParams(redusedSearchParams);

    async function fetchData() {
      const result: IPeopleResponse = await requestPeople({
        searchText,
        page: currentPage,
      }).unwrap();
      dispatch(setPeople(result.results));
      dispatch(setTotalItemsCount({ totalItemsCount: result.count }));
    }

    fetchData();
  }, [
    searchText,
    currentPage,
    searchParams,
    setSearchParams,
    requestPeople,
    dispatch,
  ]);

  return (
    <ThemeContext.Provider value={theme}>
      {isLoading && <Loader />}
      <div
        data-testid="wrapper"
        className={[styles.wrapper, theme == 'light' ? styles.light : ''].join(
          ' '
        )}
      >
        <Header toggleThemeCallback={toggleTheme}></Header>
        <Paginator />
        <PeopleList people={people}>
          <Outlet />
        </PeopleList>
        <Flyout />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
