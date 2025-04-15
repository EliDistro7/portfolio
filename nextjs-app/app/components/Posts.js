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
    return <OnBoarding />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((post) => (
        <Post key={post._id} post={post} urlFor={urlFor} />
      ))}
    </div>
  );
};

export default Posts;