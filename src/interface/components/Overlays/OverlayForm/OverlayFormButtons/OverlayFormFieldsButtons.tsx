import React from "react";
import styles from "./OverlayFormFieldsButtons.sass";
import classNames from "classnames";

interface OverlayFormFieldsButtonsProps {
  children?: React.ReactNode;
  left?: React.ReactNode;
  additionalLeft?: React.ReactNode;
  right?: React.ReactNode;
  isWidthLikeForm?: boolean;
}

export function OverlayFormFieldsButtons({
  children,
  left,
  additionalLeft,
  right,
  isWidthLikeForm,
}: OverlayFormFieldsButtonsProps): JSX.Element {
  return (
    <div
      className={classNames({
        [styles.overlayFormFieldsButtons]: true,
        [styles.widthLikeForm]: isWidthLikeForm,
      })}
    >
      {(left || additionalLeft) && (
        <div className={styles.positionLeft}>
          {left && <div>{left}</div>}
          {additionalLeft && (
            <div className={styles.additionalLeft}>{additionalLeft}</div>
          )}
        </div>
      )}
      {right && <div>{right}</div>}
      {children}
    </div>
  );
}
