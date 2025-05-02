// app/page.js
'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Send, X } from 'lucide-react';

// Import components
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectSection';
import ServicesSection from './components/sections/ServiceSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import ChatAssistant from './components/layout/ChatBot/index';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleScroll = () => {
    const sections = ['hero', 'about', 'projects', 'services', 'contact'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-gray-900 text-white">
      {/* Navigation */}
      <Navbar activeSection={activeSection} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
      
      {/* AI Chat Assistant */}
      <ChatAssistant />
    </main>
  );
}