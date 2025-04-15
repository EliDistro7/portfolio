
import { notFound } from "next/navigation";

import { Suspense } from "react";
import Link from "next/link";

import Avatar from "@/app/components/Avatar";
import CoverImage from "@/app/components/CoverImage";
import { MorePosts } from "@/app/components/Posts";
import PortableText from "@/app/components/PortableText";
import DateComponent from "@/app/components/Date";
import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';

// Define your custom fonts
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



/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props,
  parent,
) {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  };
}

// Video Component for video posts
const VideoPlayer = ({ video, coverImage }) => {
  if (!video?.asset) return null;
  
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      <video 
        className="h-full w-full object-cover"
        controls
        poster={coverImage?.asset?.url}
      >
        <source src={video.asset.url} type={`video/${video.asset.extension}`} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Gallery Component for displaying multiple images
const Gallery = ({ gallery }) => {
  if (!gallery || gallery.length === 0) return null;
  
  return (
    <div className="my-12">
      <h3 className={`${baskerville.variable} font-serif text-2xl font-bold mb-6`}>Gallery</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <img 
              src={item.image?.asset?.url}
              alt={item.alt || `Gallery image ${index + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
            {item.caption && (
              <p className={`${sourceSans.variable} font-sans text-sm text-gray-600 mt-2`}>{item.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default async function PostPage(props) {
  const params = await props.params;
  const [{ data: post }] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <div className={`${baskerville.variable} ${sourceSans.variable}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link href="/" className="font-sans text-sm text-gray-500 hover:text-primary-600">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <Link href="/posts" className="ml-1 font-sans text-sm text-gray-500 hover:text-primary-600 md:ml-2">
                      Posts
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 font-sans text-sm font-medium text-primary-600 md:ml-2">
                      {post.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Title Section */}
            <div className="mb-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="font-sans text-xl md:text-2xl text-gray-600 mt-4 mb-8">
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 mt-8">
                {/* Author Info */}
                {post.author && post.author.firstName && post.author.lastName && (
                  <div className="flex items-center">
                    <Avatar person={post.author} date={null} />
                    <div className="ml-4">
                      <p className="font-sans text-sm font-semibold text-gray-900">
                        {post.author.firstName} {post.author.lastName}
                      </p>
                      {post.date && (
                        <p className="font-sans text-sm text-gray-500">
                          <DateComponent dateString={post.date} />
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Translation Badge */}
                {post.hasTranslation && (
                  <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                    <svg className="mr-1.5 h-2 w-2 text-primary-600" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    Swahili Available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg lg:prose-xl prose-headings:font-serif prose-headings:font-bold prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl mb-16">
            {/* Featured Media */}
            <div className="not-prose mb-12">
              {post.mediaType === 'video' && post.video ? (
                <VideoPlayer video={post.video} coverImage={post.coverImage} />
              ) : post.coverImage ? (
                <div className="aspect-video overflow-hidden rounded-xl bg-gray-100">
                  <CoverImage image={post.coverImage} priority />
                </div>
              ) : null}
            </div>
            
            {/* Content */}
            {post.content?.length && (
              <div className="font-sans">
                <PortableText
                  value={post.content}
                />
              </div>
            )}
            
            {/* Gallery - Only show if exists */}
            {post.gallery && post.gallery.length > 0 && (
              <div className="not-prose">
                <Gallery gallery={post.gallery} />
              </div>
            )}
            
            {/* Additional Videos - Only show if exist */}
            {post.additionalVideos && post.additionalVideos.length > 0 && (
              <div className="not-prose my-12">
                <h3 className="font-serif text-2xl font-bold mb-6">Related Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.additionalVideos.map((video, index) => (
                    <div key={index} className="overflow-hidden rounded-lg bg-gray-50 p-4">
                      <div className="aspect-video overflow-hidden rounded-lg mb-4">
                        <video 
                          className="h-full w-full object-cover"
                          controls
                          poster={video.poster?.asset?.url}
                        >
                          <source src={video.file?.asset?.url || video.externalUrl} />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <h4 className="font-sans font-bold text-lg mb-2">{video.title}</h4>
                      {video.description && (
                        <p className="font-sans text-gray-600 text-sm">{video.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>

      {/* Share & Navigation Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
            {/* Share Buttons */}
            <div className="mb-6 md:mb-0">
              <p className="font-sans font-semibold text-gray-900 mb-3">Share this post</p>
              <div className="flex space-x-4">
                {/* Twitter/X */}
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`} 
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 hover:bg-blue-500 text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                {/* Facebook */}
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Back to All Posts Button */}
            <Link href="/" 
                  className="font-sans inline-flex items-center px-6 py-3 border border-primary-500 text-primary-600 bg-white rounded-lg hover:bg-primary-50 transition-colors font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto py-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">More Posts</h2>
          <Suspense fallback={<div className="text-center font-sans text-gray-500">Loading related posts...</div>}>
            {await MorePosts({ skip: post._id, limit: 3 })}
          </Suspense>
        </div>
      </div>
    </div>
  );
}