import React, { ReactNode, FC } from "react";
import styles from "./OverlayFormFieldsButtons.sass";
import classNames from "classnames";

interface OverlayFormFieldsButtonsProps {
  left?: ReactNode;
  additionalLeft?: ReactNode;
  right?: ReactNode;
  isWidthLikeForm?: boolean;
}

export const OverlayFormFieldsButtons: FC<OverlayFormFieldsButtonsProps> = ({
  left,
  additionalLeft,
  right,
  isWidthLikeForm,
}) => {
  return (
    <div
      className={classNames({
        [styles.overlayFormFieldsButtons]: true,
        [styles.widthLikeForm]: isWidthLikeForm,
      })}
    >
      {(left || additionalLeft) && (
        <div className={styles.positionLeft}>
          {left}
          {additionalLeft}
        </div>
      )}
      {right}
    </div>
  );
};
