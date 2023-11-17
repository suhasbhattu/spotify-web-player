import Providers from "@/redux/Provider";
import "./globals.css";

export const RootLayout = (props: React.PropsWithChildren) => {
  return (
    <Providers>
      <html lang="en">
        <body>{props.children}</body>
      </html>
    </Providers>
  );
};

export default RootLayout;
