import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: NextPage = () => {
  const [t, { language }] = useTranslation('block');
  // let provider = ethers.getDefaultProvider('homestead');

  // console.log('provider', provider);
  // console.log('language', t);

  return <div>{t('hello')}haha</div>;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const lng = await serverSideTranslations(locale, ['block']);

  return {
    props: lng,
  };
};

export default Home;
