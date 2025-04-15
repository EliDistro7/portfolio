// LanguageToggle.jsx - Client component
'use client';

import { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';

const LanguageToggle = ({ hasTranslation, postId, englishContent, swahiliContent, initialLanguage = 'en' }) => {
  const [language, setLanguage] = useState(initialLanguage);
  
  // Update content when language changes
  useEffect(() => {
    if (!hasTranslation) return;
    
    const postContent = document.getElementById(`post-content-${postId}`);
    if (!postContent) return;
    
    // Get the content for the current language
    const content = language === 'en' ? englishContent : swahiliContent;
    
    // Update title
    const titleElement = postContent.querySelector('h3');
    if (titleElement) {
      titleElement.textContent = content.title;
    }
    
    // Hide/show Swahili title based on language
    const swahiliTitleElement = postContent.querySelector('h4');
    if (swahiliTitleElement) {
      swahiliTitleElement.style.display = language === 'en' ? 'block' : 'none';
    }
    
    // Update language availability badge
    const langBadge = postContent.querySelector('.rounded-full.bg-primary-100 span');
    if (langBadge) {
      langBadge.textContent = content.swahiliAvailable;
    }
    
    // Update excerpt
    const excerptElement = postContent.querySelector('p.text-gray-600');
    if (excerptElement && content.excerpt) {
      excerptElement.textContent = content.excerpt;
    }
    
    // Update "Read More" button
    const readMoreBtn = postContent.querySelector('a.inline-flex.items-center.rounded-full');
    if (readMoreBtn) {
      // Update only the text node (not the SVG)
      const textNodes = Array.from(readMoreBtn.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
      if (textNodes.length > 0) {
        textNodes[0].nodeValue = content.readMore;
      }
    }
    
    // Update media labels - Fix for video label
    const allMediaLabels = postContent.querySelectorAll('.flex.gap-2 span');
    
    // Find video label by checking for Film icon
    Array.from(allMediaLabels).forEach(span => {
      const svg = span.querySelector('.text-primary-500.h-3\\.5.w-3\\.5.mr-1');
      if (svg) {
        const pathElement = svg.querySelector('path');
        if (pathElement && pathElement.getAttribute('d') && pathElement.getAttribute('d').includes('film')) {
          // This is the video label
          const textNodes = Array.from(span.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
          if (textNodes.length > 0) {
            textNodes[0].nodeValue = content.videoLabel;
          }
        } else if (pathElement && pathElement.getAttribute('d') && pathElement.getAttribute('d').includes('music')) {
          // This is the audio label
          const textNodes = Array.from(span.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
          if (textNodes.length > 0) {
            textNodes[0].nodeValue = content.audioLabel;
          }
        }
      }
    });
  }, [language, hasTranslation, postId, englishContent, swahiliContent]);
  
  const toggleLanguage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLanguage(prevLang => prevLang === 'en' ? 'sw' : 'en');
  };
  
  if (!hasTranslation) return null;
  
  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-primary-700 shadow-md transition-all hover:bg-white hover:shadow-lg"
      aria-label={`Switch to ${language === 'en' ? 'Swahili' : 'English'}`}
    >
      <Languages className="h-4 w-4" />
      {language === 'en' ? 'Kiswahili' : 'English'}
    </button>
  );
};

export default LanguageToggle;