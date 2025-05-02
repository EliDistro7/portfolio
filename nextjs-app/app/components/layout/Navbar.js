'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import Image from 'next/image';

export default function Navbar({ activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'sw' : 'en');

    
  };
  
  const navItems = [
    { id: 'hero', label: { en: 'Home', sw: 'Nyumbani' } },
    { id: 'about', label: { en: 'About', sw: 'Kuhusu' } },
    { id: 'projects', label: { en: 'Projects', sw: 'Miradi' } },
    { id: 'globe', label: 'Globe' }, 
    { id: 'services', label: { en: 'Services', sw: 'Huduma' } },

    { id: 'contact', label: { en: 'Contact', sw: 'Mawasiliano' } },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 group relative"
          >

            {/*
            <div className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Your Portfolio Logo" 
                width={48} 
                height={48}
                className="object-contain"
              />
            </div>
            */}
            <span className="font-baskerville text-xl font-bold text-blue-500 group-hover:text-blue-400 transition-colors">
              BARI KANENO
            </span>
            <span className="absolute inset-0 rounded-lg -z-10 opacity-0 bg-blue-900/30 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-gray-300 hover:text-blue-400 transition-colors font-medium px-2 py-1 relative group ${
                  activeSection === item.id ? 'text-blue-500' : ''
                }`}
              >
                {item.label[language]}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 bg-blue-900/50 hover:bg-blue-800 text-blue-400 px-4 py-2 rounded-lg transition-all border border-blue-800 hover:border-blue-700 hover:shadow-glow"
              aria-label={language === 'en' ? 'Switch to Swahili' : 'Switch to English'}
            >
              <Languages size={18} className="text-blue-500" />
              <span className="font-medium text-sm">
                {language === 'en' ? 'SW' : 'EN'}
              </span>
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-blue-900/50 hover:bg-blue-800 text-blue-400 p-2 rounded-lg transition-all border border-blue-800 hover:shadow-glow"
              aria-label={language === 'en' ? 'Switch to Swahili' : 'Switch to English'}
            >
              <Languages size={18} className="text-blue-500" />
            </button>
            
            <button
              className="p-2 rounded-lg hover:bg-blue-900/50 transition-colors text-gray-300 hover:text-blue-400 hover:shadow-soft"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-blue-500" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-gray-900/95 rounded-lg shadow-layer animate-fade-in border border-blue-900">
            <nav className="flex flex-col gap-2 p-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-gray-300 hover:bg-blue-900/50 px-4 py-3 rounded-md transition-colors font-medium flex items-center gap-2 group ${
                    activeSection === item.id ? 'text-blue-500 bg-blue-900/30' : ''
                  }`}
                >
                  <span className={`w-1 h-0 bg-blue-500 rounded-full transition-all duration-300 ${
                    activeSection === item.id ? 'h-full' : 'group-hover:h-full'
                  }`}></span>
                  {item.label[language]}
                </button>
              ))}

              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-blue-400 bg-blue-900/50 px-4 py-3 rounded-md font-medium mt-2 hover:bg-blue-800 transition-colors hover:shadow-glow"
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
}