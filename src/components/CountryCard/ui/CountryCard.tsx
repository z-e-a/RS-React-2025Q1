import { Country } from '../../../countries';
import Button from '../../Button';
import styles from './CountryCard.module.scss';

interface CountryCardProps {
  country: Country;
  isVisited: boolean;
  toggleVisitedCountry: (value: string) => void;
}

const CountryCard = ({
  country,
  isVisited,
  toggleVisitedCountry,
}: CountryCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <article
        className={[styles.card, isVisited ? styles._visited : ''].join(' ')}
      >
        <img src={country.flags.svg} alt={country.name.common} />
        <h3>
          <span>{country.name.common}</span>
        </h3>
        <p>
          <span>Region: </span>
          <span>{country.region}</span>
        </p>
        <p>
          <span>Population: </span>
          <span>{country.population}</span>
        </p>
        <Button
          text={isVisited ? 'clear visited mark' : 'mark as visited'}
          callback={() => {
            toggleVisitedCountry(country.cca3);
          }}
        />
      </article>
    </div>
  );
};

export default CountryCard;
