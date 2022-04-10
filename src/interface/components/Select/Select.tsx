import React, { useState } from "react";

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

  return (
    <div className="select">
      {topLabel && <div className="select__top-label">{topLabel}</div>}
      <div className="select__field-wrap">
        <div
          className="select__field"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {currentValue || placeholder}
        </div>
        {isOpen && (
          <div className="select__dropdown-panel">
            {options.map(({ text, value }, index) => {
              return (
                <div
                  key={`${value}_${index}`}
                  className="select__item"
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
