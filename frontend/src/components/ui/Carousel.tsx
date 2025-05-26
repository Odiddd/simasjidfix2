// src/components/ui/Carousel.tsx

import React, { useState } from 'react';
import Image from 'next/image';

interface CarouselProps {
  images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
      <div className="absolute w-full h-full">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      
      {/* Left Arrow */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
        <button 
          onClick={goToPrevious} 
          className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
        >
          &lt;
        </button>
      </div>
      
      {/* Right Arrow */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
        <button 
          onClick={goToNext} 
          className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
        >
          &gt;
        </button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-2 w-2 rounded-full ${
              slideIndex === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};