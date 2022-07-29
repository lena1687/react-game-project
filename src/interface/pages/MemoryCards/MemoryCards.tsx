import React, { useEffect, useMemo } from "react";
import styles from "./MemoryCards.sass";
import {
  fetchDataMemoryCards,
  fetchMemoryCards,
  dataMemoryCardClick,
  dataMemoryCardsReset,
} from "Slices/MemoryCardsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useSearchParams } from "react-router-dom";

export const MemoryCards = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const complexityParam = searchParams.get("complexity");
  const params = useMemo(
    () => ({
      userName: searchParams.get("userName"),
      theme: searchParams.get("theme"),
      complexity: complexityParam ? parseInt(complexityParam) : 8,
    }),
    [searchParams, complexityParam]
  );
  const { userName } = params;
  const { error, loading, images, progress, clickProcess } =
    useAppSelector(fetchMemoryCards);

  useEffect(() => {
    dispatch(fetchDataMemoryCards(params));
  }, [dispatch, params]);

  //render
  const setImageCard = (card: string, index: number) => {
    return require(`Assets/data/cards/${
      progress[index] ? `${card}` : `cardBack.jpg`
    }`);
  };

  const selectCard = (index: number) => {
    if (clickProcess) return;
    dispatch(dataMemoryCardClick(index));
  };

  const resetCards = () => {
    dispatch(dataMemoryCardsReset());
    window.location.reload();
  };

  if (error) {
    return <div>Error: data don't load</div>;
  }

  if (loading) {
    return <div>Loading data</div>;
  }

  const isFinished = progress.every((it) => it);

  return (
    <div className={styles.memoryCards}>
      <div className={styles.heading}>So, {userName}</div>
      <div>
        <span className={styles.description}>
          {isFinished
            ? "Congratulations!!!"
            : "Your task is to find the same pairs of cards."}
        </span>
        <a className={styles.resetLink} onClick={resetCards}>
          Restart a game
        </a>
      </div>

      {!images?.length && (
        <div className={styles.errorMessage}>
          Before playing, please, select the <a href="/">initial options</a>
        </div>
      )}
      {images?.length > 0 && (
        <div className={styles.cardsWrap}>
          {images.map((card, index) => {
            return (
              <img
                onClick={() => selectCard(index)}
                src={setImageCard(card, index)}
                className={styles.cardItem}
                key={index}
                alt={progress[index] ? card : "cardBack"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
