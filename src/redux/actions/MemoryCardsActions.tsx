import { fetchDataMemoryCardsType, ImagesState } from "Types/MemoryCardsType";

export const getAndModifyImages = (
  data: fetchDataMemoryCardsType[],
  params: ImagesState["params"]
) => {
  if (data?.length && Object.keys(params).length > 0) {
    const { theme, complexity } = params;
    const cardDataTheme = data.find(({ value }) => value === theme);
    const copyData = cardDataTheme?.images
      ? [...cardDataTheme.images.map((card) => `${theme}/${card}`)]
      : [];

    const initSetOfCards = (): string[] => {
      const uniqueCards = complexity ? complexity / 2 : undefined;
      const randomAndSortArray = copyData
        .sort(() => 0.5 - Math.random())
        .slice(0, uniqueCards);
      return [...randomAndSortArray, ...randomAndSortArray].sort(
        () => Math.random() - 0.5
      );
    };

    return initSetOfCards();
  }
  return [];
};
