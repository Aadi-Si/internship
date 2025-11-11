import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function CreativeProcess() {
  // === BACKGROUND IMAGES ===
  const backgrounds = [
    "https://assets.codepen.io/7558/flame-glow-blur-001.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-002.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-003.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-004.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-005.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-006.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-007.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-008.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-009.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-010.jpg",
  ];

  // === TEXT DATA ===
  const artists = [
    "SILENCE", "MEDITATION", "INTUTION", "AUTHENTICITY", "PRESENCE",
    "LISTENING", "CURIOSITY", "PATIENCE", "SURRENDER", "SIMPLICITY",
  ];

  const categories = [
    "REDUCTION", "ESSENCE", "SPACE", "RESONANCE", "TRUTH",
    "FEELING", "CLARITY", "EMPTINESS", "AWARENESS", "MINIMALISM",
  ];

  const centerTexts = [
    "CREATIVE ELEMENTS", "INNER STILLNESS", "DEEP KNOWING", "TRUE EXPRESSION",
    "NOW MOMENT", "DEEP ATTENTION", "OPEN EXPLORATION", "CALM WAITING",
    "LET GO CONTROL", "PURE ESSENCE",
  ];

  // === REACT STATES ===
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // === SOUND SYSTEM ===
  const sounds = {
    hover: new Audio("https://assets.codepen.io/7558/click-reverb-001.mp3"),
    click: new Audio("https://assets.codepen.io/7558/shutter-fx-001.mp3"),
    whoosh: new Audio("https://assets.codepen.io/7558/whoosh-fx-001.mp3"),
  };

  // Volumes
  sounds.hover.volume = 0.15;
  sounds.click.volume = 0.3;
  sounds.whoosh.volume = 0.3;

  let audioEnabled = false;

  const enableAudio = () => {
    if (!audioEnabled) {
      audioEnabled = true;
      console.log("🔊 Audio enabled");
    }
  };

  const playSound = (name, delay = 0) => {
    if (!audioEnabled || !soundEnabled || !sounds[name]) return;
    const sound = sounds[name];
    sound.currentTime = 0;
    setTimeout(() => sound.play().catch(() => {}), delay);
  };

  // === LOADER EFFECT ===
  useEffect(() => {
    let counter = 0;
    const loadingOverlay = document.getElementById("loading-overlay");
    const loadingCounter = document.getElementById("loading-counter");

    const interval = setInterval(() => {
      counter += Math.random() * 3 + 1;
      if (counter >= 100) {
        counter = 100;
        clearInterval(interval);

        gsap.to(loadingCounter, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.inOut",
        });

        gsap.to(loadingOverlay, {
          y: "-100%",
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.3,
          onComplete: () => {
            setIsLoaded(true);
            playSound("whoosh", 300);
          },
        });
      }

      loadingCounter.textContent = `[${counter.toFixed(0).padStart(2, "0")}]`;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // === IMAGE TRANSITION ===
  const changeBackground = (index) => {
    if (index === activeIndex) return;

    enableAudio();
    playSound("click");
    playSound("whoosh", 100);

    const currentBg = document.getElementById(`bg-${activeIndex}`);
    const nextBg = document.getElementById(`bg-${index}`);

    gsap.set(nextBg, {
      clipPath: "inset(100% 0% 0% 0%)",
      opacity: 1,
      zIndex: 20,
    });

    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(currentBg, { opacity: 0, zIndex: 0 });
        setActiveIndex(index);
      },
    });

    tl.to(nextBg, { clipPath: "inset(0% 0% 0% 0%)" });
    tl.to(currentBg, { opacity: 0.3, duration: 0.3, ease: "power2.out" }, "-=0.3");
  };

  return (
    <>
      {/* === LOADING OVERLAY === */}
      <div
        id="loading-overlay"
        className="fixed inset-0 flex flex-col items-center justify-center bg-white text-black text-3xl font-medium uppercase z-9999"
      >
        <div className="flex items-center justify-center">
          <span>Loading</span>
          <span id="loading-counter" className="ml-2">[00]</span>
        </div>
      </div>

      {/* === MAIN SECTION === */}
      {isLoaded && (
        <div className="relative h-screen w-full overflow-hidden bg-black text-[rgba(245,245,245,0.9)] font-ppNeue">
          {/* === BACKGROUNDS === */}
          {backgrounds.map((src, i) => (
            <img
              key={i}
              id={`bg-${i}`}
              src={src}
              alt={`Background ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}

          {/* === SOUND TOGGLE === */}
          <div
            className={`sound-toggle fixed top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              soundEnabled
                ? "bg-white/10 border border-white/20 hover:bg-white/20"
                : "bg-white/5 border border-white/10"
            }`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            onMouseEnter={() => {
              enableAudio();
              playSound("hover");
            }}
          >
            <div className="relative w-1 h-1">
              {[1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={`absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 ${
                    soundEnabled
                      ? "animate-ping opacity-100"
                      : "opacity-30"
                  }`}
                  style={{ animationDelay: `${dot * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* === FOREGROUND CONTENT === */}
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-between text-center">
            {/* HEADER */}
            <div className="text-[10vw] uppercase leading-[0.8] mt-5 select-none font-medium">
              <div>The Creative</div>
              <div>Process</div>
            </div>

            {/* MIDDLE SECTION */}
            <div className="flex justify-between items-center w-full px-12 text-[rgba(245,245,245,0.9)]">
              {/* LEFT COLUMN */}
              <div className="w-[35%] flex flex-col gap-1 text-left">
                {artists.map((name, i) => (
                  <div
                    key={i}
                    onClick={() => changeBackground(i)}
                    onMouseEnter={() => {
                      enableAudio();
                      playSound("hover");
                    }}
                    className={`cursor-pointer flex items-center select-none font-medium transition-all duration-300 ${
                      i === activeIndex
                        ? "opacity-100 translate-x-2.5 pl-3"
                        : "opacity-40 hover:opacity-80"
                    }`}
                  >
                    {i === activeIndex && (
                      <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    )}
                    {name}
                  </div>
                ))}
              </div>

              {/* CENTER TEXT */}
              <div className="w-[20%] text-center text-[1.5vw] font-medium select-none">
                <h3 className="transition-all duration-500">{centerTexts[activeIndex]}</h3>
              </div>

              {/* RIGHT COLUMN */}
              <div className="w-[35%] flex flex-col gap-1 text-right">
                {categories.map((name, i) => (
                  <div
                    key={i}
                    onClick={() => changeBackground(i)}
                    onMouseEnter={() => {
                      enableAudio();
                      playSound("hover");
                    }}
                    className={`cursor-pointer flex items-center font-medium justify-end select-none transition-all duration-300 ${
                      i === activeIndex
                        ? "opacity-100 -translate-x-2.5 pr-3"
                        : "opacity-40 hover:opacity-80"
                    }`}
                  >
                    {name}
                    {i === activeIndex && (
                      <span className="w-2 h-2 bg-white rounded-full ml-2"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="text-[10vw] uppercase leading-[0.8] mb-4 translate-y-[-5vh] select-none font-medium">
              <div>Beyond</div>
              <div>Thinking</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
