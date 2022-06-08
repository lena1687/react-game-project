import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "../interface/pages/Main";
import { MemoryCards } from "../interface/pages/MemoryCards";
import { NotFound } from "../interface/pages/NotFound";

export const Navigation: FC = () => (
  <Routes>
    <Route index element={<Main />} />
    <Route path="memory-cards" element={<MemoryCards />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
