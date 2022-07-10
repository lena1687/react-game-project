import { ImagesState } from "Types/MemoryCardsType";
import { fetchDataMemoryCards, getImages } from "Slices/MemoryCardsSlice";

type resultType = { payload: ImagesState; type: string };

export function getAndModifyImages(): resultType {
  // const data = fetchDataMemoryCards();
  // console.log("-> data", data);
  //const data = getImages();
  // const complexity = searchParams.get("complexity");
  // const params = {
  //   userName: searchParams.get("userName"),
  //   themeGame: searchParams.get("theme"),
  //   complexity: complexity ? parseInt(complexity) : 8,
  // };
  //
  // const cardsData = JSON.parse(localStorage.getItem("setOfImages") || "[]");
  // const cardDataTheme = cardsData.find(
  //   ({ value }: { value: ThemesType }) => value === params.themeGame
  // );
  //
  // function initSetOfCards() {
  //   const uniqueCards = params.complexity / 2;
  //   const randomAndSortArray = cardDataTheme.images
  //     .sort(() => 0.5 - Math.random())
  //     .slice(0, uniqueCards);
  //   return [...randomAndSortArray, ...randomAndSortArray].sort(
  //     () => Math.random() - 0.5
  //   );
  // }
  //
  // return setImages({
  //   images: initSetOfCards(),
  //   params,
  // });
}
