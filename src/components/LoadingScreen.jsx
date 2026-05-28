import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [textVisible, setTextVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let particles = [];
    const targetPoints = [];
    let state = "flying-in"; // flying-in, holding, dissolving
    let progress = 0;
    let holdTimer = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate heart formula coordinates
    // x = 16 * sin^3(t)
    // y = 13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t)
    const scale = Math.min(canvas.width, canvas.height) * 0.022; // Responsive scale
    const heartWidth = scale * 32;
    const heartHeight = scale * 32;
    const offsetX = canvas.width / 2;
    const offsetY = canvas.height / 2 - 20;

    const numPoints = 180;
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      targetPoints.push({
        x: x * scale + offsetX,
        y: y * scale + offsetY,
      });
    }

    // Initialize particles
    for (let i = 0; i < numPoints; i++) {
      // Start randomly at screen edges
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.max(canvas.width, canvas.height) * (0.8 + Math.random() * 0.4);
      particles.push({
        x: offsetX + Math.cos(angle) * dist,
        y: offsetY + Math.sin(angle) * dist,
        targetX: targetPoints[i].x,
        targetY: targetPoints[i].y,
        originX: offsetX + Math.cos(angle) * dist,
        originY: offsetY + Math.sin(angle) * dist,
        radius: Math.random() * 1.5 + 0.8,
        color: i % 2 === 0 ? "#60a5fa" : "#a78bfa", // Blue/purple mix
        speed: 0.015 + Math.random() * 0.01,
        dissolveDx: (Math.random() - 0.5) * 5,
        dissolveDy: (Math.random() - 0.5) * 5,
      });
    }

    // Delayed text entrance
    setTimeout(() => {
      setTextVisible(true);
    }, 1200);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (state === "flying-in") {
        progress += 0.012;
        if (progress >= 1) {
          progress = 1;
          state = "holding";
        }
      } else if (state === "holding") {
        holdTimer += 1;
        // Let it beat slightly
        const beat = 1 + Math.sin(holdTimer * 0.05) * 0.02;
        particles.forEach((p) => {
          const dx = p.targetX - offsetX;
          const dy = p.targetY - offsetY;
          p.x = offsetX + dx * beat;
          p.y = offsetY + dy * beat;
        });

        // Dissolve after 2.5 seconds of holding
        if (holdTimer > 150) {
          state = "dissolving";
          setTextVisible(false);
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 1500);
        }
      }

      particles.forEach((p) => {
        if (state === "flying-in") {
          // Linear interpolation to heart positions
          p.x = p.originX + (p.targetX - p.originX) * progress;
          p.y = p.originY + (p.targetY - p.originY) * progress;
        } else if (state === "dissolving") {
          // Scatter out into the universe
          p.x += p.dissolveDx;
          p.y += p.dissolveDy;
          p.radius *= 0.98; // Shrink as they scatter
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#050814] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div className="relative z-10 text-center select-none px-6">
        <AnimatePresence>
          {textVisible && (
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-serif text-2xl md:text-3xl text-blue-200/90 font-light tracking-widest text-glow-blue uppercase"
            >
              Hay algo que quería decirte...
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
