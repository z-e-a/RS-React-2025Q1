import styles from './PersonCard.module.scss';
import { IPeople } from '../../../SWApi';
import { Link, useSearchParams } from 'react-router-dom';

interface IPersonCardProps {
  person: IPeople;
}

const PersonCard = ({ person }: IPersonCardProps) => {
  const [searchParams] = useSearchParams();
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
      window.location.origin
    );
  } else {
    url = new URL(
      `search/detail?${searchParams.toString()}`,
      window.location.origin
    );
    url.searchParams.set('name', person.name);
    url.searchParams.set('id', id);
  }

  return (
    <Link to={url.toString()} state={{ url: person.url }}>
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
  );
};

export default PersonCard;
