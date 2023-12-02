import { useDispatch, useSelector } from "react-redux";
import { slice } from "@/redux/slice";
import { selectPlaylists } from "@/redux/selectors";
import Image from "next/image";
import { getPlaylistById } from "@/service/service";

import styles from "./styles.module.css";

export const PlaylistsList = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);

  const onPlaylistClick = (id: string) => {
    const getPlaylistDetails = async () => {
      const response = await getPlaylistById(id);
      dispatch(slice.actions.setSelectedPlaylist(response.data));
    };
    getPlaylistDetails();
  };

  const getPlaylistsTile = () => {
    const tiles = playlists?.map((playlist) => {
      return (
        <div
          key={playlist.id}
          className={`${styles.playlistTile} flex flex-col gap-1 p-3`}
          onClick={() => {
            onPlaylistClick(playlist.id);
          }}
        >
          <Image
            src={playlist.thumbnail}
            width={200}
            height={200}
            alt={playlist.name}
          />
          <h1 className={`${styles.heading} truncate`}>{playlist.name}</h1>
          <span className="truncate text-xs">{`${playlist.tracksCount} tracks`}</span>
        </div>
      );
    });
    return <div className="flex flex-row flex-wrap gap-8 m-4">{tiles}</div>;
  };

  return (
    <div>
      <h1 className="textColor font-bold text-xl">Playlists</h1>
      {getPlaylistsTile()}
    </div>
  );
};

export default PlaylistsList;
