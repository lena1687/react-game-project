import React, { useState } from "react";
import styles from "./Select.sass";
import classNames from "classnames";

export interface SelectFieldOptions<Value> {
  text: string;
  value: Value;
}

interface Props<Value = string> {
  options: SelectFieldOptions<Value>[];
  topLabel?: React.ReactNode;
  placeholder: string;
}

export const Select = (props: Props) => {
  const { options = [], topLabel, placeholder } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>();

  const onOptionClick = async (value: string) => {
    console.log("-> value", value);
    await setCurrentValue(value);
    await setIsOpen(false);
  };

  const classesPanel = classNames({
    [styles.panel]: true,
    [styles.panelVisible]: isOpen,
  });

  return (
    <div className={styles.default}>
      {topLabel && <div className={styles.label}>{topLabel}</div>}
      <div className={styles.wrap}>
        <div
          className={styles.field}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {currentValue || placeholder}
        </div>
        <span className={styles.innerButton}>
          <span
            className={!isOpen ? styles.toggleButton : styles.toggleButtonOpen}
          />
        </span>
        {isOpen && (
          <div className={classesPanel}>
            {options.map(({ text, value }, index) => {
              return (
                <div
                  key={`${value}_${index}`}
                  className={styles.panelItem}
                  onClick={async () => await onOptionClick(value)}
                >
                  {text}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
