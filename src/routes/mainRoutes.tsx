import { ComponentType } from "react";
import { Main } from "../interface/pages/Main";
import { MemoryCards } from "../interface/pages/MemoryCard";

interface IRoute {
  path: string;
  component: ComponentType;
}

export const mainRoutes: IRoute[] = [
  { path: "/", component: Main },
  { path: "/memory-cards", component: MemoryCards },
];
