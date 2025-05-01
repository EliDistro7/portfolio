'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const { language } = useLanguage();
  const [isInView, setIsInView] = useState(false);

  // Observer to trigger animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Bilingual content
  const aboutContent = {
    heading: {
      en: "About Me",
      sw: "Kuhusu Mimi"
    },
    paragraphs: {
      en: [
        "I'm a passionate web developer and designer with expertise in creating modern, responsive websites and applications using the latest technologies like Next.js, React, and Tailwind CSS.",
        "As the chief developer at FutureHolders Company Limited, I've led the development of numerous successful projects across various sectors including e-commerce, NGOs, and corporate websites.",
        "My approach combines technical excellence with creative design, ensuring that every project not only functions flawlessly but also delivers an exceptional user experience."
      ],
      sw: [
        "Mimi ni mtaalamu wa utengenezaji wa tovuti na msanifu wa programu mwenye ujuzi wa kuunda tovuti na programu za kisasa zinazotumia teknolojia za hivi karibuni kama Next.js, React, na Tailwind CSS.",
        "Kama mtaalamu mkuu wa utengenezaji wa programu katika Kampuni ya FutureHolders Limited, nimeongoza utengenezaji wa miradi kadhaa iliyofanikiwa katika sekta mbalimbali ikijumuisha biashara mtandao, mashirika yasiyo ya kiserikali, na tovuti za mashirika.",
        "Mbinu yangu inaunganisha ubora wa kiufundi na ubunifu wa kisanii, kuhakikisha kuwa kila mradi si tu unafanya kazi vizuri lakini pia unatoa uzoefu bora kwa watumiaji."
      ]
    },
    categories: {
      en: {
        frontend: "Frontend",
        backend: "Backend",
        design: "Design",
        tools: "Tools"
      },
      sw: {
        frontend: "Frontend",
        backend: "Backend",
        design: "Usanifu",
        tools: "Zana"
      }
    }
  };

  // Skills with added icons and colors
  const skills = {
    frontend: [
      { name: 'React', icon: '⚛️', delay: 0 },
      { name: 'Next.js', icon: '🔺', delay: 0.1 },
      { name: 'Tailwind CSS', icon: '🌊', delay: 0.2 },
      { name: 'JavaScript', icon: '📜', delay: 0.3 },
      { name: 'TypeScript', icon: '🔷', delay: 0.4 },
      { name: 'HTML/CSS', icon: '🎨', delay: 0.5 }
    ],
    backend: [
      { name: 'Node.js', icon: '🟢', delay: 0 },
      { name: 'Express', icon: '🚂', delay: 0.1 },
      { name: 'MongoDB', icon: '🍃', delay: 0.2 },
      { name: 'MySQL', icon: '🐬', delay: 0.3 },
      { name: 'Firebase', icon: '🔥', delay: 0.4 },
      { name: 'REST API', icon: '🔌', delay: 0.5 }
    ],
    design: [
      { name: 'Figma', icon: '🎭', delay: 0 },
      { name: 'Adobe XD', icon: '🎯', delay: 0.1 },
      { name: 'Photoshop', icon: '📸', delay: 0.2 },
      { name: 'UI/UX', icon: '👁️', delay: 0.3 },
      { name: 'Responsive Design', icon: '📱', delay: 0.4 }
    ],
    tools: [
      { name: 'Git', icon: '🔄', delay: 0 },
      { name: 'GitHub', icon: '🐙', delay: 0.1 },
      { name: 'VS Code', icon: '💻', delay: 0.2 },
      { name: 'Vercel', icon: '▲', delay: 0.3 },
      { name: 'Netlify', icon: '🌐', delay: 0.4 },
      { name: 'AWS', icon: '☁️', delay: 0.5 }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: custom,
        duration: 0.4,
        type: "spring",
        stiffness: 100
      }
    })
  };

  // Color mappings for different skill categories
  const categoryColors = {
    frontend: {
      bg: 'bg-gradient-to-br from-blue-600 to-blue-800',
      text: 'text-blue-100',
      skillBg: 'bg-blue-700 bg-opacity-60 hover:bg-blue-600 hover:bg-opacity-70',
      icon: 'text-blue-300'
    },
    backend: {
      bg: 'bg-gradient-to-br from-purple-600 to-purple-800',
      text: 'text-purple-100',
      skillBg: 'bg-purple-700 bg-opacity-60 hover:bg-purple-600 hover:bg-opacity-70',
      icon: 'text-purple-300'
    },
    design: {
      bg: 'bg-gradient-to-br from-pink-600 to-pink-800',
      text: 'text-pink-100',
      skillBg: 'bg-pink-700 bg-opacity-60 hover:bg-pink-600 hover:bg-opacity-70',
      icon: 'text-pink-300'
    },
    tools: {
      bg: 'bg-gradient-to-br from-green-600 to-green-800',
      text: 'text-green-100',
      skillBg: 'bg-green-700 bg-opacity-60 hover:bg-green-600 hover:bg-opacity-70',
      icon: 'text-green-300'
    }
  };

  const SkillCategory = ({ title, skills, category }) => {
    const colors = categoryColors[category];
    
    return (
      <motion.div 
        className={`${colors.bg} p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105`}
        variants={itemVariants}
      >
        <h3 className={`text-xl font-bold mb-4 ${colors.text} flex items-center`}>
          {title}
          <span className="ml-2 inline-block w-8 h-1 bg-white bg-opacity-50 rounded"></span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <motion.span
              key={skill.name}
              custom={skill.delay}
              variants={skillVariants}
              initial={isInView ? "visible" : "hidden"}
              animate={isInView ? "visible" : "hidden"}
              className={`px-3 py-2 ${colors.skillBg} rounded-full text-sm font-medium flex items-center gap-1 transform transition-all duration-300 hover:-translate-y-1 cursor-default`}
            >
              <span className={`${colors.icon}`}>{skill.icon}</span>
              {skill.name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-500 mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500 mix-blend-screen filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-pink-500 mix-blend-screen filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent relative">
            {aboutContent.heading[language]}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
          </span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <motion.div 
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {aboutContent.paragraphs[language].map((paragraph, index) => (
              <motion.p 
                key={index} 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
            
            {/* Added CTA button */}
            <motion.div 
              variants={itemVariants}
              className="mt-8"
            >
              <a href="#contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span>Lets Work Together</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkillCategory 
                title={aboutContent.categories[language].frontend}
                skills={skills.frontend}
                category="frontend"
              />
              <SkillCategory 
                title={aboutContent.categories[language].backend}
                skills={skills.backend}
                category="backend"
              />
              <SkillCategory 
                title={aboutContent.categories[language].design}
                skills={skills.design}
                category="design"
              />
              <SkillCategory 
                title={aboutContent.categories[language].tools}
                skills={skills.tools}
                category="tools"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}