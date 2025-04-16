// LightboxWrapper.jsx - Client Component
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const LightboxWrapper = ({ children, galleryData, sourceSansVariable }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const handleClick = (e) => {
      // Find the closest gallery item
      const galleryItem = e.target.closest('[data-index]');
      if (galleryItem) {
        const index = parseInt(galleryItem.dataset.index, 10);
        openLightbox(index);
      }
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('click', handleClick);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);
  
  const openLightbox = (index) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  const navigateImages = (direction) => {
    const newIndex = selectedImage + direction;
    if (newIndex >= 0 && newIndex < galleryData.length) {
      setSelectedImage(newIndex);
    }
  };
  
  return (
    <>
      <div ref={containerRef}>
        {children}
      </div>
      
      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 text-3xl z-10"
            aria-label="Close lightbox"
          >
            ×
          </button>
          
          <button 
            onClick={() => navigateImages(-1)} 
            disabled={selectedImage === 0}
            className={`absolute left-4 md:left-8 text-white text-4xl z-10 p-2 ${selectedImage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gray-300 cursor-pointer'}`}
            aria-label="Previous image"
          >
            ‹
          </button>
          
          <div className="relative max-h-[85vh] max-w-[85vw]">
            <Image
              src={galleryData[selectedImage].url}
              alt={galleryData[selectedImage].alt}
              width={galleryData[selectedImage].width}
              height={galleryData[selectedImage].height}
              className="max-h-[85vh] max-w-[85vw] object-contain"
            />
            
            {galleryData[selectedImage].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
                <p className={`${sourceSansVariable} font-sans`}>{galleryData[selectedImage].caption}</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => navigateImages(1)} 
            disabled={selectedImage === galleryData.length - 1}
            className={`absolute right-4 md:right-8 text-white text-4xl z-10 p-2 ${selectedImage === galleryData.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gray-300 cursor-pointer'}`}
            aria-label="Next image"
          >
            ›
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="flex space-x-2">
              {galleryData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full ${selectedImage === index ? 'bg-white' : 'bg-gray-500'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LightboxWrapper;