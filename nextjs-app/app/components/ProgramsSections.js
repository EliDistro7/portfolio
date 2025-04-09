// components/ProgramsSection.tsx
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Users, HeartPulse, BrainCircuit, HandHeart } from 'lucide-react';
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

export const ProgramsSection = () => {
  const { language } = useLanguage();

  // Bilingual program content
  const programsContent = {
    title: {
      en: "Our Programs",
      sw: "Mipango Yetu"
    },
    subtitle: {
      en: "Transforming lives through comprehensive youth development initiatives",
      sw: "Kubadilisha maisha kupitia mipango kamili ya maendeleo ya vijana"
    },
    programs: [
      {
        icon: <BookOpen className="h-8 w-8 text-primary-600" />,
        title: {
          en: "Mental Health Education",
          sw: "Elimu ya Afya ya Akili"
        },
        description: {
          en: "School-based workshops on emotional wellbeing, stress management, and mental health awareness",
          sw: "Mafunzo shuleni kuhusu ustawi wa kihisia, usimamizi wa mfadhaiko, na ufahamu wa afya ya akili"
        }
      },
      {
        icon: <Users className="h-8 w-8 text-primary-600" />,
        title: {
          en: "Peer Support Networks",
          sw: "Mitandao ya Usaidizi wa Vijana kwa Vijana"
        },
        description: {
          en: "Safe spaces for youth to share experiences and receive support from trained peer counselors",
          sw: "Mazingira salama kwa vijana kushiriki uzoefu na kupata usaidizi kutoka kwa washauri wenzao waliofunzwa"
        }
      },
      {
        icon: <HeartPulse className="h-8 w-8 text-primary-600" />,
        title: {
          en: "SRHR Awareness",
          sw: "Ufahamu wa Haki za Uzazi na Afya"
        },
        description: {
          en: "Comprehensive education on sexual reproductive health and rights for adolescents",
          sw: "Elimu kamili kuhusu haki za uzazi na afya kwa vijana"
        }
      },
      {
        icon: <BrainCircuit className="h-8 w-8 text-primary-600" />,
        title: {
          en: "Life Skills Training",
          sw: "Mafunzo ya Ujuzi wa Maisha"
        },
        description: {
          en: "Developing critical thinking, decision-making, and leadership skills",
          sw: "Kukuza ujuzi wa kufikiria kwa kina, kufanya maamuzi, na uongozi"
        }
      },
      {
        icon: <HandHeart className="h-8 w-8 text-primary-600" />,
        title: {
          en: "Community Outreach",
          sw: "Ufikiaji wa Jamii"
        },
        description: {
          en: "Mobile clinics and awareness campaigns in underserved communities",
          sw: "Kliniki za rununu na kampeni za ufahamu katika jamii zisizofikiwa vizuri"
        }
      }
    ],
    cta: {
      en: "View all programs",
      sw: "Tazama mipango yote"
    }
  };

  return (
    <section className={`py-16 ${baskerville.variable} ${sourceSans.variable}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-3`}>
            {programsContent.title[language]}
          </h2>
          <p className={`font-sans text-xl text-neutral-600 max-w-3xl mx-auto`}>
            {programsContent.subtitle[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsContent.programs.map((program, index) => (
            <div 
              key={index}
              className="group bg-neutral-50 hover:bg-primary-50 border border-neutral-200 hover:border-primary-200 rounded-xl p-6 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                  {program.icon}
                </div>
                <h3 className={`font-serif text-xl font-bold text-neutral-800 group-hover:text-primary-700`}>
                  {program.title[language]}
                </h3>
              </div>
              <p className={`font-sans text-neutral-600`}>
                {program.description[language]}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};