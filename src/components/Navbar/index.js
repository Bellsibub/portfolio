import { NavLink, useLocation } from 'react-router-dom';

// hooks
import { useLogout } from 'hooks/useLogout';

import styles from './Navbar.module.css';

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
  return (
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
