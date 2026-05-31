// C:\Users\HERROZ\Desktop\Happy-Birthday-Cham\src\components\WishCard\WishCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const WishCard = ({ icon: Icon, title, message, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="glass rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 playfair">{title}</h3>
        <p className="text-white/80 text-sm md:text-base leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
};

export default WishCard;