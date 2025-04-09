import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import BlogHero from '@/app/components/BlogHero';
import { AllPosts } from '@/app/components/Posts';

const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baskerville'
});

const sourceSans = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-sans'
});

export default function BlogPage() {
  return (
    <div className={`${baskerville.variable} ${sourceSans.variable}`}>
      {/* Hero Section with Language Logic */}
      <BlogHero />

      {/* Main Content */}
      <main className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <AllPosts />
        </div>
      </main>
    </div>
  );
}
