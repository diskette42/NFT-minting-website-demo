import { PriceChange, Web } from '@mui/icons-material'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Web3 from 'web3'
import Web3EthContract from 'web3-eth-contract'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import { toWei } from '../../utils/util'
import Swal from 'sweetalert2'
import { getContract } from '../../src/redux/blockchain/blockchainActions'

// import MintContract
function Mint() {
  const blockchain = useSelector((state) => state.blockchain)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(1)
  const [myContract, setMyContract] = useState({})
  const [isWhitelisted, setIsWhitelisted] = useState()
  const [presale, setPresale] = useState(false)
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: '',
    SCAN_LINK: '',
    NETWORK: {
      NAME: '',
      SYMBOL: '',
      ID: 0,
    },
    NFT_NAME: '',
    SYMBOL: '',
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: '',
    MARKETPLACE_LINK: '',
    SHOW_BACKGROUND: false,
  })
  const [supply, setSupply] = useState({
    maxSupply: '',
    mintedSupply: '',
  })

  useEffect(async () => {
    getConfig()
    const loading = async () => {
      try {
        await new Promise((r) => setTimeout(r, 400))
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
      // Toggle loading state
    }
    loading()
  }, [])

  useEffect(async () => {
    try {
      await handleCheckWhitelisted()
      await getNumberOfTokensMinted()
      await getMaxSupply()
    } catch (err) {
      console.log(err)
    }
  }, [myContract, blockchain.account])

  const handleCheckWhitelisted = async () => {
    setLoading(true)
    try {
      console.log(blockchain.account)
      const res = await myContract.methods
        .isWhitelisted(blockchain.account)
        .call()
      const isPresale = await myContract.methods.onlyWhitelisted().call()
      setIsWhitelisted(res)
      setPresale(isPresale)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const getConfig = async () => {
    try {
      const res = await getContract()
      const { abi, CONFIG } = res
      Web3EthContract.setProvider(ethereum)
      const SmartContractObj = new Web3EthContract(abi, CONFIG.CONTRACT_ADDRESS)
      setMyContract(SmartContractObj)
      SET_CONFIG(CONFIG)
    } catch (err) {
      console.log(err)
    }
  }

  // const getConfig = async () => {
  //   const configResponse = await fetch('/config/config.json', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //   const config = await configResponse.json()
  //   // console.log(config.CONTRACT_ADDRESS)
  //   const result = await getMintAbi(config.CONTRACT_ADDRESS)
  //   setMyContract(result)
  //   SET_CONFIG(config)
  // }

  // const getMintAbi = async (address) => {
  //   try {
  //     const abiResponse = await fetch('/config/abi.json', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     })
  //     const abi = await abiResponse.json()
  //     Web3EthContract.setProvider(ethereum)
  //     const SmartContractObj = new Web3EthContract(abi, address)

  //     return SmartContractObj
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  const getMaxSupply = async () => {
    if (!isEmpty(myContract)) {
      try {
        const maxSupply = await myContract.methods.getMaxSupply().call()
        if (maxSupply) {
          setSupply((state) => ({ ...state, maxSupply: maxSupply }))
        }
      } catch (err) {
        console.log('errrrrr')
        console.log(err)
      }
    }
  }
  const getNumberOfTokensMinted = async () => {
    if (!isEmpty(myContract)) {
      try {
        const minted = await myContract.methods.totalSupply().call()
        if (minted) {
          setSupply((state) => ({ ...state, mintedSupply: minted }))
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleMint = async () => {
    setLoading(true)
    try {
      const method = Object.keys(myContract.methods).length
      const price = 0.02
      const totalCost = count * price
      const totalCostWei = Web3.utils.toWei(totalCost.toString())
      if (method != 0 && count != 0) {
        // console.log({totalCostWei,count,totalCost})
        const res = await myContract.methods.mint(count).send({
          to: CONFIG.CONTRACT_ADDRESS,
          from: blockchain.account,
          value: totalCostWei,
        })
        if (res.status == true) {
          Swal.fire({
            title: 'Success',
            text: 'Minted Successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            window.location.reload()
          })
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const incrementCount = () => {
    const _count = count + 1
    setCount(_count)
  }

  const decrementCount = () => {
    const _count = count - 1
    if (_count < 0) {
      return
    }
    setCount(_count)
  }
  const checkAllState = () => {
    if (blockchain.errorMsg != '') {
      return (
        <div className="flex justify-center items-center h-full ">
          {blockchain.errorMsg}
        </div>
      )
    }
    if (!isWhitelisted && presale) {
      return (
        <div className="flex justify-center items-center h-full ">
          you are not whitelisted
        </div>
      )
    } else {
      return (
        <div className="flex flex-col justify-center items-center h-full w-full text-2xl">
          {!blockchain.account && <div>Please signin First</div>}
          {presale && <div>PRESALE</div>}
          <div>
            {supply.mintedSupply}/{supply.maxSupply}
          </div>
          <div className="text-2xl">amount</div>
          <div className="flex flex-row space-x-8 py-5">
            <div
              onClick={decrementCount}
              className="border-2 border-white px-2 cursor-pointer"
            >
              -
            </div>
            <div>{count}</div>
            <div
              onClick={incrementCount}
              className="border-2 border-white px-2 cursor-pointer"
            >
              +
            </div>
          </div>
          <button
            onClick={handleMint}
            className="bg-purple-700 px-5 py-1 rounded-3xl"
          >
            Mint
          </button>
          <div>Price:0.05 by each</div>
        </div>
      )
    }
  }

  return (
    <>
      <div className="mint-page-bg h-auto w-full object-cover">
        <div className="grid place-content-center my-[60px] text-5xl">Mint</div>
        <div className="md:grid md:grid-cols-4 p-2 sm:p-10">
          <div className="flex justify-center items-center ">
            <img src="/img/tatakai01.png" className="w-10/12 rounded-full" />
          </div>
          {/* Mint */}

          <div className="flex justify-center items-center col-span-2">
            <div className="bg-[url('https://www.sandbox.game/img/14_Home/info-blocks/discover-bg.png')] rounded-3xl w-full  h-[500px] my-5">
              {checkAllState()}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img src="/img/tatakai02.png" className="w-10/12  rounded-full" />
          </div>
        </div>
      </div>

      {loading && (
        <div className="inset-0 fixed z-50 bg-black opacity-70">
          <div className="absolute left-1/2 top-1/2 translate-x-1/2 translate-y-1/2 ">
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
        </div>
      )}
      <style jsx>
        {`
          .mint-page-bg {
            background-image: url('https://www.sandbox.game/img/30_Landing/alpha/Alpha1Closed-bg.png');
            background-size: cover;
            background-position: center;
            z-index: 0;
            width: calc(100vw - 5rem);
            float: right;
            height: 100%;
          }
          @media screen and (min-width: 768px) {
            .mint-page-bg {
              background-image: url('https://www.sandbox.game/img/30_Landing/alpha/Alpha1Closed-bg.png');
              background-size: cover;
              background-position: center;
              z-index: 0;
              width: calc(100vw - 5rem);
              float: right;
              height: calc(100vh - 60px);
              overflow: auto;
            }
          }
        `}
      </style>
    </>
  )
}

export default Mint
