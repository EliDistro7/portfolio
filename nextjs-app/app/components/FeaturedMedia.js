import CoverImage from "./CoverImage";
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

// Set up the image URL builder
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const FeaturedMedia = ({ mediaType, image, video, post }) => {
    console.log('media type', mediaType)
    console.log('post in feaatureMedia',post);

  if (!mediaType) return null;
  console.log('it reaches here', image)

  if (mediaType === 'image' && post.featuredMedia) {
    
    return (
      <div className="aspect-video overflow-hidden rounded-xl bg-gray-100">
         <img
                src={urlFor(post.featuredMedia.image).width(1200).height(1042).quality(90).url()}
                alt={(post.featuredMedia.image?.alt || post.featuredMedia.image?.alt || `Cover image for ${title}`)}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />
      </div>
    );
  }

  if (mediaType === 'video' && video?.asset) {
    // Generate poster image if there's an image available
    const posterUrl = image?.asset ? urlFor(image).width(1200).height(675).url() : undefined;
    
    // Generate video URL
    const videoUrl = video?.asset?.url;

    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <video 
          className="h-full w-full object-cover"
          controls
          poster={posterUrl}
        >
          <source 
            src={videoUrl} 
            type={`video/${video.asset.extension || 'mp4'}`} 
          />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Handle YouTube or Vimeo embeds if needed
  if (mediaType === 'video' && video?.url) {
    // Extract YouTube ID
    if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
      const videoId = video.url.includes('youtube.com')
        ? video.url.split('v=')[1]?.split('&')[0]
        : video.url.split('youtu.be/')[1];

      if (videoId) {
        return (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              className="absolute top-0 left-0 h-full w-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
    }

    // Extract Vimeo ID
    if (video.url.includes('vimeo.com')) {
      const videoId = video.url.split('vimeo.com/')[1];
      
      if (videoId) {
        return (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              className="absolute top-0 left-0 h-full w-full"
              src={`https://player.vimeo.com/video/${videoId}`}
              title="Vimeo video player"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }
    }
  }

  return null;
};

export default FeaturedMedia;