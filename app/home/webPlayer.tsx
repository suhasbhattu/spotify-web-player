"use client";

import { Fragment, useEffect } from "react";
import Script from "next/script";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectAccessToken,
  selectIsPaused,
  selectWebPlayer,
  selectWebPlayerState,
} from "@/redux/selectors";
import { transferPlayback } from "@/service/service";
import { WebPlayerState, slice } from "@/redux/slice";
import {
  ChevronRightCircle,
  ChevronLeftCircle,
  PauseCircle,
  PlayCircle,
  Volume1,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import Slider from "./slider";

export const WebPlayer = () => {
  const accessToken = useSelector(selectAccessToken);
  const isPaused = useSelector(selectIsPaused);
  const webPlayer = useSelector(selectWebPlayer);
  const webPlayerState = useSelector(selectWebPlayerState);
  const dispatch = useDispatch();
  const millisecondsToTime = (msec: number) => {
    const totalSeconds = Math.floor(msec / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const minutesText = minutes > 9 ? `${minutes}` : `0${minutes}`;
    const seconds = totalSeconds % 60;
    const secondsText = seconds > 9 ? `${seconds}` : `0${seconds}`;
    return `${minutesText}:${secondsText}`;
  };

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      if (accessToken.length > 0) {
        const player = new window.Spotify.Player({
          name: "Spotify Web Player",
          getOAuthToken: (cb: any) => {
            cb(accessToken);
          },
          volume: 0.2,
        });

        dispatch(slice.actions.setWebPlayer(player));

        player.addListener("not_ready", (state: any) => {
          console.log("Device ID has gone offline", state.device_id);
        });

        player.addListener("ready", (state: any) => {
          if (state.device_id) {
            const transferPlaybackToThisDevice = async () => {
              await transferPlayback(state.device_id);
            };
            transferPlaybackToThisDevice();
          }
        });

        player.addListener("player_state_changed", (state: any) => {
          if (!state) {
            return;
          }
          const currentTrack = state.track_window.current_track;
          const webPlayerCurrentState: WebPlayerState = {
            imageUrl: currentTrack.album.images[1].url,
            trackName: currentTrack.name,
            artistName: currentTrack.artists[0].name,
            totalSeconds: Math.floor(state.duration / 1000),
            currentSecond: Math.floor((state.position ?? 0) / 1000),
            currentTime: millisecondsToTime(state.position),
            duration: millisecondsToTime(state.duration),
            volume: 50,
          };
          dispatch(slice.actions.setWebPlayerState(webPlayerCurrentState));
        });

        player.connect();
      }
    };
  }, [accessToken, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        dispatch(
          slice.actions.setCurrentSecond(webPlayerState.currentSecond + 1)
        );
        dispatch(
          slice.actions.setCurrentTime(
            millisecondsToTime((webPlayerState.currentSecond + 1) * 1000)
          )
        );
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isPaused, dispatch, webPlayerState.currentSecond]);

  return (
    <div className="flex flex-row items-center h-24 justify-between gap-28 w-full">
      {webPlayer && (
        <Fragment>
          <div className="flex flex-row items-center h-24 gap-4 w-1/3">
            <Image
              src={webPlayerState.imageUrl}
              alt={webPlayerState.trackName}
              height={75}
              width={75}
            />
            <div className="flex flex-col items-center gap-2">
              <span className="font-bold text-lg">
                {webPlayerState.trackName}
              </span>
              <span>{webPlayerState.artistName}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-24 gap-1 w-1/2">
            <div className="flex flex-row items-center justify-center gap-4">
              <ChevronLeftCircle
                onClick={() => {
                  webPlayer.previousTrack();
                }}
                size={30}
              />
              {isPaused && (
                <PlayCircle
                  onClick={() => {
                    webPlayer.togglePlay();
                    dispatch(slice.actions.setIsPaused(false));
                  }}
                  size={45}
                />
              )}
              {!isPaused && (
                <PauseCircle
                  onClick={() => {
                    webPlayer.togglePlay();
                    dispatch(slice.actions.setIsPaused(true));
                  }}
                  size={45}
                />
              )}
              <ChevronRightCircle
                onClick={() => {
                  webPlayer.nextTrack();
                }}
                size={30}
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              <span>{webPlayerState.currentTime}</span>
              <Slider
                min={0}
                max={webPlayerState.totalSeconds}
                value={webPlayerState.currentSecond}
                onChange={(value) => {
                  webPlayer.seek(value * 1000);
                }}
                classNames="w-full"
              />
              <span>{webPlayerState.duration}</span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center h-24 gap-4 w-1/5">
            <Volume1
              size={30}
              onClick={() => {
                webPlayer.setVolume(0);
                dispatch(slice.actions.setVolume(0));
              }}
            />
            <Slider
              min={0}
              max={100}
              value={webPlayerState.volume}
              onChange={(volume) => {
                webPlayer.setVolume(volume / 100);
                dispatch(slice.actions.setVolume(volume));
              }}
              classNames="w-full"
            />
            <Volume2
              size={30}
              onClick={() => {
                webPlayer.setVolume(1);
                dispatch(slice.actions.setVolume(100));
              }}
            />
          </div>
        </Fragment>
      )}
      <Script src="https://sdk.scdn.co/spotify-player.js" />
    </div>
  );
};

export default WebPlayer;
