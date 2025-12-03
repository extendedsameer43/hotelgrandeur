"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: number;
  duration?: number;
  color?: string;
}

export function ShineBorder({
  children,
  className,
  borderWidth = 2,
  borderRadius = 12,
  duration = 3,
  color = "oklch(0.4 0.15 280)",
}: ShineBorderProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          padding: `${borderWidth}px`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Content */}
      <div
        className="relative z-10 h-full w-full bg-background"
        style={{
          borderRadius: `${borderRadius - borderWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

