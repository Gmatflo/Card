import React from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function SpecialDetailsSection() {
  const [ref, isVisible] = useScrollAnimation();

  const details = [
    {
      id: 1,
      number: "01",
      title: "Tu sonrisa me ilumina",
      description: "No exagero cuando digo que es la cosa más preciosa que he visto, me cambia el día por completo.",
    },
    {
      id: 2,
      number: "02",
      title: "Tu forma de ser tranquila",
      description: "Tienes una forma de ser que me da muchísima paz, me encanta cómo te preocupas y cuidas a los demás.",
    },
    {
      id: 3,
      number: "03",
      title: "Cuando hablamos de todo y de nada",
      description: "Podría pasarme horas escuchándote y nunca me aburriría. Esos ratitos son mis favoritos.",
    },
    {
      id: 4,
      number: "04",
      title: "Tus ojos me inspiran calma",
      description: "Me pierdo viéndote. Tienen un brillo que me transmite una tranquilidad que a veces no sé cómo explicar.",
    },
    {
      id: 5,
      number: "05",
      title: "Lo que siento junto a ti",
      description: "Estar contigo es como llegar a casa después de un día muy pesado. Eres literalmente mi lugar seguro.",
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
        className="w-full max-w-lg flex flex-col gap-10"
      >
        <div className="text-center">
          <h2 className="text-serif text-3xl md:text-4xl text-blue-100 font-light tracking-wide text-glow-blue">
            5 cosas que me gustan de ti
          </h2>
          <p className="text-xs text-blue-200/50 tracking-wider uppercase mt-2">
            Lo que más me gusta de ti
          </p>
        </div>

        {/* Dynamic Cards Stack */}
        <div className="flex flex-col gap-4">
          {details.map((detail, index) => (
            <motion.div
              key={detail.id}
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="glass-panel rounded-xl p-5 flex items-start gap-4 hover:border-blue-400/40 transition-colors duration-300 group"
            >
              {/* Number with glass glowing border */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-xs font-semibold text-blue-300 text-glow-blue group-hover:bg-blue-500/20 transition-all duration-300">
                {detail.number}
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col text-left">
                <h3 className="text-serif text-lg font-light text-blue-100 tracking-wide">
                  {detail.title}
                </h3>
                <p className="text-xs text-blue-200/70 font-light mt-1 leading-relaxed">
                  {detail.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
