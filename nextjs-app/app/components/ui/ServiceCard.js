// app/components/ui/ServiceCard.jsx
import { motion } from 'framer-motion';

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
    >
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-300">{service.description}</p>
    </motion.div>
  );
}