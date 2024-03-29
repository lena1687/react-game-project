import React, { useState } from "react";
import { GeneralInfo } from "./structures/GeneralInfo";
import { Button } from "Components/Button";
import { Options } from "./structures/Options";

export const Main = (): JSX.Element => {
  const [isVisibleOptions, setIsVisibleOptions] = useState(false);

  function clickContinue() {
    setIsVisibleOptions(true);
  }

  return (
    <>
      <GeneralInfo heading="Hi, my friend" />
      {!isVisibleOptions && (
        <Button
          size="large"
          data-testid="button-continue"
          onButtonClick={clickContinue}
        >
          Continue
        </Button>
      )}
      {isVisibleOptions && <Options />}
    </>
  );
};
