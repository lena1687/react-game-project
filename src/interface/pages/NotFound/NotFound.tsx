import React from "react";
import { Link, Navigate } from "react-router-dom";
import imageNotFound from "../../../assets/images/404-not-found.png";
import styles from "./NotFound.sass";

export const NotFound = (): JSX.Element => {
  return (
    <>
      <div className={styles.notFound}>
        <Link className={styles.backLink} to="/">
          Go Home
        </Link>
        <Navigate replace to="/404" />
        <div className={styles.wrap}>
          <img src={imageNotFound} alt="not-found-page" width="700px" />
        </div>
      </div>
    </>
  );
};
