import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFoundPage.module.css";

const NotFoundPage = () => (
  <div className={styles.notFound}>
    <h2>404 - Page Not Found</h2>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className={styles.homeLink}>
      Go to Home
    </Link>
  </div>
);

export default NotFoundPage;
