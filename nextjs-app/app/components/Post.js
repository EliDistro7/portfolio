// Post.jsx - Server component
import { Play, Calendar, Languages, Music, Film, Image } from "lucide-react";
import { client } from '@/sanity/lib/client';
import Link from "next/link";
import DateComponent from "@/app/components/Date";

import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import LanguageToggle from './LanguageToggle';

// Define your custom fonts
const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baskerville'
});

const sourceSans = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-source-sans'
});

// Set up image builder
import imageUrlBuilder from '@sanity/image-url';
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Post = ({ post, initialLanguage = 'en' }) => {
  const { 
    _id, 
    title,
    titleSw,
    slug,
    excerpt,
    excerptSw,
    date,
    hasTranslation = false,
    featuredMedia,
    coverImage,
    gallery,
    additionalVideos
  } = post;

  // Determine media type
  const mediaType = featuredMedia?.mediaType || (coverImage ? "image" : null);
  
  // Function to render media type icon
  const renderMediaTypeIcon = () => {
    switch(mediaType) {
      case 'video': return <Film className="h-5 w-5 text-white" />;
      case 'audio': return <Music className="h-5 w-5 text-white" />;
      case 'image': default: return null;
    }
  };

  return (
    <Link href={`/posts/${slug.current}`}>
      <article className="group h-full overflow-hidden bg-white transition-all duration-300 hover:shadow-lg">
        {/* Media Container - Full Width and Taller */}
<div className="relative aspect-[16/14] w-screen overflow-hidden">
  {coverImage?.asset || featuredMedia?.image?.asset ? (
    <div className="relative h-full w-full">
      <img
        src={urlFor(coverImage || featuredMedia.image).width(1920).height(1450).quality(85).url()}
        alt={(coverImage?.alt || featuredMedia?.image?.alt || `Cover image for ${title}`)}
        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Enhanced gradient for better title visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Media type indicator */}
      {mediaType && mediaType !== "image" && (
        <div className="absolute top-4 right-4 rounded-full bg-primary-600/90 p-2">
          {renderMediaTypeIcon()}
        </div>
      )}
      
      {/* Title with improved visibility and padding */}
      
        
         {/* Title with gradient shadow background */}
{/* Title with soft gradient shadow background */}
<div className="absolute bottom-0 left-0 right-0 p-8 text-center">
  <h3 
    className={`${baskerville.variable} font-serif text-xl md:text-3xl font-bold text-white leading-tight`}
    style={{
      textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)",
      background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)",
      padding: "2rem 1.5rem 1.5rem",
      borderRadius: "1.5rem 1.5rem 0 0"
    }}
  >
    {title}
  </h3>
</div>
        
      </div>
   
  ) : featuredMedia?.video ? (
    <div className="relative h-full w-full bg-gray-800 flex items-center justify-center">
      {featuredMedia.video.poster ? (
        <img
          src={urlFor(featuredMedia.video.poster).width(1920).height(1450).quality(85).url()}
          alt={`Video poster for ${title}`}
          className="h-full w-full object-cover opacity-90"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700"></div>
      )}
      
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="rounded-full bg-primary-600/90 p-3 mb-4">
          <Play className="h-8 w-8 text-white" fill="white" />
        </div>
        
        {/* Enhanced title container for videos */}
        <div className="px-6 py-3 rounded-lg bg-black/40 backdrop-blur-sm">
          <h3 className={`${baskerville.variable} font-serif text-center text-xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg`}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  ) : (
    // Fallback if no media
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 p-6">
      <h3 className={`${baskerville.variable} font-serif text-center text-xl md:text-3xl font-bold text-primary-900`}>
        {title}
      </h3>
    </div>
  )}
</div>
        
        {/* Bottom content section - with date and language toggle moved here */}
        <div className="p-4 max-w-screen-xl mx-auto">
          {/* Meta information row */}
          <div className="flex items-center justify-between mb-3">
            {date && (
              <div className={`${sourceSans.variable} text-xs text-gray-600 flex items-center gap-1.5`}>
                <Calendar className="h-3.5 w-3.5 text-primary-500" />
                <DateComponent dateString={date} />
              </div>
            )}
            
            {/* Language indicator moved outside image */}
            {hasTranslation && (
              <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-600 flex items-center gap-1 border border-primary-100">
                <Languages className="h-3 w-3" />
                EN/SW
              </span>
            )}
          </div>
          
          {/* Language toggle button moved outside image */}
          {hasTranslation && (
            <div className="hidden">
              <LanguageToggle 
                hasTranslation={hasTranslation} 
                postId={_id} 
                englishContent={{title, excerpt, readMore: "Read More"}}
                swahiliContent={{title: titleSw || title, excerpt: excerptSw || excerpt, readMore: "Soma Zaidi"}}
                initialLanguage={initialLanguage}
              />
            </div>
          )}
          
          {/* Excerpt with improved styling */}
          {excerpt && (
            <p className={`${sourceSans.variable} text-sm text-gray-700 line-clamp-2 mb-4`}>
              {excerpt}
            </p>
          )}
          
          {/* Simple read more button */}
          <div className={`${sourceSans.variable} font-bold text-sm text-primary-600 flex items-center group-hover:text-primary-700`}>
            Read More
            <svg 
              className="ml-1.5 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Post;