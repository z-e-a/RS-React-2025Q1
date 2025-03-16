import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = (): void => {
    navigate('/', {
      replace: true,
    });
  };

  const goBack = (): void => {
    navigate(-1);
  };

  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.window}>
      <div className={styles.wrapper}>
        <span className={styles.title}>404</span>
        <span className={styles.subtitle}>Oops! Something wrong…</span>
        {isRouteErrorResponse(error) ? (
          <p>
            <i>{error.statusText}</i>
          </p>
        ) : null}
        <div className={styles.navigation}>
          <button
            className={styles.navigation__back}
            onClick={() => {
              goBack();
            }}
          >
            Go back
          </button>
          <button
            className={styles.navigation__home}
            onClick={() => {
              goHome();
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
