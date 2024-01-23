import React, { useContext } from "react";

import styles from "./Footer.module.css";
import { useViewport } from "hooks/useViewport";

const Footer = ({ modal }) => {
  const { width } = useViewport();
  const breakpoint = 725;
  if (modal) {
    return <footer className={styles.container + ' ' + styles.modal}></footer>;
  } else {
    return width > breakpoint ? (
      <></>
    ) : (
      <footer className={styles.container}></footer>
    );
  }
};

export default Footer;
