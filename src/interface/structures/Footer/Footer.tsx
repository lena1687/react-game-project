import React from "react";

const homeEmail = "https://github.com/lena1687/react-game-project";
const currentYear = new Date().getFullYear();

export const Footer = (): JSX.Element => {
  return (
    <div>
      <span>
        Copyright ©{currentYear} <a href={homeEmail}>Elena Sedelnikova</a>
      </span>
    </div>
  );
};
