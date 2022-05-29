import React from "react";
import { useField } from "formik";
import styles from "./TextField.sass";
import classNames from "classnames";

interface Props {
  name: string;
  isDisabled?: boolean;
  topLabel?: string;
  sizeInput?: "small" | "medium";
}

export const TextField: React.FunctionComponent<Props> = (
  props: Props & JSX.IntrinsicElements["input"]
) => {
  const [field, meta] = useField(props);
  const { value } = field;
  const { error: errorText, touched } = meta;
  const { isDisabled, topLabel, sizeInput = "medium" } = props;

  const inputClassNames = classNames({
    [styles.textField]: true,
    [styles.small]: sizeInput === "small",
    [styles.error]: errorText && touched,
  });

  return (
    <div className={inputClassNames}>
      {topLabel && <div className={styles.labelTop}>{topLabel}</div>}
      <div className={styles.wrap}>
        <input className={styles.input} disabled={isDisabled} value={value} />
      </div>
      {errorText && touched && (
        <div className={styles.labelBottom}>
          <span>{errorText}</span>
        </div>
      )}
    </div>
  );
};
