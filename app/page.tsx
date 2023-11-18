"use client";

import { Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { selectAccessToken, selectAccessTokenFetched } from "@/redux/selectors";
import { useDispatch, useSelector } from "@/redux/store";
import { getAccessToken } from "@/service/service";
import { slice } from "@/redux/slice";

import "./globals.css";

export const RootPage = () => {
  const accessToken = useSelector(selectAccessToken);
  const accessTokenFetched = useSelector(selectAccessTokenFetched);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await getAccessToken();
      dispatch(slice.actions.setAccessToken(response.data.accessToken));
      dispatch(slice.actions.setAccessTokenFetched(true));
    };
    fetchAccessToken();
  }, [dispatch]);

  useEffect(() => {
    if (accessToken.length > 0 && accessTokenFetched) {
      redirect("/home");
    }
  }, [accessToken, accessTokenFetched]);

  return (
    <Fragment>
      {accessToken.length === 0 && accessTokenFetched && (
        <div className="flex flex-col items-center justify-center gap-10 h-screen">
          <Image
            src={"/Spotify_Icon_RGB_Black.png"}
            alt="Spotify"
            width={64}
            height={64}
          />
          <Link
            href={"http://localhost:5000/auth/login"}
            className="ps-4 pe-4 pt-2 pb-2 themeBg rounded"
          >
            Login with Spotify
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default RootPage;
