/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type AppType } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";

import { Sofia_Sans } from "@next/font/google";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const mainFont = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-main-font",
});
const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${mainFont.variable} font-wdc`}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </QueryClientProvider>
  );
};

export default MyApp;
