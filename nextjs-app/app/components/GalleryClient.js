// GalleryClient.jsx - Client Component
'use client';

import { useState } from 'react';
import Image from 'next/image';

const GalleryClient = ({ gallery, urlFor, baskerville, sourceSans }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
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
    if (newIndex >= 0 && newIndex < gallery.length) {
      setSelectedImage(newIndex);
    }
  };
  
  return (
    <div className="my-12">
      <h3 className={`${baskerville} font-serif text-2xl font-bold mb-6 flex items-center`}>
        <span className="mr-2">Gallery</span>
        <span className="h-px flex-grow bg-gray-200 ml-4"></span>
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            onClick={() => openLightbox(index)}
          >
            {item.image?.asset && (
              <div className="relative overflow-hidden" style={{ paddingBottom: '75%' }}>
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.alt || `Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </div>
            )}
            {item.caption && (
              <div className="p-3 border-t border-gray-100">
                <p className={`${sourceSans} font-sans text-sm text-gray-700`}>{item.caption}</p>
              </div>
            )}
          </div>
        ))}
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
              src={urlFor(gallery[selectedImage].image).url()}
              alt={gallery[selectedImage].alt || `Gallery image ${selectedImage + 1}`}
              width={gallery[selectedImage].image.asset.metadata?.dimensions?.width || 1200}
              height={gallery[selectedImage].image.asset.metadata?.dimensions?.height || 900}
              className="max-h-[85vh] max-w-[85vw] object-contain"
            />
            
            {gallery[selectedImage].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
                <p className={`${sourceSans} font-sans`}>{gallery[selectedImage].caption}</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => navigateImages(1)} 
            disabled={selectedImage === gallery.length - 1}
            className={`absolute right-4 md:right-8 text-white text-4xl z-10 p-2 ${selectedImage === gallery.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-gray-300 cursor-pointer'}`}
            aria-label="Next image"
          >
            ›
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="flex space-x-2">
              {gallery.map((_, index) => (
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
    </div>
  );
};

export default GalleryClient;