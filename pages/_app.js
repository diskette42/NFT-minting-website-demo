import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import darkTheme from '../styles/theme/darkTheme';
import '../styles/globals.css';
import Navbar from '../components/navabr/Navbar'
import PageWrap from '../components/page-wrapper/PageWrap'
import Web3 from 'web3';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [userState, setUserState] =useState({
    accountAddress:false,
    metamaskConnected:false,
  })
  const {accountAddress} = userState

  useEffect(()=>{
    onChangeAddress()
    onChangeChain()
    // loadWeb3()
    // loadBlockchainData()
  },[accountAddress])


 
  const onChangeChain=()=>{
    ethereum.on('chainChanged', (id)=>{
      console.log(id)
    });
  }
  const onChangeAddress=()=>{
    window.ethereum.on('accountsChanged',(accounts)=>{
      setUserState({...userState,accountAddress:accounts})
      console.log('halo',accounts)
    })
  }

  // const loadWeb3 = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //     console.log('currentPro')
  //   } else {
  //     window.alert(
  //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //     );
  //   }
  // };

  // const loadBlockchainData = async()=>{
  //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     // if (accountAddress === accounts) return
  //     console.log("accounts",accounts)
  //     setUserState({...userState,accountAddress:accounts[0]})
      
  // }

  const connectToMetaMask = async()=>{
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // if (accountAddress === accounts) return
    console.log("accounts",accounts)
    setUserState({...userState,accountAddress:accounts[0]})
    setUserState({...userState,metamaskConnected: true });
    window.location.reload();
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar connectToMetaMask={connectToMetaMask} accountAddress={accountAddress}/>
        <PageWrap>
        <Component {...pageProps} />
        </PageWrap>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};