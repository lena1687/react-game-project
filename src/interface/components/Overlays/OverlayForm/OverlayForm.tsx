import React from "react";
import styles from "./OverlayForm.sass";

interface OverlayFormProps {
  heading?: React.ReactNode;
  subHeading?: React.ReactNode;
  children?: React.ReactNode;
}

export function OverlayForm({
  heading,
  subHeading,
  children,
}: OverlayFormProps): JSX.Element {
  return (
    <div className={styles.overlayForm}>
      {heading && <div className={styles.heading}>{heading}</div>}
      {subHeading && <div className={styles.subHeading}>{subHeading}</div>}
      {children}
    </div>
  );
}
