"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DottedMapProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  color?: string;
  opacity?: number;
}

export function DottedMap({
  className,
  dotSize = 1.5,
  gap = 15,
  color = "white",
  opacity = 0.3,
}: DottedMapProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const cols = Math.ceil(dimensions.width / gap);
  const rows = Math.ceil(dimensions.height / gap);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id={`dotted-pattern-${id}`}
            x="0"
            y="0"
            width={gap}
            height={gap}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotSize}
              cy={dotSize}
              r={dotSize}
              fill={color}
              opacity={opacity}
            />
          </pattern>
          
          {/* Gradient mask for fade effect */}
          <radialGradient id={`fade-gradient-${id}`}>
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="50%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Main dotted pattern */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#dotted-pattern-${id})`}
        />

        {/* Optional: Add some animated dots for effect */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * dimensions.width}
            cy={Math.random() * dimensions.height}
            r={dotSize * 2}
            fill={color}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, opacity * 2, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
