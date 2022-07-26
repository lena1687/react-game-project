import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ImagesState, DataMemoryCardsState } from "Types/MemoryCardsType";
import "Assets/data/themesMemoryCards.json";
import { RootState } from "../store";
import { getAndModifyImages } from "Actions/MemoryCardsActions";

export const initialState: DataMemoryCardsState = {
  error: false,
  loading: false,
  progress: [],
  images: [],
  clicked: null,
  prevClicked: null,
  clickProcess: false,
  params: { complexity: 0, theme: "", userName: "" },
};

export const fetchDataMemoryCards = createAsyncThunk(
  "memoryCards/getData",
  async (params: ImagesState["params"]) => {
    const storageKey = getStorageKey(params);
    const currentStorageString = localStorage.getItem(storageKey);
    if (currentStorageString) {
      return JSON.parse(currentStorageString);
    } else {
      const data = await (await fetch("./data/themesMemoryCards.json")).json();
      const images = getAndModifyImages(data, params);
      const progress = Array.from(images).map(() => false);
      const newState = {
        images,
        progress,
        clicked: null,
        prevClicked: null,
        params,
      };
      localStorage.setItem(storageKey, JSON.stringify(newState));
      return newState;
    }
  }
);

export const dataMemoryCardClick = createAction<number>("click");
export const dataMemoryCardsProcess = createAction("process");
export const dataMemoryCardsReset = createAction("reset");

const MemoryCardsSlice = createSlice({
  name: "memoryCards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataMemoryCards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDataMemoryCards.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.images = action.payload.images;
      state.progress = action.payload.progress;
      state.clicked = action.payload.clicked;
      state.prevClicked = action.payload.prevClicked;
      state.params = action.payload.params;
    });
    builder.addCase(fetchDataMemoryCards.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(dataMemoryCardClick, (state, action) => {
      state.clickProcess = true;
      const currentIndex = state.clicked;
      const newIndex = action.payload;

      if (currentIndex !== null) {
        // if clicked to the same card second time
        if (newIndex === currentIndex) {
          state.clicked = null;
          state.prevClicked = null;
          state.progress[newIndex] = false;
        }
        // if clicked to another card
        else {
          state.prevClicked = currentIndex;
          state.clicked = newIndex;
          state.progress[newIndex] = true;
        }
      } else {
        // if clicked for the first time
        state.clicked = newIndex;
        state.prevClicked = null;
        state.progress[newIndex] = true;
      }
    });

    builder.addCase(dataMemoryCardsProcess, (state) => {
      state.clickProcess = false;

      if (isSecondCardClicked(state)) {
        const prevIndex = state.prevClicked as number;
        const newIndex = state.clicked as number;
        state.clicked = null;
        state.prevClicked = null;
        // if clicked to another card
        if (state.images[prevIndex] !== state.images[newIndex]) {
          state.progress[prevIndex] = false;
          state.progress[newIndex] = false;
        }
      }
      localStorage.setItem(getStorageKey(state.params), JSON.stringify(state));
    });

    builder.addCase(dataMemoryCardsReset, (state) => {
      localStorage.removeItem(getStorageKey(state.params));
    });
  },
});

function getStorageKey({
  complexity,
  theme,
  userName,
}: DataMemoryCardsState["params"]) {
  return `dataMemoryCards-${complexity}-${theme}-${userName}`;
}

export const fetchMemoryCards = (state: RootState): DataMemoryCardsState =>
  state.MemoryCards;

export const isSecondCardClicked = (state: DataMemoryCardsState): boolean =>
  state.clicked !== null && state.prevClicked !== null;

export default MemoryCardsSlice.reducer;
