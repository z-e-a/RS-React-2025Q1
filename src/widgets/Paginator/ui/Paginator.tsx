import { useState, useContext } from 'react';
import styles from './Paginator.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { ThemeContext } from '../../../app/Contexts';
import {
  IPeopleViewState,
  setCurrentPage,
} from '../../../entities/people/model/peopleViewSlice';
import { RootStateType, useAppSelector } from '../../../app/store';
import { useDispatch } from 'react-redux';

const Paginator = () => {
  const theme = useContext(ThemeContext);

  const dispatch = useDispatch();
  const { totalItemsCount, currentPage }: IPeopleViewState = useAppSelector<
    RootStateType,
    IPeopleViewState
  >((store): IPeopleViewState => store.peopleView);
  const pageSize = import.meta.env.VITE_PAGITAOR_PAGE_SIZE;

  const [portionNumber, setPortionNumber] = useState<number>(1);
  const pagesCount: number = Math.ceil(totalItemsCount / pageSize);
  const pages: number[] = Array.from(
    { length: pagesCount },
    (_, index: number): number => index + 1
  );
  const portionSize = import.meta.env.VITE_PAGITAOR_PORTION_SIZE;
  const portionCount: number = Math.ceil(pagesCount / portionSize);
  const leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber: number = portionNumber * portionSize;

  const [searchParams] = useSearchParams();

  const redusedSearchParams: URLSearchParams = new URLSearchParams();
  searchParams.forEach((v, k) => {
    if (k !== 'page') {
      redusedSearchParams.set(k, v);
    }
  });
  const baseUrl = new URL(
    `${window.location.pathname}?${redusedSearchParams.toString()}`,
    window.location.origin
  );

  return (
    <div
      className={[
        styles.prodPaginatorContrainer,
        theme == 'light' ? styles.light : '',
      ].join(' ')}
      data-testid="container"
    >
      {portionNumber > 1 && (
        <button
          className={styles.pageButton}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          {'<'}
        </button>
      )}

      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => {
          if (p > 1) {
            baseUrl.searchParams.set('page', String(p));
          }

          return (
            <Link
              to={baseUrl.toString()}
              className={[
                styles.pageButton,
                p === currentPage ? styles.currentPageButton : '',
              ].join(' ')}
              key={p}
              onClick={(e: React.SyntheticEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                dispatch(setCurrentPage({ currentPage: p }));
              }}
            >
              {p}
            </Link>
          );
        })}
      {portionCount > portionNumber && (
        <button
          className={styles.pageButton}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          {'>'}
        </button>
      )}
    </div>
  );
};

export default Paginator;
