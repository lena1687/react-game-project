import React from "react";

interface Props {
  heading: string;
}

export const GeneralInfo = (props: Props): JSX.Element => {
  const { heading } = props;
  return (
    <>
      <div className="general-info">
        <div className="general-info__heading">{heading}</div>
        <div className="general-info__description">
          Happy to see you in the game "Memory Cards". Purpose of the game: open
          all the cards by finding the pairs.
        </div>
        <div className="general-info__note">
          Before playing, please, select the initial options.
        </div>
      </div>
    </>
  );
};
