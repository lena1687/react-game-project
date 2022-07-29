import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import MemoryCardsSlice from "Slices/MemoryCardsSlice";
import { AppStore, RootState } from "../redux/store";
import { dataMemoryCardClickSaga } from "../redux/sagas/memoryCardSaga";
import createSagaMiddleware from "redux-saga";
import mock = jest.mock;

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const sagaMiddleware = createSagaMiddleware();

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { MemoryCards: MemoryCardsSlice },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: true }).concat(sagaMiddleware),
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  sagaMiddleware.run(dataMemoryCardClickSaga);
  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function mockLocalStorage(): Map<string, string> {
  const mapData = new Map();
  jest.spyOn(Storage.prototype, "setItem");
  jest.spyOn(Storage.prototype, "getItem");
  jest.spyOn(Storage.prototype, "removeItem");
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();
  const removeItemMock = jest.fn();
  setItemMock.mockImplementation(mapData.set.bind(mapData));
  getItemMock.mockImplementation(mapData.get.bind(mapData));
  removeItemMock.mockImplementation(mapData.delete.bind(mapData));
  Storage.prototype.setItem = setItemMock;
  Storage.prototype.getItem = getItemMock;
  Storage.prototype.removeItem = removeItemMock;
  return mapData;
}
