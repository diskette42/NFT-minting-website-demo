import { PriceChange, Web } from '@mui/icons-material';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Web3 from 'web3';
import Web3EthContract from "web3-eth-contract";

import { toWei } from '../../utils/util';

// import MintContract
function Mint() {
  const blockchain = useSelector((state)=> state.blockchain)
  const [count,setCount] = useState(1)
  const [myContract,setMyContract] = useState({})
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
  const [supply,setSupply] = useState({
    maxSupply:'',
    mintedSupply: '',
  })

  useEffect(()=>{
    getConfig()
  },[])

  useEffect(async()=>{
    // const method = Object.keys(myContract.methods).length
    // if(method != 0){
    try{
      await getNumberOfTokensMinted()
      await getMaxSupply()
    }catch(err){
      console.log(err)
    }
    // }
  },[myContract])

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    // console.log(config.CONTRACT_ADDRESS)
    const result = await getMintAbi(config.CONTRACT_ADDRESS)
    setMyContract(result)
    SET_CONFIG(config)
    console.log(result)
    // return config
  };

  const getMintAbi = async (address) => {
    try{
    // console.log(CONFIG.CONTRACT_ADDRESS)
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    // console.log(address)
    Web3EthContract.setProvider(ethereum);
    const SmartContractObj = new Web3EthContract(
      abi,
      address
    );

    return SmartContractObj
    // setMyContract(SmartContractObj)
    
    }catch(err){
      console.log(err)
    }
    // return config
  };


  // console.log(blockchain.smartContract)
  // const getCost
  function isEmpty(obj) { 
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  const getMaxSupply =async()=>{
    if(!isEmpty(myContract)){
      try{
        console.log('yeah')
        // console.log(await myContract.methods.totalSupply().call())
          const maxSupply = await myContract.methods.getMaxSupply().call()
          console.log({maxSupply})
          if(maxSupply){
          setSupply(state=>({...state,maxSupply:maxSupply}))
          }
      
      }catch(err){
        console.log('errrrrr')
        console.log(err)
      }
    }
  }
  const getNumberOfTokensMinted =async()=>{
    console.log(myContract)
    if(!isEmpty(myContract)){
      try{ 
        console.log('yeah')
        const minted = await myContract.methods.getNumberOfTokensMinted().call()
        console.log({minted})
        if(minted){
        setSupply(state=>({...state,mintedSupply:minted}))
        }
      }catch(err){
        console.log('errrrrr')
        console.log(err)
      }
    }
  }

  

  const handleMint = async() =>{
    try{
    const method = Object.keys(myContract.methods).length
    const price = 0.05;
    const totalCost = count*price 
    const totalCostWei = Web3.utils.toWei(totalCost.toString())
    if (method != 0 && count != 0){
    // console.log({totalCostWei,count,totalCost})
      await myContract.methods.mint(blockchain.account,count).send({
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
    }
    }catch(err){
      console.log(err)
    }
  }

  const incrementCount =()=>{
    const _count = count+1
    setCount(_count)
  }

  const decrementCount =()=>{
    const _count = count-1
    if(_count < 0){
      return
    }
    setCount(_count)
  }
  // const {maxSupply,mintedSupply} = supply
  // console.log({maxSupply,mintedSupply})

  return (
    <>
    <div className="mint-page-bg h-auto w-full object-cover">
        <div className="grid place-content-center my-[60px] text-5xl" >
            Mint
        </div>
        <div className="md:grid md:grid-cols-4 p-2 sm:p-10">
            <div className="flex justify-center items-center ">
                <img src="/img/tatakai01.png" className="w-10/12 rounded-full"/>
            </div>
            {/* Mint */}
            
            <div className="flex justify-center items-center col-span-2">
                <div className="bg-[url('https://www.sandbox.game/img/14_Home/info-blocks/discover-bg.png')] rounded-3xl w-full  h-[500px] my-5">
                    {blockchain.errorMsg != "" ?
                    <div className='flex justify-center items-center h-full '>{blockchain.errorMsg}</div>
                    :
                    <div className="flex flex-col justify-center items-center h-full w-full text-2xl">
                      <div>{supply.mintedSupply}/{supply.maxSupply}</div>
                      <div className='text-2xl'>amount</div>
                      <div className='flex flex-row space-x-8 py-5'>
                        <div onClick={decrementCount} className='border-2 border-white px-2 cursor-pointer'>-</div>
                        <div>{count}</div>
                        <div onClick={incrementCount} className='border-2 border-white px-2 cursor-pointer'>+</div>
                      </div>
                      <button onClick={handleMint} className="bg-purple-700 px-5 py-1 rounded-3xl" >Mint</button>
                      <div>Price:0.05 by each</div>
                    </div>
                    }
                </div>
            </div>
            <div className="flex justify-center items-center">
                <img src="/img/tatakai02.png" className="w-10/12  rounded-full"/>
            </div>
        </div>
    </div>
    <style jsx>
    {`
      .page-wrap {
        height: calc(100vh - 60px);
      }
      .mint-page-bg{
        background-image:url('https://www.sandbox.game/img/30_Landing/alpha/Alpha1Closed-bg.png');
        background-size:cover;
        background-position:center;
        z-index:0;
        width: calc(100vw - 5rem);
        float: right;
        height:100%;
    }
      @media screen and (min-width: 768px) {
      .mint-page-bg{
          background-image:url('https://www.sandbox.game/img/30_Landing/alpha/Alpha1Closed-bg.png');
          background-size:cover;
          background-position:center;
          z-index:0;
          width: calc(100vw - 5rem);
          float: right;
          height: calc(100vh - 60px);
          overflow:auto;
      }
    }
    `}
    </style>
    </>
  )
}

export default Mint