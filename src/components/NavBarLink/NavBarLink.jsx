import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBarLink.module.css";

const NavBarLink = ({ to, children }) => {
  return (
    <Link className={styles.link} to={to}>
      {children}
    </Link>
  );
};

export default NavBarLink;
