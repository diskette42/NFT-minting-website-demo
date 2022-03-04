import { Checkbox, IconButton } from '@mui/material'
import React from 'react'
import FilterComponent from '../../components/filter/Filter'
import ShowImage from '../../components/filter/ShowImage'
function Gallery() {
  return (
    <>
      <div className="gallery-page-bg h-auto w-full object-cover">
        <div className="w-full h-full flex flex-row">
          {/* Left */}
          <FilterComponent />
        </div>
        {/* Right */}
      </div>
      <style jsx>{`
        .gallery-page-bg {
          background-image: url('https://www.sandbox.game/img/30_Landing/alpha/Alpha1Closed-bg.png');
          background-size: cover;
          background-position: center;
          z-index: 0;
          width: calc(100vw - 5rem);
          float: right;
          height: 100%;
        }
        @media screen and (min-width: 768px) {
          .gallery-page-bg {
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

export default Gallery
