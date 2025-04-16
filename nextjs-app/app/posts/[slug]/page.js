// app/posts/[slug]/page.jsx
import { notFound } from "next/navigation";

import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import PostHeader from "@/app/components/PostHeader";
import PostContent from "@/app/components/PostContent";
import PostFooter from "@/app/components/PostFooter";
import RelatedPosts from "@/app/components/RelatedPosts";



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

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(props, parent) {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.featuredMedia?.image);

  return {
    authors: post?.author ? [{ name: `${post.author.firstName} ${post.author.lastName}` }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  };
}

export default async function PostPage(props) {
  const params = await props.params;
  const [{ data: post }] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  // Create share URLs on the server
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${post.slug.current}`;
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  return (
    <div className={`${baskerville.variable} ${sourceSans.variable}`}>
      <PostHeader post={post} />
      <PostContent post={post} />
      <PostFooter shareUrls={shareUrls} title={post.title} slug={post.title} />
      <RelatedPosts postId={post._id} />
    </div>
  );
}