import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteToken, setToken, useApi } from "hooks/useApi";

const api = useApi();

export const connectToWallet = createAsyncThunk(
  "users/connectToWallet",
  async (wallet_address: string, thunkAPI) => {
    const response = await api.post("/connect-wallet", { wallet_address });
    console.log("response",response)
    setToken(response.data.token);
    return response.data;
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  const response = await api.post("/logout");
  deleteToken();
  return response.data;
});
