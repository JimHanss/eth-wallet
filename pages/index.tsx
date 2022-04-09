import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { useCallback, useEffect } from 'react';

const Home: NextPage = () => {
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

  console.log('provider', provider);

  return <div>ETH</div>;
};

export default Home;
