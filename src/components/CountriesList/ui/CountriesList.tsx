import { Country } from '../../../countries';
import CountryCard from '../../CountryCard';
import styles from './CountriesList.module.scss';

interface CountriesListProps {
  countries: Country[];
  isLoading: boolean;
  selectedRegion: string;
  searchText: string;
  sortingField: string;
  sortingOrder: string;
  visitedCountries: string[];
  toggleVisitedCountry: (value: string) => void;
}

const CountriesList = ({
  countries,
  isLoading,
  selectedRegion,
  searchText,
  sortingField,
  sortingOrder,
  visitedCountries,
  toggleVisitedCountry,
}: CountriesListProps) => {
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (countries?.length <= 0) {
    return <div>no items found...</div>;
  }

  let viewCountries = countries.slice();

  if (selectedRegion != 'All') {
    viewCountries = viewCountries.filter(
      (country) => country.region == selectedRegion
    );
  }

  if (searchText) {
    viewCountries = viewCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (sortingField == 'name') {
    viewCountries = viewCountries.sort((a: Country, b: Country) => {
      if (sortingOrder == 'ascending') {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
      } else {
        if (a.name.common > b.name.common) return -1;
        if (a.name.common < b.name.common) return 1;
      }
      return 0;
    });
  }

  if (sortingField == 'population') {
    viewCountries = viewCountries.sort((a: Country, b: Country) => {
      if (sortingOrder == 'ascending') {
        return a.population - b.population;
      } else {
        return b.population - a.population;
      }
    });
  }

  return (
    <main className={styles.main}>
      <section className={styles.countriesList}>
        {viewCountries.map((country: Country) => (
          <CountryCard
            country={country}
            key={country.cca3}
            isVisited={visitedCountries.includes(country.cca3)}
            toggleVisitedCountry={toggleVisitedCountry}
          />
        ))}
      </section>
    </main>
  );
};

export default CountriesList;
