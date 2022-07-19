import React from "react";
import styles from "./Content.sass";
import { Navigation } from "Navigation/Navigation";

export const Content = (): JSX.Element => {
  return (
    <main>
      <div className={styles.content}>
        <div className={styles.container}>
          <Navigation />
        </div>
      </div>
    </main>
  );
};
