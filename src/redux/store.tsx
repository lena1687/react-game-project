import {
  configureStore,
  combineReducers,
  PreloadedState,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import MemoryCardsSlice from "Slices/MemoryCardsSlice";
import createSagaMiddleware from "redux-saga";
import { dataMemoryCardClickSaga } from "./sagas/memoryCardSaga";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  MemoryCards: MemoryCardsSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: true }).concat(sagaMiddleware),
    preloadedState,
  });
  sagaMiddleware.run(dataMemoryCardClickSaga);
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
