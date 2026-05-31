// C:\Users\HERROZ\Desktop\Happy-Birthday-Cham\src\components\BirthdayCountdown\BirthdayCountdown.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Cake, PartyPopper } from 'lucide-react';

const BirthdayCountdown = ({ birthDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let birthday = new Date(birthDate);
      birthday.setFullYear(currentYear);

      if (now > birthday) {
        birthday.setFullYear(currentYear + 1);
      }

      const difference = birthday - now;
      
      if (difference <= 0) {
        setIsBirthday(true);
        return;
      }

      setIsBirthday(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [birthDate]);

  if (isBirthday) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center py-12"
      >
        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
          <PartyPopper className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
          <h3 className="text-3xl md:text-4xl font-bold text-white playfair mb-4 animate-glow">
            🎉 Today is the Day! 🎉
          </h3>
          <p className="text-white/90 text-xl">Happy Birthday! Let's celebrate! 🥳</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-16 px-4"
    >
      <div className="text-center mb-8">
        <Clock className="w-12 h-12 text-white mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-white playfair">
          Counting Down to Next Birthday!
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            whileHover={{ scale: 1.05 }}
            className="glass rounded-xl p-4 md:p-6 text-center"
          >
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              {value}
            </div>
            <div className="text-white/80 uppercase text-sm md:text-base">
              {unit}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8 text-white/70">
        <Cake className="w-5 h-5 inline mr-2" />
        Get ready for more celebrations!
      </div>
    </motion.div>
  );
};

export default BirthdayCountdown;