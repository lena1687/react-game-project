import React from "react";
import classNames from "classnames";
import styles from "./RadioGroup.sass";

export interface RadioGroupOptions<Value> {
  id: number;
  text: string;
  value: Value;
}

interface Props<Value = string> {
  options: RadioGroupOptions<Value>[];
  heading?: string;
  name: string;
  sizeRadio?: "small" | "medium";
  direction?: "row" | "column";
}

export const RadioGroup: React.FunctionComponent<Props> = (props: Props) => {
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

  const onChange = async (event: any) => {
    const eventValue = event.target.value;
    console.log("-> eventValue", eventValue);
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
      </div>
    </>
  );
};
