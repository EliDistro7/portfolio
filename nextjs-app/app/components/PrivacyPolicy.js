'use client';

import { useLanguage } from '@/context/LanguageContext';
import { privacyContent } from '@/privacy/index';
import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Define your custom fonts
const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-baskerville'
});

const sourceSans = Source_Sans_Pro({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-source-sans'
});

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const content = privacyContent[language];
  const [activeSection, setActiveSection] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Helper function to render content lists
  const renderList = (items) => {
    return items.map((item, index) => (
      <li key={index} className="mb-3">
        {item.bold ? (
          <span>
            <span className="font-bold">{item.bold}:</span> {item.text}
          </span>
        ) : (
          <span>{item}</span>
        )}
      </li>
    ));
  };

  // Toggle section visibility
  const toggleSection = (sectionTitle) => {
    if (activeSection === sectionTitle) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionTitle);
    }
  };

  // Create table of contents from content structure
  const sections = [
    'introduction',
    'informationWeCollect',
    'howWeUseInfo',
    'legalBasis',
    'infoSharing',
    'youthProtection',
    'dataSecurity',
    'yourRights',
    'dataRetention',
    'internationalTransfers',
    'childrenPrivacy',
    'changes',
    'contactUs',
    'governingLaw'
  ];

  return (
    <div className={`${baskerville.variable} ${sourceSans.variable}`}>
      <motion.div 
        className="container mx-auto py-8 max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8 text-center">
          <h1 className="text-heading-1 font-heading text-primary-700 mb-2">{content.title}</h1>
          <p className="text-neutral-600">{content.lastUpdated}</p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div variants={itemVariants} className="mb-10 p-6 bg-neutral-50 rounded-lg shadow-soft">
          <h2 className="text-lg font-bold mb-4 text-primary-600 border-b border-primary-200 pb-2">
            {language === 'en' ? 'Quick Navigation' : 'Urambazaji wa Haraka'}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <li key={section}>
                <button
                  onClick={() => {
                    const element = document.getElementById(section);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(section);
                    }
                  }}
                  className="text-secondary-600 hover:text-primary-500 hover:underline text-left transition-colors w-full truncate"
                >
                  {content[section].title}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-10">
          {/* Introduction */}
          <motion.section id="introduction" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">{content.introduction.title}</h2>
            {content.introduction.content.map((paragraph, index) => (
              <p key={index} className="mb-4 text-neutral-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.section>

          {/* Information We Collect */}
          <motion.section id="informationWeCollect" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.informationWeCollect.title}
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary-600 mb-3">
                {content.informationWeCollect.personalInfo.title}
              </h3>
              <p className="mb-4 text-neutral-800">
                {content.informationWeCollect.personalInfo.content}
              </p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                {renderList(content.informationWeCollect.personalInfo.items)}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-primary-600 mb-3">
                {content.informationWeCollect.automaticInfo.title}
              </h3>
              <p className="mb-4 text-neutral-800">
                {content.informationWeCollect.automaticInfo.content}
              </p>
              <ul className="list-disc pl-6 text-neutral-700 space-y-2">
                {renderList(content.informationWeCollect.automaticInfo.items)}
              </ul>
            </div>
          </motion.section>

          {/* How We Use Your Information */}
          <motion.section id="howWeUseInfo" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.howWeUseInfo.title}
            </h2>
            <p className="mb-4 text-neutral-800">{content.howWeUseInfo.content}</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              {renderList(content.howWeUseInfo.items)}
            </ul>
          </motion.section>

          {/* Legal Basis for Processing */}
          <motion.section id="legalBasis" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.legalBasis.title}
            </h2>
            <p className="mb-4 text-neutral-800">{content.legalBasis.content}</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              {content.legalBasis.items.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </motion.section>

          {/* Information Sharing and Disclosure */}
          <motion.section id="infoSharing" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.infoSharing.title}
            </h2>
            <p className="mb-4 text-neutral-800">{content.infoSharing.content}</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              {renderList(content.infoSharing.items)}
            </ul>
            <p className="mt-4 text-neutral-800 font-medium">
              {content.infoSharing.additional}
            </p>
          </motion.section>

          {/* Data Protection for Youth */}
          <motion.section id="youthProtection" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.youthProtection.title}
            </h2>
            <p className="mb-4 text-neutral-800">{content.youthProtection.content}</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              {content.youthProtection.items.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </motion.section>

          {/* Data Security */}
          <motion.section id="dataSecurity" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.dataSecurity.title}
            </h2>
            <p className="mb-4 text-neutral-800">{content.dataSecurity.content}</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              {content.dataSecurity.items.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </motion.section>

          {/* Your Rights */}
          <motion.section id="yourRights" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.yourRights.title}
            </h2>
            <p className="mb-4 text-neutral-800">{content.yourRights.content}</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              {content.yourRights.items.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-neutral-800">
              {content.yourRights.additional}
            </p>
          </motion.section>

          {/* Data Retention */}
          <motion.section id="dataRetention" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.dataRetention.title}
            </h2>
            {content.dataRetention.content.map((paragraph, index) => (
              <p key={index} className="mb-4 text-neutral-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.section>

          {/* International Data Transfers */}
          <motion.section id="internationalTransfers" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.internationalTransfers.title}
            </h2>
            <p className="text-neutral-800">{content.internationalTransfers.content}</p>
          </motion.section>

          {/* Children's Privacy */}
          <motion.section id="childrenPrivacy" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.childrenPrivacy.title}
            </h2>
            <p className="mb-4 text-neutral-800">{content.childrenPrivacy.content}</p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              {content.childrenPrivacy.items.map((item, index) => (
                <li key={index} className="mb-2">{item}</li>
              ))}
            </ul>
          </motion.section>

          {/* Changes to This Privacy Policy */}
          <motion.section id="changes" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.changes.title}
            </h2>
            <p className="text-neutral-800">{content.changes.content}</p>
          </motion.section>

          {/* Contact Us */}
          <motion.section id="contactUs" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.contactUs.title}
            </h2>
            {content.contactUs.content.map((line, index) => (
              <p key={index} className="mb-2 text-neutral-800" 
                 dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </motion.section>

          {/* Governing Law */}
          <motion.section id="governingLaw" variants={itemVariants} className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-heading-2 font-bold text-primary-700 mb-4">
              {content.governingLaw.title}
            </h2>
            <p className="text-neutral-800">{content.governingLaw.content}</p>
          </motion.section>

          {/* Footer */}
          <motion.div variants={itemVariants} className="bg-primary-50 p-6 rounded-lg border-l-4 border-primary-500 mt-10">
            <p className="text-neutral-800 font-medium">{content.footer}</p>
          </motion.div>

          {/* Back to top button */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mt-8"
          >
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              ↑ {language === 'en' ? 'Back to Top' : 'Rudi Juu'}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;