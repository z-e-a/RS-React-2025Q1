import React, { memo, useEffect, useState } from 'react';

import styles from './SearchBox.module.scss';
import { Button } from '../../Button';

interface SearchBoxProps {
  regions: string[];
  selectedRegion: string;
  setSelectedRegion: (text: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBoxInner = (props: SearchBoxProps) => {
  const [localSelectedRegion, setLocalSelectedRegion] = useState<string>('');
  const [localSearchText, setLocalSearchText] = useState<string>('');

  const onSelectRegionHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    setLocalSelectedRegion(e.currentTarget.value);
  };

  const onSearchTextChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLocalSearchText(e.currentTarget.value);
  };

  const onSearchFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setSearchText(localSearchText);
    props.setSelectedRegion(localSelectedRegion);
  };

  useEffect(() => {
    setLocalSearchText(props.searchText);
    setLocalSelectedRegion(props.selectedRegion);
  }, [props.searchText, props.selectedRegion]);

  return (
    <form className={styles.searchForm} onSubmit={onSearchFormSubmitHandler}>
      <h4 className={styles.formHeading}>Filter by...</h4>
      <label className={styles.filter}>
        Region:
        <select onChange={onSelectRegionHandler}>
          {props.regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </label>
      <label className={styles.filter}>
        Name:
        <input
          type="search"
          className={styles.searchInput}
          placeholder="type search text here..."
          value={localSearchText}
          onChange={onSearchTextChangeHandler}
        />
      </label>
      <Button text={'filter'} submit={true} />
    </form>
  );
};

export const SearchBox = memo(SearchBoxInner);
