'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectCard({ project, index }) {
  const [showImage, setShowImage] = useState(true);
  
  // Create an infinite loop between image and text
  useEffect(() => {
    // Initial staggered delay based on card index
    const startDelay = setTimeout(() => {
      // Start the infinite cycle
      const intervalId = setInterval(() => {
        setShowImage(prev => !prev);
      }, 6000); // Toggle every 6 seconds
      
      return () => clearInterval(intervalId);
    }, index * 300); // Stagger effect
    
    return () => clearTimeout(startDelay);
  }, [index]);

  // Handle container click to redirect to project URL
  const handleContainerClick = () => {
    window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="relative h-64 bg-gray-800 rounded-xl overflow-hidden shadow-md shadow-blue-500/20 transition-all cursor-pointer transform hover:scale-105"
      onClick={handleContainerClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-10"></div>
      
      <AnimatePresence mode="wait">
        {showImage ? (
          // Image View
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
            </div>
          </motion.div>
        ) : (
          // Text/Description View
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gray-900 p-4 flex flex-col"
          >
            <h3 className="text-xl font-bold text-blue-400 mb-2">{project.title}</h3>
            
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">{project.description}</p>
            
            <div className="flex flex-wrap gap-1 mt-auto mb-2">
              {project.technologies.slice(0, 3).map(tech => (
                <span key={tech} className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Link buttons - prevent propagation to keep their individual functionality */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-20" onClick={e => e.stopPropagation()}>
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Github size={18} className="text-white" />
          </a>
        )}
        <a 
          href={project.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
}