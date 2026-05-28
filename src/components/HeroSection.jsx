import React from "react";
import { motion } from "framer-motion";
import MoonEasterEgg from "./MoonEasterEgg";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Mystical Moon embedded in this section */}
      <MoonEasterEgg />

      {/* Hero content container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl text-center z-10 flex flex-col items-center gap-6"
      >
        {/* Poetic pre-title */}
        <motion.span
          variants={itemVariants}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/80 text-glow-blue"
        >
          Para ti
        </motion.span>

        {/* Cinematic Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-serif text-4xl sm:text-5xl md:text-6xl font-light text-blue-100/90 leading-tight text-glow-blue"
        >
          Desde hace tiempo quería decirte algo...
        </motion.h1>

        {/* Subtitle with custom transition delay */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base font-light text-blue-200/70 tracking-wide max-w-lg leading-relaxed mt-2"
        >
          Quizás este pequeño universo pueda explicarlo mejor. Sigue bajando...
        </motion.p>

        {/* Pulsing down arrow to guide the user */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-12 opacity-65"
        >
          <svg
            className="w-6 h-6 text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
