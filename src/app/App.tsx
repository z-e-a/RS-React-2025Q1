import { useCallback, useEffect, useState } from 'react';

import { IPeople } from '../SWApi';
import Header from '../widgets/Header';
import PeopleList from '../widgets/PeopleList';
import Paginator from '../widgets/Paginator';
import { useLocalStorage } from './useLocalStorage';
import { Outlet, useSearchParams } from 'react-router-dom';
import Loader from '../shared/Loader';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);

  const [searchText, setSearchText] = useLocalStorage('searchText', '');

  const paramsSearchText = searchParams.get('text') ?? '';

  if (paramsSearchText && paramsSearchText !== searchText) {
    setSearchText(paramsSearchText);
  }

  const [people, setPeople] = useState<IPeople[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(-1);
  let currentPage = searchParams.get('page') ?? '1';

  const search = useCallback(
    (text: string) => {
      const trimmedText = text.trim();
      setSearchText(trimmedText);

      const redusedSearchParams: URLSearchParams = new URLSearchParams();
      searchParams.forEach((v, k) => {
        if (k !== 'text' && k !== 'page') {
          redusedSearchParams.set(k, v);
        }
      });

      if (trimmedText) {
        redusedSearchParams.set('text', trimmedText);
      }
      const url = new URL(import.meta.env.VITE_API_URL);
      if (trimmedText) {
        url.searchParams.set('search', trimmedText);
      }

      const pageSize = import.meta.env.VITE_PAGITAOR_PAGE_SIZE ?? 10;
      url.searchParams.set('limit', String(pageSize));

      const preFlightUrl = new URL(url);
      preFlightUrl.searchParams.set('page', '1');

      fetch(preFlightUrl.toString())
        .then((response) => response.json())
        .then((preFlightData) => {
          const pagesCount = Math.ceil(preFlightData.count / pageSize);
          if (parseInt(currentPage) > pagesCount) {
            currentPage = String(pagesCount);
          }
          if (currentPage !== '1') {
            redusedSearchParams.set('page', currentPage);
          }

          setSearchParams(redusedSearchParams);

          if (currentPage !== '1') {
            url.searchParams.set('page', String(currentPage));
          }

          fetch(url.toString())
            .then((response) => response.json())
            .then((data) => {
              setPeople(data.results);
              setTotalItemsCount(data.count);
              setIsLoading(false);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    [setSearchText]
  );

  useEffect(() => {
    setIsLoading(true);
    search(searchText);
  }, [currentPage]);

  return (
    <>
      {isLoading && <Loader />}
      <Header searchText={searchText} searchCallback={search}></Header>
      <Paginator
        currentPage={parseInt(currentPage) ?? 1}
        pageSize={import.meta.env.VITE_PAGITAOR_PAGE_SIZE}
        totalItemsCount={totalItemsCount}
      />
      <PeopleList people={people} isLoading={isLoading}>
        <Outlet />
      </PeopleList>
    </>
  );
}

export default App;
