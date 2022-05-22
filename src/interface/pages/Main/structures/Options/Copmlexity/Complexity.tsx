import React from "react";
import { Select } from "../../../../../components/Select";
import { COMPLEXITY_MEMORY_CARDS } from "../../../../../../consts/common";

export const Complexity = (): JSX.Element => {
  return (
    <Select
      options={COMPLEXITY_MEMORY_CARDS}
      topLabel="Difficulty level"
      placeholder="Choose the difficulty level"
    />
  );
};
