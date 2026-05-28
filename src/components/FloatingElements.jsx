import React from "react";
import { motion } from "framer-motion";

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* 3. Tiny floating aesthetic sparkle */}
      <motion.div
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-[35%] right-8 md:right-40 w-3 h-3 rounded-full bg-white/20 opacity-40 blur-sm"
      />

    </div>
  );
}
