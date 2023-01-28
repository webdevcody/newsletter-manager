/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";

import { Sofia_Sans } from "@next/font/google";
import { NavBar } from "../components/NavBar";

const mainFont = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-main-font",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${mainFont.variable} bg-wdc-dark font-wdc text-white`}>
      <NavBar />
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
