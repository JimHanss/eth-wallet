import {
  Autocomplete,
  Backdrop,
  Box,
  ButtonBase,
  Checkbox,
  CircularProgress,
  InputBase,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ethers } from 'ethers';
import React, { useState } from 'react';
import { demo_one } from '../../global/contract';
import _ from 'lodash';
import Head from 'next/head';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const useStyles = makeStyles(() => ({
  input: {
    borderRadius: '10px',
    border: 'solid 1px #e4e7eb',
    height: '3.5rem',
    width: '100%',
    paddingLeft: '1.25rem',
    fontFamily: 'NotoSans-Medium',
    fontSize: '1rem',
    color: '#2e4469',
  },
  tagButton: () => ({
    width: '6.875rem',
    height: '3rem',
    borderRadius: '10px',
    backgroundColor: '#538fff',
    fontSize: '1rem',
    color: '#fff',
    padding: '0.5rem',
  }),
}));

function Demo1() {
  // const classes = useStyles();
  const [allTags, setAllTags] = useState([]);
  const [tag, setTag] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [selectAddress, setSelectAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const hi = async () => {
  //       try {
  //         const { ethereum } = window

  //         if (ethereum) {
  //           const provider = new ethers.providers.Web3Provider(ethereum)
  //           const signer = provider.getSigner()  // signer 是执行合约的签名方
  //           const CounterContract = new ethers.Contract(contractAddress, contractABI, signer)

  //           setLoading(true)
  //           let tx = await CounterContract.add() // 会返回一个交易 transaction
  //           await tx.wait() // 等 add() 完场上链之后，才去获取 counts 值
  //           setLoading(false)
  //           await getCounts()
  //         }
  //       } catch (error) {
  //         setLoading(false)
  //         console.error(error);
  //       }
  //     }
  // const getAllTags = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (ethereum) {
  //       const provider = new ethers.BrowserProvider(ethereum);
  //       const signer = await provider.getSigner();
  //       console.log('signer', signer);

  //       const Demo = new ethers.Contract(test_proxy_1.address, test_proxy_1.abi, signer);
  //       // const result = await Demo.updateValue('2');
  //       console.log('Demo', Demo);

  //       await Demo.setData('2');

  //       // const allTags = await Demo.searchAllTags();
  //       // setAllTags(_.map(allTags, (item: string) => item));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const searchAddress = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();

        const Demo = new ethers.Contract(demo_one.address, demo_one.abi, signer);

        const result = await Demo.searchByTag(tag);

        setAddressList(
          _.map(result, (item) => ({
            title: item,
            value: item,
          }))
        );
        setIsLoading(false);
        alert('success');
      } else {
        setIsLoading(false);
        alert('please install metamask');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const invite = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();

        const Demo = new ethers.Contract(demo_one.address, demo_one.abi, signer);

        await Demo.invite(
          _.map(selectAddress, (item) => item.value),
          'football'
        );
        setIsLoading(false);
        alert('invite success');
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
        <title>Invite</title>
      </Head>
      <Box display="flex" width="100vw" height="100vh" justifyContent="center" alignItems="center">
        <Box display="flex" flexDirection="column">
          {/* <ButtonBase onClick={getAllTags}>get all tags</ButtonBase>
          <div>{allTags.join(',')}</div> */}
          <Box display="flex" columnGap={'1rem'} mb="3rem">
            <InputBase
              style={{
                borderRadius: '10px',
                border: 'solid 1px #e4e7eb',
                height: '3.5rem',
                width: '100%',
                paddingLeft: '1.25rem',
                fontFamily: 'NotoSans-Medium',
                fontSize: '1rem',
                color: '#2e4469',
              }}
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            />
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
              onClick={searchAddress}
            >
              SearchByTag
            </ButtonBase>
          </Box>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={addressList}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option.title}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => <TextField {...params} />}
            value={selectAddress}
            onChange={(e, value) => {
              setSelectAddress(value);
            }}
          />
          <Box mt="3rem" display="flex" justifyContent="center">
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
              onClick={invite}
            >
              Invite
            </ButtonBase>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default Demo1;
