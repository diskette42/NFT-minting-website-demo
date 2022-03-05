import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Web3 from 'web3';
import { connectMetaMask } from '../../src/redux/blockchain/blockchainActions'
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll'
import { useRouter } from 'next/router'
function Navbar({}) {
  const dispatch = useDispatch()
  const { account } = useSelector((state) => state.blockchain)
  const { route } = useRouter()
  console.log(route)
  const subStringAdrress = (acc) => {
    const front = acc.substring(0, 5)
    const back = acc.substring(37)
    const subAcc = front + '...' + back
    return subAcc
  }

  // const cliked = useRef({
  //   first: false,
  //   second: false,
  //   third: false,
  // })
  // console.log(account)

  // console.log(user)
  return (
    <div id="topbar" className="h-[60px] bg-gray-900 z-50 fixed inset-0 w-full">
      <div id="navbar" className="flex w-full h-full">
        <div id="logo" className="flex w-2/6 items-center ml-2 sm:ml-10">
          <img
            src="https://www.sandbox.game/img/01_Top_Bar/TheSandboxLogo.svg"
            width="150px"
            height="40px"
          />
        </div>

        <div className="flex flex-row space-x-4 w-2/6 items-center justify-center ">
          {route == '/' && (
            <>
              <Link
                activeClass="active"
                className="test6"
                to="first"
                spy={true}
                smooth={true}
                duration={500}
              >
                <div className="font-bold text-2xl cursor-pointer">First</div>
              </Link>
              <Link
                activeClass="active"
                className="test6"
                to="second"
                spy={true}
                smooth={true}
                duration={500}
              >
                <div className="font-bold text-2xl cursor-pointer">Second</div>
              </Link>
              <div className="font-bold text-2xl cursor-pointer">Third</div>
            </>
          )}
        </div>
        <div className="flex h-full w-2/6 items-center justify-end mr-2 sm:mr-10 ">
          {!account ? (
            <button
              onClick={() => dispatch(connectMetaMask())}
              className="flex justify-center items-center bg-blue-500 px-4 h-[30px] rounded-[20px] text-[20px] sm:text-[32px] "
            >
              SignIn
            </button>
          ) : (
            <button className="flex justify-center items-center bg-blue-500  px-4 h-[30px] rounded-[20px]  text-[15px] sm:text-xl  ">
              {subStringAdrress(account)}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
