import { useState, useEffect, useRef } from 'react'
import image1 from "../images/title2.jpg";
import image2 from '../images/poster.jpeg'
import image3 from '../images/collage1.png'
import image4 from '../images/12.jpg'


const featuredProducts = [image1, image2, image1, image3, image1, image4]

const Carousel = () => {
  let count = 0
  let slideInterval

  const [currentIndex, setCurrentIndex] = useState(0)

  const slideRef = useRef()

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim')
  }

  useEffect(() => {
    slideRef.current.addEventListener('animationend', removeAnimation)
    slideRef.current.addEventListener('mouseenter', pauseSlider)
    slideRef.current.addEventListener('mouseleave', startSlider)

    startSlider()
    return () => {
      pauseSlider()
    }
    // eslint-disable-next-line
  }, [])

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick()
    }, 3000)
  }

  const pauseSlider = () => {
    clearInterval(slideInterval)
  }

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length
    setCurrentIndex(count)
    slideRef.current.classList.add('fade-anim')
  }

  return (
    <div>
      <div ref={slideRef} className="w-full select-none">
        <div className="aspect-w-16 aspect-h-9">
          {featuredProducts[currentIndex] && (
            <span>
              <img
                className="h-40 w-full md:h-96"
                src={featuredProducts[currentIndex]}
                alt="ad-banner"
              />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
export default Carousel
