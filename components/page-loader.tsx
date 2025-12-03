"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, oklch(0.3 0.15 280) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, oklch(0.3 0.15 280) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, oklch(0.3 0.15 280) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, oklch(0.3 0.15 280) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, oklch(0.3 0.15 280) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-[family-name:var(--font-cinzel)] text-3xl font-semibold tracking-[0.3em] text-white">
                GRANDEUR
              </h1>
            </motion.div>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-8 left-8 h-16 w-16 border-t-2 border-l-2 border-primary/20" />
          <div className="absolute top-8 right-8 h-16 w-16 border-t-2 border-r-2 border-primary/20" />
          <div className="absolute bottom-8 left-8 h-16 w-16 border-b-2 border-l-2 border-primary/20" />
          <div className="absolute bottom-8 right-8 h-16 w-16 border-b-2 border-r-2 border-primary/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
