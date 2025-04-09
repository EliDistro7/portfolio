// components/TeamSection.tsx
import { useLanguage } from '@/context/LanguageContext';

const teamContent = {
  title: {
    en: "Meet Our Team",
    sw: "Kutana na Timu Yetu"
  },
  members: [
    {
      name: "Bariki Kaneno",
      role: {
        en: "Founder & Executive Director",
        sw: "Mwanzilishi na Mkurugenzi Mtendaji"
      },
      bio: {
        en: "Mental health advocate with 10+ years experience in youth development",
        sw: "Mtetezi wa afya ya akili mwenye uzoefu wa zaidi ya miaka 10 katika maendeleo ya vijana"
      }
    },
    // Add more team members...
  ]
};

export const TeamSection = ({ language }) => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className={`font-serif text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-12`}>
          {teamContent.title[language]}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamContent.members.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-neutral-200 mb-4 overflow-hidden">
                {/* Team member photo would go here */}
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-700">{member.name}</h3>
              <p className="font-sans text-primary-600 mb-3">{member.role[language]}</p>
              <p className="font-sans text-neutral-700">{member.bio[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};