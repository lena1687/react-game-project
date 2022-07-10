import React, { useEffect, useState } from "react";
import styles from "./MemoryCards.sass";
import { useSelector } from "react-redux";
import { fetchDataMemoryCards } from "Slices/MemoryCardsSlice";
import { useAppDispatch } from "../../../redux/store";
import { InitialLoadingState } from "Types/MemoryCardsType";

// if (error) {
//   return <div>Error: {error.message}</div>;
// } else if (!isLoaded) {
//   return <div>Loading data</div>;
// } else {
//   );
// }

export const MemoryCards = (): JSX.Element => {
  const { error, loading, data } = useSelector(
    (state: Record<string, InitialLoadingState>) => state
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(fetchDataMemoryCards());
    promise.abort();
    console.log("-> promise", promise);
  }, [dispatch]);

  console.log("-> error, loading, data", error, loading, data);

  // const images = useSelector(
  //   (state: Record<string, InitialLoadingState>) => state.data.images
  // );
  // const { userName, themeGame } = useSelector(
  //   (state: Record<string, InitialLoadingState>) => state.data.params
  // );

  //const images = [];

  //progress
  // const progressInLocalStorage = JSON.parse(
  //   localStorage.getItem("progress") || "[]"
  // );
  // const initialProgress = images
  //   ? localStorage.getItem("progress") !== null
  //     ? progressInLocalStorage
  //     : images.map((item: string): boolean => !item)
  //   : [];
  // const [progress, setProgress] = useState<boolean[]>(initialProgress);

  // //render
  // const setImageCard = (card: string, index: number) => {
  //   return require(`Assets/data/cards/${
  //     progress[index] ? `${themeGame}/${card}` : `cardBack.jpg`
  //   }`);
  // };

  // const selectCard = () => {
  //   localStorage.setItem("progress", JSON.stringify(progress));
  // };

  return (
    <div className={styles.memoryCards}>
      {/*<div className={styles.heading}>So, {userName}</div>*/}
      <div className={styles.description}>
        Your task is to find the same pairs of cards.
      </div>
      {/*{!images && (*/}
      {/*  <div className={styles.errorMessage}>*/}
      {/*    Before playing, please, select the <a href="/">initial options</a>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{images?.length > 0 && (*/}
      {/*  <div className={styles.cardsWrap}>*/}
      {/*    {images.map((card, index) => {*/}
      {/*      return (*/}
      {/*        <img*/}
      {/*          onClick={selectCard}*/}
      {/*          src={setImageCard(card, index)}*/}
      {/*          className={styles.cardItem}*/}
      {/*          key={index}*/}
      {/*          alt={progress[index] ? card : "cardBack"}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};
