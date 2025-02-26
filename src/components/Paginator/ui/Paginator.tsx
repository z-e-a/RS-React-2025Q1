'use client';
import { useState, useContext, useEffect } from 'react';
import styles from './Paginator.module.scss';
import { ThemeContext } from '../../../ThemeContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { PagingContext } from '@/PagingContext';

const Paginator = () => {
  const themeContext = useContext(ThemeContext);

  const pageSize = parseInt(
    process.env.NEXT_PUBLIC_PAGINATOR_PAGE_SIZE ?? '10'
  );

  const pagingState = useContext(PagingContext);
  const totalItemsCount = pagingState?.totalItemsCount || 0;

  const [portionNumber, setPortionNumber] = useState<number>(1);
  const pagesCount: number = Math.ceil(totalItemsCount / pageSize);
  const pages: number[] = Array.from(
    { length: pagesCount },
    (_, index: number): number => index + 1
  );
  const portionSize = parseInt(
    process.env.NEXT_PUBLIC_PAGINATOR_PORTION_SIZE ?? '3'
  );
  const portionCount: number = Math.ceil(pagesCount / portionSize);
  const leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber: number = portionNumber * portionSize;

  const searchParams = useSearchParams();

  const redusedSearchParams: URLSearchParams = new URLSearchParams();
  searchParams.forEach((v, k) => {
    if (k !== 'page') {
      redusedSearchParams.set(k, v);
    }
  });

  const currentPage = parseInt(searchParams.get('page') || '1');

  const baseUrl = new URL(
    `${'search'}?${redusedSearchParams.toString()}`,
    'http://localhost:3000'
  );

  useEffect(() => {
    setPortionNumber(Math.ceil(currentPage / portionSize));
  }, [currentPage, portionSize]);

  return (
    <div
      className={[
        styles.prodPaginatorContrainer,
        themeContext.theme == 'light' ? styles.light : '',
      ].join(' ')}
      data-testid="paginator"
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
              href={baseUrl.toString()}
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
