import React from "react";
import styles from "./OverlayFormFields.sass";

interface OverlayFormFieldsProps {
  children?: React.ReactNode;
}

export function OverlayFormFields({
  children,
}: OverlayFormFieldsProps): JSX.Element {
  return <div className={styles.overlayFormFields}>{children}</div>;
}
