'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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

// Hero Translations & Content
const heroContent = {
  globalTitle: {
    en: "Wake Up, Young One!",
    sw: "Amka, Kijana!"
  },
  globalSubtitle: {
    en: "Empowering youth through mental health & financial growth",
    sw: "Kuwawezesha vijana kupitia afya ya akili na ustawi wa kifedha"
  },
  slides: [
    {
      image: "/images/hero-1.jpeg",
      tagline: {
        en: "Mental Wellness",
        sw: "Afya ya Akili"
      },
      title: {
        en: "Building Resilience",
        sw: "Kujenga Ustahimilivu"
      },
      description: {
        en: "Equipping youth with tools to navigate life's challenges and build strong mental foundations for success.",
        sw: "Kuwapa vijana zana za kukabiliana na changamoto za maisha na kujenga misingi imara ya akili kwa mafanikio."
      },
      cta: {
        en: "Discover Programs",
        sw: "Gundua Programu"
      },
      link: "/contact"
    },
    {
      image: "/images/hero-2.jpeg",
      tagline: {
        en: "Financial Growth",
        sw: "Ukuaji wa Kifedha"
      },
      title: {
        en: "Empowering Youth Through Reproductive Health Education",
        sw: "Kuwawezesha Vijana Kupitia Elimu ya Afya ya Uzazi"
      },
      description: {
        en: "Educating young people on reproductive health to promote informed choices, well-being, and a healthier future.",
        sw: "Kuwafundisha vijana kuhusu afya ya uzazi ili kukuza maamuzi sahihi, ustawi na maisha bora ya baadaye."
      },
      
      cta: {
        en: "Start Learning",
        sw: "Anza Kujifunza"
      },
      link: "/contact"
    },
    {
      image: "/images/hero-3.jpeg",
      tagline: {
        en: "Community Engagement",
        sw: "Ushirikishwaji wa Jamii"
      },
      title: {
        en: "Together We Rise",
        sw: "Pamoja Tunainuka"
      },
      description: {
        en: "Building stronger communities through youth leadership, volunteerism, and collective action.",
        sw: "Kujenga jamii imara kupitia uongozi wa vijana, kujitolea, na hatua za pamoja."
      },
      cta: {
        en: "Join Movement",
        sw: "Jiunge na Harakati"
      },
      link: "/contact"
    }
  ],
  secondary_cta: {
    en: "About Us",
    sw: "Kuhusu Sisi"
  },
  stats: [
    {
      value: "500+",
      label: {
        en: "Youth Empowered",
        sw: "Vijana Waliowezeshwa"
      }
    },
    {
      value: "20+",
      label: {
        en: "Programs",
        sw: "Mipango"
      }
    },
    {
      value: "95%",
      label: {
        en: "Success Rate",
        sw: "Kiwango cha Mafanikio"
      }
    }
  ]
};

const Hero = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[700px] py-8 pt-4">
          {/* Left Content Area */}
          <div className="flex flex-col justify-center z-10 order-2 lg:order-1">
            <motion.div 
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
            >
              {/* Global Badge */}
              <motion.div
                variants={fadeInVariants}
                className="inline-block bg-primary-500/20 backdrop-blur-sm border border-primary-300/30 rounded-full px-4 py-1 mb-4"
              >
                <span className={`${sourceSans.variable} font-sans text-sm font-bold text-primary-700`}>
                  {language === 'en' ? 'Youth Empowerment Initiative' : 'Mpango wa Uwezeshaji Vijana'}
                </span>
              </motion.div>
              
              {/* Global Title */}
              <motion.h1 
                variants={fadeInVariants}
                className={`${baskerville.variable} font-serif text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900`}
              >
                {heroContent.globalTitle[language]}
              </motion.h1>

              {/* Global Subtitle */}
              <motion.p 
                variants={fadeInVariants}
                className={`${sourceSans.variable} font-sans text-lg md:text-xl font-medium mb-8 text-gray-700`}
              >
                {heroContent.globalSubtitle[language]}
              </motion.p>

              {/* Dynamic Content Based on Active Slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={slideInFromRight}
                  className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-primary-100"
                >
                  <div className={`${sourceSans.variable} font-sans text-sm font-bold text-primary-500 mb-2`}>
                    {heroContent.slides[activeIndex].tagline[language]}
                  </div>
                  <h2 className={`${baskerville.variable} font-serif text-2xl font-bold text-gray-900 mb-3`}>
                    {heroContent.slides[activeIndex].title[language]}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {heroContent.slides[activeIndex].description[language]}
                  </p>
                  <Link 
                    href={heroContent.slides[activeIndex].link} 
                    className={`${sourceSans.variable} font-sans inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 rounded-lg transition-all duration-300 text-sm font-bold`}
                  >
                    {heroContent.slides[activeIndex].cta[language]}
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* CTAs */}
              <motion.div 
                variants={fadeInVariants}
                className="flex flex-wrap gap-4 mb-6"
              >
                {/* Primary CTA Button */}
                <Link href='/contact' className={`${sourceSans.variable} font-sans flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-all duration-300 group shadow-md hover:shadow-lg`}>
                  <span className="font-bold tracking-wide">
                    {language === 'en' ? 'Join Our Movement' : 'Jiunge na Sisi'}
                  </span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                
                {/* Secondary CTA Button */}
                <Link href='/about' className={`${sourceSans.variable} font-sans flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-all duration-300`}>
                  <span className="font-bold tracking-wide">
                    {heroContent.secondary_cta[language]}
                  </span>
                </Link>
              </motion.div>

              {/* Stats with enhanced design */}
              <motion.div 
                variants={fadeInVariants}
                className={`${sourceSans.variable} font-sans grid grid-cols-3 gap-3`}
              >
                {heroContent.stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-300"
                  >
                    <span className="font-black text-3xl md:text-4xl block text-primary-500 mb-1">
                      {stat.value}
                    </span>
                    <span className="font-semibold text-xs text-gray-600">
                      {stat.label[language]}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Carousel Area */}
          <div className="relative h-[400px] lg:h-auto mx-0 px-0 overflow-hidden shadow-xl order-1 lg:order-2">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              speed={1000}
              loop={true}
              pagination={{ 
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active bg-primary-500',
                bulletClass: 'swiper-pagination-bullet bg-gray-300 w-2 h-2 mx-1'
              }}
              className="h-full w-full "
              onSwiper={(swiper: SwiperType) => setSwiperInstance(swiper)}
              onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
            >
              {heroContent.slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full w-full relative">
                    <img
                      src={slide.image}
                      alt={slide.title[language]}
                      className="h-full w-full object-cover"
                    />
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    
                    {/* Caption for mobile view only */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:hidden">
                      <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg">
                        <div className="text-primary-300 text-sm font-bold mb-1">
                          {slide.tagline[language]}
                        </div>
                        <h3 className="text-white text-xl font-bold">
                          {slide.title[language]}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Carousel Navigation Dots */}
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
              {heroContent.slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperInstance && swiperInstance.slideTo(index)}
                  className={`w-8 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? "bg-primary-500 w-12" 
                      : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;