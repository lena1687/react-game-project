import { ThemesType } from "./ThemesType";
import { ComplexityType } from "Types/ComplexityType";

export interface OptionsType {
  userName: string;
  complexity: ComplexityType | null;
  theme: ThemesType | null;
}
