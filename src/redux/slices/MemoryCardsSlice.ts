import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchDataMemoryCardsType,
  InitialLoadingState,
} from "Types/MemoryCardsType";
import "Assets/data/themesMemoryCards.json";

const initialState: InitialLoadingState = {
  error: false,
  loading: false,
  data: {
    id: null,
    text: null,
    value: null,
    images: [],
  },
};

export const fetchDataMemoryCards = createAsyncThunk(
  "memoryCards/getData",
  async () => {
    return await fetch("./data/themesMemoryCards.json").then((res) =>
      res.json()
    );
  }
);

const MemoryCardsSlice = createSlice({
  name: "memoryCards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataMemoryCards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchDataMemoryCards.fulfilled,
      (state, action: PayloadAction<fetchDataMemoryCardsType>) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchDataMemoryCards.rejected, (state) => {
      state.error = true;
    });
  },
});

export default MemoryCardsSlice.reducer;
