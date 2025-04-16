// app/components/post/PostHeader.jsx
import Link from "next/link";
import Avatar from "@/app/components/Avatar";
import DateComponent from "@/app/components/Date";
import Breadcrumb from "./Breadcrumb";
import LocalizedTitle from "@/app/components/LocalizedTitle"
import LocalizedExcerpt from "@/app/components/LocalizedExcerpt"

export default function PostHeader({ post }) {
    console.log('post', post)
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/' },
    { label: post.title, href: null, current: true }
  ];

  return (
    <div className="relative bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-6 md:mb-8" />

          {/* Title Section */}
          <div className="mb-8 md:mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4 md:mb-6">
            <LocalizedTitle titleEn={post.title} titleSw={post.titleSw} />
            </h1>
            
            {post.excerpt && (
              <p className="font-sans text-lg md:text-xl text-gray-600 mt-3 md:mt-4">
                
                <LocalizedExcerpt excerptEn={post.excerpt} excerptSw={post.excerptSw} />
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6 md:mt-8">
              {/* Author Info */}
              {post.author && (
                <div className="flex items-center">
                  <Avatar person={post.author} date={null} />
                  <div className="ml-3 md:ml-4">
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

              {/* Translation Badge 
              {post.hasTranslation && (
                <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs md:text-sm font-medium text-primary-800">
                  <svg className="mr-1 h-2 w-2 text-primary-600" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Swahili Available
                </span>
              )}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}