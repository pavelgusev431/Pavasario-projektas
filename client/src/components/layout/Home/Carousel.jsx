import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
    '/banner_images/1.png',
    '/banner_images/2.png',
    '/banner_images/3.png',
    '/banner_images/4.png',
];

const BannerCarousel = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto">
            <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                stopOnHover
                swipeable
                emulateTouch
                showStatus={false}
                className="rounded-lg"
            >
                {images.map((src, index) => (
                    <div key={index} className="w-full">
                        <img 
                            src={src} 
                            alt={`Slide ${index + 1}`} 
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default BannerCarousel;
