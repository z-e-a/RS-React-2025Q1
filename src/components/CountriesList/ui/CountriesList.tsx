import { memo, useCallback, useMemo } from 'react';
import { Country } from '../../../countries';
import { CountryCard } from '../../CountryCard';
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

const CountriesListInner = ({
  countries,
  isLoading,
  selectedRegion,
  searchText,
  sortingField,
  sortingOrder,
  visitedCountries,
  toggleVisitedCountry,
}: CountriesListProps) => {
  const filteredCountries = useMemo(() => {
    let tmpCountries = countries.slice();

    if (selectedRegion != 'All') {
      tmpCountries = tmpCountries.filter(
        (country) => country.region == selectedRegion
      );
    }

    if (searchText) {
      tmpCountries = tmpCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return tmpCountries;
  }, [countries, searchText, selectedRegion]);

  const viewCountries = useMemo(() => {
    let tmpCountries: Country[] = filteredCountries;
    if (sortingField == 'name') {
      tmpCountries = tmpCountries.sort((a: Country, b: Country) => {
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
      tmpCountries = tmpCountries.sort((a: Country, b: Country) => {
        if (sortingOrder == 'ascending') {
          return a.population - b.population;
        } else {
          return b.population - a.population;
        }
      });
    }
    return tmpCountries;
  }, [filteredCountries, sortingField, sortingOrder]);

  const toggleVisitedCountryMemo = useCallback(
    (countryCode: string) => toggleVisitedCountry(countryCode),
    [toggleVisitedCountry]
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (countries?.length <= 0) {
    return <div>no items found...</div>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.countriesList}>
        {viewCountries.map((country: Country) => (
          <CountryCard
            country={country}
            key={country.cca3}
            isVisited={visitedCountries.includes(country.cca3)}
            toggleVisitedCountry={toggleVisitedCountryMemo}
          />
        ))}
      </section>
    </main>
  );
};

export const CountriesList = memo(CountriesListInner);
