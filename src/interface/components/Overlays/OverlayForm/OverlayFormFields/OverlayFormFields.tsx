import React, { PropsWithChildren, FC } from "react";
import styles from "./OverlayFormFields.sass";

export const OverlayFormFields: FC<PropsWithChildren<Record<never, never>>> = ({
  children,
}) => {
  return <div className={styles.overlayFormFields}>{children}</div>;
};
