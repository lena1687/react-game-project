import React from "react";
import { GeneralInfo } from "./structures/GeneralInfo";
import { Options } from "./structures/Options";
import { Button } from "../../components/Button";

function clickContinue() {
  console.log("clickContinue");
}

export const Main = (): JSX.Element => {
  return (
    <>
      <GeneralInfo heading="Hi, my friends" />
      <Button onButtonClick={clickContinue}>Continue</Button>
      <Options />
    </>
  );
};
