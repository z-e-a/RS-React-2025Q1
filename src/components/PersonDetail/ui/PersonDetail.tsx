'use client';

import styles from './PersonDetail.module.scss';
import { IPeople } from '../../../SWApi';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../ThemeContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const PeopleDetail = () => {
  const themeContext = useContext(ThemeContext);
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '0';
  const [person, setPerson] = useState(null);

  const reducedSearchParams: URLSearchParams = new URLSearchParams();
  searchParams.forEach((v, k) => {
    if (k !== 'name' && k !== 'id') {
      reducedSearchParams.set(k, v);
    }
  });
  const backUrl = new URL(
    `search?${reducedSearchParams.toString()}`,
    'http://localhost:3000'
  );

  useEffect(() => {
    if (id != '0') {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/people/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.detail == 'Not found') {
            setPerson(null);
          } else {
            setPerson(data);
          }
        });
    }
  }, [id]);

  return id != '0' && person ? (
    <div
      className={[
        styles.detailContainer,
        themeContext.theme == 'light' ? styles.light : '',
      ].join(' ')}
      data-testid="details"
    >
      <h2 className={styles.detailCaption}>
        {(person as unknown as IPeople).name}
      </h2>
      <ul>
        {Object.keys(person as unknown as IPeople).map((k) => {
          return (
            <li className={styles.detailEntry} key={k}>
              <span className={styles.fieldName}>{k}: </span>
              <span className={styles.fieldValue}>
                {(person as unknown as Record<string, string>)[k]}
              </span>
            </li>
          );
        })}
        <Link
          href={backUrl.toString()}
          className={styles.closeBtn}
          title="close"
        ></Link>
      </ul>
    </div>
  ) : null;
};

export default PeopleDetail;
