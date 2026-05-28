import React, { useEffect, useRef } from "react";

export default function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let stars = [];
    let nebulas = [];
    let scrollY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initNebulas();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 4000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.3,
          alpha: Math.random(),
          speed: Math.random() * 0.02 + 0.005,
          twinkleFactor: Math.random() > 0.5 ? 1 : -1,
          depth: Math.random() * 0.6 + 0.4, // For parallax effect
        });
      }
    };

    const initNebulas = () => {
      nebulas = [
        {
          x: canvas.width * 0.25,
          y: canvas.height * 0.3,
          radius: Math.min(canvas.width, canvas.height) * 0.4,
          color: "rgba(59, 130, 246, 0.03)", // Soft blue glow
          pulseSpeed: 0.002,
          pulse: 0,
        },
        {
          x: canvas.width * 0.75,
          y: canvas.height * 0.7,
          radius: Math.min(canvas.width, canvas.height) * 0.5,
          color: "rgba(139, 92, 246, 0.02)", // Subtle TXT purple pulse
          pulseSpeed: 0.0015,
          pulse: Math.PI,
        },
      ];
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Nebula Clouds
      nebulas.forEach((neb) => {
        neb.pulse += neb.pulseSpeed;
        const currentRadius = neb.radius * (1 + Math.sin(neb.pulse) * 0.1);
        const gradient = ctx.createRadialGradient(
          neb.x,
          neb.y,
          0,
          neb.x,
          neb.y,
          currentRadius
        );
        gradient.addColorStop(0, neb.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(neb.x, neb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Twinkling Stars with Parallax
      stars.forEach((star) => {
        // Apply parallax to Y based on scrollY
        let currentY = (star.y - scrollY * star.depth) % canvas.height;
        if (currentY < 0) currentY += canvas.height;

        // Twinkle
        star.alpha += star.speed * star.twinkleFactor;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.twinkleFactor = -1;
        } else if (star.alpha <= 0.1) {
          star.alpha = 0.1;
          star.twinkleFactor = 1;
        }

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = "#f8fafc";
        ctx.shadowBlur = star.radius * 3;
        ctx.shadowColor = "rgba(96, 165, 250, 0.8)";
        ctx.beginPath();
        ctx.arc(star.x, currentY, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);

    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
    />
  );
}
