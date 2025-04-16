// Gallery.jsx - Server Component
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import LightboxWrapper from './LightboxWrapper';

// Font definitions
const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baskerville'
});

const sourceSans = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-source-sans'
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Gallery = ({ gallery }) => {
  if (!gallery || gallery.length === 0) return null;
  
  // Prepare data for the client component
  const galleryData = gallery.map(item => ({
    url: urlFor(item.image).url(),
    alt: item.alt || 'Gallery image',
    caption: item.caption || '',
    width: item.image.asset.metadata?.dimensions?.width || 1200,
    height: item.image.asset.metadata?.dimensions?.height || 900
  }));
  
  return (
    <div className="my-12">
      <h3 className={`${baskerville.variable} font-serif text-2xl font-bold mb-6 flex items-center`}>
        <span className="mr-2">Gallery</span>
        <span className="h-px flex-grow bg-gray-200 ml-4"></span>
      </h3>
      
      <LightboxWrapper galleryData={galleryData} sourceSansVariable={sourceSans.variable}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 h-full"
              data-index={index}
            >
              {item.image?.asset && (
                <div className="relative w-full">
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.alt || `Gallery image ${index + 1}`}
                    width={item.image.asset.metadata?.dimensions?.width || 800}
                    height={item.image.asset.metadata?.dimensions?.height || 600}
                    className="w-full h-auto hover:scale-105 transition-transform duration-500 cursor-pointer"
                  />
                </div>
              )}
              {item.caption && (
                <div className="p-3 border-t border-gray-100">
                  <p className={`${sourceSans.variable} font-sans text-sm text-gray-700`}>{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </LightboxWrapper>
    </div>
  );
};

export default Gallery;