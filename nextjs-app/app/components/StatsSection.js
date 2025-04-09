// components/StatsSection.tsx
import { useLanguage } from '@/context/LanguageContext';

const statsContent = {
  title: {
    en: "Our Impact",
    sw: "Athari Yetu"
  },
  stats: [
    {
      value: "10,000+",
      label: {
        en: "Youth Reached Annually",
        sw: "Vijana Waliofikika Kwa Mwaka"
      }
    },
    {
      value: "50+",
      label: {
        en: "Schools Partnered With",
        sw: "Shule Zilizoshirikiana Nasi"
      }
    },
    {
      value: "100%",
      label: {
        en: "Volunteer Powered",
        sw: "Inaendeshwa na Wafanyakazi wa Kujitolea"
      }
    }
  ]
};

export const StatsSection = ({ language }) => {
  return (
    <section className="py-16 bg-primary-700 text-white">
      <div className="container mx-auto px-4">
        <h2 className={`font-serif text-3xl md:text-4xl font-bold text-center mb-12`}>
          {statsContent.title[language]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsContent.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-display text-5xl font-bold mb-2">{stat.value}</p>
              <p className="font-sans text-xl">{stat.label[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};