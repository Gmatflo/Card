import React from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function MemoriesSection() {
  const [ref, isVisible] = useScrollAnimation();

  // Polaroid memories placeholders
  const memories = [
    {
      id: 1,
      title: "Tu hermosa sonrisa",
      date: "Un día inolvidable",
      bgGradient: "from-blue-900/40 to-slate-900/60",
      description: "Tu foto favorita aquí",
    },
    {
      id: 2,
      title: "TXT Vibes",
      date: "Bailando juntos",
      bgGradient: "from-purple-900/40 to-slate-900/60",
      description: "TXT o Soobin foto aquí",
    },
    {
      id: 3,
      title: "Bajo las estrellas",
      date: "Aquella noche mágica",
      bgGradient: "from-blue-950/50 to-indigo-950/60",
      description: "Un recuerdo especial aquí",
    },
    {
      id: 4,
      title: "Nuestra canción",
      date: "Sukidakara en repetición",
      bgGradient: "from-violet-900/40 to-slate-900/60",
      description: "Tu foto preferida aquí",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 px-6 flex flex-col items-center justify-center min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="w-full max-w-4xl flex flex-col gap-6"
      >
        <div className="text-center px-4">
          <h2 className="text-serif text-3xl md:text-4xl text-blue-100 font-light tracking-wide text-glow-blue">
            Nuestros momentos
          </h2>
          <p className="text-xs text-blue-200/50 tracking-wider uppercase mt-2">
            Desliza horizontalmente para ver la galería
          </p>
        </div>

        {/* Mobile-first horizontal snap-scroll container */}
        <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 py-8 px-4 no-scrollbar">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center snap-always bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl flex flex-col"
            >
              {/* Image box/Placeholder with TXT vibe */}
              <div
                className={`w-full aspect-square rounded-lg bg-gradient-to-tr ${memory.bgGradient} border border-blue-400/10 flex flex-col justify-center items-center text-center p-4 relative overflow-hidden group`}
              >
                {/* Floating shiny effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                <span className="text-[10px] opacity-60 mb-2 uppercase tracking-widest text-blue-300">
                  FOTO AQUÍ
                </span>
                <p className="text-[10px] text-blue-200/40 px-6 mt-1">
                  {memory.description}
                </p>
              </div>

              {/* Polaroid-style footer */}
              <div className="mt-4 flex flex-col text-left px-1">
                <span className="text-serif text-lg font-light text-blue-100 tracking-wide">
                  {memory.title}
                </span>
                <span className="text-[10px] text-blue-300/50 uppercase tracking-widest mt-1">
                  {memory.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
