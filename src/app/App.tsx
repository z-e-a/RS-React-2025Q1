import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { CountriesList } from '../components/CountriesList';
import { Country } from '../countries';
import Header from '../components/Header';
import { useLocalStorage } from './useLocalStorage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [sortingField, setSortingField] = useState('default');
  const [sortingOrder, setSortingOrder] = useState('ascending');

  const [visitedCountries, toggleVisitedCountry] = useLocalStorage(
    'React2025Q1_visitedCountries',
    new Array<string>()
  );

  const getCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setIsLoading(false);
        const regions = data.reduce(
          (regions: Set<string>, country: Country) =>
            regions.add(country.region),
          new Set()
        );

        setRegions([
          'All',
          ...(Array.from(regions).sort((a, b) => {
            if ((a as string) < (b as string)) return -1;
            if ((a as string) > (b as string)) return 1;
            return 0;
          }) as string[]),
        ]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Header
        regions={regions}
        setSelectedRegion={setSelectedRegion}
        selectedRegion={selectedRegion}
        searchText={searchText}
        setSearchText={setSearchText}
        sortingFields={['default', 'name', 'population']}
        sortingField={sortingField}
        setSortingField={setSortingField}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      <CountriesList
        countries={countries}
        isLoading={false}
        selectedRegion={selectedRegion}
        searchText={searchText}
        sortingField={sortingField}
        sortingOrder={sortingOrder}
        visitedCountries={visitedCountries as string[]}
        toggleVisitedCountry={
          toggleVisitedCountry as (countryCode: string) => void
        }
      />
    </>
  );
}

export default App;
