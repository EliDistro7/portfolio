import Link from "next/link";
import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import { morePostsQuery, allPostsQuery } from "@/sanity/lib/queries";
import { Post as PostType } from "@/sanity.types";
import DateComponent from "@/app/components/Date";
import OnBoarding from "@/app/components/Onboarding";

import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client'; // adjust path to your sanity client

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
 // console.log("post", post)
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
    <article
      key={_id}
      className="group relative flex flex-col gap-6 rounded-xl p-6 py-3 px-0 transition-all hover:bg-primary-50/50 hover:shadow-md"
    >
      {/* Meta section with date, author, and translation badge */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className={`${sourceSans.variable} font-sans text-sm font-semibold text-primary-600`}>
          <DateComponent dateString={date} />
        </div>
        
        {author && (
          <div className={`${sourceSans.variable} font-sans text-sm text-neutral-500`}>
            by {author.firstName} {author.lastName}
          </div>
        )}

        {hasTranslation && (
          <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs text-primary-800">
            Swahili Available
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Media section - only shown if media exists */}
        {(coverImage?.asset || video?.asset) && (
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 overflow-hidden rounded-lg relative aspect-video">
            {mediaType === 'video' && video?.asset ? (
              <>
                {/* Video thumbnail with play button */}
                <div className="h-full w-full bg-neutral-100 flex items-center justify-center">
                  <video 
                    className="h-full w-full object-cover"
                    poster={coverImage?.asset?.url}
                    muted
                    loop
                    playsInline
                  >
                    <source src={video.asset.url} type={`video/${video.asset.extension}`} />
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="h-12 w-12 rounded-full bg-primary-500/90 flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.8L16 10l-9.7 7.2V2.8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            ) : coverImage?.asset ? (
              // Regular image thumbnail
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100">
              {/* Next.js Image Component (recommended) */}
              <img
                src={urlFor(coverImage).width(1200).quality(80).url()}
                alt={coverImage.alt || 'Blog post cover image'}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                placeholder="blur"
                blurDataURL={urlFor(coverImage).width(20).quality(20).blur(50).url()}
              />
              
         
            </div>
            ) : null}
          </div>
        )}

        {/* Content section */}
        <div className="flex-1">
          <h3 className={`${baskerville.variable} font-serif text-2xl md:text-3xl font-bold leading-tight`}>
            <Link
              className="text-neutral-800 hover:text-primary-600 transition-colors"
              href={`/posts/${slug}`}
            >
              {title}
            </Link>
          </h3>

          {excerpt && (
            <p className={`${sourceSans.variable} font-sans mt-3 text-neutral-600 leading-relaxed line-clamp-3`}>
              {excerpt}
            </p>
          )}

          <div className="mt-4">
            <Link
              href={`/posts/${slug}`}
              className={`${sourceSans.variable} font-sans inline-flex items-center font-semibold text-primary-600 hover:text-primary-800 transition-colors`}
            >
              Read more
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

const Posts = ({
  children,
  heading,
  subHeading,
}) => (
  <div className="py-8 sm:py-8 lg:py-12">
    <div className="container mx-auto px-2 sm:px-2 lg:px-8">
      {heading && (
        <h2 className={`${baskerville.variable} font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900`}>
          {heading}
        </h2>
      )}
      {subHeading && (
        <p className={`${sourceSans.variable} font-sans mt-4 text-xl text-neutral-600 max-w-3xl`}>
          {subHeading}
        </p>
      )}
      <div className="mt-12 space-y-8 divide-y divide-primary-100/50">
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
      subHeading={''}
    >
      {data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  );
};