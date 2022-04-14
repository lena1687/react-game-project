import React from "react";
import styles from "./Footer.sass";

const currentYear = new Date().getFullYear();

export const Footer = (): JSX.Element => {
  return (
    <div className={styles.default}>
      <div className={styles.container}>
        <a className={styles.contacts} href="mailto:lena1687@mail.ru">
          Elena Sedelnikova
        </a>
        <div className={styles.copyright}>Copyright ©{currentYear}</div>
      </div>
    </div>
  );
};
