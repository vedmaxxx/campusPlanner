import React from "react";
import styles from "./NavBar.module.css";

const NavBar = ({ children }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_content}>{children}</div>
    </nav>
  );
};

export default NavBar;
