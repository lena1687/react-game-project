import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import classNames from "classnames";
import styles from "./Button.sass";

interface Props<Value extends string | number> {
  value?: Value;
  onButtonClick: (event: MouseEvent<HTMLButtonElement>, value?: Value) => void;
  size?: "small" | "medium" | "large";
  isSecondary?: boolean;
}

export function Button<Value extends string | number>({
  children,
  value,
  onButtonClick,
  size = "medium",
  isSecondary = false,
  ...props
}: Props<Value> & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = classNames({
    [styles.default]: true,
    [styles.secondary]: isSecondary,
    [styles[size]]: true,
  });

  return (
    <button
      type="button"
      className={classes}
      onClick={(event) => onButtonClick(event, value)}
      {...props}
    >
      {children}
    </button>
  );
}
