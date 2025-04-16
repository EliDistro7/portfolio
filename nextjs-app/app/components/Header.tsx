'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Languages } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const navItems = {
  home: {
    en: 'Home',
    sw: 'Nyumbani',
  },
  about: {
    en: 'About Us',
    sw: 'Kuhusu Sisi',
  },
  blog: {
    en: 'Blog',
    sw: 'Blog',
  },
  contact: {
    en: 'Contact',
    sw: 'Mawasiliano',
  },
};

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative">
            <div className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Amka Kijana Logo" 
                width={48} 
                height={48}
                className="object-contain"
              />
            </div>
            <span className="font-display  text-xl font-bold text-primary-700 group-hover:text-primary-600 transition-colors">
              Amka Kijana
            </span>
            <span className="absolute inset-0 rounded-lg -z-10 opacity-0 bg-primary-50 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {Object.entries(navItems).map(([key, translations]) => (
              <Link
                key={key}
                href={`/${key === 'home' ? '' : key}`}
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-2 py-1 relative group"
              >
                {translations[language]}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-lg transition-all border border-primary-100 hover:border-primary-200 hover:shadow-glow"
              aria-label={language === 'en' ? 'Switch to Swahili' : 'Switch to English'}
            >
              <Languages size={18} className="text-primary-600" />
              <span className="font-medium text-sm">
                {language === 'en' ? 'SW' : 'EN'}
              </span>
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 p-2 rounded-lg transition-all border border-primary-100 hover:shadow-glow"
              aria-label={language === 'en' ? 'Switch to Swahili' : 'Switch to English'}
            >
              <Languages size={18} className="text-primary-600" />
            </button>
            
            <button
              className="p-2 rounded-lg hover:bg-primary-50 transition-colors text-neutral-700 hover:text-primary-600 hover:shadow-soft"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-primary-600" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-layer animate-fade-in border border-primary-100">
            <nav className="flex flex-col gap-2 p-2">
              {Object.entries(navItems).map(([key, translations]) => (
                <Link
                  key={key}
                  href={`/${key === 'home' ? '' : key}`}
                  className="text-neutral-800 hover:bg-primary-50 px-4 py-3 rounded-md transition-colors font-medium flex items-center gap-2 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="w-1 h-0 bg-primary-500 group-hover:h-full transition-all duration-300 rounded-full"></span>
                  {translations[language]}
                </Link>
              ))}

              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-primary-700 bg-primary-50 px-4 py-3 rounded-md font-medium mt-2 hover:bg-primary-100 transition-colors hover:shadow-glow"
              >
                <Languages size={18} />
                <span>
                  {language === 'en' ? 'Switch to Swahili' : 'Badilisha kwa Kiingereza'}
                </span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;