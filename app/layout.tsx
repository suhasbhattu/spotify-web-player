import { Nunito } from "next/font/google";
import Providers from "@/redux/Provider";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

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
