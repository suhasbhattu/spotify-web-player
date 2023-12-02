import { Fragment } from "react";
import { slice } from "@/redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedPlaylist } from "@/redux/selectors";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export const Playlist = () => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector(selectSelectedPlaylist);

  const onBackClick = () => {
    dispatch(slice.actions.setSelectedPlaylist(null));
  };

  const getTracksList = () => {
    return selectedPlaylist?.tracks.map((track) => {
      return (
        <div key={track.id} className="flex flex-row gap-4 themeBg p-2 rounded items-center">
          <Image
            src={track.thumbnail}
            width={50}
            height={50}
            alt={track.albumName}
          />
          <div className="flex flex-col gap-1">
            <h2>{track.name}</h2>
            <span className="text-xs">{track.artists}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <button className="flex flex-row gap-1 textColor" onClick={onBackClick}>
        <ArrowLeft />
        Back
      </button>
      <div className="flex flex-row m-4 gap-4 items-center">
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
      <div className="flex flex-col gap-4">{getTracksList()}</div>
    </Fragment>
  );
};

export default Playlist;
