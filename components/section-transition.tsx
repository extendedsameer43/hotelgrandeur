"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTransition({ children, className = "" }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
