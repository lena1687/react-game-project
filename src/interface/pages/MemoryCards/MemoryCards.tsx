import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./MemoryCards.sass";
import { ThemesType } from "Types/ThemesType";

export const MemoryCards = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("userName");
  const themeGame = searchParams.get("theme");
  const complexity = searchParams.get("complexity");

  //cardsData
  const cardsData = JSON.parse(localStorage.getItem("setOfImages") || "[]");
  const cardDataTheme = cardsData.find(
    ({ value }: { value: ThemesType }) => value === themeGame
  );
  const { images } = cardDataTheme ? cardDataTheme : { images: null };
  const newSetOfCards: Array<string> = images ? initSetOfCards() : [];

  function initSetOfCards() {
    const uniqueCards = complexity ? parseInt(complexity) / 2 : null;
    const randomAndSortArray = images
      .sort(() => 0.5 - Math.random())
      .slice(0, uniqueCards);
    return [...randomAndSortArray, ...randomAndSortArray].sort(
      () => Math.random() - 0.5
    );
  }

  //progress
  const initialProgress = images
    ? localStorage.getItem("progress") !== null
      ? JSON.parse(localStorage.getItem("progress") || "[]")
      : images.map((item: string): boolean => !item)
    : [];
  const [progress, setProgress] = useState<boolean[]>(initialProgress);
  console.log("-> const progress", progress);

  //render
  const setImageCard = (card: string, index: number) => {
    if (progress[index]) {
      return require(`Assets/data/cards/${themeGame}/${card}`);
    } else {
      return require(`Assets/data/cards/cardBack.jpg`);
    }
  };

  const selectCard = () => {
    localStorage.setItem("progress", JSON.stringify(progress));
  };

  return (
    <div className={styles.memoryCards}>
      <div className={styles.heading}>So, {userName}</div>
      <div className={styles.description}>
        Your task is to find the same pairs of cards.
      </div>
      {!images && (
        <div className={styles.errorMessage}>
          Before playing, please, select the <a href="/">initial options</a>
        </div>
      )}
      {images?.length > 0 && (
        <div className={styles.cardsWrap}>
          {newSetOfCards.map((card, index) => {
            return (
              <img
                onClick={selectCard}
                src={setImageCard(card, index)}
                className={styles.cardItem}
                key={index}
                alt={card}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
