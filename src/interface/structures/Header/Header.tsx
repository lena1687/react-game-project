import React from "react";
import style from "./Header.sass";
import Logo from "../../components/Icons/Logo.svg";

const homeEmail = "https://github.com/lena1687/react-game-project";

export const Header = (): JSX.Element => {
  return (
    <header className={style.default}>
      <div className={style.container}>
        <a className={style.logo} href="/">
          <Logo />
          <div className={style.logoLabel}>Welcome to the game</div>
        </a>
        <a
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
