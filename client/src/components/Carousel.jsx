import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const images = [
    '../src/public/banner_images/1.png',
    '../src/public/banner_images/2.png',
    '../src/public/banner_images/3.png',
    '../src/public/banner_images/4.png',
]

const BannerCarousel = () => {
    return (
        <Carousel
            autoPlay
            interval={5000}
            infiniteLoop
            stopOnHover
            swipeable
            showThumbs={false}
            showStatus={false}
        >
            {images.map((src, index) => (
                <div key={index}>
                    <img src={src} alt={`Slide ${index + 1}`} />
                </div>
            ))}
        </Carousel>
    )
}

export default BannerCarousel
