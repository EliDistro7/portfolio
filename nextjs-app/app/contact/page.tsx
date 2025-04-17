// app/contact/page.tsx
'use client';

import { Libre_Baskerville, Source_Sans_3 as Source_Sans_Pro } from 'next/font/google';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

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
const contactContent = {
  hero: {
    title: {
      en: "Get in Touch",
      sw: "Wasiliana Nasi"
    },
    subtitle: {
      en: "We'd love to hear from you! Reach out for inquiries, partnerships, or support.",
      sw: "Tungependa kusikia kutoka kwako! Wasiliana nasi kwa maswali, ushirikiano, au usaidizi."
    }
  },
  info: {
    title: {
      en: "Contact Information",
      sw: "Mawasiliano"
    },
    items: [
      {
        icon: <MapPin className="h-6 w-6 text-primary-600" />,
        title: {
          en: "Our Location",
          sw: "Mahali Tulipo"
        },
        content: {
          en: "Kijitonyama, Dar es Salaam, Tanzania",
          sw: "Kijitonyama, Dar es Salaam, Tanzania"
        }
      },
      {
        icon: <Mail className="h-6 w-6 text-primary-600" />,
        title: {
          en: "Email Us",
          sw: "Barua Pepe"
        },
        content: {
          en: "info@amkakijana.org",
          sw: "info@amkakijana.org"
        }
      },
      {
        icon: <Phone className="h-6 w-6 text-primary-600" />,
        title: {
          en: "Call Us",
          sw: "Tupe Simu"
        },
        content: {
          en: "+255 748 908 001",
          sw: "+255 748 908 001"
        }
      },
      {
        icon: <Clock className="h-6 w-6 text-primary-600" />,
        title: {
          en: "Working Hours",
          sw: "Masaa ya Kazi"
        },
        content: {
          en: "Mon-Fri: 8:00 AM - 5:00 PM",
          sw: "Jumatatu-Ijumaa: 8:00 asubuhi - 5:00 jioni"
        }
      }
    ]
  },
  form: {
    title: {
      en: "Send Us a Message",
      sw: "Tutumie Ujumbe"
    },
    fields: {
      name: {
        en: "Full Name",
        sw: "Jina Kamili"
      },
      email: {
        en: "Email Address",
        sw: "Barua Pepe"
      },
      subject: {
        en: "Subject",
        sw: "Mada"
      },
      message: {
        en: "Your Message",
        sw: "Ujumbe Wako"
      },
      submit: {
        en: "Send Message",
        sw: "Tuma Ujumbe"
      }
    },
    success: {
      en: "Thank you! Your message has been sent.",
      sw: "Asante! Ujumbe wako umetumwa."
    },
    error: {
      en: "There was an error sending your message. Please try again.",
      sw: "Kumekuwa na hitilafu katika kutuma ujumbe wako. Tafadhali jaribu tena."
    }
  }
};

export default function ContactPage() {
  const { language } = useLanguage();

  return (
    <div className={`${baskerville.variable} ${sourceSans.variable}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {contactContent.hero.title[language]}
          </h1>
          <p className={`font-sans text-xl md:text-2xl max-w-3xl mx-auto`}>
            {contactContent.hero.subtitle[language]}
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className={`font-serif text-3xl font-bold text-neutral-900 mb-8`}>
                {contactContent.info.title[language]}
              </h2>
              
              <div className="space-y-6">
                {contactContent.info.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className={`font-serif text-lg font-bold text-neutral-800`}>
                        {item.title[language]}
                      </h3>
                      <p className={`font-sans text-neutral-600`}>
                        {item.content[language]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className={`font-serif text-xl font-bold text-neutral-800 mb-4`}>
                  {language === 'en' ? 'Follow Us' : 'Tufuate'}
                </h3>
                <div className="flex gap-4">
                  <a href="#" className="text-neutral-600 hover:text-primary-600 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-primary-600 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-neutral-600 hover:text-primary-600 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.023.047 1.351.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className={`font-serif text-3xl font-bold text-neutral-900 mb-8`}>
                {contactContent.form.title[language]}
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className={`font-sans block text-sm font-medium text-neutral-700 mb-1`}>
                    {contactContent.form.fields.name[language]}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={`font-sans w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`font-sans block text-sm font-medium text-neutral-700 mb-1`}>
                    {contactContent.form.fields.email[language]}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={`font-sans w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className={`font-sans block text-sm font-medium text-neutral-700 mb-1`}>
                    {contactContent.form.fields.subject[language]}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className={`font-sans w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`font-sans block text-sm font-medium text-neutral-700 mb-1`}>
                    {contactContent.form.fields.message[language]}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className={`font-sans w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500`}
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`font-sans bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors`}
                  >
                    {contactContent.form.fields.submit[language]}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-neutral-100">
        <div className="container mx-auto px-4 py-12">
          <div className="rounded-xl overflow-hidden h-96">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kijitonyama,%20Dar%20es%20Salaam+(Amka%20Kijana)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/">gps devices</a>
            </iframe>
          </div>
        </div>
      </section>
    </div>
  );
};