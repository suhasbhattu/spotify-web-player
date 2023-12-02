import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface WebPlayerState {
  imageUrl: string;
  trackName: string;
  artistName: string;
  totalSeconds: number;
  currentSecond: number;
  currentTime: string;
  duration: string;
  volume: number;
}

export interface PlaylistSummary {
  id: string;
  name: string;
  thumbnail: string;
  tracksCount: number;
}

export interface TrackSummary {
  id: string;
  name: string;
  artists: string;
  albumName: string;
  duration: number;
  thumbnail: string;
}

export interface Playlist extends PlaylistSummary {
  tracks: TrackSummary[];
}

interface SliceState {
  accessToken: string;
  accessTokenFetched: boolean;
  userName: string;
  isPaused: boolean;
  webPlayer: any;
  webPlayerState: WebPlayerState;
  playlists: PlaylistSummary[];
  selectedPlaylist: Playlist | null;
}

const initialState: SliceState = {
  accessToken: "",
  accessTokenFetched: false,
  userName: "",
  isPaused: true,
  webPlayer: undefined,
  webPlayerState: {
    imageUrl: "",
    trackName: "",
    artistName: "",
    totalSeconds: 0,
    currentSecond: 0,
    currentTime: "",
    duration: "",
    volume: 50,
  },
  playlists: [],
  selectedPlaylist: null,
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
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    setWebPlayer: (state, action: PayloadAction<any>) => {
      state.webPlayer = action.payload;
    },
    setWebPlayerState: (state, action: PayloadAction<WebPlayerState>) => {
      state.webPlayerState = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<string>) => {
      state.webPlayerState.currentTime = action.payload;
    },
    setCurrentSecond: (state, action: PayloadAction<number>) => {
      state.webPlayerState.currentSecond = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.webPlayerState.volume = action.payload;
    },
    setPlaylists: (state, action: PayloadAction<PlaylistSummary[]>) => {
      state.playlists = action.payload;
    },
    setSelectedPlaylist: (state, action: PayloadAction<Playlist | null>) => {
      state.selectedPlaylist = action.payload;
    },
  },
});
