import styles from './PeopleList.module.scss';
import { IPeople } from '../../../SWApi';
import PersonCard from '../../PersonCard';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../ThemeContext';
import { Router } from 'next/router';
import Loader from '@/components/Loader';

interface IPeopleListProps {
  people: IPeople[];
  children: ReactNode;
}

const PeopleList = ({ people, children }: IPeopleListProps) => {
  const themeContext = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  if (people?.length <= 0) {
    return <div>no items found...</div>;
  }

  return (
    <main
      className={[
        styles.main,
        themeContext.theme == 'light' ? styles.light : '',
      ].join(' ')}
    >
      {loading ? <Loader /> : null}
      <aside className={styles.peopleList}>
        {people?.map((p: IPeople) => <PersonCard person={p} key={p.url} />)}
      </aside>
      <div>{children}</div>
    </main>
  );
};

export default PeopleList;
