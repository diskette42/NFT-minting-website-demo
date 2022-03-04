//   const getAllImages = async () => {
//     const { data } = await axios.get(
//       'https://bafybeidng22a4mbmsndzgwokvjqwlrkdn5j6beonnflp52pvfgkf44mt5i.ipfs.cf-ipfs.com/_metadata.json',
//     )
//     const newImgData = data?.map((imageData) => {
//       const { image, edition, attributes } = imageData
//       const getIndex = image.indexOf('Q')
//       const imgSub = image.substring(getIndex)
//       const img = `https://ipfs.io/ipfs/${imgSub}`
//       const object = {
//         image: img,
//         id: edition,
//         attributes,
//       }
//       return object
//     })
//     setNewImage(newImgData)
//   }
