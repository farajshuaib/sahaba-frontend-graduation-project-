import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { getCategories } from "./actions";

export interface GeneralState {
  categories: Category[] | null;
}

const initialState: GeneralState = {
  categories: null
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const generalData = (state: RootState) => state.general;

export default generalSlice.reducer;
