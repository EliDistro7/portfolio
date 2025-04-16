// app/components/post/PostContent.jsx
import FeaturedMedia from "@/app/components/FeaturedMedia";
import Gallery from "@/app/components/Gallery";
import LocalizedContent from "@/app/components/LocalizedContent";

export default function PostContent({ post }) {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <article className="prose prose-base md:prose-lg lg:prose-xl prose-headings:font-serif prose-headings:font-bold prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl mb-12 md:mb-16">
          {/* Featured Media */}
          <div className="mb-8 md:mb-12">
            <FeaturedMedia 
              mediaType={post.featuredMedia?.mediaType || 'image'} 
              image={post.featuredMedia?.image}
              video={post.featuredMedia?.video}
              post={post}
            />
          </div>
          
          {/* Content - Client Component */}
          <LocalizedContent contentEn={post.content} contentSw={post.contentSw} />
          
          {/* Gallery */}
          {post.gallery && post.gallery.length > 0 && (
            <div className="mt-8 md:mt-12">
              <Gallery gallery={post.gallery} />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}