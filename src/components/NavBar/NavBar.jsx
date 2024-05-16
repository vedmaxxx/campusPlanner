import React from "react";
import styles from "./NavBar.module.css";
import NavBarLink from "../NavBarLink/NavBarLink";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_content}>
        <NavBarLink to="/greeting">Главная</NavBarLink>
      </div>
    </nav>
  );
};

export default NavBar;
