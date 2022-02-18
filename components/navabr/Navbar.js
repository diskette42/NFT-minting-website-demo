import React, { useEffect, useState } from 'react'
import Web3 from 'web3';

function Navbar({connectToMetaMask,accountAddress}) {

  

  return (
    <div id="topbar" className="h-[60px] bg-gray-900">
      <div id="navbar" className="flex w-full h-full">
      <div id="logo" className="flex w-1/2 items-center ml-10">
        <img src="https://www.sandbox.game/img/01_Top_Bar/TheSandboxLogo.svg" width="150px" height="40px" />
      </div>
      <div className="flex h-full w-1/2 items-center justify-end mr-10 ">
        {!accountAddress ?
          <button onClick={connectToMetaMask} className="flex justify-center items-center bg-blue-500 px-4 h-[30px] rounded-[20px] text-[16px] font-bold font-Montserrat ">
          Sign In
        </button>:
        <button className="flex justify-center items-center bg-blue-500  px-4 h-[30px] rounded-[20px] text-[16px] font-bold font-Montserrat ">
        {accountAddress}
      </button>
      }
        
      </div>
      </div>
    </div>
  )
}

export default Navbar