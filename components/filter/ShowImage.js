import React, { useEffect, useState } from 'react'

function ShowImage({ newImage, filterImage }) {
  const filterByAttribute = (value) => {
    return newImage.filter((image) => {
      return image.attributes.find((attr) => {
        console.log(attr.value == 'Red')
        return attr.value == 'Red' && attr.trait_type == 'Eyeball'
      })
    })
  }

  //   console.log(newImage)
  return (
    <>
      <div className="w-full ml-4 mr-8">
        <div className="mt-10">
          <div className="flex text-center w-full justify-start border-b-2 border-white text-7xl">
            JAIKO AND GIANT
          </div>
          {/* <div className="flex w-full justify-start"> */}
          <div className="flex flex-wrap w-full justify-center">
            {filterImage ? (
              filterImage.map((data, i) => (
                <div className="m-2" key={i}>
                  <img
                    src={data.image_link}
                    loading="lazy"
                    className="w-[200px] h-[200px] rounded-xl cursor-pointer hover:scale-110 hover:duration-300"
                  />
                  <div className="flex justify-center items-center">
                    No.{data.edition}
                  </div>
                </div>
              ))
            ) : (
              <div>Image not found</div>
            )}
            {(filterImage && filterImage.length) <= 0 && (
              <div>Image not found</div>
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  )
}

export default ShowImage
