import { getCategories, getEthPriceInUSD } from "./../general/actions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearGeneralState, getCollections } from "app/general/actions";
import { deleteToken, setToken, useApi } from "hooks/useApi";
import { getFCMToken } from "firebase";

const api = useApi();

export const connectToWallet = createAsyncThunk(
  "users/connectToWallet",
  async (wallet_address: string, thunkAPI) => {
    const FCM_token = await getFCMToken();
    const response = await api.post("/connect-wallet", {
      wallet_address,
      fcm_token: FCM_token,
    });
    if (response?.data?.token) {
      setToken(response.data.token);
    }
    thunkAPI.dispatch(getCollections());
    return response.data;
  }
);

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  const response = await api.post("/logout");
  localStorage.clear();
  deleteToken();
  thunkAPI.dispatch(clearGeneralState());
  return response.data;
});
