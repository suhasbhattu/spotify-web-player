import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SliceState {
  accessToken: string;
  userName: string;
}

const initialState: SliceState = {
  accessToken: "",
  userName: "",
};

export const slice = createSlice({
  name: "webPlayer",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});
