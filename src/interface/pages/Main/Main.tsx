import React, { MouseEvent } from "react";
import { GeneralInfo } from "./structures/GeneralInfo";
import { Options } from "./structures/Options";
import { Button } from "../../components/Button";

function clickContinue(
  event: MouseEvent<HTMLButtonElement>,
  value: string | undefined
) {
  console.log("-> event", event);
  console.log("-> value", value);
  console.log("clickContinue");
}

export const Main = (): JSX.Element => {
  return (
    <>
      <GeneralInfo heading="Hi, my friends" />
      <Button onButtonClick={clickContinue} value="Continue">
        Continue
      </Button>
      <Options />
    </>
  );
};
