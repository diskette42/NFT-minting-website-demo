import { Checkbox, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShowImage from './ShowImage'
import axios from 'axios'
import { CheckCircle } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'

const filterData = [
  {
    image: 'https://www.azuki.com/filtericons/Black/Background.png',
    title: 'Background',
  },
  {
    image: 'https://www.azuki.com/filtericons/Black/Eyes.png',
    title: 'Eye color',
  },
  {
    image: 'https://www.azuki.com/filtericons/Black/Face.png',
    title: 'Eyeball',
  },
  {
    image: 'https://www.azuki.com/filtericons/Black/Special.png',
    title: 'Top lid',
  },
  {
    image: 'https://www.azuki.com/filtericons/Black/Clothing.png',
    title: 'Bottom lid',
  },
]

function FilterComponent() {
  const [newImage, setNewImage] = useState([])
  const [filterImage, setFilterImage] = useState([])
  let [toggle, setToggle] = useState([false, false, false, false, false])
  const initialCheckedState = [
    {
      name: 'Background',
      Black: false,
    },
    {
      name: 'Eye color',
      Pink: false,
      Purple: false,
      Red: false,
      Green: false,
      Cyan: false,
      Yellow: false,
    },
    {
      name: 'Eyeball',
      White: false,
      Red: false,
    },
    {
      name: 'Top lid',
      High: false,
      Middle: false,
      Low: false,
    },
    {
      name: 'Bottom lid',
      High: false,
      Middle: false,
      Low: false,
    },
    {
      name: 'id',
      value: '',
    },
  ]
  const [checked, setChecked] = useState([
    {
      name: 'Background',
      Black: false,
    },
    {
      name: 'Eye color',
      Pink: false,
      Purple: false,
      Red: false,
      Green: false,
      Cyan: false,
      Yellow: false,
    },
    {
      name: 'Eyeball',
      White: false,
      Red: false,
    },
    {
      name: 'Top lid',
      High: false,
      Middle: false,
      Low: false,
    },
    {
      name: 'Bottom lid',
      High: false,
      Middle: false,
      Low: false,
    },
    {
      name: 'id',
      value: '',
    },
  ])
  //   const [trait, setTrait] = useState([
  //     {
  //       name: 'Background',
  //       color: ['pink', 'blue', 'green', 'yellow', 'black'],
  //     },
  //     {
  //       name: 'Top lid',
  //       color: ['pink', 'blue', 'green', 'yellow', 'black'],
  //     },
  //     {
  //       name: 'Bottom lid',
  //       color: ['pink', 'blue', 'green'],
  //     },
  //     {
  //       name: 'Eye color',
  //       color: ['pink', 'blue', 'green', 'yellow', 'black'],
  //     },
  //     {
  //       name: 'Eyeball',
  //       color: ['pink', 'blue', 'green', 'yellow', 'black'],
  //     },
  //   ])
  const [traits, setTraits] = useState([])
  useEffect(() => {
    getAllTraits()
  }, [])

  useEffect(() => {
    getImagesByFiltered()
  }, [checked])

  const getAllTraits = async () => {
    try {
      const res = await axios.get('/api/getAllAttributes')
      setTraits(res.data.traits)
    } catch (err) {
      console.log(err)
    }
  }

  const getAllImages = async () => {
    const res = await axios.get('/api/getAllImages')
  }
  const getImagesByFiltered = async () => {
    try {
      const obj = {
        arr: checked,
      }
      const res = await axios.post('/api/getFilteredImages', obj)
      console.log('haha' + res.data.data)
      setFilterImage(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleToggle = (index) => {
    setToggle((prevState) =>
      prevState.map((item, idx) => (idx === index ? !item : item)),
    )
  }

  const handleChange = (e, index) => {
    setChecked((prevState) =>
      prevState.map((item, idx) =>
        idx === index
          ? Object.assign(item, { [e.target.name]: e.target.checked })
          : item,
      ),
    )
  }
  const filterById = (e) => {
    const index = checked.length - 1
    setChecked((prevState) =>
      prevState.map((item, idx) =>
        idx === index ? Object.assign(item, { value: e.target.value }) : item,
      ),
    )
  }
  const removeFilteredId = () => {
    setChecked((prevState) =>
      prevState.map((item, idx) =>
        idx === checked.length - 1 ? Object.assign(item, { value: '' }) : item,
      ),
    )
  }

  const clearFilterChecked = () => {
    // console.log(checked == initialCheckedState)
    setChecked([...initialCheckedState])
    // console.log('clear', checked)
  }
  console.log(checked)

  return (
    <>
      <div className="flex lg:flex-row flex-col w-full p-5 lg:p-0">
        <div className="w-full lg:w-4/12 flex flex-col justify-start  items-start mt-10 ml-2">
          <div className="flex flex-col sm:flex-row w-full border-b-2 border-white items-end">
            <div className="flex text-7xl ">Filter</div>
            {/* <div className="flex items-center  w-full h-full "> */}
            <div className="w-full flex justify-end">
              <div
                className="bg-yellow-500 p-2 mb-2 rounded-xl cursor-pointer"
                onClick={clearFilterChecked}
              >
                CLEAR
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="flex w-full items-center border-b-2 border-white">
            <IconButton>
              <SearchIcon className="!w-[50px] !h-[50px]" />
            </IconButton>
            <input
              placeholder="search"
              onChange={filterById}
              value={checked[checked.length - 1].value}
              className="block bg-transparent focus:outline-hidden focus:outline-transparent focus:outline-0 w-full h-full"
            />
            <IconButton onClick={removeFilteredId}>
              <CloseIcon className="!w-[20px] !h-[20px]" />
            </IconButton>
          </div>

          {/* // Filter Map */}
          {filterData.map((data, i) => (
            <>
              <div
                className="flex flex-col w-full items-center border-b-2 border-white cursor-pointer"
                key={i}
              >
                <div
                  className="flex flex-row w-full items-center"
                  onClick={() => handleToggle(i)}
                >
                  <IconButton>
                    <img
                      src={data.image}
                      className="w-[50px] h-[50px] bg-white"
                    />
                  </IconButton>
                  <div className="ml-2 w-full">{data.title}</div>
                  <div className="flex justify-end mr-2 text-2xl">+</div>
                </div>

                {/* {Checkbox Input} */}
                {toggle[i] && (
                  <div className="w-full flex flex-col items-start ml-5 ">
                    {traits.map(
                      ({ name, color }, _) =>
                        data.title == name &&
                        color.map((_, k) => (
                          <>
                            <div className="flex flex-row items-center" key={k}>
                              <Checkbox
                                onChange={(e) => handleChange(e, i)}
                                checked={checked[i][color[k]]}
                                name={color[k]}
                                className="w-[10px] h-[10px]"
                              />
                              <div className="ml-3">{color[k]}</div>
                            </div>
                          </>
                        )),
                    )}
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
        <ShowImage newImage={newImage} filterImage={filterImage} />
      </div>
    </>
  )
}

export default FilterComponent
