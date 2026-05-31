// C:\Users\HERROZ\Desktop\Happy-Birthday-Cham\src\App.jsx
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import WishCard from './components/WishCard/WishCard.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import BirthdayCountdown from './components/BirthdayCountdown/BirthdayCountdown.jsx';
import BirthdayWishes from './components/BirthdayWishes/BirthdayWishes.jsx';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack/ScrollStack.jsx';
import Galaxy from './components/Galaxy/Galaxy.jsx';
import { Heart, Sparkles, Gift, Star, Music, Camera } from 'lucide-react';

// Import your sound files
import happyBday from './assets/sounds/happybday.mp3';
import happyBdayPiano from './assets/sounds/happybdaypiano.mp3';

function App() {
  const [showFireworks, setShowFireworks] = useState(false);
  const [bgMusic, setBgMusic] = useState(false);
  const [showBirthdayContent, setShowBirthdayContent] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  // Define the playlist sequence
  // 0 = happybday.mp3 (regular), 1 = happybdaypiano.mp3 (piano)
  const playlist = [
    happyBday,           // Track 0: Regular
    happyBdayPiano,      // Track 1: Piano
    happyBdayPiano,      // Track 2: Piano
    happyBday,           // Track 3: Regular
    happyBdayPiano,      // Track 4: Piano
    happyBdayPiano,      // Track 5: Piano
    happyBday            // Track 6: Regular
  ];

  // Function to play current track
  const playCurrentTrack = () => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrackIndex];
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };

  // Handle when a track ends - go to next track
  useEffect(() => {
    if (audioRef.current && bgMusic) {
      const handleTrackEnd = () => {
        // Move to next track, loop back to start if at the end
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
      };
      
      audioRef.current.addEventListener('ended', handleTrackEnd);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleTrackEnd);
        }
      };
    }
  }, [currentTrackIndex, bgMusic]);

  // Play new track when index changes
  useEffect(() => {
    if (bgMusic && audioRef.current) {
      playCurrentTrack();
    }
  }, [currentTrackIndex, bgMusic]);

  const handleCelebrate = () => {
    setShowFireworks(true);
    setShowBirthdayContent(true);
    
    if (!bgMusic) {
      setCurrentTrackIndex(0);
      setBgMusic(true);
    }
    
    setTimeout(() => setShowFireworks(false), 5000);
  };

  const wishes = [
    {
      icon: Heart,
      title: "Warm Wishes",
      message: "May your day be filled with joy, laughter, and everything that makes you smile!"
    },
    {
      icon: Sparkles,
      title: "Magical Moments",
      message: "Every moment with you is magical. Here's to creating many more beautiful memories!"
    },
    {
      icon: Gift,
      title: "Special Day",
      message: "You deserve all the happiness in the world. Enjoy your special day to the fullest!"
    },
    {
      icon: Star,
      title: "Shining Bright",
      message: "Keep shining like the star you are! The world is brighter with you in it."
    },
    {
      icon: Music,
      title: "Celebration Time",
      message: "Let the music play, dance like nobody's watching - it's YOUR day!"
    },
    {
      icon: Camera,
      title: "Precious Memories",
      message: "May this birthday add another beautiful chapter to your life's story!"
    }
  ];

  return (
    <div className="app">
      {/* Audio element for playlist */}
      <audio ref={audioRef}>
        Your browser does not support the audio element.
      </audio>
      
      {/* First Screen - White background, no galaxy */}
      <div className={`first-screen ${showBirthdayContent ? 'hidden' : 'visible'}`}>
        <HeroSection name="Cham" onCelebrate={handleCelebrate} />
      </div>
      
      {/* Second Screen - Only show galaxy and content after clicking love letter */}
      {showBirthdayContent && (
        <>
          {/* Galaxy Background */}
          <Galaxy 
            focal={[0.5, 0.5]}
            rotation={[1.0, 0.0]}
            starSpeed={0.3}
            density={1.2}
            hueShift={200}
            speed={0.5}
            mouseInteraction={false}
            glowIntensity={0.5}
            saturation={0.3}
            mouseRepulsion={true}
            repulsionStrength={3}
            twinkleIntensity={0.5}
            rotationSpeed={0.05}
            autoCenterRepulsion={0}
            transparent={true}
            className="galaxy-background"
          />
          
          <div className="birthday-content">
            {/* ScrollStack for Wish Cards */}
            <ScrollStack
              itemDistance={80}
              itemScale={0.02}
              itemStackDistance={20}
              stackPosition="15%"
              scaleEndPosition="5%"
              baseScale={0.9}
              rotationAmount={2}
              blurAmount={0}
              useWindowScroll={true}
              onStackComplete={() => console.log('All cards stacked!')}
            >
              {wishes.map((wish, index) => (
                <ScrollStackItem key={index} itemClassName="wish-card-stack">
                  <div className="wish-card-content">
                    <div className="wish-icon-wrapper">
                      <wish.icon className="wish-icon" />
                    </div>
                    <h3 className="wish-title">{wish.title}</h3>
                    <p className="wish-message">{wish.message}</p>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
            
            {/* Regular content after the stack */}
            <div className="regular-content">
              <Gallery />
              <BirthdayCountdown birthDate="2024-06-01" />
              <BirthdayWishes />
            </div>
            
            <footer className="py-8 text-center text-white/60 text-sm">
              <p>Made with ❤️ for Cham | Happy Birthday!</p>
              <p className="mt-2">✨ May all your wishes come true ✨</p>
            </footer>
          </div>
        </>
      )}
    </div>
  );
}

export default App;