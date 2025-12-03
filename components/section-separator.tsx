"use client";

import { motion } from "framer-motion";

export function SectionSeparator() {
  return (
    <div className="relative py-8">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary/50 ring-4 ring-primary/10"
      />
    </div>
  );
}

