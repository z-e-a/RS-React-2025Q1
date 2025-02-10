import styles from './PeopleList.module.scss';
import { IPeople } from '../../../SWApi';
import PersonCard from '../../../features/PersonCard';
import { ReactNode } from 'react';

interface IPeopleListProps {
  people: IPeople[];
  isLoading: boolean;
  children: ReactNode;
}

const PeopleList = ({ people, isLoading, children }: IPeopleListProps) => {
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (people?.length <= 0) {
    return <div>no items found...</div>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.peopleList}>
        {people.map((p: IPeople) => (
          <PersonCard person={p} key={p.url} />
        ))}
      </section>
      <div>{children}</div>
    </main>
  );
};

export default PeopleList;
