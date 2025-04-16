// app/components/post/RelatedPosts.jsx
import { Suspense } from "react";
import { MorePosts } from "@/app/components/Posts";

export default function RelatedPosts({ postId }) {
  return (
    <div className="border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">More Posts</h2>
        <Suspense fallback={
          <div className="text-center font-sans text-gray-500">
            Loading related posts...
          </div>
        }>
          <MorePosts skip={postId} limit={3} />
        </Suspense>
      </div>
    </div>
  );
}