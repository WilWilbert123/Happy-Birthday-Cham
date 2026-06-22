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
      title: "Dear Cham,",
      message:
        " Hi baby, happy birthday! Grabe, kadali lang san panahon, pero kagayon mo man gihapon haha love you. Basta pirme mo lang tandaan na yadi ako para saimo, umulan man o umaraw maski nano pa yun, basta ikaw kay mahal na mahal ko ikaw. Very proud ako saimo kun nano an mayon ka niyan. Salamat kay maski nano manyare, pirmi ka yada para saako haha maski maburong an ulo hmm. Wish ko niyan na birthday mo sana matupad intiro na wish mo, nan sana masaya ka niyan. Mag ingat ka pirme ha kay mabata pa kita napulo hahahahaha joke lang, kadaghan sun badi mauyam ka hahaha. Basta ingat pirmi ha. Wish you all the best, baby. I hope this day brings you so much laughter, love, and unforgettable memories. Cheers to you and to more wonderful adventures together!",
      gradient: "from-pink-500 to-rose-500",
      stamp: "❤️",
    },
  ];

  
  return (
    <div className="app">
      <audio ref={audioRef}>
        Your browser does not support the audio element.
      </audio>

      {/* PAGE 1: HERO ENTRY SCREEN */}
      <div className={`first-screen ${showBirthdayContent ? "hidden" : "visible"}`}>
        <HeroSection name="Cham" onCelebrate={handleCelebrate} />
      </div>

      {showBirthdayContent && (
        <div className="birthday-main-timeline">
          
          {/* PERSISTENT GALAXY BACKGROUND FOR ALL TIMELINE PAGES */}
          <div className="galaxy-canvas-container persistent-galaxy">
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
            <div className="galaxy-cosmic-blur-bottom"></div>
          </div>

          {/* INTRO SECTION: COSMIC GALAXY LAYER */}
          <header className="birthday-intro-container">
            <div className="birthday-sequential-wrapper">
              <h1 className="seq-cosmic-text step-1">Hey baby</h1>
              <h1 className="seq-cosmic-text step-2">it's your birthday!</h1>
              <h1 className="seq-cosmic-text step-3">
                Today is all about celebrating the most incredible person in the universe.
              </h1>
              <h1 className="seq-cosmic-text step-4">
                Look around, the entire galaxy is shining brightly just for you baby!
              </h1>
            </div>
          </header>

          {/* PAGE 2: THE ENVELOPE / SCROLL STACK SECTION */}
          <section className="birthday-envelope-section">
            <div className="birthday-content">
              
                {wishes.map((wish, index) => (
                  <ScrollStackItem key={index} itemClassName="envelope-stack-item">
                    <div
                      className="stack-envelope-wrapper"
                      onClick={() => setActiveLetter(wish)}
                    >
                      <div className="stack-envelope">
                        <div className="envelope-flap"></div>
                        <div className="envelope-detail"></div>

                        <div className="envelope-gift-wrap">
                          <div className="envelope-ribbon-v"></div>
                          <div className="envelope-ribbon-h"></div>

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
              
            </div>
          </section>

          {/* PAGE 3: CORE CONTENT (GALLERY & TRAIL) */}
          <main className="regular-content">
            <Gallery />

            
          </main>

          {/* FOOTER */}
          <footer className="py-8 text-center text-white/60 text-sm structural-footer">
            <p>Made with ❤️ for Cham | Happy Birthday!</p>
            <p className="mt-2">✨ May all your wishes come true ✨</p>
          </footer>
        </div>
      )}

      {/* LETTER Parchment Popup Modal Engine */}
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
    </div>
  );
}

export default App;