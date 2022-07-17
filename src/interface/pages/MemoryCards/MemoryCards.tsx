import React, { useEffect, useState } from "react";
import styles from "./MemoryCards.sass";
import { useSelector } from "react-redux";
import { fetchDataMemoryCards } from "Slices/MemoryCardsSlice";
import { useAppDispatch } from "../../../redux/store";
import { InitialLoadingState } from "Types/MemoryCardsType";
import { getAndModifyImages } from "Actions/MemoryCardsActions";
import { useSearchParams } from "react-router-dom";

export const MemoryCards = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const complexityParam = searchParams.get("complexity");
  const params = {
    userName: searchParams.get("userName"),
    theme: searchParams.get("theme"),
    complexity: complexityParam ? parseInt(complexityParam) : 8,
  };
  const { userName, theme, complexity } = params;
  const { error, loading, data } = useSelector(
    (state: Record<string, InitialLoadingState>) => state.MemoryCardsSlice
  );

  useEffect(() => {
    dispatch(fetchDataMemoryCards());
  }, [dispatch]);

  const loadImages = () => {
    if (data && Array.isArray(data)) {
      return getAndModifyImages(data, params);
    } else {
      return { images: [], params: {} };
    }
  };

  const dataCurrentGame = loadImages() || {
    images: [""],
  };
  const { images } = dataCurrentGame;
  console.log("-> images, params", images, userName, complexity, theme);

  //progress
  const progressInLocalStorage = JSON.parse(
    localStorage.getItem("progress") || "[]"
  );
  const initialProgress = images
    ? localStorage.getItem("progress") !== null
      ? progressInLocalStorage
      : images.map((item: string): boolean => !item)
    : [];
  const [progress, setProgress] = useState<boolean[]>(initialProgress);

  //render
  const setImageCard = (card: string, index: number) => {
    return require(`Assets/data/cards/${
      progress[index] ? `${theme}/${card}` : `cardBack.jpg`
    }`);
  };

  const selectCard = () => {
    localStorage.setItem("progress", JSON.stringify(progress));
  };

  return (
    <>
      {error && <div>Error: data don't load</div>}
      {loading && <div>Loading data</div>}
      {!error && !loading && (
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
              {images.map((card, index) => {
                return (
                  <img
                    onClick={selectCard}
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
      )}
    </>
  );
};
