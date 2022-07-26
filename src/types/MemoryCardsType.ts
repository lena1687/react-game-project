import { ThemesType } from "Types/ThemesType";

export interface DataMemoryCardsState {
  error: boolean;
  loading: boolean;
  progress: boolean[];
  images: string[];
  clicked: number | null;
  prevClicked: number | null;
  clickProcess: boolean;
  params: ImagesState["params"];
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
