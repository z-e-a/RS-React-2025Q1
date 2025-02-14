import styles from './PeopleList.module.scss';
import { IPeople } from '../../../SWApi';
import PersonCard from '../../../features/PersonCard';
import { ReactNode, useContext } from 'react';
import { ThemeContext } from '../../../app/Contexts';

interface IPeopleListProps {
  people: IPeople[];
  children: ReactNode;
}

const PeopleList = ({ people, children }: IPeopleListProps) => {
  const theme = useContext(ThemeContext);

  if (people.length <= 0) {
    return <div>no items found...</div>;
  }

  return (
    <main
      className={[styles.main, theme == 'light' ? styles.light : ''].join(' ')}
    >
      <aside className={styles.peopleList}>
        {people.map((p: IPeople) => (
          <PersonCard person={p} key={p.url} />
        ))}
      </aside>
      <div>{children}</div>
    </main>
  );
};

export default PeopleList;
