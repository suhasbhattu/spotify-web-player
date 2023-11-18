"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useDispatch, useSelector } from "@/redux/store";
import { selectAccessToken, selectWebPlayer } from "@/redux/selectors";
import { transferPlayback } from "@/service/service";
import { slice } from "@/redux/slice";

export const WebPlayer = () => {
  const accessToken = useSelector(selectAccessToken);
  const webPlayer = useSelector(selectWebPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spotify Web Player",
        getOAuthToken: (cb: any) => {
          cb(accessToken);
        },
      });

      dispatch(slice.actions.setWebPlayer(player));

      player.addListener("ready", (state: any) => {
        const transferPlaybackToThisDevice = async () => {
          await transferPlayback(state.device_id);
        };
        transferPlaybackToThisDevice();
      });

      player.connect();
    };
  }, [accessToken, dispatch]);

  return (
    <div className="flex flex-col">
      <Script src="https://sdk.scdn.co/spotify-player.js" />
    </div>
  );
};

export default WebPlayer;
