import { Backdrop, ButtonBase, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { ethers } from 'ethers';
import { demo_one } from 'global/contract';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleAccountsChanged = (accounts: any) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount('');
      }
    };

    // 监听 Metamask 切换账号事件
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // 获取当前账号
    window.ethereum.request({ method: 'eth_accounts' }).then((accounts: any) => {
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount('');
      }
    });

    return () => {
      // 清除事件监听器
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const verify = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();

        const Demo = new ethers.Contract(demo_one.address, demo_one.abi, signer);

        const result = await Demo.token('football', currentAccount);

        setIsLoading(false);
        if (result) {
          router.push('/demo/success');
        } else {
          alert(`verify fail`);
        }
      } else {
        setIsLoading(false);
        alert('please install metamask');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Backdrop
        open={isLoading}
        style={{
          color: '#538fff',
          zIndex: '999',
          opacity: '0.5',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Head>
        <title>Verify</title>
      </Head>
      <Box
        display="flex"
        width="100vw"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        gap="2rem"
        flexDirection="column"
      >
        <div>入场</div>
        <div>当前address: {currentAccount}</div>
        <ButtonBase
          style={{
            width: '6.875rem',
            height: '3rem',
            borderRadius: '10px',
            backgroundColor: '#538fff',
            fontSize: '1rem',
            color: '#fff',
            padding: '0.5rem',
          }}
          onClick={verify}
        >
          验证
        </ButtonBase>
      </Box>
    </>
  );
};

export default Verify;
