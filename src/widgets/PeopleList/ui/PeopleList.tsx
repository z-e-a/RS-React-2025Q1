import React from 'react';

import styles from './PeopleList.module.scss';
import { IPeople } from '../../../SWApi';
import PersonCard from '../../../features/PersonCard';

interface IPeopleListProps {
  people: IPeople[];
}

// interface IPeopleListState {}

// class PeopleList extends React.Component<IPeopleListProps, IPeopleListState> {
class PeopleList extends React.Component<IPeopleListProps> {
  // declare state: IPeopleListState;

  render() {
    if (this.props.people.length <= 0) {
      return <div>no items found...</div>;
    }

    return (
      <main className={styles.main}>
        {this.props.people.map((p: IPeople) => (
          <PersonCard person={p} key={p.url} />
        ))}
      </main>
    );
  }
}

export default PeopleList;
