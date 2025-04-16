// TeamSection.jsx - Client component
'use client';

import { useState } from 'react';
import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import { LinkedinIcon, TwitterIcon, GlobeIcon, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

// Define your custom fonts
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

const TeamMember = ({ member, isExpanded, onToggle }) => {
  return (
    <div 
      className={`group transition-all duration-500 h-full ${
        isExpanded ? 'md:col-span-2 row-span-2' : 'md:col-span-1'
      }`}
    >
      <div 
        onClick={onToggle}
        className={`relative h-full overflow-hidden rounded-2xl border border-gray-100 
          ${isExpanded ? 'shadow-xl' : 'shadow-sm hover:shadow-lg'} 
          transition-all duration-300 bg-white flex flex-col`}
      >
        {/* Image Container */}
        <div className={`relative ${isExpanded ? 'h-64 md:h-80' : 'h-48 md:h-60'} overflow-hidden`}>
          {member.image ? (
            <img
              src={member.image}
              alt={`${member.name}, ${member.title}`}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center">
              <svg className="h-16 w-16 text-primary-200 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
        </div>
        
        {/* Content Container */}
        <div className="flex-1 flex flex-col p-5 md:p-6">
          <h3 className={`${baskerville.variable} font-display text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors`}>
            {member.name}
          </h3>
          
          <p className={`${sourceSans.variable} text-sm md:text-base font-medium text-gray-600 mt-1 mb-3`}>
            {member.title}
          </p>
          
          {isExpanded && (
            <div className="mt-2 space-y-4 flex-1">
              <p className={`${sourceSans.variable} text-gray-700 text-sm md:text-base leading-relaxed`}>
                {member.bio || "A dedicated team member with expertise in their field."}
              </p>
              
              <div className="pt-4 mt-auto">
                <div className="flex space-x-3">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 p-2 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-300"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  )}
                  
                  {member.twitter && (
                    <a 
                      href={member.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 p-2 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-300"
                      aria-label={`${member.name}'s Twitter profile`}
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                  )}
                  
                  {member.website && (
                    <a 
                      href={member.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 p-2 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-300"
                      aria-label={`${member.name}'s website`}
                    >
                      <GlobeIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
          
       
        </div>
      </div>
    </div>
  );
};

const TeamSection = ({ teamMembers = [], title = "Our Leadership" }) => {
  const [expandedId, setExpandedId] = useState(null);
  
  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };
  
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <h2 className={`${baskerville.variable} font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4`}>
            {title}
          </h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className={`${sourceSans.variable} text-lg text-gray-600 leading-relaxed`}>
            Meet the dedicated individuals who guide our organization with vision and purpose.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              member={member}
              isExpanded={expandedId === index}
              onToggle={() => toggleExpand(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;