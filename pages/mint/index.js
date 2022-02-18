import React, { useEffect } from 'react'
// import MintContract
function Mint() {

  
  return (
    <>
    <div className="mint-page-bg h-auto w-full object-cover ">
        <div className="grid place-content-center h-48 text-6xl font-Montserrat" >
            Mint
        </div>
        <div className="xl:grid xl:grid-cols-4 p-10">
            <div className="flex justify-center items-center ">
                <img src="/img/tatakai01.png" className="w-10/12 rounded-full"/>
            </div>
            {/* Mint */}
            <div className="flex justify-center items-center col-span-2">
                <div className="bg-gray-600 w-full  h-[500px]">
                    <div className="flex justify-center items-center h-full w-full">
                      <div></div>
                      <button className="bg-purple-700 px-5 h-[32px]" >Mint</button>
                    </div>
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
          background-image:url('https://w.wallha.com/ws/2/yoBqtdUn.png');
          background-size:cover;
          background-position:center;
          z-index:0;
      }
    `}
    </style>
    </>
  )
}

export default Mint