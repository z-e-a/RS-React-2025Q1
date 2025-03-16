import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <NavLink className={styles.navlink} to={'/home'}>
          Home
        </NavLink>
        <NavLink className={styles.navlink} to={'/uncontrolled'}>
          Uncontrolled form
        </NavLink>
        <NavLink className={styles.navlink} to={'/controlled'}>
          React Hook form
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
