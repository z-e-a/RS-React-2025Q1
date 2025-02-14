import styles from './PersonDetail.module.scss';
import { IPeople } from '../../../SWApi';
import { Link, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../app/Contexts';
import { usePersonQuery } from '../../../app/swApi';
import Loader from '../../../shared/Loader';

const PeopleDetail = () => {
  const theme = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') ?? '0';
  const { data, isLoading } = usePersonQuery({ id });

  const person: IPeople = data ?? ({} as IPeople);

  const redusedSearchParams: URLSearchParams = new URLSearchParams();
  searchParams.forEach((v, k) => {
    if (k !== 'name' && k !== 'id') {
      redusedSearchParams.set(k, v);
    }
  });
  const backUrl = new URL(
    `search?${redusedSearchParams.toString()}`,
    window.location.origin
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={[
        styles.detailContainer,
        theme == 'light' ? styles.light : '',
      ].join(' ')}
      data-testid="container"
    >
      <h2 className={styles.detailCaption}>{person.name}</h2>
      <ul>
        {Object.keys(person).map((k) => {
          return (
            <li className={styles.detailEntry} key={k}>
              <span className={styles.fieldName}>{k}: </span>
              <span className={styles.fieldValue}>
                {(person as unknown as Record<string, string>)[k]}
              </span>
            </li>
          );
        })}
        <Link
          to={backUrl.toString()}
          className={styles.closeBtn}
          title="close"
        ></Link>
      </ul>
    </div>
  );
};

export default PeopleDetail;
