import { Play, Calendar, User, Languages, Music, Film, Image } from "lucide-react";
import { client } from '@/sanity/lib/client';
import Link from "next/link";
import DateComponent from "@/app/components/Date";
import imageUrlBuilder from '@sanity/image-url';
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

// Set up image builder
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const Post = ({ post }) => {
  console.log('post', post)
  const { 
    _id, 
    title,
    titleSw,
    slug,
    excerpt,
    excerptSw,
    date,
    hasTranslation = false,
    author,
    featuredMedia,
    coverImage,
    gallery,
    additionalVideos,
    status
  } = post;

  // Determine media type and content
  const mediaType = featuredMedia?.mediaType || (coverImage ? "image" : null);
  const hasGallery = gallery && gallery.length > 0;
  const hasAdditionalVideos = additionalVideos && additionalVideos.length > 0;

  // Function to render appropriate media icon based on type
  const renderMediaTypeIcon = () => {
    switch(mediaType) {
      case 'video':
        return <Film className="h-10 w-10 text-white" />;
      case 'audio':
        return <Music className="h-10 w-10 text-white" />;
      case 'image':
      default:
        return hasGallery ? 
          <div className="flex items-center">
            <Image className="h-8 w-8 text-white" />
            <span className="ml-1 font-bold text-white">{gallery.length}</span>
          </div> : null;
    }
  };

  return (
    <Link href={`/posts/${slug.current}`} className="block">
      <article
        key={_id}
        className="group relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/20"
      >
        {/* Media Container with enhanced aesthetics */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
          {coverImage?.asset || featuredMedia?.image?.asset ? (
            <div className="relative h-full w-full">
              <img
                src={urlFor(coverImage || featuredMedia.image).width(1200).height(1042).quality(90).url()}
                alt={(coverImage?.alt || featuredMedia?.image?.alt || `Cover image for ${title}`)}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Media type indicator */}
              {mediaType && (
                <div className="absolute top-4 right-4 rounded-full bg-primary-600/80 p-2 backdrop-blur-sm">
                  {renderMediaTypeIcon()}
                </div>
              )}
              
              {/* Caption if available */}
              {(coverImage?.caption || featuredMedia?.image?.caption) && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-sm text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {coverImage?.caption || featuredMedia?.image?.caption}
                </div>
              )}
            </div>
          ) : featuredMedia?.video ? (
            <div className="relative h-full w-full bg-gray-800 flex items-center justify-center">
              {featuredMedia.video.poster ? (
                <img
                  src={urlFor(featuredMedia.video.poster).width(1200).height(675).quality(90).url()}
                  alt={`Video poster for ${title}`}
                  className="h-full w-full object-cover opacity-80"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700"></div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-primary-600/80 p-4 shadow-lg backdrop-blur-sm">
                  <Play className="h-10 w-10 text-white" fill="white" />
                </div>
              </div>
            </div>
          ) : featuredMedia?.audio ? (
            <div className="relative h-full w-full bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center">
              {featuredMedia.audio.coverImage ? (
                <img
                  src={urlFor(featuredMedia.audio.coverImage).width(1200).height(675).quality(90).url()}
                  alt={`Audio cover for ${title}`}
                  className="h-full w-full object-cover opacity-80"
                  loading="lazy"
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-primary-600/80 p-4 shadow-lg backdrop-blur-sm">
                  <Music className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          ) : (
            // Fallback if no media
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
              <svg className="h-20 w-20 text-primary-300 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-13a.5.5 0 00-.5-.5h-9z" />
                <path d="M8 6.5A.5.5 0 018.5 6h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
                <path d="M8 9.5A.5.5 0 018.5 9h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
                <path d="M8 12.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
              </svg>
            </div>
          )}
          
          {/* Media count indicators */}
          {hasGallery && (
            <div className="absolute bottom-4 left-4 flex items-center rounded-full bg-black/60 px-3 py-1.5 text-white backdrop-blur-sm">
              <Image className="h-4 w-4 mr-1.5" />
              <span className="text-xs font-semibold">{gallery.length} {gallery.length === 1 ? 'Image' : 'Images'}</span>
            </div>
          )}
          
          {hasAdditionalVideos && (
            <div className="absolute bottom-4 right-4 flex items-center rounded-full bg-black/60 px-3 py-1.5 text-white backdrop-blur-sm">
              <Film className="h-4 w-4 mr-1.5" />
              <span className="text-xs font-semibold">{additionalVideos.length} {additionalVideos.length === 1 ? 'Video' : 'Videos'}</span>
            </div>
          )}
        </div>
        
        {/* Content Section with enhanced styling */}
        <div className="p-6">
          {/* Title with improved typography */}
          <h3 className={`font-display text-2xl md:text-2xl font-bold leading-tight mb-3 text-gray-900 group-hover:text-primary-700 transition-colors duration-300 ${baskerville.variable}`}>
            {title}
          </h3>
          
          {/* Add Swahili title if available */}
          {hasTranslation && titleSw && (
            <h4 className={`font-display text-lg text-primary-600 mb-3 ${baskerville.variable}`}>
              {titleSw}
            </h4>
          )}
          
          {/* Meta information with refined styling */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {date && (
              <div className={`text-sm font-medium text-gray-600 flex items-center gap-1.5 ${sourceSans.variable}`}>
                <Calendar className="h-4 w-4 text-primary-500" />
                <DateComponent dateString={date} />
              </div>
            )}
            
            {author && (
              <div className={`text-sm font-medium text-gray-600 flex items-center gap-1.5 ${sourceSans.variable}`}>
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
            
            {status && status !== 'published' && (
              <span className="rounded-full bg-yellow-100 border border-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-700">
                {status}
              </span>
            )}
          </div>
          
          {/* Excerpt with improved styling */}
          {excerpt && (
            <p className={`text-base text-gray-600 mb-5 line-clamp-3 ${sourceSans.variable}`}>
              {excerpt}
            </p>
          )}
          
          {/* Action Button with animation */}
          <div className="flex items-center justify-between">
            <Link
              href={`/posts/${slug.current}`}
              className={`inline-flex items-center rounded-full bg-primary-600 px-5 py-2.5 font-bold text-white shadow-sm transition-all duration-300 hover:bg-primary-700 hover:shadow-md hover:shadow-primary-300/20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${sourceSans.variable}`}
              aria-label={`Read more about ${title}`}
            >
              Read More
              <svg 
                className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            
            {/* Content indicators */}
            <div className="flex gap-2">
              {mediaType === "video" && (
                <span className="text-xs text-gray-500 flex items-center">
                  <Film className="h-3.5 w-3.5 mr-1 text-primary-500" />
                  Video
                </span>
              )}
              {mediaType === "audio" && (
                <span className="text-xs text-gray-500 flex items-center">
                  <Music className="h-3.5 w-3.5 mr-1 text-primary-500" />
                  Audio
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Post;