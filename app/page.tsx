"use client";

import { Fragment, useEffect } from "react";
import { selectAccessToken } from "@/redux/selectors";
import { useDispatch, useSelector } from "@/redux/store";
import { getAccessToken } from "@/service/service";
import { slice } from "@/redux/slice";
import Image from "next/image";

import "./globals.css";

export const RootPage = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await getAccessToken();
      dispatch(slice.actions.setAccessToken(response.data.accessToken));
    };
    fetchAccessToken();
  }, [dispatch]);

  return (
    <Fragment>
      {accessToken.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-10 h-screen">
          <Image
            src={"/Spotify_Icon_RGB_Black.png"}
            alt="Spotify"
            width={64}
            height={64}
          />
          <button className="ps-4 pe-4 pt-2 pb-2 themeBg rounded">Login with Spotify</button>
        </div>
      )}
    </Fragment>
  );
};

export default RootPage;
