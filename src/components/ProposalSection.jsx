import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function ProposalSection() {
  const [ref, isVisible] = useScrollAnimation();
  const [answeredYes, setAnsweredYes] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const handleYes = () => {
    setAnsweredYes(true);
    
    // Trigger mobile vibration if available
    if ("vibrate" in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch (e) {
        console.log("Vibration blocked or not supported on this hardware");
      }
    }
  };

  const handleNoHover = () => {
    // Generate a random position to make the button run away
    // Keep coordinates within a safe bubble on mobile screens
    const rangeX = window.innerWidth > 640 ? 150 : 80;
    const rangeY = window.innerWidth > 640 ? 100 : 60;
    
    const randomX = (Math.random() - 0.5) * rangeX * 2;
    const randomY = (Math.random() - 0.5) * rangeY * 2;
    
    setNoButtonPos({ x: randomX, y: randomY });
  };

  return (
    <section
      ref={ref}
      className="py-24 px-6 flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
    >
      {/* Glow aura backplate when YES is chosen */}
      <AnimatePresence>
        {answeredYes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-500/25 blur-3xl pointer-events-none -z-10"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        className="w-full max-w-md text-center flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          {!answeredYes ? (
            <motion.div
              key="ask"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <h2 className="text-serif text-3xl sm:text-4xl md:text-5xl text-blue-100 font-light tracking-wide text-glow-blue leading-snug">
                ¿Quieres ser mi enamorada, Cath? 💕
              </h2>

              <div className="flex flex-row items-center justify-center gap-6 mt-4 w-full relative min-h-[120px]">
                {/* YES BUTTON */}
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 min-w-[150px] rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/35 transition-colors duration-300 text-base tracking-widest uppercase cursor-pointer relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                  Sí
                </motion.button>

                {/* ESCAPING NO BUTTON */}
                <motion.button
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  onClick={handleNoHover}
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", damping: 15, stiffness: 180 }}
                  className="px-8 py-4 rounded-full glass-button text-blue-200/80 hover:text-white font-medium text-sm tracking-widest uppercase cursor-pointer"
                >
                  Necesito pensarlo
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-8"
            >
              {/* Romantic glowing moon orb */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="relative w-32 h-32"
              >
                {/* Outer glow rings */}
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-gradient-radial from-blue-400/40 to-transparent blur-2xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-blue-300/30 blur-sm"
                />
                
                {/* Central orb */}
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(96, 165, 250, 0.4), inset 0 0 20px rgba(96, 165, 250, 0.1)",
                      "0 0 40px rgba(96, 165, 250, 0.6), inset 0 0 30px rgba(96, 165, 250, 0.2)",
                      "0 0 20px rgba(96, 165, 250, 0.4), inset 0 0 20px rgba(96, 165, 250, 0.1)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-2 rounded-full overflow-hidden border border-blue-300/40 bg-slate-950/10"
                >
                  <img
                    src="/images/soob.jpg"
                    alt="Soob"
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 via-transparent to-blue-500/10 mix-blend-screen" />
                </motion.div>
              </motion.div>

              {/* Animated text: "Te quiero mucho <3" word by word */}
              <h2 className="text-serif text-4xl sm:text-5xl text-blue-100 font-light tracking-wide text-glow-blue leading-snug flex flex-wrap items-center justify-center gap-2">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Te
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  quiero
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                >
                  mucho
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.45, duration: 0.8 }}
                >
                  mi Cath
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="text-4xl"
                >
                  💖
                </motion.span>
              </h2>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
