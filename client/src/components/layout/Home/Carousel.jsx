import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  "../../src/public/banner_images/1.png",
  "../../src/public/banner_images/2.png",
  "../../src/public/banner_images/3.png",
  "../../src/public/banner_images/4.png",
];

const BannerCarousel = () => {
  return (
    <div className="w-full mx-auto">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        stopOnHover
        swipeable
        emulateTouch
        showStatus={false}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
