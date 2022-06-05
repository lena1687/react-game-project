import React, { useState } from "react";
import styles from "./Select.sass";
import classNames from "classnames";
import { useField } from "formik";

export interface SelectFieldOptions {
  text: string;
  value: string | number;
}

interface Props {
  name: string;
  options: SelectFieldOptions[];
  topLabel?: React.ReactNode;
  placeholder: string;
  onOptionSelect?: (value: string | number) => void;
}

export const Select: React.FunctionComponent<Props> = (props: Props) => {
  const [, meta, helpers] = useField(props);
  const { error: errorText, touched } = meta;
  const { setValue } = helpers;
  const { options = [], topLabel, placeholder, onOptionSelect } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string | number>();

  const onOptionClick = async (value: string | number) => {
    await setCurrentValue(value);
    await setValue(value);
    await setIsOpen(false);
    onOptionSelect && onOptionSelect(value);
  };

  const classesPanel = classNames({
    [styles.panel]: true,
    [styles.panelVisible]: isOpen,
  });

  return (
    <div
      className={classNames({
        [styles.select]: true,
        [styles.error]: errorText && touched,
      })}
    >
      {topLabel && <div className={styles.label}>{topLabel}</div>}
      <div className={styles.wrap}>
        <div
          className={styles.fieldWrap}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className={styles.field}>{currentValue || placeholder}</div>
          <span className={styles.innerButton}>
            <span
              className={
                !isOpen ? styles.toggleButton : styles.toggleButtonOpen
              }
            />
          </span>
        </div>
        {isOpen && (
          <div className={classesPanel}>
            {options.map(({ text, value }) => {
              return (
                <div
                  key={`${value}`}
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
      {errorText && touched && (
        <div className={styles.errorLabelBottom}>{errorText}</div>
      )}
    </div>
  );
};
