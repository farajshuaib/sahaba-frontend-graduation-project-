import { createAsyncThunk } from "@reduxjs/toolkit";
import { useApi } from "hooks/useApi";

const api = useApi();

export const connectToWallet = createAsyncThunk(
  "users/connectToWallet",
  async (wallet_address: string, thunkAPI) => {
    const response = await api.post("/connect-wallet", { wallet_address });
    return response.data;
  }
);
