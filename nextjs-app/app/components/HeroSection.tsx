'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';



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

  const heroImages = [
    "/images/hero-1.jpeg",
    "/images/hero-2.jpeg",
    "/images/hero-3.jpeg"
  ];

  return (
    <section className="relative h-[90vh] max-h-[800px] w-full overflow-hidden">
      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full w-full"
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full relative">
              <img
                src={img}
                alt=""
                className="h-full w-full "
              />
              {/* Orange gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-800/40 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-4 text-white">
          <div className="max-w-2xl">
            {/* Title with Baskerville font */}
            <h1 className={`${baskerville.variable} font-serif text-5xl md:text-7xl font-bold leading-tight mb-4 text-white drop-shadow-lg`}>
              {heroContent.title[language]}
            </h1>

            {/* Subtitle with Source Sans */}
            <p className={`${sourceSans.variable} font-sans text-xl md:text-2xl font-semibold mb-8 text-primary-100`}>
              {heroContent.subtitle[language]}
            </p>

            {/* CTA Button */}
            <button className={`${sourceSans.variable} font-sans flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg transition-all duration-300 group shadow-lg hover:shadow-glow`}>
              <span className="font-bold tracking-wide">
                {heroContent.cta[language]}
              </span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            {/* Stats (3-column grid) */}
            <div className={`${sourceSans.variable} font-sans mt-12 grid grid-cols-3 gap-6`}>
              {heroContent.stats.map((stat, index) => (
                <div key={index} className="text-center bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                  <span className="font-black text-4xl block text-primary-100">
                    {stat.value}
                  </span>
                  <span className="font-semibold text-sm text-primary-50">
                    {stat.label[language]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default Hero;