import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import {
  clearGeneralState,
  getCategories,
  getCollections,
  getEthPriceInUSD,
  getNotifications,
} from "./actions";
import _ from "lodash";

export interface GeneralState {
  categories: Category[] | null;
  myCollections: Collection[] | null;
  ethPrice: number | null;
  notifications: NotificationPayload;
}

const initialState: GeneralState = {
  categories: null,
  myCollections: null,
  ethPrice: null,
  notifications: {
    data: [],
    meta: null,
    links: null,
  },
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: [...state.notifications?.data, action.payload],
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCollections.fulfilled, (state, action) => {
      state.myCollections = action.payload?.data;
    });
    builder.addCase(getEthPriceInUSD.fulfilled, (state, action) => {
      state.ethPrice = action.payload.USD;
    });
    builder.addCase(clearGeneralState.fulfilled, (state, action) => {
      state.myCollections = null;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notifications = {
        meta: action.payload.meta,
        data: _.uniq([...state.notifications?.data, ...action.payload.data]),
        links: action.payload.links,
      };
    });
  },
});

export const { setNotifications } = generalSlice.actions;

export const generalData = (state: RootState) => state.general;

export default generalSlice.reducer;
