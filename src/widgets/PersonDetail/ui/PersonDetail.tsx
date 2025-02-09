import styles from './PersonDetail.module.scss';
import { IPeople } from '../../../SWApi';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PeopleDetail = () => {
  const [person, setPerson] = useState<IPeople | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

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

  const id = searchParams.get('id');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/${searchParams.get('id')}`).then(
      (response) => {
        response.json().then((person) => {
          setPerson(person);
          setIsLoading(false);
        });
      }
    );
    // })
  }, [id]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  } else if (!person) {
    return <h3>no data...</h3>;
  }

  return (
    <aside className={styles.detailContainer} data-testid="details">
      <h2 className={styles.detailCaption}>{person.name}</h2>
      <ul>
        {Object.keys(person).map((k) => {
          return (
            <li className={styles.detailEntry} key={k}>
              <span className={styles.fieldName}>{k}: </span>
              <span>{(person as unknown as Record<string, string>)[k]}</span>
            </li>
          );
        })}
        <Link
          to={backUrl.toString()}
          className={styles.closeBtn}
          title="close"
        ></Link>
      </ul>
    </aside>
  );
};

export default PeopleDetail;
