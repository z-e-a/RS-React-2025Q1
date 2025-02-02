import React from 'react';

import styles from './Header.module.scss';
import Button from '../../../shared/Button';
import SearchBox from '../../SearchBox';

interface IHeaderProps {
  searchText: string;
  searchCallback: (text: string) => void;
}

interface IHeaderState {
  hasError: boolean;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  declare state: IHeaderState;

  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      hasError: false,
    };
    this.onInvokeErrorClickHandler = this.onInvokeErrorClickHandler.bind(this);
  }

  onInvokeErrorClickHandler() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      throw new Error('Forced error');
    }

    return (
      <header className={styles.header}>
        <SearchBox
          searchText={this.props.searchText}
          searchCallback={this.props.searchCallback}
        ></SearchBox>
        <Button
          text={'Invoke error'}
          callback={this.onInvokeErrorClickHandler}
        ></Button>
      </header>
    );
  }
}

export default Header;
