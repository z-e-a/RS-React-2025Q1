import styles from './PersonCard.module.scss';
import { IPeople } from '../../../SWApi';
import { Link, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../app/Contexts';
import { useDispatch } from 'react-redux';
import { RootStateType, useAppSelector } from '../../../app/store';
import {
  IPeopleViewState,
  togglePeopleSelection,
} from '../../../entities/people/model/peopleViewSlice';

interface IPersonCardProps {
  person: IPeople;
}

const PersonCard = ({ person }: IPersonCardProps) => {
  const theme = useContext(ThemeContext);
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

  const dispatch = useDispatch();

  const { selectedPeople }: IPeopleViewState = useAppSelector<
    RootStateType,
    IPeopleViewState
  >((store): IPeopleViewState => store.peopleView);

  return (
    <div className={styles.cardContainer}>
      <Link
        to={url.toString()}
        state={{ url: person.url }}
        className={[styles.link, theme == 'light' ? styles.light : ''].join(
          ' '
        )}
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
          checked={selectedPeople.some((p) => p.name === person.name)}
          onChange={() => {
            dispatch(togglePeopleSelection({ people: person }));
          }}
        />
      </label>
    </div>
  );
};

export default PersonCard;
