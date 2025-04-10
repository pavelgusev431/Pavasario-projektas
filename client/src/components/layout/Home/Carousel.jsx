import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { nanoid } from 'nanoid';

const images = [
    {
        src: '../src/public/banner_images/1.png',
        link: 'http://localhost:5173/products/s/1',
    },
    {
        src: '../src/public/banner_images/2.png',
        link: 'http://localhost:5173/products/s/6',
    },
    {
        src: '../src/public/banner_images/3.png',
        link: 'http://localhost:5173/products/s/2',
    },
    {
        src: '../src/public/banner_images/4.png',
        link: 'http://localhost:5173/products/s/16',
    },
];

const BannerCarousel = () => {
    const handleImageClick = (link) => {
        window.location.href = link;
    };

    return (
        <div className="relative">
            <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                stopOnHover
                swipeable
                emulateTouch
                showStatus={false}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-300 hover:text-black cursor-pointer z-10"
                            aria-label={label}
                        >
                            &#8249; {/* Left arrow */}
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-300 hover:text-black cursor-pointer z-10"
                            aria-label={label}
                        >
                            &#8250; {/* Right arrow */}
                        </button>
                    )
                }
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => handleImageClick(image.link)}
                        className="cursor-pointer"
                    >
                        <img src={image.src} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default BannerCarousel;
