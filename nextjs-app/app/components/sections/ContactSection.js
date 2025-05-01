// app/components/sections/ContactSection.jsx
import { GitBranchIcon, Linkedin, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                  placeholder="Your name" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                  placeholder="your.email@example.com" 
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                  placeholder="What is this regarding?" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" 
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-500 mr-4" />
                  <div>
                    <p className="text-gray-300">Email</p>
                    <a href="mailto:contact@example.com" className="text-white hover:text-blue-400 transition-colors">
                      contact@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-500 mr-4" />
                  <div>
                    <p className="text-gray-300">Location</p>
                    <p className="text-white">San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Linkedin className="h-6 w-6 text-blue-500 mr-4" />
                  <div>
                    <p className="text-gray-300">LinkedIn</p>
                    <a href="https://linkedin.com/in/yourprofile" className="text-white hover:text-blue-400 transition-colors">
                      linkedin.com/in/yourprofile
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <GitBranchIcon className="h-6 w-6 text-blue-500 mr-4" />
                  <div>
                    <p className="text-gray-300">GitHub</p>
                    <a href="https://github.com/yourusername" className="text-white hover:text-blue-400 transition-colors">
                      github.com/yourusername
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-700 pt-6">
                <p className="text-gray-400 text-sm">
                  Prefer to connect on social media? Feel free to reach out on any platform, and I'll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}