

import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { morePostsQuery, allPostsQuery } from "@/sanity/lib/queries";

import OnBoarding from "@/app/components/Onboarding";
import Post from './Post';
import { client } from '@/sanity/lib/client';

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







const Posts = ({
  children,
  heading,
  subHeading,
}) => (
  <div className="py-8 sm:py-10 lg:py-12">
    <div className="container mx-auto px-4">
      {heading && (
        <h2 className={`${baskerville.variable} font-serif text-4xl sm:text-5xl font-bold text-neutral-900 mb-4`}>
          {heading}
        </h2>
      )}
      {subHeading && (
        <p className={`${sourceSans.variable} font-sans text-xl text-neutral-600 max-w-3xl mb-10`}>
          {subHeading}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
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
    <Posts heading={`Recent Posts (${data?.length})`}>
      {data?.map((post) => <Post key={post._id} post={post} />)}
    </Posts>
  );
};

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  return (
    <Posts
      heading="Updates/News"
      subHeading="Latest information and updates from Us"
    >
      {data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  );
};