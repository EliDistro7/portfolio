'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

// Hero Translations
const heroContent = {
  title: {
    en: "Wake Up, Young One!",
    sw: "Amka, Kijana!"
  },
  subtitle: {
    en: "Empowering youth through mental health & financial growth",
    sw: "Kuwawezesha vijana kupitia afya ya akili na ustawi wa kifedha"
  },
  cta: {
    en: "Join Our Movement",
    sw: "Jiunge na Sisi"
  },
  secondary_cta: {
    en: "Learn More",
    sw: "Jifunze Zaidi"
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
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroImages = [
    "/images/hero-1.jpeg",
    "/images/hero-2.jpeg",
    "/images/hero-3.jpeg"
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative h-screen max-h-[900px] w-full overflow-hidden">
      {/* Swiper Slider with Fade Effect */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={1500}
        loop={true}
        className="h-full w-full"
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full relative">
              <img
                src={img}
                alt=""
                className="h-full w-full object-cover"
              />
              {/* Enhanced gradient overlay with more depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-800/50 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-4">
        <button 
          onClick={() => swiperInstance?.slidePrev()} 
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full p-3 text-white transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => swiperInstance?.slideNext()} 
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full p-3 text-white transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperInstance?.slideTo(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              activeIndex === index 
                ? "bg-primary-500 w-20" 
                : "bg-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Content with Animations */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="max-w-2xl"
          >
            {/* Animated Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-block bg-primary-500/20 backdrop-blur-sm border border-primary-300/30 rounded-full px-4 py-1 mb-6"
            >
              <span className={`${sourceSans.variable} font-sans text-sm font-bold text-primary-100`}>
                {language === 'en' ? 'Youth Empowerment Initiative' : 'Mpango wa Uwezeshaji Vijana'}
              </span>
            </motion.div>
            
            {/* Title with Baskerville font */}
            <motion.h1 
              variants={fadeInUp}
              className={`${baskerville.variable} font-serif text-5xl md:text-7xl font-bold leading-tight mb-4 text-white drop-shadow-lg`}
            >
              {heroContent.title[language]}
            </motion.h1>

            {/* Subtitle with Source Sans */}
            <motion.p 
              variants={fadeInUp}
              className={`${sourceSans.variable} font-sans text-xl md:text-2xl font-semibold mb-8 text-primary-100`}
            >
              {heroContent.subtitle[language]}
            </motion.p>

            {/* CTAs with flexible layout */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4 mb-12"
            >
              {/* Primary CTA Button */}
              <Link href='/contact' className={`${sourceSans.variable} font-sans flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg transition-all duration-300 group shadow-lg hover:shadow-xl`}>
                <span className="font-bold tracking-wide">
                  {heroContent.cta[language]}
                </span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              
              {/* Secondary CTA Button */}
              <Link href='/about' className={`${sourceSans.variable} font-sans flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-lg transition-all duration-300`}>
                <span className="font-bold tracking-wide">
                  {heroContent.secondary_cta[language]}
                </span>
              </Link>
            </motion.div>

            {/* Stats with enhanced design */}
            <motion.div 
              variants={fadeInUp}
              className={`${sourceSans.variable} font-sans grid grid-cols-3 gap-4`}
            >
              {heroContent.stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transition-all duration-300 hover:border-primary-300/50 hover:bg-white/15"
                >
                  <span className="font-black text-4xl md:text-5xl block text-primary-100 mb-1">
                    {stat.value}
                  </span>
                  <span className="font-semibold text-sm text-primary-50">
                    {stat.label[language]}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;