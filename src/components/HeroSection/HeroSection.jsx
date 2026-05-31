// C:\Users\HERROZ\Desktop\Happy-Birthday-Cham\src\components\HeroSection\HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyText from '../ShinyText/ShinyText';
import './HeroSection.css';

const HeroSection = ({ name, onCelebrate }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when the love letter screen is active
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('love-letter-open');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('love-letter-open');
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('love-letter-open');
    };
  }, [isOpen]);

  const handleLetterClick = () => {
    setIsOpen(true);
    setTimeout(() => {
      onCelebrate();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isOpen ? (
        <div className="love-letter-screen">
          {/* Simple background */}
          <div className="simple-bg"></div>

          {/* Centered Envelope */}
          <div className="envelope-container">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLetterClick}
              className="envelope-wrapper"
            >
              {/* Simple Envelope */}
              <div className="envelope">
                {/* Envelope Back */}
                <div className="envelope-back"></div>
                
                {/* Envelope Front */}
                <div className="envelope-front">
                  {/* Envelope Flap */}
                  <div className="envelope-flap-simple"></div>
                  
                  {/* Simple Heart on Envelope */}
                  <svg 
                    className="envelope-heart"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  
                  {/* Shiny Text for "Open Me" */}
                  <ShinyText
                    text="Open Me"
                    speed={2}
                    color="#ffffff"
                    shineColor="black"
                    spread={120}
                    disabled={false}
                    direction="left"
                    className="envelope-text"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="birthday-content-wrapper">
          {/* Your birthday content will go here */}
        </div>
      )}
    </AnimatePresence>
  );
};

export default HeroSection;