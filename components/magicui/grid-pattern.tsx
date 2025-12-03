"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  squares = [
    [0, 1],
    [1, 3],
    [3, 1],
    [4, 4],
    [6, 2],
    [8, 5],
  ],
  className,
  ...props
}: {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: [number, number][];
  className?: string;
  [key: string]: any;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/30 stroke-neutral-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#grid-pattern)" />
      {squares.map(([x, y], index) => (
        <motion.rect
          key={`${x}-${y}`}
          width={width - 1}
          height={height - 1}
          x={x * width + 1}
          y={y * height + 1}
          className="fill-primary/20 stroke-primary/20"
          strokeWidth="0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

