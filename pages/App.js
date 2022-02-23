import React, { useEffect, useState } from 'react'
import Navbar from '../components/navabr/Navbar'
import PageWrap from '../components/page-wrapper/PageWrap'
import Web3 from 'web3';
import Web3EthContract from "web3-eth-contract";
import { useDispatch } from 'react-redux';
import { connectFailed, setAccount, updateAccountRequest } from '../src/redux/blockchain/blockchainActions';
import Swal from 'sweetalert2';
import { Web } from '@mui/icons-material';

function App({Component,pageProps}) {
    const dispatch = useDispatch()
    // const [myContract,setMyContract] = useState({})
   
    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "",
        SCAN_LINK: "",
        NETWORK: {
          NAME: "",
          SYMBOL: "",
          ID: 0,
        },
        NFT_NAME: "",
        SYMBOL: "",
        MAX_SUPPLY: 1,
        WEI_COST: 0,
        DISPLAY_COST: 0,
        GAS_LIMIT: 0,
        MARKETPLACE: "",
        MARKETPLACE_LINK: "",
        SHOW_BACKGROUND: false,
      });
      // console.log(myContract,CONFIG)

  useEffect(() => {
     getConfig();
     isConnected()
  }, []);
  const isConnected =async()=>{
    let web3 = new Web3(window.ethereum)
    const accounts = await window.ethereum.request({method: 'eth_accounts'});
    // console.log({accounts,length:accounts.length})

    web3.eth.getAccounts((acc)=>{
      // console.log(acc)
      if(acc || accounts.length){
        return
      }
      dispatch(setAccount(''))
    })
   
  }

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    // await getMintAbi(config.CONTRACT_ADDRESS)
    SET_CONFIG(config)
    // return config
  };

  // const getMintAbi = async (address) => {
  //   try{
  //   // console.log(CONFIG.CONTRACT_ADDRESS)
  //   const abiResponse = await fetch("/config/abi.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   });
  //   const abi = await abiResponse.json();
  //   // console.log(address)
  //   const SmartContractObj = new Web3EthContract(
  //     abi,
  //     address
  //   );
  //   setMyContract(SmartContractObj)
    
  //   }catch(err){
  //     console.log(err)
  //   }
  //   // return config
  // };

   // Add listeners start
  ethereum.on("accountsChanged", (accounts) => {
    console.log('hello')
    console.log("accountChange",accounts)
    dispatch(updateAccountRequest({account:accounts[0]}));
  });
  ethereum.on("networkChanged", (chainId) => { 

    if(chainId.toString() === CONFIG.NETWORK.ID.toString()){
      Swal.fire({
        icon: 'success',
        title: `Correct Network`
      })
      dispatch(connectFailed(""));
    }else{
      Swal.fire({
        icon: 'error',
        title: `Change network to ${CONFIG.NETWORK.NAME}.`
      })
      dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
    }

 
    // if(chainId != CONFIG.NETWORK.ID){
    //   // console.log('fail',CONFIG.NETWORK.ID)
      

     

    // }
  });
  return (
    <>
        <Navbar/>
        <PageWrap>
            <Component {...pageProps} />
        </PageWrap>
    </>
  )
}

export default App