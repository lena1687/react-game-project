import React, { useState } from "react";
import { GeneralInfo } from "./structures/GeneralInfo";
import { Options } from "./structures/Options";
import { Button } from "../../components/Button";

export const Main = (): JSX.Element => {
  const [isVisibleOptions, setIsVisibleOptions] = useState(false);

  function clickContinue() {
    setIsVisibleOptions(true);
  }
  return (
    <>
      <GeneralInfo heading="Hi, my friends" />
      {!isVisibleOptions && (
        <Button data-testid="button-continue" onButtonClick={clickContinue}>
          Continue
        </Button>
      )}
      {isVisibleOptions && <Options />}
    </>
  );
};
