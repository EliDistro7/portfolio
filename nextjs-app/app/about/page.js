// app/about/page.tsx

'use client';
import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import { useLanguage } from '@/context/LanguageContext';
import  TeamSection  from '@/app/components/TeamSection';
import { StatsSection } from '@/app/components/StatsSection';




// Load fonts
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

// Bilingual content
const aboutContent = {
  hero: {
    title: {
      en: "About Amka Kijana",
      sw: "Kuhusu Amka Kijana"
    },
    subtitle: {
      en: "Empowering Tanzania's youth through mental health and personal development",
      sw: "Kuwawezesha vijana wa Tanzania kupitia afya ya akili na maendeleo ya kibinafsi"
    }
  },
  mission: {
    title: {
      en: "Our Mission",
      sw: "Dhamira Yetu"
    },
    content: {
      en: "To create a generation of mentally resilient, financially literate, and emotionally intelligent young leaders who will transform their communities.",
      sw: "Kuunda kizazi cha viongozi vijana wenye uthabiti wa kiakili, ujuzi wa kifedha, na akili ya kihisia ambao watabadilisha jamii zao."
    }
  },
  vision: {
    title: {
      en: "Our Vision",
      sw: "Dira Yetu"
    },
    content: {
      en: "A Tanzania where every young person has access to mental health resources and opportunities for personal growth.",
      sw: "Tanzania ambapo kila mtu mchana ana uwezo wa kupata rasilimali za afya ya akili na fursa za kukua kibinafsi."
    }
  },
  story: {
    title: {
      en: "Our Story",
      sw: "Historia Yetu"
    },
    content: {
      en: [
        "Founded in 2020 by a group of mental health advocates, Amka Kijana began as a small community initiative in Dar es Salaam.",
        "What started as weekly peer support groups has grown into a nationwide movement reaching over 10,000 youth annually through our programs in schools and communities."
      ],
      sw: [
        "Iliyoanzishwa mwaka 2020 na kikundi cha watetezi wa afya ya akili, Amka Kijana ilianza kama mpango mdogo wa jamii huko Dar es Salaam.",
        "Kilichokuwa mikutano ya kila wiki ya vikundi vya usaidizi kwa wenza kimekuwa harakati ya kitaifa inayofikia zaidi ya vijana 10,000 kwa mwaka kupitia mipango yetu shuleni na katika jamii."
      ]
    }
  },
  values: {
    title: {
      en: "Our Values",
      sw: "Maadili Yetu"
    },
    items: [
      {
        title: {
          en: "Empowerment",
          sw: "Uwezeshaji"
        },
        description: {
          en: "We believe in equipping youth with knowledge and skills for self-determination.",
          sw: "Tunaamini katika kuwawezesha vijana kwa maarifa na ujuzi wa kujitawala."
        }
      },
      {
        title: {
          en: "Compassion",
          sw: "Huruma"
        },
        description: {
          en: "We approach every interaction with empathy and understanding.",
          sw: "Tunakaribia kila mwingiliano kwa uelewa na huruma."
        }
      },
      {
        title: {
          en: "Innovation",
          sw: "Ubunifu"
        },
        description: {
          en: "We constantly seek creative solutions to youth challenges.",
          sw: "Tunatafuta kila wakati ufumbuzi wa ubunifu kwa changamoto za vijana."
        }
      },
      {
        title: {
          en: "Community",
          sw: "Jamii"
        },
        description: {
          en: "We believe change happens through collective action.",
          sw: "Tunaamini mabadiliko hutokea kupitia hatua za pamoja."
        }
      }
    ]
  }
};

export default function AboutPage() {
  const { language } = useLanguage();

  const teamMembers = [
    {
      name: "Salila Mohammed",
      title: "Executive Director & Founder",
      image: "/salila.jpeg" // replace with actual image path
    },
    {
      name: "Isaac Mombury",
      title: "Program Manager",
      image: "/isaac.jpeg"
    },
    {
      name: "Nassoro Mohammed",
      title: "Monitoring and Evaluation Manager",
      image: "/nassoro.jpeg"
    },
    {
      name: "Fabian Kinyumbi",
      title: "Program Officer",
      image: "/fabian.jpeg"
    },
    {
      name: "Sittiesha Mohammed",
      title: "Program Treasurer",
      image: "/sittiesha.jpeg"
    },
    {
      name: "Kama Dubanza",
      title: "Administrative manager",
      image: "/kama.jpeg"
    }
  ];

  return (
    <div className={`${baskerville.variable} ${sourceSans.variable}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {aboutContent.hero.title[language]}
          </h1>
          <p className={`font-sans text-xl md:text-2xl max-w-3xl mx-auto`}>
            {aboutContent.hero.subtitle[language]}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="bg-primary-50 p-8 rounded-xl">
            <h2 className={`font-serif text-3xl font-bold text-primary-800 mb-4`}>
              {aboutContent.mission.title[language]}
            </h2>
            <p className={`font-sans text-neutral-700`}>
              {aboutContent.mission.content[language]}
            </p>
          </div>

          <div className="bg-secondary-50 p-8 rounded-xl">
            <h2 className={`font-serif text-3xl font-bold text-secondary-800 mb-4`}>
              {aboutContent.vision.title[language]}
            </h2>
            <p className={`font-sans text-neutral-700`}>
              {aboutContent.vision.content[language]}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className={`font-serif text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-12`}>
            {aboutContent.story.title[language]}
          </h2>
          
          <div className="space-y-6">
            {aboutContent.story.content[language].map((paragraph, index) => (
              <p key={index} className={`font-sans text-lg text-neutral-700`}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className={`font-serif text-xl font-bold text-primary-700 mb-3`}>
                {language === 'en' ? '2020' : 'Mwaka 2020'}
              </h3>
              <p className={`font-sans text-neutral-600`}>
                {language === 'en' 
                  ? 'Founded in Dar es Salaam with 5 volunteers' 
                  : 'Iliyoanzishwa Dar es Salaam na wafanyakazi wa kujitolea 5'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className={`font-serif text-xl font-bold text-primary-700 mb-3`}>
                {language === 'en' ? 'Today' : 'Leo'}
              </h3>
              <p className={`font-sans text-neutral-600`}>
                {language === 'en' 
                  ? '10,000+ youth reached annually nationwide' 
                  : 'Zaidi ya vijana 10,000 hufikiwa kwa mwaka nchini kote'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className={`font-serif text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-12`}>
            {aboutContent.values.title[language]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.values.items.map((value, index) => (
              <div key={index} className="bg-primary-50/30 border border-primary-100 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className={`font-serif text-xl font-bold text-primary-700 mb-3`}>
                  {value.title[language]}
                </h3>
                <p className={`font-sans text-neutral-700`}>
                  {value.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection teamMembers={teamMembers} />

      {/* Stats Section */}
      <StatsSection language={language} />
    </div>
  );
}