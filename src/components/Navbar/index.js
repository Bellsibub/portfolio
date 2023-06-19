import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// hooks
import { useLogout } from "hooks/useLogout";

import styles from "./Navbar.module.css";
import { useViewport } from "hooks/useViewport";
import { useEffect, useState } from "react";
import { getNextPage } from "utils/PageDirection";

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
  const [pathname, setPathname] = useState("");
  const { width } = useViewport();
  const breakpoint = 725;

  const formatPathname = (pathname) => {
    return pathname === "/" ? "-^^-" : pathname.replace("/", "");
  };

  useEffect(() => {
    setPathname(formatPathname(location.pathname));
  }, [location]);

  return width < breakpoint ? (
    <ul className={styles.contents}>
      <NavigationLink to="quests">
        <FontAwesomeIcon icon={solid("book-open")} />
        Quests
      </NavigationLink>
      <NavigationLink to="skills">
        <FontAwesomeIcon icon={solid("code-branch")} />
        Skills
      </NavigationLink>
      <NavigationLink to="/">
        <FontAwesomeIcon icon={solid("house")} />
        Home
      </NavigationLink>
      <NavigationLink to="equipment">
        <FontAwesomeIcon icon={solid("suitcase")} />
        Equipment
      </NavigationLink>
      <NavigationLink to="character">
        <FontAwesomeIcon icon={solid("user")} />
        Character
      </NavigationLink>
    </ul>
  ) : (
    <ul className={styles.contents}>
      <NavigationLink to="quests">Quests</NavigationLink>
      <NavigationLink to="skills">Skills</NavigationLink>
      <NavigationLink to="/">Home</NavigationLink>
      <NavigationLink to="equipment">Equipment</NavigationLink>
      <NavigationLink to="character">Character</NavigationLink>
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

      <button style={{ marginLeft: "auto" }} onClick={logout}>
        Logout
      </button>
    </ul>
  );
};

const Navbar = () => {
  let location = useLocation();

  let showAdmin = location.pathname.includes("admin");

  return (
    <nav className={styles.wrapper}>
      {showAdmin ? <AdminLinks /> : <MainApplicationLinks />}
    </nav>
  );
};

export default Navbar;
