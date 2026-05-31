// C:\Users\HERROZ\Desktop\Happy-Birthday-Cham\src\components\BirthdayWishes\BirthdayWishes.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import './BirthdayWishes.css';

const BirthdayWishes = () => {
  const [wish, setWish] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [wishes, setWishes] = useState([
    "May your day be as wonderful as you are! 🌟",
    "Happy Birthday to someone who makes the world brighter! ✨",
    "Another year older, but definitely not any less awesome! 🎉",
    "Wishing you all the cake and happiness you can eat! 🎂"
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wish.trim()) {
      setWishes([wish, ...wishes]);
      setWish('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="birthday-wishes-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="wishes-inner"
      >
        <div className="wishes-header">
          <Sparkles className="wishes-icon" />
          <h2 className="wishes-title">
            Birthday Wishes 🎈
          </h2>
          <p className="wishes-subtitle">
            Share your warm wishes and love!
          </p>
        </div>

        {/* Wish form */}
        <form onSubmit={handleSubmit} className="wishes-form">
          <div className="form-group">
            <input
              type="text"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Write your birthday wish here..."
              className="wishes-input"
            />
            <button
              type="submit"
              className="wishes-submit-btn"
            >
              <Send size={20} />
              Send Wish
            </button>
          </div>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="success-message"
            >
              ✨ Wish added successfully! ✨
            </motion.p>
          )}
        </form>

        {/* Wishes list */}
        <div className="wishes-list">
          {wishes.map((w, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="wish-item"
            >
              <div className="wish-emoji">🎀</div>
              <p className="wish-text">{w}</p>
              <div className="wish-heart">❤️</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BirthdayWishes;