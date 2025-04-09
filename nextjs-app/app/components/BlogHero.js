'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

const blogContent = {
  title: {
    en: "Amka Kijana Blog",
    sw: "Blogu ya Amka Kijana"
  },
  subtitle: {
    en: "Insights on youth mental health, personal development, and community empowerment",
    sw: "Ufahamu kuhusu afya ya akili ya vijana, maendeleo ya kibinafsi, na uwezeshaji wa jamii"
  }
};

export default function BlogHero() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {blogContent.title[language]}
            </h1>
            <p className="font-sans text-xl md:text-2xl max-w-3xl">
              {blogContent.subtitle[language]}
            </p>
          </div>

         
        </div>
      </div>
    </section>
  );
}
