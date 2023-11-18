import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SliceState {
  accessToken: string;
  accessTokenFetched: boolean;
  userName: string;
  webPlayer: any;
}

const initialState: SliceState = {
  accessToken: "",
  accessTokenFetched: false,
  userName: "",
  webPlayer: undefined,
};

export const slice = createSlice({
  name: "webPlayer",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setAccessTokenFetched: (state, action: PayloadAction<boolean>) => {
      state.accessTokenFetched = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setWebPlayer: (state, action: PayloadAction<any>) => {
      state.webPlayer = action.payload;
    },
  },
});
