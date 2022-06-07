import React, { ReactChild } from "react";
import { Main } from "../interface/pages/Main";
import { MemoryCards } from "../interface/pages/MemoryCards";
import { NotFound } from "../interface/pages/NotFound";

interface IRoute {
  path: string;
  component: ReactChild;
}

export const mainRoutes: IRoute[] = [
  { path: "/", component: <Main /> },
  { path: "/memory-cards", component: <MemoryCards /> },
  { path: "*", component: <NotFound /> },
];
