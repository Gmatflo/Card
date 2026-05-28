import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import StarCanvas from "./components/StarCanvas";
import ShootingStars from "./components/ShootingStars";
import HeroSection from "./components/HeroSection";
import LoveLetterSection from "./components/LoveLetterSection";
import SpecialDetailsSection from "./components/SpecialDetailsSection";
import ProposalSection from "./components/ProposalSection";
import MusicPlayer from "./components/MusicPlayer";
import FloatingElements from "./components/FloatingElements";
import CursorEffect from "./components/CursorEffect";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative min-h-screen text-slate-100 selection:bg-blue-500/35 selection:text-white"
          >
            {/* Space Engine Background */}
            <StarCanvas />
            <ShootingStars />
            
            {/* Interactive Desktop Trail Effect */}
            <CursorEffect />

            {/* Custom Theme floating cards and TXT planets */}
            <FloatingElements />

            {/* Scrolling Pages and proposal structure */}
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col">
              <HeroSection />
              <LoveLetterSection />
              <SpecialDetailsSection />
              <ProposalSection />
            </div>

            {/* Custom audio player controller in bottom-right corner */}
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
