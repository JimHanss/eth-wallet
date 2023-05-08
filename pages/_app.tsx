import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

declare global {
  interface Window {
    ethereum: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    async function requestAccount() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    // 调用请求函数
    requestAccount();
  }, []);

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
      <Analytics />
    </>
  );
}

export default appWithTranslation(MyApp);
