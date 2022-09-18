import { createAsyncThunk } from "@reduxjs/toolkit";
import {  useApi } from "hooks/useApi";

const api = useApi();

export const getCategories = createAsyncThunk(
  "general/getCategories",
  async () => {
    const response = await api.get("/categories");
    return response.data;
  }
);

