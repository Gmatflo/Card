import React, { useState } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function LoveLetterSection() {
  const [ref, isVisible] = useScrollAnimation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      ref={ref}
      className="py-24 px-6 flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-lg text-center"
      >
        <h2 className="text-serif text-3xl md:text-4xl text-blue-100 font-light tracking-wide text-glow-blue mb-8">
          Una carta guardada para ti ♥️
        </h2>

        {/* Envelope Interactive Box */}
        <div className="relative w-full h-[65vh] min-h-[450px] max-h-[700px] rounded-2xl glass-panel flex flex-col justify-center items-center overflow-visible p-8 border border-blue-400/20 shadow-[0_30px_80px_rgba(15,23,42,0.35)] group">
          {/* Subtle star particle in background */}
          <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse" />
          <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-white opacity-30 animate-pulse" />

          {/* Post-it image decorations */}
          <div className="hidden md:block absolute top-8 -left-20 w-24 h-32 md:w-28 md:h-36 rounded-2xl bg-white/95 border border-slate-300/70 shadow-[0_18px_40px_rgba(15,23,42,0.18)] overflow-hidden rotate-[-4deg]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-4 rounded-b-xl bg-slate-100/80 shadow-sm" />
            <img
              src="/images/Captura%20de%20pantalla%202026-05-27%20015643.png"
              alt="Post it"
              className="w-full h-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
          <div className="hidden md:block absolute top-14 -right-20 w-24 h-32 md:w-28 md:h-36 rounded-2xl bg-white/95 border border-slate-300/70 shadow-[0_18px_40px_rgba(15,23,42,0.18)] overflow-hidden rotate-[6deg]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-4 rounded-b-xl bg-slate-100/80 shadow-sm" />
            <img
              src="/images/Captura%20de%20pantalla%202026-05-27%20020043.png"
              alt="Post it"
              className="w-full h-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
          <div className="hidden md:block absolute bottom-12 -left-20 w-24 h-32 md:w-28 md:h-36 rounded-2xl bg-white/95 border border-slate-300/70 shadow-[0_18px_40px_rgba(15,23,42,0.18)] overflow-hidden rotate-[-3deg]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-4 rounded-b-xl bg-slate-100/80 shadow-sm" />
            <img
              src="/images/Captura%20de%20pantalla%202026-05-27%20121804.png"
              alt="Post it"
              className="w-full h-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
          <div className="hidden md:block absolute bottom-12 -right-18 w-24 h-32 md:w-28 md:h-36 rounded-2xl bg-white/95 border border-slate-300/70 shadow-[0_18px_40px_rgba(15,23,42,0.18)] overflow-hidden rotate-[4deg]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-4 rounded-b-xl bg-slate-100/80 shadow-sm" />
            <img
              src="/images/txtxd.jpg"
              alt="Post it"
              className="w-full h-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>

          {/* Letter glass container */}
          <motion.div
            initial={{ scale: 0.96 }}
            animate={isOpen ? { y: -10, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full flex flex-col justify-center items-center relative z-10"
          >
            {!isOpen ? (
              <div className="flex flex-col items-center gap-6">
              {/* Animated Wax Seal Icon */}
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="group relative w-28 h-28 flex items-center justify-center rounded-full overflow-hidden focus:outline-none cursor-pointer"
              >
                <motion.div
                  animate={{ opacity: [0.35, 0.7, 0.35] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-blue-400/15 blur-2xl"
                />
                <div className="absolute inset-3 rounded-full border border-blue-300/30 overflow-hidden bg-slate-950/20">
                  <img
                    src="/images/soob.jpg"
                    alt="Soob"
                    className="h-full w-full object-cover"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
                <div className="absolute inset-0 rounded-full border border-white/10 shadow-inner shadow-white/5" />
              </motion.button>

              <p className="text-xs tracking-widest text-blue-200/50 uppercase">
                Pulsa para abrir
              </p>

              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center gap-2 px-8 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.3em] text-slate-100 bg-slate-900/80 ring-1 ring-slate-200/10 hover:bg-slate-900/95 transition-colors duration-300"
              >
                <span className="relative">Abrir</span>
              </motion.button>
            </div>
          ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full text-left flex flex-col relative"
              >
                {/* Close/Reset button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 right-0 text-blue-300/60 hover:text-blue-300 text-xs tracking-wider uppercase cursor-pointer"
                >
                  Cerrar
                </button>

                {/* Love Letter Content Section */}
                <div className="mt-8 flex-1 overflow-y-auto pr-4 text-blue-100/90 text-[14px] sm:text-[15px] leading-relaxed space-y-4 font-light text-serif custom-scrollbar text-center">
                  {/* Styled placeholder matching request */}
                  <div className="letter-content space-y-5 pb-8">
                    <p>Creo que la vida es muy corta para callarte lo que sientes, así que lo digo, aquí y ahora, Cath. Te extraño, cada momento.</p>
                    <p>Creo que esta generación no comprende lo que es el amor. El amor verdadero no se trata de una mirada ni de una cara bonita, porque la belleza física cambia con el tiempo y lo que hoy deslumbra mañana puede apagarse.</p>
                    <p>No se trata de sentir mariposas todo del tiempo ni de vivir en una emoción constante, es mucho más que eso. Amar de verdad es conocer a una persona más allá de lo que ella muestra, es entender sus silencios, acompañarla en sus días difíciles, es más bien ver su versión más vulnerable y aún así elegir quedarse.</p>
                    <p>Es ver sus heridas, sus errores, sus miedos y no huir. Ya que el amor real no es ciego, es ver con claridad y decidir no retroceder. No es un amor perfecto, se discute, se equivoca o tropieza, pero sabe sanar, pedir perdón, escuchar y crecer. No busca controlar ni llenar vacíos, más bien, es compartir, sumar, construir juntos algo que tenga sentido.</p>
                    <p>El amor verdadero no se alimenta solo de besos o caricias, se alimenta de respeto, paciencia, comprensión y compromisos. Estar incluso cuando no hay nada que ganar, es apoyar sin pedir nada a cambio, es quedarse cuando nadie más lo haría.</p>
                    <p>Y cuando los años pasen y la belleza se haya desvanecido, cuando la vida no sea tan fácil y los días buenos no sean tan frecuentes, será ese amor profundo y sincero el que lo sostenga todo, porque al final el amor verdadero no se trata de lo que se ve, sino de lo que se siente.</p>
                    <p>Creo que la mentira más grande que nos vendieron sobre el amor es que debe ser perfecto, constante, como en las películas, pero la verdad es muy diferente. El amor real no es esa explosión de fuegos artificiales que nunca se apaga, es despertarte cada día y elegir a esa persona incluso cuando ya no sientes mariposas en el estómago.</p>
                    <p>Es quedarte cuando todo se pone difícil, cuando la rutina golpea, cuando las imperfecciones se hacen evidentes, porque amar de verdad no es solo sentir, es decidir, es construir. Es mirar a alguien en sus peores días y decir: aquí sigo contigo.</p>
                    <p>El amor que dura no es el que nunca enfrenta tormentas, sino el que aprende a bailar bajo la lluvia. No es ausencia de conflictos, sino la voluntad de resolverlos juntos. Y tal vez eso no suene tan romántico como una película, pero te prometo algo: es mucho más real, mucho más profundo y mucho más valioso.</p>
                    <p>Porque al final del día, el verdadero amor no es encontrar a la persona perfecta, es ver a una persona imperfecta de manera perfecta... y eso es lo que siento por ti.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
