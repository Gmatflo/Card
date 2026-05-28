import React, { useEffect } from "react";

export default function CursorEffect() {
  useEffect(() => {
    // Only apply on non-touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      if (Math.random() > 0.4) return; // limit frequency

      const particle = document.createElement("div");
      particle.className = "sparkle-particle";
      
      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${e.clientX + window.scrollX}px`;
      particle.style.top = `${e.clientY + window.scrollY}px`;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
