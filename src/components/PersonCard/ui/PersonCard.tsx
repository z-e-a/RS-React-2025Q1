'use client';

import styles from './PersonCard.module.scss';
import { IPeople } from '../../../SWApi';
import { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SelectionContext } from '@/SelectionContext';

interface IPersonCardProps {
  person: IPeople;
}

const PersonCard = ({ person }: IPersonCardProps) => {
  const themeContext = useContext(ThemeContext);
  const searchParams = useSearchParams();
  const isMatch = searchParams.get('name') == person.name;
  const id = person.url
    .split('https://swapi.dev/api/people/')[1]
    .replace('/', '');

  let url;
  if (isMatch) {
    const redusedSearchParams: URLSearchParams = new URLSearchParams();
    searchParams.forEach((v, k) => {
      if (k !== 'name' && k !== 'id') {
        redusedSearchParams.set(k, v);
      }
    });
    url = new URL(
      `search?${redusedSearchParams.toString()}`,
      'http://localhost:3000/'
    );
  } else {
    url = new URL(
      `search?${searchParams.toString()}`,
      'http://localhost:3000/'
    );
    url.searchParams.set('name', person.name);
    url.searchParams.set('id', id);
  }

  const selectionContext = useContext(SelectionContext);

  const onSelectHandler = () => {
    if (selectionContext && selectionContext.togglePeopleSelection) {
      selectionContext.togglePeopleSelection(person);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <Link
        href={url.toString() || ''}
        className={[
          styles.link,
          themeContext.theme == 'light' ? styles.light : '',
        ].join(' ')}
      >
        <article
          className={[styles.card, isMatch ? styles._selected : ''].join(' ')}
        >
          <h3>
            <span>Name: </span>
            <span>{person.name}</span>
          </h3>
          <p>
            <span>Year of birth: </span>
            <span>{person.birth_year}</span>
          </p>
          <p>
            <span>Eye color: </span>
            <span>{person.eye_color}</span>
          </p>
        </article>
      </Link>
      <label className={styles.selectLabel}>
        select
        <input
          type="checkbox"
          checked={selectionContext?.selectedPeople.some(
            (p) => p.name === person.name
          )}
          onChange={onSelectHandler}
        />
      </label>
    </div>
  );
};

export default PersonCard;
