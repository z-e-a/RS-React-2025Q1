import { useState } from 'react';
import styles from './Paginator.module.scss';
import { Link, useSearchParams } from 'react-router-dom';

interface IProps {
  currentPage: number;
  pageSize: number;
  totalItemsCount: number;
}

const Paginator = ({ currentPage, pageSize, totalItemsCount }: IProps) => {
  const portionSize = import.meta.env.VITE_PAGITAOR_PORTION_SIZE;
  const [portionNumber, setPortionNumber] = useState<number>(1);

  const pagesCount: number = Math.ceil(totalItemsCount / pageSize);
  const pages: number[] = Array.from(
    { length: pagesCount },
    (_, index: number): number => index + 1
  );
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
    <div className={styles.prodPaginatorContrainer} data-testid="container">
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
