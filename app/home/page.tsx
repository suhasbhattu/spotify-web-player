"use client";

import { useEffect } from "react";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { slice } from "@/redux/slice";
import { useDispatch, useSelector } from "@/redux/store";
import { selectSelectedPlaylist, selectUsername } from "@/redux/selectors";
import {
  getAccessToken,
  getPlaylists,
  getUserDetails,
  logoutUser,
} from "@/service/service";
import PlaylistsList from "./playlistsList";
import WebPlayer from "./webPlayer";

import styles from "./styles.module.css";

export const HomePage = () => {
  const userName = useSelector(selectUsername);
  const selectedPlaylist = useSelector(selectSelectedPlaylist);
  const dispatch = useDispatch();

  const onLogoutClick = async () => {
    await logoutUser();
    window.location.replace("/");
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await getAccessToken();
      dispatch(slice.actions.setAccessToken(response.data.accessToken));
      dispatch(slice.actions.setAccessTokenFetched(true));
    };
    fetchAccessToken();
    const fetchUserDetails = async () => {
      const response = await getUserDetails();
      dispatch(slice.actions.setUserName(response.data.displayName));
    };
    fetchUserDetails();
    const getUsersPlaylists = async () => {
      const response = await getPlaylists();
      dispatch(slice.actions.setPlaylists(response.data.items));
    };
    getUsersPlaylists();
  }, [dispatch]);

  return (
    <div className={styles.homePage}>
      <div className={`${styles.header} themeBg`}>
        <div className="flex flex-row items-center gap-4">
          <Image
            src={"/Spotify_Icon_RGB_White.png"}
            alt="Spotify"
            height={35}
            width={35}
          />
          <h1 className={styles.heading}>Spotify Web Player</h1>
        </div>
        <div
          className={`${styles.dropdownIcon} flex flex-row items-center gap-4`}
        >
          <h2 className="font-bold">{userName}</h2>
          <div className={`${styles.separator}`}></div>
          <LogOutIcon className="cursor-pointer" onClick={onLogoutClick} />
        </div>
      </div>
      <div className={styles.content}>
        {selectedPlaylist === null && <PlaylistsList />}
      </div>
      <div className={`${styles.webPlayer} themeBg`}>
        <WebPlayer />
      </div>
    </div>
  );
};

export default HomePage;
