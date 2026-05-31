// C:\Users\HERROZ\Desktop\Happy-Birthday-Cham\src\components\BirthdayScreen\BirthdayScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './BirthdayScreen.css';

const BirthdayScreen = ({ name }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="birthday-screen"
    >
      <div className="birthday-header">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="birthday-icon"
        >
          🎂
        </motion.div>
        
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="birthday-title"
        >
          Happy Birthday!
        </motion.h1>
        
        <motion.h2
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="birthday-name"
        >
          {name}! 🎉
        </motion.h2>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="birthday-message"
        >
          Wishing you a day filled with love, laughter, and all your heart desires!
        </motion.p>
      </div>
    </motion.div>
  );
};

export default BirthdayScreen;