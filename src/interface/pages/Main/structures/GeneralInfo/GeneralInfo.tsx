import React from "react";
import styles from "./GeneralInfo.sass";

interface Props {
  heading: string;
}

export const GeneralInfo = (props: Props): JSX.Element => {
  const { heading } = props;
  return (
    <div className={styles.generalInfo}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.description}>
        Happy to see you in the game "Memory Cards". Purpose of the game: open
        all the cards by finding the pairs.
      </div>
    </div>
  );
};
