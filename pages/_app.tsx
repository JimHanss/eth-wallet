import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Demo</title>
        {/* <title>Explorer | Sui</title> */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:title" content="My page title" key="title" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
