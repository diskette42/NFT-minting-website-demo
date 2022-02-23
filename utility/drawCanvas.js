// import { ReadMoreRounded } from '@mui/icons-material';
// import Image from 'next/image';
// // import { useDispatch } from 'react-redux';
// import { createImage } from '../src/redux/createImage/createImageAction';

// const Canvas = require('canvas');
// // const fs = require('fs');
// // module.exports = fs()

// const format = {
//   width: 512,
//   height: 512,
//   smoothing: false,
// };

// const background = {
//   generate: true,
//   brightness: "80%",
//   static: false,
//   default: "#000000",
// };
// // const canvasimg = new Canvas.Image;
// const canvas = new Canvas.createCanvas(format.width, format.height);
// const ctx = canvas.getContext("2d");
// console.log(ctx)

// const genColor = () => {
//   let hue = Math.floor(Math.random() * 360);
//   let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
//   return pastel;
// };

// const drawBackground = () => {
//     ctx.fillStyle = background.static ? background.default : genColor();
//     ctx.fillRect(0, 0, format.width, format.height);
// };



// export const saveImage =() => {
//   return canvas.toDataURL()
//     // return canvas.toDataURL("image/png");
// };


// const drawElement = async(_renderObject) => {

//       console.log(_renderObject.loadedImage)
//       // console.log('kuyyyy')

//       const res = await fetch(_renderObject.loadedImage)
//       // console.log(res)
//       const myimg = await Canvas.loadImage(res.url)
//       // console.log(myimg)

//       await ctx.drawImage(
//         myimg,
//           0,
//           0,
//           format.width,
//           format.height
//         )
  
// }
// export const startCreating = async (newImage) => {
//   try{
//     const {BG,Top,Bottom,EyeColor,EyeBall,Iris,Shrine} = newImage;
//     // console.log({BG,Top,Bottom,EyeColor,EyeBall,Iris,Shrine})
  
//     const loadedElements=[
//       { 
//         layer: {
//           name: 'Background',
         
//         },
//         // loadedImage: "/img/layers/Background/Black1.png"
//         loadedImage: BG ? BG :"/img/layers/Background/Black1.png"
//       },
//       {
//         layer: {
//           name: 'Eyeball',
         
//         },
//         loadedImage:EyeBall?EyeBall:"/img/layers/Eyeball/White50.png"
//       },
//       {
//         layer: {
//           name: 'Eye color',
     
//         },
//         loadedImage: EyeColor?EyeColor:"/img/layers/Eye color/Cyan1.png"
//       },
//       {
//         layer: {
//           name: 'Iris',
//           blend: 'source-over',
//           opacity: 1,
//           selectedElement: [Object]
//         },
//         loadedImage: Iris?Iris:"/img/layers/iris/Large20.png"
//       },
//       {
//         layer: {
//           name: 'Shine',
//           blend: 'source-over',
//           opacity: 1,
//           selectedElement: [Object]
//         },
//         loadedImage: Shrine?Shrine:"/img/layers/Shine/Shapes100.png"
//       },
//       {
//         layer: {
//           name: 'Bottom lid',
//           blend: 'source-over',
//           opacity: 1,
//           selectedElement: [Object]
//         },
//         loadedImage: Bottom?Bottom: "/img/layers/Bottom lid/High20.png"
//       },
//       {
//         layer: {
//           name: 'Top lid',
//           blend: 'source-over',
//           opacity: 1,
//           selectedElement: [Object]
//         },
//         loadedImage:Top?Top: "/img/layers/Top lid/High30.png" 
//       }
//     ]
//     // let x;
//     console.log(loadedElements)

//     await Promise.all(loadedElements).then((renderObjectArray) => {
//       ctx.clearRect(0, 0, format.width, format.height);
//       if (background.generate) {
//         drawBackground();
//       }
//       renderObjectArray.forEach((renderObject, index) => {
//         // console.log(renderObject)
//         drawElement(
//           renderObject
//         );

//       });
//     })
//     // console.log(saveImage())

//     // console.log('hello')
//     // console.log(saveImage())

    

   
//   }catch(err){
//     console.log(err)
//   }finally{
  
//   }  
    
   

// };
