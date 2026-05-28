import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MoonEasterEgg() {
  const [taps, setTaps] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleMoonTap = () => {
    const newTaps = taps + 1;
    setTaps(newTaps);

    if (newTaps >= 5) {
      setShowModal(true);
      setTaps(0); // Reset
    }
  };

  return (
    <>
      {/* Mystical Moon with soft glow in background of hero */}
      <div className="absolute top-16 right-8 md:top-24 md:right-24 z-10">
        <motion.button
          onClick={handleMoonTap}
          className="relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-radial from-slate-100 to-slate-300 focus:outline-none cursor-pointer group"
          animate={{
            boxShadow: [
              "0 0 20px rgba(186, 230, 253, 0.4)",
              "0 0 35px rgba(186, 230, 253, 0.6)",
              "0 0 20px rgba(186, 230, 253, 0.4)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileTap={{ scale: 0.92 }}
        >
          {/* Moon surface details */}
          <div className="absolute top-3 left-4 w-4 h-4 rounded-full bg-slate-400/25 blur-[1px]"></div>
          <div className="absolute top-8 left-8 w-6 h-6 rounded-full bg-slate-400/20 blur-[1px]"></div>
          <div className="absolute bottom-4 left-6 w-3 h-3 rounded-full bg-slate-400/25 blur-[1px]"></div>
          
          {/* Subtle text hint upon tap */}
          {taps > 0 && taps < 5 && (
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-blue-300/60 tracking-widest whitespace-nowrap">
              {taps}/5
            </span>
          )}
        </motion.button>
      </div>

      {/* Secret Message Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="glass-panel-glow w-full max-w-sm rounded-2xl p-8 text-center relative overflow-hidden"
            >
              {/* Star particles in modal */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white animate-pulse" />
                <div className="absolute top-2/3 left-3/4 w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: "1s" }} />
              </div>

              <h3 className="text-serif text-3xl text-glow-blue font-light mb-4 text-blue-100">
                Un mensaje secreto
              </h3>
              <p className="text-sm text-blue-200/90 leading-relaxed mb-6">
                "Gracias por llegar hasta aquí.<br />
                Cada pequeño detalle en este universo fue diseñado pensando en ti."
              </p>
              
              <button
                onClick={() => setShowModal(false)}
                className="glass-button px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-blue-300 uppercase cursor-pointer"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
