import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const placeHolder =
  'https://www.freeiconspng.com/thumbs/load-icon-png/loading-icon-1.png'
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const Image = styled.img`
  display: block;
  height: ${(props) => `${props.heights}px`};
  width: ${(props) => `${props.widths}px`};

  // Add a smooth animation on loading
  @keyframes loaded {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }

  // I use utilitary classes instead of props to avoid style regenerating
  &.loaded:not(.has-error) {
    animation: loaded 300ms ease-in-out;
  }

  &.has-error {
    // fallback to placeholder image on error
    content: url(${placeHolder});
    animation: ${rotate} 2s linear infinite;
  }
`

export const LazyImage = ({ src, alt, width, height }) => {
  const [imageSrc, setImageSrc] = useState(placeHolder)
  const [imageRef, setImageRef] = useState()

  const onLoad = (event) => {
    event.target.classList.add('loaded')
  }

  const onError = (event) => {
    event.target.classList.add('has-error')
  }

  useEffect(() => {
    let observer
    let didCancel = false

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src)
                observer.unobserve(imageRef)
              }
            })
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          },
        )
        observer.observe(imageRef)
      } else {
        // Old browsers fallback
        setImageSrc(src)
      }
    }
    return () => {
      didCancel = true
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef)
      }
    }
  }, [src, imageSrc, imageRef])
  return (
    <Image
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
      width={width}
      height={height}
      className="rounded-xl cursor-pointer hover:scale-110 hover:duration-300"
    />
  )
}
