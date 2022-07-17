import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import MemoryCardsSlice from "Slices/MemoryCardsSlice";

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const store = configureStore({
  reducer: {
    MemoryCardsSlice,
  },
});
