

import { Play, Calendar, User, Languages } from "lucide-react";
import { client } from '@/sanity/lib/client';

import Link from "next/link";
import DateComponent from "@/app/components/Date";
import imageUrlBuilder from '@sanity/image-url';
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';

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




const Post = ({ post }) => {
  const { 
    _id, 
    title, 
    slug, 
    excerpt, 
    date, 
    coverImage, 
    mediaType, 
    hasTranslation, 
    video,
    author 
  } = post;
  
  

  return (
    <Link href={`/posts/${slug}`} className="block">
      <article
        key={_id}
        className="group relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/20"
     
      >
        {/* Media Container with enhanced aesthetics */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
          {mediaType === 'video' && video?.asset ? (
            <>
              {/* Video with enhanced play button overlay */}
              <video 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                poster={coverImage?.asset?.url}
                muted
                loop
                playsInline
              >
                <source src={video.asset.url} type={`video/${video.asset.extension}`} />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 opacity-80 transition-opacity duration-300 group-hover:opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-primary-500/90 flex items-center justify-center transform transition-all duration-500 shadow-lg group-hover:scale-110 group-hover:bg-primary-600">
                  <Play className="h-8 w-8 text-white fill-current" />
                </div>
              </div>
              {/* Video indicator badge with improved styling */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
                <Play className="h-4 w-4 text-primary-300" />
                <span className="text-xs font-medium text-white">Video</span>
              </div>
            </>
          ) : coverImage?.asset ? (
            // Image with subtle gradient overlay
            <div className="relative h-full w-full">
              <img
                src={urlFor(coverImage).width(1200).height(675).quality(90).url()}
                alt={coverImage.alt || `Cover image for ${title}`}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ) : (
            // Improved fallback if no media
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
              <svg className="h-20 w-20 text-primary-300 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-13a.5.5 0 00-.5-.5h-9z" />
                <path d="M8 6.5A.5.5 0 018.5 6h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
                <path d="M8 9.5A.5.5 0 018.5 9h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
                <path d="M8 12.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Content Section with enhanced styling */}
        <div className="p-6">
          {/* Title with improved typography */}
          <h3 className={`${baskerville.variable} font-display text-2xl md:text-3xl font-bold leading-tight mb-3 text-gray-900 group-hover:text-primary-700 transition-colors duration-300`}>
            {title}
          </h3>
          
          {/* Meta information with refined styling */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className={`${sourceSans.variable} font-sans text-sm font-medium text-gray-600 flex items-center gap-1.5`}>
              <Calendar className="h-4 w-4 text-primary-500" />
              <DateComponent dateString={date} />
            </div>
            
            {author && (
              <div className={`${sourceSans.variable} font-sans text-sm font-medium text-gray-600 flex items-center gap-1.5`}>
                <User className="h-4 w-4 text-primary-500" />
                <span>{author.firstName} {author.lastName}</span>
              </div>
            )}
            
            {hasTranslation && (
              <span className="rounded-full bg-primary-100 border border-primary-200 px-3 py-1 text-xs font-semibold text-primary-700 flex items-center gap-1.5 shadow-sm">
                <Languages className="h-3.5 w-3.5" />
                Swahili Available
              </span>
            )}
          </div>
          
          {/* Excerpt with improved styling */}
          {excerpt && (
            <p className={`${sourceSans.variable} font-sans text-base text-gray-600 mb-5 line-clamp-2`}>
              {excerpt}
            </p>
          )}
          
          {/* Action Button with animation */}
          <div 
            className="inline-flex items-center"
            
          >
            <Link
              href={`/posts/${slug}`}
              className={`${sourceSans.variable} font-sans inline-flex items-center rounded-full bg-primary-600 px-5 py-2.5 font-bold text-white shadow-sm transition-all duration-300 hover:bg-primary-700 hover:shadow-md hover:shadow-primary-300/20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              aria-label={`Read more about ${title}`}
            >
              Read More
              <svg 
                className={`ml-2 h-4 w-4 transition-transform duration-300 `} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Post;