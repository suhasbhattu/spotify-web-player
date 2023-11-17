import { ReduxState } from "./store";

export const selectAccessToken = (state: ReduxState) =>
  state.webPlayer.accessToken;
