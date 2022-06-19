import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "Pages/Main";
import { MemoryCards } from "Pages/MemoryCards";
import { NotFound } from "Pages/NotFound";

export const Navigation: FC = () => (
  <Routes>
    <Route index element={<Main />} />
    <Route path="memory-cards" element={<MemoryCards />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
