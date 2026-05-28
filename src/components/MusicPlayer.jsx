import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    // Setup audio element properties
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio play failed or was blocked: ", err);
      });
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end">
      {/* Hidden native audio player */}
      <audio
        ref={audioRef}
        src="/music/sukidakara.mp3"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="glass-panel-glow w-72 rounded-2xl p-4 flex flex-col gap-4 mr-2 mb-2 border border-blue-400/25 relative overflow-hidden"
          >
            {/* Soft pulsing glow behind album art when playing */}
            {isPlaying && (
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
            )}

            {/* Album Header */}
            <div className="flex items-center gap-3">
              {/* Rotating Album Art */}
              <div className="relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-slate-900 border border-blue-400/30">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full flex items-center justify-center text-base font-semibold text-white bg-gradient-to-tr from-blue-900 to-indigo-900"
                >
                  MUS
                </motion.div>
              </div>

              {/* Title Info */}
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-semibold text-blue-100 truncate tracking-wide">
                  Sukidakara (Cover)
                </span>
                <span className="text-[10px] text-blue-300/70 uppercase tracking-widest mt-0.5">
                  BEOMGYU [TXT]
                </span>
              </div>
            </div>

            {/* Progress Slider */}
            <div className="flex flex-col gap-1">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400 focus:outline-none"
              />
              <div className="flex justify-between text-[8px] text-blue-300/50 uppercase tracking-widest">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play/Pause Button Controls */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handlePlayPause}
                className="w-10 h-10 rounded-full bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-sm text-blue-200 hover:bg-blue-500/35 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full glass-panel-glow border border-blue-400/35 flex items-center justify-center text-lg text-blue-200 shadow-2xl relative cursor-pointer"
      >
        {/* Pulsing indicator if playing */}
        {isPlaying && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
        )}
        🎵
      </motion.button>
    </div>
  );
}
