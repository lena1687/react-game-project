import React from "react";
import { Complexity } from "./Copmlexity";
import Themes from "./Themes";
import styles from "./Options.sass";

export const Options = (): JSX.Element => {
  return (
    <div className={styles.options}>
      <Complexity />
      <Themes />
    </div>
  );
};
