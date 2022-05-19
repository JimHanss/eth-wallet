import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: NextPage = () => {
  const [t, { language }] = useTranslation('block');
  // let provider = ethers.getDefaultProvider('homestead');

  let provider = new ethers.providers.JsonRpcProvider({ url: 'http://127.0.0.1:8545' });
  const getTest = useCallback(async () => {
    try {
      const number = await provider.getBlockNumber();
      console.log('number', number);
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    getTest();
  }, [getTest]);

  // console.log('provider', provider);
  // console.log('language', t);

  return <div>{t('hello')}</div>;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const lng = await serverSideTranslations(locale, ['block']);

  return {
    props: lng,
  };
};

export default Home;
