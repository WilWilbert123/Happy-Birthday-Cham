// C:\Users\HERROZ\Desktop\Happy-Birthday-Cham\src\App.jsx
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack/ScrollStack.jsx';
import Galaxy from './components/Galaxy/Galaxy.jsx';
import ImageTrail from './components/ImageTrail/ImageTrail.jsx';
import { Heart, Sparkles, Gift, Star, Music, Camera, X } from 'lucide-react';

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
  const [activeLetter, setActiveLetter] = useState(null); // Track open envelope
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

  // Handle body scroll locking when a letter is opened
  useEffect(() => {
    if (activeLetter) {
      document.body.classList.add('love-letter-open');
    } else {
      document.body.classList.remove('love-letter-open');
    }
    return () => document.body.classList.remove('love-letter-open');
  }, [activeLetter]);

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
      message: "May your day be filled with joy, laughter, and everything that makes you smile!",
      gradient: "from-pink-500 to-rose-500",
      stamp: "❤️"
    },
    {
      icon: Sparkles,
      title: "Magical Moments",
      message: "Every moment with you is magical. Here's to creating many more beautiful memories!",
      gradient: "from-purple-500 to-indigo-500",
      stamp: "✨"
    },
    {
      icon: Gift,
      title: "Special Day",
      message: "You deserve all the happiness in the world. Enjoy your special day to the fullest!",
      gradient: "from-amber-400 to-orange-500",
      stamp: "🎁"
    },
    {
      icon: Star,
      title: "Shining Bright",
      message: "Keep shining like the star you are! The world is brighter with you in it.",
      gradient: "from-cyan-400 to-blue-500",
      stamp: "⭐"
    },
    {
      icon: Music,
      title: "Celebration Time",
      message: "Let the music play, dance like nobody's watching - it's YOUR day!",
      gradient: "from-emerald-400 to-teal-500",
      stamp: "🎵"
    },
    {
      icon: Camera,
      title: "Precious Memories",
      message: "May this birthday add another beautiful chapter to your life's story!",
      gradient: "from-fuchsia-500 to-pink-600",
      stamp: "📸"
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
          {/* Fixed Galaxy Background component */}
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
          
          {/* Main Layout Wrapper to handle overlay transparency issues */}
          <div className="birthday-content-wrapper">
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
                  <ScrollStackItem key={index} itemClassName="envelope-stack-item">
                    {/* Interactive Envelope Card */}
                    <div className="envelope-wrapper" onClick={() => setActiveLetter(wish)}>
                      <div className="envelope">
                        <div className="envelope-flap"></div>
                       
                        <div className="envelope-detail"></div>
                        <div className="envelope-seal-wrapper">
                          <div className={`envelope-seal ${wish.gradient}`}>
                            <wish.icon className="seal-icon" />
                          </div>
                        </div>
                        <div className="envelope-front-label">
                          <p className="label-click-hint">Click to Open</p>
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
              
              {/* Elegant Center Modal for opened letter */}
              {activeLetter && (
                <div className="letter-modal-overlay" onClick={() => setActiveLetter(null)}>
                  <div className="letter-modal-container" onClick={(e) => e.stopPropagation()}>
                    <button className="letter-close-btn" onClick={() => setActiveLetter(null)}>
                      <X size={20} />
                    </button>
                    
                    <div className="opened-letter-paper">
                      <div className="letter-header">
                        <div className={`letter-badge ${activeLetter.gradient}`}>
                          <activeLetter.icon size={24} className="text-white" />
                        </div>
                        <span className="letter-stamp">{activeLetter.stamp}</span>
                      </div>
                      
                      <h2 className="opened-letter-title">{activeLetter.title}</h2>
                      <div className="letter-divider"></div>
                      <p className="opened-letter-message">{activeLetter.message}</p>
                      
                      <div className="letter-footer">
                        <p>With love,</p>
                        <p className="signature">Forever Yours ❤️</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
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
          </div>
        </>
      )}
    </div>
  );
}

export default App;