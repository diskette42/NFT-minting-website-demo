import React from 'react'
import { useMediaQuery } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

function First() {
  const matches = useMediaQuery('(min-width:1280px)')

  const homeBreakPoint = () => {
    if (matches) {
      return "bg-[url('https://www.sandbox.game/img/14_Home/info-blocks/bg-nft.png')]"
    } else {
      return "bg-[url('https://www.sandbox.game/img/14_Home/info-blocks/ntf-bg-mobile.png')]"
    }
  }
  return (
    <div className="h-[calc(100vh-60px)] element" id="first">
      <div
        className={` ${homeBreakPoint()} bg-no-repeat bg-top-center bg-cover h-[70%]`}
      >
        <div className="relative">
          <img
            src="https://www.sandbox.game/img/14_Home/info-blocks/dragon.gif"
            className="absolute top-0 left-0 lg:translate-x-1/4 xl:translate-x-2/4"
          />
          <div></div>
        </div>
      </div>
      <div className="bg-black-500 h-[30%] w-full flex flex-col items-center pt-10 ">
        <div className="text-5xl text-center">Mint Your First NFT</div>
        <Link href="/mint">
          <div className="mt-10 bg-purple-500 px-5 py-1 rounded-2xl text-2xl cursor-pointer">
            Go Mint
          </div>
        </Link>
      </div>
    </div>
  )
}

export default First
