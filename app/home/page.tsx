"use client";

import { useEffect } from "react";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { slice } from "@/redux/slice";
import { useDispatch, useSelector } from "@/redux/store";
import { selectUsername } from "@/redux/selectors";
import { getUserDetails, logoutUser } from "@/service/service";

import styles from "./styles.module.css";

export const HomePage = () => {
  const userName = useSelector(selectUsername);
  const dispatch = useDispatch();

  const onLogoutClick = async () => {
    await logoutUser();
    window.location.replace("/");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await getUserDetails();
      dispatch(slice.actions.setUserName(response.data.displayName));
    };
    fetchUserDetails();
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
        <h1 className="textColor font-bold text-xl">Playlists</h1>
      </div>
      <div className={`${styles.webPlayer} themeBg`}></div>
    </div>
  );
};

export default HomePage;
