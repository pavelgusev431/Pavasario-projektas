import { useEffect, useState } from 'react';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        const scrollStep = -window.scrollY / 100;
        const interval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(interval);
            }
        }, 4);
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 bg-[#ff2c2c] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#9b0000] transition duration-300 text-[0.4cm] w-[1cm]"
            >
                ↑
            </button>
        )
    );
};

export default BackToTopButton;
