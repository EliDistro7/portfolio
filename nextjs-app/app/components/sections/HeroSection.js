// app/components/sections/HeroSection.jsx
'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { language } = useLanguage();

  // Bilingual content
  const heroContent = {
    heading: {
      en: "Web Developer & Designer",
      sw: "Mtengenezaji wa Tovuti & Msanii"
    },
    subheading: {
      en: "Crafting digital experiences that merge technology with creativity",
      sw: "Kutengeneza uzoefu wa kidijitali unaochanganya teknolojia na ubunifu"
    },
    buttons: {
      viewWork: {
        en: "View My Work",
        sw: "Tazama Kazi Zangu"
      },
      getInTouch: {
        en: "Get In Touch",
        sw: "Wasiliana Nami"
      }
    },
    altText: {
      portrait: {
        en: "Developer Portrait",
        sw: "Picha ya Mtengenezaji"
      },
      scrollDown: {
        en: "Scroll down",
        sw: "Sogeza chini"
      }
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent_80%)]"></div>
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {heroContent.heading[language]}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                {heroContent.subheading[language]}
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors font-medium"
                >
                  {heroContent.buttons.viewWork[language]}
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-transparent border border-blue-600 rounded-full hover:bg-blue-900 hover:bg-opacity-30 transition-colors font-medium"
                >
                  {heroContent.buttons.getInTouch[language]}
                </button>
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2 py-8 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                  <img 
                    src="/bari1.jpg" 
                    alt={heroContent.altText.portrait[language]} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 bg-gray-900 p-3 rounded-lg shadow-lg">
                <div className="text-3xl">💻</div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection('about')} aria-label={heroContent.altText.scrollDown[language]}>
            <ChevronDown size={32} className="text-blue-500" />
          </button>
        </div>
      </div>
    </section>
  );
}