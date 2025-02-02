import React from 'react';

import styles from './SearchBox.module.scss';
import Button from '../../../shared/Button';

interface ISearchBoxProps {
  searchText: string;
  searchCallback: (text: string) => void;
}

interface ISearchBoxState {
  searchText: string;
  searchCallback: (text: string) => void;
}

class SearchBox extends React.Component<ISearchBoxProps, ISearchBoxState> {
  declare state: ISearchBoxState;

  constructor(props: ISearchBoxProps) {
    super(props);
    this.state = {
      searchText: props.searchText,
      searchCallback: props.searchCallback,
    };
    this.onSearchTextChangeHandler = this.onSearchTextChangeHandler.bind(this);
    this.onSearchFormSubmitHandler = this.onSearchFormSubmitHandler.bind(this);
  }

  onSearchTextChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ searchText: e.currentTarget.value });
  }

  onSearchFormSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.state.searchCallback(this.state.searchText);
  }

  render() {
    return (
      <form onSubmit={this.onSearchFormSubmitHandler}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="type search text here..."
          value={this.state.searchText}
          onChange={this.onSearchTextChangeHandler}
        />
        <Button text={'search'} submit={true}></Button>
      </form>
    );
  }
}

export default SearchBox;
