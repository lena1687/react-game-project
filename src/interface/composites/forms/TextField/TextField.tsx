import React, { useState } from "react";
import { useField } from "formik";
import styles from "./TextField.sass";
import classNames from "classnames";

interface Props {
  name: string;
  isDisabled?: boolean;
  topLabel?: string;
  sizeInput?: "small" | "medium";
  onChangeText?: (value: string) => void;
}

export const TextField: React.FunctionComponent<Props> = (
  props: Props & JSX.IntrinsicElements["input"]
) => {
  const [, meta] = useField(props);
  const { error: errorText, touched, value } = meta;
  const {
    name,
    isDisabled,
    topLabel,
    sizeInput = "medium",
    onChangeText,
  } = props;

  const inputClassNames = classNames({
    [styles.textField]: true,
    [styles.disabled]: isDisabled,
    [styles.small]: sizeInput === "small",
    [styles.error]: errorText && touched,
  });

  return (
    <div className={inputClassNames}>
      {topLabel && <div className={styles.labelTop}>{topLabel}</div>}
      <div className={styles.wrap}>
        <input
          name={name}
          value={value}
          className={styles.input}
          disabled={isDisabled}
          onChange={(event) => onChangeText && onChangeText(event.target.value)}
        />
      </div>
      {errorText && touched && (
        <div className={styles.errorLabelBottom}>{errorText}</div>
      )}
    </div>
  );
};
