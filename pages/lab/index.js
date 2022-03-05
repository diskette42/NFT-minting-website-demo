import { RestoreFromTrashRounded } from '@mui/icons-material'
import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { drawNewImage } from '../../api'
import { saveImage, startCreating } from '../../utility/drawCanvas'
import { labData as datas } from '../../utility/labData'
function Lab() {
  // const createdImage = useSelector(state => state.createImage.createdImage)
  const [asset, setAsset] = useState('Top')
  // const [assetChoice,setAssetChoice] = useState([])
  const [assetChoice, setAssetChoice] = useState({
    name: '',
    asset: [],
  })
  const [newImage, setNewImage] = useState({
    BG: '',
    Top: '',
    Bottom: '',
    EyeColor: '',
    EyeBall: '',
    Iris: '',
    Shine: '',
  })
  const [createdImage, setCreatedImage] = useState('')

  useEffect(async () => {
    try {
      const res = await drawNewImage(newImage)
      setCreatedImage(res.data.image)
    } catch (err) {
      console.log(err)
    }

    //=====start saveImage()=====
    // setTimeout(()=>{
    //   // console.log('whatt')
    //   const res = saveImage()
    //   // console.log(res)
    //   setCreatedImage(res)
    //   // return saveImage()
    // },1000)
    // saveImage()
  }, [newImage])

  useEffect(() => {
    searchImageByAsset(asset)
  }, [asset])

  const searchImageByAsset = (name) => {
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].name == name) {
        setAssetChoice({
          ...assetChoice,
          asset: datas[i].asset,
          name: datas[i].name,
        })
        // setAssetChoice({...assetChoice,})
      }
    }
  }

  const handleSetImage = (choice) => {
    if (choice.asset.toUpperCase() == 'BG'.toUpperCase()) {
      setNewImage({ ...newImage, BG: choice.loadedImage })
    } else if (choice.asset.toUpperCase() == 'EyeBall'.toUpperCase()) {
      setNewImage({ ...newImage, EyeBall: choice.loadedImage })
    } else if (choice.asset.toUpperCase() == 'EyeColor'.toUpperCase()) {
      setNewImage({ ...newImage, EyeColor: choice.loadedImage })
    } else if (choice.asset.toUpperCase() == 'Iris'.toUpperCase()) {
      setNewImage({ ...newImage, Iris: choice.loadedImage })
    } else if (choice.asset.toUpperCase() == 'Shine'.toUpperCase()) {
      setNewImage({ ...newImage, Shine: choice.loadedImage })
    } else if (choice.asset.toUpperCase() == 'Top'.toUpperCase()) {
      setNewImage({ ...newImage, Top: choice.loadedImage })
    } else if (choice.asset.toUpperCase() == 'Bottom'.toUpperCase()) {
      setNewImage({ ...newImage, Bottom: choice.loadedImage })
    }
  }

  return (
    <>
      <div className="mint-page-bg h-auto w-full object-cover">
        <div className="flex h-full w-full pt-20 ">
          <div className="flex flex-col justify-center items-center md:flex-row w-full">
            <div className="mr-14 sticky top-[60px]">
              <img src={createdImage} className="w-[300px] h-[300px]  " />
            </div>
            <div className="flex flex-col justify-start items-start w-4/6">
              <div className="flex flex-wrap">
                {datas.map((data, i) => (
                  <div
                    onClick={() => setAsset(data.name)}
                    key={i}
                    className={`border-2 px-10 mr-5 my-2 cursor-pointer ${
                      asset == data.name
                        ? 'bg-rose-300 border-rose-300'
                        : 'border-rose-300'
                    }`}
                  >
                    {data.name}
                  </div>
                ))}
              </div>
              <div className="bg-gray-200 w-full h-[5px]"></div>

              <div className="flex flex-wrap w-full items-center justify-center">
                {assetChoice.asset.map((choice, i) => (
                  <div
                    onClick={() => handleSetImage(choice)}
                    className="p-2"
                    key={i}
                  >
                    <img
                      src={choice.img}
                      width={'300px'}
                      height={'300px'}
                      className=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
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
      `}</style>
    </>
  )
}

export default Lab
