"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  velocity: { x: number; y: number };
}

interface SuccessConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}

const colors = [
  "#D4AF37", // Primary gold
  "#FFD700", // Bright gold
  "#FFF8DC", // Light gold
  "#FFFFFF", // White
  "#F0E68C", // Khaki
];

export function SuccessConfetti({ isActive, onComplete }: SuccessConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) return;

    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      velocity: {
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 5 + 5,
      },
    }));

    setParticles(newParticles);

    // Cleanup after animation
    const timeout = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: particle.x,
                y: particle.y,
                rotate: particle.rotation,
                scale: particle.scale,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 100,
                x: particle.x + particle.velocity.x * 50,
                rotate: particle.rotation + 360,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3,
                ease: "easeIn",
                times: [0, 0.8, 1],
              }}
              className="absolute w-3 h-3"
              style={{
                backgroundColor: particle.color,
                clipPath:
                  Math.random() > 0.5
                    ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" // Diamond
                    : "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)", // Star
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
