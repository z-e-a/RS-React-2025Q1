import SearchBox from '../../SearchBox';
import SortBox from '../../SortBox';
import styles from './Header.module.scss';

interface HeaderProps {
  regions: string[];
  selectedRegion: string;
  setSelectedRegion: (text: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  sortingFields: string[];
  sortingField: string;
  setSortingField: (text: string) => void;
  sortingOrder: string;
  setSortingOrder: (text: string) => void;
}

const Header = ({
  regions,
  selectedRegion,
  setSelectedRegion,
  searchText,
  setSearchText,
  sortingFields,
  sortingField,
  setSortingField,
  sortingOrder,
  setSortingOrder,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <SearchBox
        regions={regions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <SortBox
        sortingFields={sortingFields}
        sortingField={sortingField}
        setSortingField={setSortingField}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
    </header>
  );
};

export default Header;
