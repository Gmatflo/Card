import React, { useEffect, useRef } from "react";

export default function ShootingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let stars = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createShootingStar = () => {
      // Spawn star from top-right / top edge moving down-left
      const x = Math.random() * canvas.width * 1.5;
      const y = -50;
      const length = Math.random() * 80 + 50;
      const speed = Math.random() * 12 + 8;
      const angle = Math.PI * 0.75 + (Math.random() * 0.1 - 0.05); // Diagonal down-left
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      
      stars.push({
        x,
        y,
        dx,
        dy,
        length,
        opacity: 1,
        fadeSpeed: Math.random() * 0.02 + 0.015,
        width: Math.random() * 1.5 + 0.8,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star, index) => {
        // Move star
        star.x += star.dx;
        star.y += star.dy;
        star.opacity -= star.fadeSpeed;

        if (star.opacity <= 0) {
          stars.splice(index, 1);
          return;
        }

        // Draw trail
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - star.dx * (star.length / 10),
          star.y - star.dy * (star.length / 10)
        );
        gradient.addColorStop(0, `rgba(96, 165, 250, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(167, 139, 250, ${star.opacity * 0.4})`);
        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - star.dx * (star.length / 10),
          star.y - star.dy * (star.length / 10)
        );
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };

    // Periodically spawn shooting stars
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        createShootingStar();
      }
    }, 4000);

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-40 pointer-events-none"
    />
  );
}
