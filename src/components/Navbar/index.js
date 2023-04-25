import { Link, NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
// hooks
import { useLogout } from 'hooks/useLogout';

import styles from './Navbar.module.css';
import { useViewport } from 'hooks/useViewport';
import { useEffect, useState } from 'react';
import { getNextPage } from 'utils/PageDirection';

const NavigationLink = ({ children, ...props }) => {
  return (
    <li>
      <NavLink
        {...props}
        // reloadDocument
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        {children}
      </NavLink>
    </li>
  );
};

const MainApplicationLinks = () => {
  let location = useLocation();
  const [pathname, setPathname] = useState('');
  const { width } = useViewport();
  const breakpoint = 725;

  const formatPathname = (pathname) => {
    return pathname === '/' ? '-^^-' : pathname.replace('/', '');
  };

  useEffect(() => {
    setPathname(formatPathname(location.pathname));
  }, [location]);

  return width < breakpoint ? (
    <ul className={styles.mobileContents}>
      <Link className={styles.directionalLink} to={getNextPage(location.pathname, -1) || '/'}>
        <FontAwesomeIcon icon={solid('caret-left')} />
      </Link>
      <li className={styles.current}>{pathname.toUpperCase()}</li>
      <Link className={styles.directionalLink} to={getNextPage(location.pathname, 1) || '/'}>
        <FontAwesomeIcon icon={solid('caret-right')} />
      </Link>
    </ul>
  ) : (
    <ul className={styles.contents}>
      <NavigationLink to="quests">Quests</NavigationLink>
      <NavigationLink to="skills">Skills</NavigationLink>
      <NavigationLink to="/">Home</NavigationLink>
      <NavigationLink to="character">Character</NavigationLink>
      <NavigationLink to="contact">Contact</NavigationLink>
    </ul>
  );
};

const AdminLinks = () => {
  const { logout } = useLogout();
  return (
    <ul className={styles.contentsAdmin}>
      <NavigationLink to="/admin" end>
        Home
      </NavigationLink>
      <NavigationLink to="profile">Profile</NavigationLink>
      <NavigationLink to="Projects">Projects</NavigationLink>
      <NavigationLink to="skills">Skills</NavigationLink>
      <NavigationLink to="equipment">Equipment</NavigationLink>

      <button style={{ marginLeft: 'auto' }} onClick={logout}>
        Logout
      </button>
    </ul>
  );
};

const Navbar = () => {
  let location = useLocation();

  let showAdmin = location.pathname.includes('admin');

  return (
    <nav className={styles.wrapper}>
      {showAdmin ? <AdminLinks /> : <MainApplicationLinks />}
    </nav>
  );
};

export default Navbar;
