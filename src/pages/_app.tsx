/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";

import { Sofia_Sans } from "@next/font/google";

const sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${sofia.variable} bg-wdc-dark font-sans text-white`}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
