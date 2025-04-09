// components/CallToAction.tsx
'use client';

import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const CallToAction = () => {
  const { language } = useLanguage();

  // Bilingual content
  const ctaContent = {
    heading: {
      en: "Join Our Movement",
      sw: "Jiunge na Harakati Yetu"
    },
    subheading: {
      en: "Empower the next generation of youth leaders",
      sw: "Wasaidia kizazi kijacho cha viongozi wa vijana"
    },
    button: {
      en: "Get Involved",
      sw: "Shiriki Sasa"
    }
  };

  return (
    <section className="relative bg-radial-orange overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Heading with pulse glow animation */}
          <h2 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-800 mb-6 animate-pulse-glow`}>
            {ctaContent.heading[language]}
          </h2>
          
          {/* Subheading */}
          <p className={`font-sans text-xl md:text-2xl text-neutral-700 max-w-3xl mx-auto mb-10`}>
            {ctaContent.subheading[language]}
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className={`font-heading inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-glow`}
            >
              {ctaContent.button[language]}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/about"
              className={`font-heading inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-primary-600 border-2 border-primary-500 px-8 py-4 rounded-lg transition-all duration-300`}
            >
              {language === 'en' ? 'Learn More' : 'Jifunze Zaidi'}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary-400/20 blur-3xl"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-secondary-400/20 blur-3xl"></div>
    </section>
  );
};