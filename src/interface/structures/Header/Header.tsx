import React from "react";
import style from "./Header.sass";
import Logo from "./Logo.svg";

const homeEmail = "https://github.com/lena1687/react-game-project";

export const Header = (): JSX.Element => {
  return (
    <header className={style.header}>
      <div className={style.container} data-testid="header-container">
        <a className={style.logo} href="/" data-testid="header-logo-block">
          <Logo data-testid="header-logo" />
          <div className={style.logoLabel} data-testid="header-logo-label">
            Welcome to the game
          </div>
        </a>
        <a
          data-testid="header-info"
          className={style.info}
          href={homeEmail}
          target="_blank"
          rel="noreferrer"
        >
          Go to repo
        </a>
      </div>
    </header>
  );
};
