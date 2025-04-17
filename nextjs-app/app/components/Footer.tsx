// components/Footer.tsx
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import Link from 'next/link';

import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import Image from 'next/image';



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

const Footer = () => {
  const { language, toggleLanguage } = useLanguage();

  // Bilingual content
  const footerContent = {
    mission: {
      en: "Empowering youth through mental health awareness and personal development",
      sw: "Kuwawezesha vijana kupitia ufahamu wa afya ya akili na maendeleo ya kibinafsi"
    },
    links: {
      en: "Quick Links",
      sw: "Viungo Haraka"
    },
    contact: {
      en: "Contact Us",
      sw: "Wasiliana Nasi"
    },
    newsletter: {
      en: "Stay Updated",
      sw: "Kubali Habari"
    },
    copyright: {
      en: "All rights reserved",
      sw: "Haki zote zimehifadhiwa"
    },
    language: {
      en: "Swahili",
      sw: "English"
    }
  };

  const navLinks = [
    {
      en: "Home",
      sw: "Nyumbani",
      href: "/"
    },
    {
      en: "About",
      sw: "Kuhusu",
      href: "/about"
    },
   
    {
      en: "Blog",
      sw: "Blogu",
      href: "/blog"
    },
    {
      en: "Contact",
      sw: "Mawasiliano",
      href: "/contact"
    }
  ];

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://facebook.com/amkakijana"
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com/amkakijana"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com/amkakijana"
    },
    {
      icon: <Youtube className="h-5 w-5" />,
      href: "https://youtube.com/amkakijana"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/company/amkakijana"
    }
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand column */}
               {/* Logo */}
               <Link href="/" className="flex items-center gap-2 group relative">
            <div className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="Amka Kijana Logo" 
                width={48} 
                height={48}
                className="object-contain rounded-full"
              />
            </div>
            <div className="font-display  relative h-12 w-auto text-xl font-bold text-primary-700 group-hover:text-primary-600 transition-colors">
              Amka Kijana
            </div>
            <span className="absolute inset-0 rounded-lg -z-10 opacity-0 bg-primary-50 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>

          {/* Quick links */}
          <div>
            <h3 className={`${baskerville.variable} font-serif text-lg font-bold mb-4`}>
              {footerContent.links[language]}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`${sourceSans.variable} font-sans text-neutral-300 hover:text-primary-400 transition-colors`}
                  >
                    {link[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-8">
            <div>
              <h3 className={`${baskerville.variable} font-serif text-lg font-bold mb-4`}>
                {footerContent.contact[language]}
              </h3>
              <address className={`${sourceSans.variable} font-sans text-neutral-300 not-italic`}>
                <p className="mb-2">Dar es Salaam, Tanzania</p>
                <p className="mb-2">
                  <Link href="mailto:info@amkakijana.org" className="hover:text-primary-400 transition-colors">
                    info@amkakijana.org
                  </Link>
                </p>
                <p>
                  <Link href="tel:+255748908001 " className="hover:text-primary-400 transition-colors">
                    +255 748 908 001 
                  </Link>
                </p>
              </address>
            </div>

            <div>
              <h3 className={`${baskerville.variable} font-serif text-lg font-bold mb-4`}>
                {footerContent.newsletter[language]}
              </h3>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder={language === 'en' ? 'Your email address' : 'Barua pepe yako'}
                  className={`${sourceSans.variable} font-sans px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
                <button
                  type="submit"
                  className={`${sourceSans.variable} font-sans bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors`}
                >
                  {language === 'en' ? 'Subscribe' : 'Jiandikishe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`${sourceSans.variable} font-sans text-neutral-400 text-sm`}>
            © {new Date().getFullYear()} Amka Kijana. {footerContent.copyright[language]}
          </p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`${sourceSans.variable} font-sans text-neutral-300 hover:text-primary-400 transition-colors text-sm`}
            >
              {footerContent.language[language]}
            </button>
            
            <Link href="/privacy" className={`${sourceSans.variable} font-sans text-neutral-300 hover:text-primary-400 transition-colors text-sm`}>
              {language === 'en' ? 'Privacy Policy' : 'Sera ya Faragha'}
            </Link>
            
            <Link href="/terms" className={`${sourceSans.variable} font-sans text-neutral-300 hover:text-primary-400 transition-colors text-sm`}>
              {language === 'en' ? 'Terms of Service' : 'Sheria za Matumizi'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer