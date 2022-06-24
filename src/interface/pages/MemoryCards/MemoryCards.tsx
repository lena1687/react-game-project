import React from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./MemoryCards.sass";
import { ThemesType } from "Types/ThemesType";

export const MemoryCards = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("userName");
  const themeGame = searchParams.get("theme");
  const complexity = searchParams.get("complexity");
  const cardsData = JSON.parse(localStorage.getItem("setOfImages") || "[]");
  console.log("-> cardsData", cardsData);
  const { images } = cardsData.find(
    ({ value }: { value: ThemesType }) => value === themeGame
  );
  const newSetOfCards: Array<string> = initSetOfCards();

  function initSetOfCards() {
    const uniqueCards = complexity ? parseInt(complexity) / 2 : null;
    const randomAndSortArray = images
      .sort(() => 0.5 - Math.random())
      .slice(0, uniqueCards);
    return [...randomAndSortArray, ...randomAndSortArray].sort(
      () => Math.random() - 0.5
    );
  }

  return (
    <div className={styles.memoryCards}>
      <div className={styles.heading}>Let's go, {userName}</div>
      <div className={styles.wrap}>
        {newSetOfCards.map((card, index) => {
          return (
            <img
              src={require(`Assets/data/cards/${themeGame}/${card}`)}
              className={styles.cardItem}
              key={index}
              alt={card}
            />
          );
        })}
      </div>
    </div>
  );
};
