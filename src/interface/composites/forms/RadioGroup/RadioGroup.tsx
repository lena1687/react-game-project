import React from "react";
import classNames from "classnames";
import styles from "./RadioGroup.sass";
import { useField } from "formik";

type RadioFieldType = string | number;

export interface RadioGroupOptions {
  id: number;
  text: string;
  value: RadioFieldType;
}

interface Props {
  options: RadioGroupOptions[];
  heading?: string;
  name: string;
  sizeRadio?: "small" | "medium";
  direction?: "row" | "column";
  onRadioSelect?: (value: RadioFieldType) => void;
}

export const RadioGroup: React.FunctionComponent<Props> = (
  props: Props & JSX.IntrinsicElements["input"]
) => {
  const [, meta, helpers] = useField(props);
  const { error: errorText, touched } = meta;
  const { setValue } = helpers;
  const {
    options,
    heading,
    name,
    sizeRadio = "medium",
    direction = "row",
  } = props;

  const classesDirection = classNames({
    [styles.items]: true,
    [styles.itemsColumn]: direction === "column",
  });

  const labelClasses = classNames({
    [styles.radio]: true,
    [styles[sizeRadio]]: true,
  });

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    await setValue(eventValue);
  };

  return (
    <>
      <div className={styles.radioGroup}>
        {heading && <div className={styles.heading}>{heading}</div>}
        <div className={classesDirection}>
          {options.map(({ id, value, text }) => (
            <div key={id}>
              <label className={labelClasses}>
                <input
                  type="radio"
                  name={name}
                  value={value}
                  onChange={onChange}
                />
                <span className={styles.control} />
                <span className={styles.textLabel}>{text}</span>
              </label>
            </div>
          ))}
        </div>
        {errorText && touched && (
          <div className={styles.errorLabelBottom}>{errorText}</div>
        )}
      </div>
    </>
  );
};
