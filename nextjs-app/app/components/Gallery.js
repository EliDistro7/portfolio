import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';

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

  console.log('gallery', gallery)
  
  return (
    <div className="my-12">
      <h3 className={`${baskerville.variable} font-serif text-2xl font-bold mb-6`}>Gallery</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            {item.image?.asset && (
              <div className="relative w-full">
                {/* Using sizes attribute to let browser determine best image size */}
                <Image
                  src={urlFor(item.image).url()} // No width/height transformations
                  alt={item.alt || `Gallery image ${index + 1}`}
                  width={item.image.asset.metadata?.dimensions?.width || 800}
                  height={item.image.asset.metadata?.dimensions?.height || 600}
                  className="w-full h-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            {item.caption && (
              <p className={`${sourceSans.variable} font-sans text-sm text-gray-600 mt-2`}>{item.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;