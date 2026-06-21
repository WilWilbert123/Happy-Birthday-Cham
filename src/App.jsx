import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import HeroSection from "./components/HeroSection/HeroSection.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";
import ScrollStack, {
  ScrollStackItem,
} from "./components/ScrollStack/ScrollStack.jsx";
import Galaxy from "./components/Galaxy/Galaxy.jsx";
import ImageTrail from "./components/ImageTrail/ImageTrail.jsx";
import { Heart, Sparkles, Gift, Star, Music, Camera, X } from "lucide-react";
 
// Import sound files
import happyBday from "./assets/sounds/happybday.mp3";
import happyBdayPiano from "./assets/sounds/happybdaypiano.mp3";

// Import images from assets/resources
import image1 from "./assets/resources/em.jpg";
import image2 from "./assets/resources/portr.png";
import image3 from "./assets/resources/wew.jpg";

function App() {
  const [showFireworks, setShowFireworks] = useState(false);
  const [bgMusic, setBgMusic] = useState(false);
  const [showBirthdayContent, setShowBirthdayContent] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [activeLetter, setActiveLetter] = useState(null); // Tracks open envelope
  const audioRef = useRef(null);

  const playlist = [
    happyBday,
    happyBdayPiano,
    happyBdayPiano,
    happyBday,
    happyBdayPiano,
    happyBdayPiano,
    happyBday,
  ];

  const playCurrentTrack = () => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrackIndex];
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  };

  useEffect(() => {
    if (audioRef.current && bgMusic) {
      const handleTrackEnd = () => {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
      };

      audioRef.current.addEventListener("ended", handleTrackEnd);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleTrackEnd);
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
      document.body.classList.add("love-letter-open");
    } else {
      document.body.classList.remove("love-letter-open");
    }
    return () => document.body.classList.remove("love-letter-open");
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
      message:
        "Sana Masaya ka niyan na birthday mo! I wish you a day filled with love, laughter, and unforgettable moments.",
      gradient: "from-pink-500 to-rose-500",
      stamp: "❤️",
    },
    {
      icon: Heart,
      title: "Magical Moments",
      message:
        "May your birthday be as magical and sparkling as you are. Cheers to another year of wonderful adventures and amazing memories!",
      gradient: "from-purple-500 to-indigo-500",
      stamp: "❤️",
    },
    {
      icon: Heart,
      title: "Special Day",
      message:
        "Sana magustuhan mo ang regalo ko sayo haha wara ako maisip na regalo kaya yan nalang. Happy birthday and enjoy your day!",
      gradient: "from-amber-400 to-orange-500",
      stamp: "❤️",
    },
    {
      icon: Heart,
      title: "Shining Bright",
      message:
        "Keep shining like the star you are. The world is definitely brighter with you in it.",
      gradient: "from-cyan-400 to-blue-500",
      stamp: "❤️",
    },
    {
      icon: Heart,
      title: "Celebration Time",
      message:
        "Let the music play and dance like nobody's watching. It's your special day, baby!",
      gradient: "from-emerald-400 to-teal-500",
      stamp: "❤️",
    },
    {
      icon: Heart,
      title: "Precious Memories",
      message:
        "May this birthday add another beautiful chapter to your life's story. I hope you capture every single happy moment today!",
      gradient: "from-fuchsia-500 to-pink-600",
      stamp: "❤️",
    },
  ];

  const trailImages = [image1, image2, image3];

  return (
    <div className="app">
      <audio ref={audioRef}>
        Your browser does not support the audio element.
      </audio>

      <div
        className={`first-screen ${showBirthdayContent ? "hidden" : "visible"}`}
      >
        <HeroSection name="Cham" onCelebrate={handleCelebrate} />
      </div>

      {showBirthdayContent && (
        <div className="birthday-content-wrapper">
          {/* Intro Section Container with Isolated Galaxy Elements */}
          <header className="birthday-intro-container">
            <div className="galaxy-canvas-container">
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
              {/* Soft feather gradient plate turning the canvas off at bottom */}
              <div className="galaxy-cosmic-blur-bottom"></div>
            </div>

            <div className="birthday-sequential-wrapper">
              <h1 className="seq-cosmic-text step-1">Hey baby</h1>
              <h1 className="seq-cosmic-text step-2">it's your birthday!</h1>
              <h1 className="seq-cosmic-text step-3">
                Today is all about celebrating the most incredible person in the
                universe.
              </h1>
              <h1 className="seq-cosmic-text step-4">
                Look around, the entire galaxy is shining brightly just for you
                baby!
              </h1>
            </div>
          </header>
        </div>
      )}

     
      <div className="birthday-content">
        
        <ScrollStack
          itemDistance={300}
          itemScale={0}
          itemStackDistance={0}
          stackPosition="5%"
          scaleEndPosition="5%"
          baseScale={0}
          rotationAmount={2}
          blurAmount={0}
          useWindowScroll={true}
          onStackComplete={() => console.log("All cards stacked!")}
        >
        
          {wishes.map((wish, index) => (
            
            <ScrollStackItem key={index} itemClassName="envelope-stack-item">
            
              <div
                className="stack-envelope-wrapper"
                onClick={() => setActiveLetter(wish)}
              >
                <div className="stack-envelope">
                  <div className="envelope-flap"></div>
                  <div className="envelope-detail"></div>

                  {/* Integrated Gift Ribbon & Top Right Manual Bow */}
                  <div className="envelope-gift-wrap">
                    <div className="envelope-ribbon-v"></div>
                    <div className="envelope-ribbon-h"></div>

                    {/* CSS Bow Engine placed at the cross path (Top Right) */}
                    <div className="manual-ribbon-bow">
                      <div className="bow-loop-left"></div>
                      <div className="bow-loop-right"></div>
                      <div className="bow-knot"></div>
                      <div className="bow-tail-left"></div>
                      <div className="bow-tail-right"></div>
                    </div>
                  </div>

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

        {/* Elegant Modal Engine for Displaying Opened Messages */}
        {activeLetter && (
          <div
            className="letter-modal-overlay"
            onClick={() => setActiveLetter(null)}
          >
            <div
              className="letter-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="letter-close-btn"
                onClick={() => setActiveLetter(null)}
              >
                <X size={20} />
              </button>

              <div className="opened-letter-paper">
                <div className="letter-header">
                  <div className={`letter-badge ${activeLetter.gradient}`}>
                    <activeLetter.icon size={24} className="text-white" />
                  </div>
                </div>

                <h2 className="opened-letter-title">{activeLetter.title}</h2>
                <div className="letter-divider"></div>
                <p className="opened-letter-message">{activeLetter.message}</p>

                <div className="letter-footer">
                  <p>With love,</p>
                  <p className="signature">Wilbert Gamis</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Core Lower Page Features */}
        <div className="regular-content">
          <Gallery />

          <div
            style={{
              height: "600px",
              position: "relative",
              overflow: "hidden",
              marginTop: "2rem",
            }}
          >
            <ImageTrail key="image-trail" items={trailImages} variant={1} />
          </div>
        </div>

        <footer className="py-8 text-center text-white/60 text-sm">
          <p>Made with ❤️ for Cham | Happy Birthday!</p>
          <p className="mt-2">✨ May all your wishes come true ✨</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
