// C:\Users\HERROZ\Desktop\Happy-Birthday-Cham\src\App.jsx
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import WishCard from './components/WishCard/WishCard.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack/ScrollStack.jsx';
import Galaxy from './components/Galaxy/Galaxy.jsx';
import ImageTrail from './components/ImageTrail/ImageTrail.jsx';
import { Heart, Sparkles, Gift, Star, Music, Camera } from 'lucide-react';

// Import your sound files
import happyBday from './assets/sounds/happybday.mp3';
import happyBdayPiano from './assets/sounds/happybdaypiano.mp3';

// Import your images from assets/resources
import image1 from './assets/resources/em.jpg';
import image2 from './assets/resources/portr.png';
import image3 from './assets/resources/wew.jpg';

function App() {
  const [showFireworks, setShowFireworks] = useState(false);
  const [bgMusic, setBgMusic] = useState(false);
  const [showBirthdayContent, setShowBirthdayContent] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const playlist = [
    happyBday,
    happyBdayPiano,
    happyBdayPiano,
    happyBday,
    happyBdayPiano,
    happyBdayPiano,
    happyBday
  ];

  const playCurrentTrack = () => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrackIndex];
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };

  useEffect(() => {
    if (audioRef.current && bgMusic) {
      const handleTrackEnd = () => {
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

  // Upgraded wishes data with custom premium gradient mapping
  const wishes = [
    {
      icon: Heart,
      title: "Warm Wishes",
      message: "May your day be filled with joy, laughter, and everything that makes you smile!",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Sparkles,
      title: "Magical Moments",
      message: "Every moment with you is magical. Here's to creating many more beautiful memories!",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Gift,
      title: "Special Day",
      message: "You deserve all the happiness in the world. Enjoy your special day to the fullest!",
      gradient: "from-amber-400 to-orange-500"
    },
    {
      icon: Star,
      title: "Shining Bright",
      message: "Keep shining like the star you are! The world is brighter with you in it.",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: Music,
      title: "Celebration Time",
      message: "Let the music play, dance like nobody's watching - it's YOUR day!",
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      icon: Camera,
      title: "Precious Memories",
      message: "May this birthday add another beautiful chapter to your life's story!",
      gradient: "from-fuchsia-500 to-pink-600"
    }
  ];

  const trailImages = [image1, image2, image3];

  return (
    <div className="app">
      <audio ref={audioRef}>
        Your browser does not support the audio element.
      </audio>
      
      <div className={`first-screen ${showBirthdayContent ? 'hidden' : 'visible'}`}>
        <HeroSection name="Cham" onCelebrate={handleCelebrate} />
      </div>
      
      {showBirthdayContent && (
        <>
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
                    <div className={`wish-icon-wrapper ${wish.gradient}`}>
                      <wish.icon className="wish-icon" />
                    </div>
                    <h3 className="wish-title">{wish.title}</h3>
                    <p className="wish-message">{wish.message}</p>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
            
            <div className="regular-content">
              <Gallery />
              
              <div style={{ height: '600px', position: 'relative', overflow: 'hidden', marginTop: '2rem' }}>
                <ImageTrail
                  key="image-trail"
                  items={trailImages}
                  variant={1}
                />
              </div>
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
