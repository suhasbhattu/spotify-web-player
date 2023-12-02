import { ReduxState } from "./store";

export const selectAccessToken = (state: ReduxState) =>
  state.webPlayer.accessToken;

export const selectAccessTokenFetched = (state: ReduxState) =>
  state.webPlayer.accessTokenFetched;

export const selectUsername = (state: ReduxState) => state.webPlayer.userName;

export const selectIsPaused = (state: ReduxState) => state.webPlayer.isPaused;

export const selectWebPlayer = (state: ReduxState) => state.webPlayer.webPlayer;

export const selectWebPlayerState = (state: ReduxState) =>
  state.webPlayer.webPlayerState;

export const selectPlaylists = (state: ReduxState) => state.webPlayer.playlists;

export const selectSelectedPlaylist = (state: ReduxState) =>
  state.webPlayer.selectedPlaylist;
