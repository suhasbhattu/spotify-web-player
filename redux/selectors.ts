import { ReduxState } from "./store";

export const selectAccessToken = (state: ReduxState) =>
  state.webPlayer.accessToken;

export const selectAccessTokenFetched = (state: ReduxState) =>
  state.webPlayer.accessTokenFetched;

export const selectUsername = (state: ReduxState) => state.webPlayer.userName;

export const selectWebPlayer = (state: ReduxState) => state.webPlayer.webPlayer;
