import { Backdrop, ButtonBase, CircularProgress, InputBase } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/system';
import { ethers } from 'ethers';
import { demo_one } from 'global/contract';
import Head from 'next/head';
import React, { useState } from 'react';
import _ from 'lodash';

const Manage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [tag, setTag] = useState('');
  const [oldTag, setOldTag] = useState('');
  const [newTag, setNewTag] = useState('');
  const [updateAddress, setUpdateAddress] = useState('');

  const addTag = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = await provider.getSigner();
        const Demo = new ethers.Contract(demo_one.address, demo_one.abi, signer);

        const result = await Demo.add(address, tag);
        console.log('result', result);

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

  const updateTag = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = await provider.getSigner();
        const Demo = new ethers.Contract(demo_one.address, demo_one.abi, signer);

        const result = await Demo.updateTag(updateAddress, oldTag, newTag);
        console.log('result', result);

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

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchAddress, setSearchAddress] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const searchByAddress = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = await provider.getSigner();
        const Demo = new ethers.Contract(demo_one.address, demo_one.abi, signer);

        const result = await Demo.searchByWallet(searchAddress);
        console.log('result', result);
        setSearchResult(_.map(result, (item) => item));

        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert('please install metamask');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const [searchTag, setSearchTag] = useState('');
  const [searchTagResult, setSearchTagResult] = useState([]);

  const searchByTag = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = await provider.getSigner();
        const Demo = new ethers.Contract(demo_one.address, demo_one.abi, signer);

        const result = await Demo.searchByTag(searchTag);
        console.log('result', result);
        setSearchTagResult(_.map(result, (item) => item));

        setIsLoading(false);
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
        <title>Manage</title>
      </Head>
      <Box display="flex" width="100vw" height="100vh" pt="1rem" flexDirection="column">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Add Tag" value="1" />
              <Tab label="Update Tag" value="2" />
              <Tab label="Search By Address" value="3" />
              <Tab label="Search By Tag" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box display="flex" flexDirection="column" gap="1rem" pb="1rem" borderBottom="1px solid #b0b0b0">
              <h3>Add</h3>
              <Box display="flex" flexDirection="column" gap={'1rem'}>
                <Box display="flex" alignItems="center" gap={'1rem'}>
                  Address:
                  <InputBase
                    style={{
                      borderRadius: '10px',
                      border: 'solid 1px #e4e7eb',
                      height: '3.5rem',
                      width: '100%',
                      paddingLeft: '0.5rem',
                      paddingRight: '0.5rem',
                      fontFamily: 'NotoSans-Medium',
                      fontSize: '1rem',
                      color: '#2e4469',
                    }}
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </Box>
                <Box display="flex" alignItems="center" gap={'1rem'}>
                  Tag:
                  <InputBase
                    style={{
                      borderRadius: '10px',
                      border: 'solid 1px #e4e7eb',
                      height: '3.5rem',
                      width: '100%',
                      paddingLeft: '0.5rem',
                      paddingRight: '0.5rem',
                      fontFamily: 'NotoSans-Medium',
                      fontSize: '1rem',
                      color: '#2e4469',
                    }}
                    value={tag}
                    onChange={(event) => setTag(event.target.value)}
                  />
                </Box>
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
                  onClick={addTag}
                >
                  Add Tag
                </ButtonBase>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box display="flex" flexDirection="column" gap="1rem" pb="1rem" borderBottom="1px solid #b0b0b0">
              <h3>Edit</h3>
              <Box display="flex" flexDirection="column" gap={'1rem'}>
                <Box display="flex" alignItems="center" gap={'1rem'}>
                  Address:
                  <InputBase
                    style={{
                      borderRadius: '10px',
                      border: 'solid 1px #e4e7eb',
                      height: '3.5rem',
                      width: '100%',
                      paddingLeft: '0.5rem',
                      paddingRight: '0.5rem',
                      fontFamily: 'NotoSans-Medium',
                      fontSize: '1rem',
                      color: '#2e4469',
                    }}
                    value={updateAddress}
                    onChange={(event) => setUpdateAddress(event.target.value)}
                  />
                </Box>
                <Box display="flex" alignItems="center" gap={'1rem'}>
                  oldTag:
                  <InputBase
                    style={{
                      borderRadius: '10px',
                      border: 'solid 1px #e4e7eb',
                      height: '3.5rem',
                      width: '100%',
                      paddingLeft: '0.5rem',
                      paddingRight: '0.5rem',
                      fontFamily: 'NotoSans-Medium',
                      fontSize: '1rem',
                      color: '#2e4469',
                    }}
                    value={oldTag}
                    onChange={(event) => setOldTag(event.target.value)}
                  />
                </Box>
                <Box display="flex" alignItems="center" gap={'1rem'}>
                  newTag:
                  <InputBase
                    style={{
                      borderRadius: '10px',
                      border: 'solid 1px #e4e7eb',
                      height: '3.5rem',
                      width: '100%',
                      paddingLeft: '0.5rem',
                      paddingRight: '0.5rem',
                      fontFamily: 'NotoSans-Medium',
                      fontSize: '1rem',
                      color: '#2e4469',
                    }}
                    value={newTag}
                    onChange={(event) => setNewTag(event.target.value)}
                  />
                </Box>
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
                  onClick={updateTag}
                >
                  Update Tag
                </ButtonBase>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box display="flex" flexDirection="column" gap="1rem" pb="1rem" borderBottom="1px solid #b0b0b0">
              <h3>Search By Address</h3>
              <Box display="flex" flexDirection="column" gap={'1rem'}>
                <Box display="flex" alignItems="center" gap={'1rem'}>
                  Address:
                  <InputBase
                    style={{
                      borderRadius: '10px',
                      border: 'solid 1px #e4e7eb',
                      height: '3.5rem',
                      width: '100%',
                      paddingLeft: '0.5rem',
                      paddingRight: '0.5rem',
                      fontFamily: 'NotoSans-Medium',
                      fontSize: '1rem',
                      color: '#2e4469',
                    }}
                    value={searchAddress}
                    onChange={(event) => setSearchAddress(event.target.value)}
                  />
                </Box>
                <ButtonBase
                  style={{
                    width: '9.875rem',
                    height: '3rem',
                    borderRadius: '10px',
                    backgroundColor: '#538fff',
                    fontSize: '1rem',
                    color: '#fff',
                    padding: '0.5rem',
                  }}
                  onClick={searchByAddress}
                >
                  Search By Address
                </ButtonBase>
                <Box>{searchResult.join(',')}</Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value="4">
            <Box display="flex" flexDirection="column" gap="1rem" pb="1rem" borderBottom="1px solid #b0b0b0">
              <h3>Search By Tag</h3>
              <Box display="flex" flexDirection="column" gap={'1rem'}>
                <Box display="flex" alignItems="center" gap={'1rem'}>
                  Address:
                  <InputBase
                    style={{
                      borderRadius: '10px',
                      border: 'solid 1px #e4e7eb',
                      height: '3.5rem',
                      width: '100%',
                      paddingLeft: '0.5rem',
                      paddingRight: '0.5rem',
                      fontFamily: 'NotoSans-Medium',
                      fontSize: '1rem',
                      color: '#2e4469',
                    }}
                    value={searchTag}
                    onChange={(event) => setSearchTag(event.target.value)}
                  />
                </Box>
                <ButtonBase
                  style={{
                    width: '9.875rem',
                    height: '3rem',
                    borderRadius: '10px',
                    backgroundColor: '#538fff',
                    fontSize: '1rem',
                    color: '#fff',
                    padding: '0.5rem',
                  }}
                  onClick={searchByTag}
                >
                  Search By Address
                </ButtonBase>
                <Box>{searchTagResult.join(',')}</Box>
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Manage;
