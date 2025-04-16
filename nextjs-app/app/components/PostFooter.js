// app/components/post/PostFooter.jsx
import Link from "next/link";
import ShareButtons from "@/app/components/ShareButtons";

export default function PostFooter({ shareUrls }) {
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Share Buttons */}
          <div className="mb-6 md:mb-0">
            <p className="font-sans font-semibold text-gray-900 mb-3 text-center md:text-left">Share this post</p>
            <ShareButtons shareUrls={shareUrls} />
          </div>
          
          {/* Back to All Posts Button */}
          <Link href="/" 
                className="font-sans inline-flex items-center px-4 md:px-6 py-2 md:py-3 border border-primary-500 text-primary-600 bg-white rounded-lg hover:bg-primary-50 transition-colors font-medium text-sm md:text-base">
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
}