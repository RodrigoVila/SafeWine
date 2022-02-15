import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress color="#722f37" />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
