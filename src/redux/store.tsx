import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { MemoryCardsReducer } from "Slices/MemoryCardsSlice";

export const store = configureStore({ reducer: MemoryCardsReducer });
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
