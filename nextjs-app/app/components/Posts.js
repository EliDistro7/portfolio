import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import OnBoarding from "@/app/components/Onboarding";
import Post from './Post';
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

// Updated queries with complete post fields
export const morePostsQuery = `*[_type == "post"] [${0}...${5}] {
  _id,
  title,
  titleSw,
  slug,
  excerpt,
  excerptSw,
  date,
  content,
  contentSw,
  hasTranslation,
  status,
  author->{
    firstName,
    lastName,
    picture
  },
  "coverImage": featuredMedia.image,
  featuredMedia {
    mediaType,
    image,
    video {
      file {
        asset->
      },
      externalUrl,
      poster
    },
    audio {
      file {
        asset->
      },
      externalUrl,
      coverImage
    }
  },
  gallery[] {
    image,
    alt,
    caption
  },
  additionalVideos[] {
    title,
    file {
      asset->
    },
    externalUrl,
    poster,
    description
  }
}`;

export const allPostsQuery = `*[_type == "post"] {
  _id,
  title,
  titleSw,
  slug,
  excerpt,
  excerptSw,
  date,
  content,
  contentSw,
  hasTranslation,
  status,
  author->{
    firstName,
    lastName,
    picture
  },
  "coverImage": featuredMedia.image,
  featuredMedia {
    mediaType,
    image,
    video {
      file {
        asset->
      },
      externalUrl,
      poster
    },
    audio {
      file {
        asset->
      },
      externalUrl,
      coverImage
    }
  },
  gallery[] {
    image,
    alt,
    caption
  },
  additionalVideos[] {
    title,
    file {
      asset->
    },
    externalUrl,
    poster,
    description
  }
}`;

const Posts = ({
  children,
  heading,
  subHeading,
}) => (
  <div className="container mx-auto px-4">
    {heading && (
      <h2 className={`text-3xl font-bold mb-2 ${baskerville.className}`}>
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className={`text-lg mb-6 ${sourceSans.className}`}>
        {subHeading}
      </p>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  </div>
);

export const MorePosts = async ({
  skip,
  limit,
}) => {
  const { data } = await sanityFetch({
    query: morePostsQuery,
    params: { skip, limit },
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.map((post) => <Post key={post._id} post={post} urlFor={urlFor} />)}
    </div>
  );
};

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });
  
  if (!data || data.length === 0) {
    return (
      <div className="py-4 text-center">
        <h2 className={`${baskerville.variable} font-serif text-2xl text-gray-700`}>No posts found</h2>
        <p className="mt-4 text-gray-500">Check back soon for new content.</p>
      </div>
    );
  }
  
  return (
    <section className="relative py-12 bg-gradient-to-b from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-100 via-primary-500 to-primary-100"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className={`${baskerville.variable} font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4`}>
            Featured Stories
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Discover our latest articles, stories, and media from across the region
          </p>
        </div>
        
        {/* Posts grid with responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.map((post) => (
            <div key={post._id} className="h-full">
              <Post post={post} />
            </div>
          ))}
        </div>
        
        {/* Optional "View all" link if you have many posts */}
        {data.length > 6 && (
          <div className="mt-12 text-center">
            <a 
              href="/all-stories" 
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors duration-300"
            >
              View All Stories
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Posts;