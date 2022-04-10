import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import classNames from "classnames";
import "./Button.less";

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
    button: true,
    "button--secondary": isSecondary,
    [`button--size-${size}`]: true,
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
