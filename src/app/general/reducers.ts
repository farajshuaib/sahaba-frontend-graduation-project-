import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { clearGeneralState, getCategories, getCollections } from "./actions";

export interface GeneralState {
  categories: Category[] | null;
  myCollections: Collection[] | null;
}

const initialState: GeneralState = {
  categories: null,
  myCollections: null,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCollections.fulfilled, (state, action) => {
      state.myCollections = action.payload?.data;
    });
    builder.addCase(clearGeneralState.fulfilled, (state, action) => {
      state.myCollections = null;
    });
  },
});

export const generalData = (state: RootState) => state.general;

export default generalSlice.reducer;
