import { Metadata } from "next";
import { Nunito } from "next/font/google";
import Providers from "@/redux/Provider";
import "./globals.css";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Spotify Web Player',
  description: 'The Web Player developed using Next js and Spotify Web Player SDK',
}

export const RootLayout = (props: React.PropsWithChildren) => {
  return (
    <Providers>
      <html lang="en" className={nunito.className}>
        <body>{props.children}</body>
      </html>
    </Providers>
  );
};

export default RootLayout;
