import { slice } from "@/redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedPlaylist } from "@/redux/selectors";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import styles from "./styles.module.css";
import { playTrack } from "@/service/service";

export const Playlist = () => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(selectSelectedPlaylist);

  const onBackClick = () => {
    dispatch(slice.actions.setSelectedPlaylist(null));
  };

  const millisecondsToTime = (msec: number) => {
    const totalSeconds = Math.floor(msec / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const minutesText = minutes > 9 ? `${minutes}` : `0${minutes}`;
    const seconds = totalSeconds % 60;
    const secondsText = seconds > 9 ? `${seconds}` : `0${seconds}`;
    return `${minutesText}:${secondsText}`;
  };

  const onTileClick = (contextUri: string) => {
    const playSpotifyTrack = async () => {
      try {
        await playTrack(contextUri);
        dispatch(slice.actions.setIsPaused(false));
      } catch (error) {
        console.log(error);
      }
    };
    playSpotifyTrack();
  };

  const getTracksList = () => {
    return selectedPlaylist?.tracks.map((track) => {
      return (
        <div
          key={track.id}
          className={`${styles.playlistTrack} gap-4 themeBg p-2 rounded items-center`}
          onClick={() => {
            onTileClick(track.contextUri);
          }}
        >
          <Image
            className={styles.albumThumbnail}
            src={track.thumbnail}
            width={50}
            height={50}
            alt={track.albumName}
          />
          <div className={`${styles.trackName} flex flex-col gap-1`}>
            <h2 className="font-bold">{track.name}</h2>
            <span className="text-xs">{track.artists}</span>
          </div>
          <span className={`${styles.albumName} font-bold`}>
            {track.albumName}
          </span>
          <span className={`${styles.trackDuration}`}>
            {millisecondsToTime(track.duration)}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={`${styles.playlistDetails}`}>
      <button
        className={`${styles.backButton} flex flex-row gap-1 textColor`}
        onClick={onBackClick}
      >
        <ArrowLeft />
        Back
      </button>
      <div
        className={`${styles.playlistTileSection} flex flex-row m-4 gap-4 items-center justify-center`}
      >
        <Image
          src={selectedPlaylist?.thumbnail ?? ""}
          width={150}
          height={150}
          alt={selectedPlaylist?.name ?? ""}
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl textColor">
            {selectedPlaylist?.name}
          </h2>
          <span className="textColor text-sm">{`${selectedPlaylist?.tracksCount} tracks`}</span>
        </div>
      </div>
      <div className={`${styles.tracksList} flex flex-col gap-2 mx-64`}>
        {getTracksList()}
      </div>
    </div>
  );
};

export default Playlist;
