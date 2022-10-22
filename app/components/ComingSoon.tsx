import { useCallback, useEffect, useState } from 'react';
import Slide from './Slide';

function ComingSoon() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [slides, setSlides] = useState([
        { image: '/images/01.png', fadeIn: true, fadeOut: false },
        { image: '/images/02.png', fadeIn: false, fadeOut: false },
        { image: '/images/03.png', fadeIn: false, fadeOut: false },
        { image: '/images/04.png', fadeIn: false, fadeOut: false },
        { image: '/images/05.png', fadeIn: false, fadeOut: false },
        { image: '/images/06.png', fadeIn: false, fadeOut: false },
        { image: '/images/07.png', fadeIn: false, fadeOut: false },
    ]);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            const currentSlide = slides[slideIndex];
            let nextSlide = slides[slideIndex + 1];
            setSlideIndex(slideIndex + 1);
            if (!nextSlide) {
                nextSlide = slides[0];
                setSlideIndex(0);
            }
            if (currentSlide) {
                console.log({ currentSlide });
                currentSlide.fadeIn = false;
                currentSlide.fadeOut = true;
            }
            if (nextSlide) {
                console.log({ nextSlide });
                nextSlide.fadeIn = true;
                nextSlide.fadeOut = false;
            }
            setSlides(slides);
        }, 5000);
        return () => {
            clearInterval(slideInterval);
        };
    }, [slideIndex, slides]);

    return (
        <div>
            {slides.map(({ image, fadeIn, fadeOut }, index) => (
                <Slide key={index} fadeIn={fadeIn} fadeOut={fadeOut} image={image} />
            ))}
            <div className='flex h-screen items-center justify-center'>
                <h1 className='  z-10 font-pacifico text-5xl text-white'>coming soon</h1>
            </div>
        </div>
    );
}

export default ComingSoon;
