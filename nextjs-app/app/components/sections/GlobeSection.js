'use client';

import { motion } from 'framer-motion';
import ConnectedGlobe from '../ui/ConnectedGlobe';

const GlobeSection = () => {
  return (
    <section id="globe" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Global Connectivity</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            An interactive visualization demonstrating my skills with 3D web technologies 
            and creative front-end development.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <ConnectedGlobe />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Powered by Modern Web Technologies
          </h3>
          <p className="text-gray-400">
            This interactive globe visualization is built with Three.js and WebGL, 
            demonstrating advanced 3D rendering capabilities in the browser. The animation 
            and interactivity showcase the potential of modern web technologies to create 
            engaging user experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobeSection;