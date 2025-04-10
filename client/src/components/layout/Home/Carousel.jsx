import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
        <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            stopOnHover
            swipeable
            emulateTouch
            showStatus={false}
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
    );
};

export default BannerCarousel;
