import { ThemesType } from "Types/ThemesType";

export interface InitialLoadingState {
  data: fetchDataMemoryCardsType;
  error: boolean;
  loading: boolean;
}

export interface fetchDataMemoryCardsType {
  id: number | null;
  text: string | null;
  value: ThemesType | null;
  images: string[];
}

export interface ImagesState {
  images: string[];
  params: {
    userName: string | null;
    theme: string | null;
    complexity: number | null;
  };
}
