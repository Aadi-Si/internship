import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function CreativeProcess() {
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

  const artists = [
    "Silence", "Meditation", "Intuition", "Authenticity", "Presence",
    "Listening", "Curiosity", "Patience", "Surrender", "Simplicity",
  ];

  const categories = [
    "Reduction", "Essence", "Space", "Resonance", "Truth",
    "Feeling", "Clarity", "Emptiness", "Awareness", "Minimalism",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // === Loader ===
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
          onComplete: () => setIsLoaded(true),
        });
      }

      loadingCounter.textContent = `[${counter.toFixed(0).padStart(2, "0")}]`;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // === Image Transition ===
  const changeBackground = (index) => {
    if (index === activeIndex) return;

    const currentBg = document.getElementById(`bg-${activeIndex}`);
    const nextBg = document.getElementById(`bg-${index}`);

    gsap.set(nextBg, {
      clipPath: "inset(100% 0% 0% 0%)",
      opacity: 1,
      zIndex: 20,
    });

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(currentBg, { opacity: 0, zIndex: 0 });
        setActiveIndex(index);
      },
    });

    tl.to(nextBg, { clipPath: "inset(0% 0% 0% 0%)" });
    tl.to(currentBg, { opacity: 0.3, duration: 0.4, ease: "power2.out" }, "-=0.4");
  };

  return (
    <>
      {/* === LOADING OVERLAY === */}
      <div
        id="loading-overlay"
        className="fixed inset-0 flex items-center justify-center bg-white text-black text-3xl uppercase z-9999 font-bold tracking-tight"
      >
        <div className="flex items-center justify-center animate-pulse">
          <span>Loading</span>
          <span id="loading-counter" className="ml-2 font-normal">[00]</span>
        </div>
      </div>

      {/* === MAIN SECTION === */}
      {isLoaded && (
        <div className="relative h-screen w-full overflow-hidden bg-black text-[rgba(245,245,245,0.9)] font-ppNeue">
          {/* Background Images */}
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

          {/* Foreground Content */}
          <div className="absolute inset-0 z-50 pointer-events-auto flex flex-col items-center justify-between text-center">
            {/* Header */}
            <div className="text-[10vw] uppercase leading-[0.8] mt-4 select-none">
              <div>The Creative</div>
              <div>Process</div>
            </div>

            {/* Center Content */}
            <div className="flex justify-between items-center w-full px-12 text-[rgba(245,245,245,0.9)]">
              {/* Left Column */}
              <div className="w-[35%] flex flex-col gap-1 text-left">
                {artists.map((name, i) => (
                  <div
                    key={i}
                    onClick={() => changeBackground(i)}
                    className={`cursor-pointer select-none transition-all duration-300 flex items-center ${
                      i === activeIndex
                        ? "opacity-100 translate-x-10px pl-3"
                        : "opacity-40 hover:opacity-80"
                    }`}
                  >
                    {/* Dot before text for active item */}
                    {i === activeIndex && (
                      <span className="w-2 h-2 bg-white rounded-full mr-2 transition-all duration-300" />
                    )}
                    <span>{name}</span>
                  </div>
                ))}
              </div>

              {/* Center Text */}
              <div className="w-[20%] text-center text-[1.5vw] select-none">
                <h3 className="transition-all duration-500">
                  {[
                    "Creative Elements","Inner Stillness","Deep Knowing","True Expression",
                    "Now Moment","Deep Attention","Open Exploration","Calm Waiting",
                    "Let Go Control","Pure Essence",
                  ][activeIndex]}
                </h3>
              </div>

              {/* Right Column */}
              <div className="w-[35%] flex flex-col gap-1 text-right">
                {categories.map((name, i) => (
                  <div
                    key={i}
                    onClick={() => changeBackground(i)}
                    className={`cursor-pointer select-none transition-all duration-300 flex items-center justify-end ${
                      i === activeIndex
                        ? "opacity-100 -translate-x-10px pr-3"
                        : "opacity-40 hover:opacity-80"
                    }`}
                  >
                    <span>{name}</span>
                    {/* Dot after text for active item */}
                    {i === activeIndex && (
                      <span className="w-2 h-2 bg-white rounded-full ml-2 transition-all duration-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-[10vw] uppercase leading-[0.8] mb-4 select-none">
              <div>Beyond</div>
              <div>Thinking</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
