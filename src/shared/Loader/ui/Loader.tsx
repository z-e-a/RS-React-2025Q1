import React from 'react';
import styles from './Loader.module.scss';

class Loader extends React.Component {
  render() {
    return <div className={styles.spinner}></div>;
  }
}

export default Loader;
