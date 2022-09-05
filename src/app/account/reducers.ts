import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { connectToWallet } from "./actions";

export interface AccountState {
  userData?: any;
}

const initialState: AccountState = {};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(connectToWallet.fulfilled, (state, action) => {
      state.userData = action.payload.user;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = accountSlice.actions;

export const accountData = (state: RootState) => state.account;

export default accountSlice.reducer;
