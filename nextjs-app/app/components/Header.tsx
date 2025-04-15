'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Languages } from 'lucide-react';
import Link from 'next/link';
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
    en: 'blog',
    sw: 'blog',
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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all">
              <span className="font-display text-white text-xl">AK</span>
            </div>
            <span className="font-display text-xl font-bold text-primary-700 group-hover:text-primary-600 transition-colors">
              Amka Kijana
            </span>
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
              className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-700 px-4 py-2 rounded-lg transition-all border border-primary-100 hover:border-primary-200"
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
              className="flex items-center gap-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 p-2 rounded-lg transition-all border border-primary-100"
              aria-label={language === 'en' ? 'Switch to Swahili' : 'Switch to English'}
            >
              <Languages size={18} className="text-primary-600" />
            </button>
            
            <button
              className="p-2 rounded-lg hover:bg-primary-50 transition-colors text-neutral-700 hover:text-primary-600"
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
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg animate-fade-in">
            <nav className="flex flex-col gap-2 p-2">
              {Object.entries(navItems).map(([key, translations]) => (
                <Link
                  key={key}
                  href={`/${key === 'home' ? '' : key}`}
                  className="text-neutral-800 hover:bg-primary-50 px-4 py-3 rounded-md transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {translations[language]}
                </Link>
              ))}

              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-primary-700 bg-primary-50 px-4 py-3 rounded-md font-medium mt-2 hover:bg-primary-100 transition-colors"
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