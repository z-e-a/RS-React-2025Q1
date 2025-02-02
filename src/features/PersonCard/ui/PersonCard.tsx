import React from 'react';

import styles from './PersonCard.module.scss';
import { IPeople } from '../../../SWApi';

interface IPersonCardProps {
  person: IPeople;
}

// interface IPersonCardState {}

// class PersonCard extends React.Component<IPersonCardProps, IPersonCardState> {
class PersonCard extends React.Component<IPersonCardProps> {
  render() {
    return (
      <article className={styles.card}>
        <h3>
          <span>Name: </span>
          <span>{this.props.person.name}</span>
        </h3>
        <p>
          <span>Year of birth: </span>
          <span>{this.props.person.birth_year}</span>
        </p>
        <p>
          <span>Eye color: </span>
          <span>{this.props.person.eye_color}</span>
        </p>
      </article>
    );
  }
}

export default PersonCard;
