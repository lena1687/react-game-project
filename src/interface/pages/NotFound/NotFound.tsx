import React from "react";
import { Link } from "react-router-dom";
import imageNotFound from "../../../assets/images/404-not-found.png";
import styles from "./NotFound.sass";

export const NotFound = (): JSX.Element => {
  return (
    <div className={styles.notFound}>
      <Link className={styles.backLink} to="/">
        Go Home
      </Link>
      <div className={styles.wrap}>
        <img src={imageNotFound} alt="not-found-page" width="700px" />
      </div>
    </div>
  );
};
