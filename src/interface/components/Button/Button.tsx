import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./Button.sass";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onButtonClick?: () => void;
  size?: "small" | "medium" | "large";
  isSecondary?: boolean;
  type?: "button" | "submit";
}

export function Button({
  children,
  onButtonClick,
  size = "medium",
  isSecondary = false,
  type = "button",
  ...props
}: Props): JSX.Element {
  const classes = classNames({
    [styles.button]: true,
    [styles.secondary]: isSecondary,
    [styles[size]]: true,
  });

  return (
    <button type={type} className={classes} onClick={onButtonClick} {...props}>
      {children}
    </button>
  );
}
