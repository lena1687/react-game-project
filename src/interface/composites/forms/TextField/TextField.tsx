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
  const [, meta, helpers] = useField(props);
  const { error: errorText, touched, value } = meta;
  const { setValue } = helpers;
  const { isDisabled, topLabel, sizeInput = "medium", onChangeText } = props;
  const [currentInputValue, setCurrentInputValue] = useState(() => value);

  const inputClassNames = classNames({
    [styles.textField]: true,
    [styles.small]: sizeInput === "small",
    [styles.error]: errorText && touched,
  });

  const onChangeValue = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    await setValue(eventValue);
    if (onChangeText) {
      setCurrentInputValue(onChangeText(eventValue));
    } else setCurrentInputValue(eventValue);
    event.preventDefault();
  };

  return (
    <div className={inputClassNames}>
      {topLabel && <div className={styles.labelTop}>{topLabel}</div>}
      <div className={styles.wrap}>
        <input
          className={styles.input}
          disabled={isDisabled}
          onChange={onChangeValue}
          value={currentInputValue}
        />
      </div>
      {errorText && touched && (
        <div className={styles.errorLabelBottom}>{errorText}</div>
      )}
    </div>
  );
};
