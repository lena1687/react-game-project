import React, { ButtonHTMLAttributes, MouseEvent } from "react";

interface Props<Value extends string | number> {
  value?: Value;
  onButtonClick: (event: MouseEvent) => void;
}

export function Button<Value extends string | number>({
  children,
  onButtonClick,
  ...props
}: Props<Value> & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className="button" onClick={onButtonClick} {...props}>
      {children}
    </button>
  );
}
