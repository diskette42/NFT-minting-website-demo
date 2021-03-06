import { data } from 'autoprefixer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function Sidebar() {
  const { route } = useRouter()

  const sideClick = (path) => {
    if (route === path) {
      return ' bg-gray-300 rounded-[10px]'
    }
  }

  const datas = [
    {
      name: 'home',
      icon: 'https://www.sandbox.game/img/02_Side_Bar/svg/home-icon.svg',
      path: '/',
    },
    {
      name: 'mint',
      icon: 'https://www.sandbox.game/img/02_Side_Bar/svg/play-icon.svg',
      path: '/mint',
    },
    {
      name: 'Lab',
      icon: 'https://www.sandbox.game/img/02_Side_Bar/svg/create-icon.svg',
      path: '/lab',
    },
    {
      name: 'Gallery',
      icon: 'https://www.sandbox.game/img/02_Side_Bar/svg/shop-icon.svg',
      path: '/gallery',
    },
  ]

  return (
    <div className="w-20 bg-gray-900 fixed h-full">
      <div className="flex flex-col mt-3 justify-center items-center">
        {datas.map((data, key) => (
          <Link key={key} href={data.path}>
            <div
              className={`box-border w-10/12 flex flex-col items-center justify-center p-2 cursor-pointer ${sideClick(
                data.path,
              )}`}
            >
              <div className="flex flex-col ">
                <img src={data.icon} className="w-[35px] h-[35px]" />
              </div>
              <div>{data.name}</div>
            </div>
          </Link>
        ))}

        {/* <div className="box-border w-10/12 flex flex-col items-center justify-center p-2 cursor-pointer">
            <div className="flex flex-col ">
                <img src="https://www.sandbox.game/img/02_Side_Bar/svg/play-icon.svg" className="w-[35px] h-[35px]"/>
            </div>
            <div>
                Mint
            </div>
        </div> */}
      </div>
    </div>
  )
}

export default Sidebar
