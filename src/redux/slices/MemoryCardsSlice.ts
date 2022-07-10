import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialLoadingState } from "Types/MemoryCardsType";
import "Assets/data/themesMemoryCards.json";

const initialState: InitialLoadingState = {
  error: false,
  loading: false,
  data: {
    images: [""],
    params: {
      userName: null,
      themeGame: null,
      complexity: null,
    },
  },
};

export const fetchDataMemoryCards = createAsyncThunk(
  "memoryCards/getData",
  async () => {
    //return await fetch("./data/themesMemoryCards.json").then((result) => {
    //       result.json();
    //     });
    const response = await fetch("./data/themesMemoryCards.json");
    // return response.json().then((result) => {
    //   return result;
    // });
    return await response.json();
  }
);

export const MemoryCardsSlice = createSlice({
  name: "memoryCards",
  initialState,
  reducers: {
    getImages: (state, action) => {
      console.log("-> state", state);
      state.data.images = action.payload.images;
      state.data.params = action.payload.params;
      console.log("-> state", state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataMemoryCards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchDataMemoryCards.fulfilled,
      (state, action: PayloadAction<InitialLoadingState>) => {
        console.log("-> state", state);
        state.loading = false;
        state.error = false;
        state.data = action.payload.data;
        console.log("-> state", state);
        MemoryCardsSlice.caseReducers.getImages(state, action);
        console.log("-> state", state);
      }
    );

    builder.addCase(fetchDataMemoryCards.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { getImages } = MemoryCardsSlice.actions;
export const MemoryCardsReducer = MemoryCardsSlice.reducer;
