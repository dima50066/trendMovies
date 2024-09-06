import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navigation.module.css";

const Navigation = () => (
  <nav className={styles.navigation}>
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
      }
    >
      Home
    </NavLink>
    <NavLink
      to="/movies"
      className={({ isActive }) =>
        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
      }
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
