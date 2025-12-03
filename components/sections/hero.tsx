"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/magicui/spotlight";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Globe } from "@/components/magicui/globe";
import { DottedMap } from "@/components/magicui/dotted-map";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { TextReveal } from "@/components/aceternity/text-reveal";
import { ArrowRight, Sparkles, MapPin, Building2, Users, Award } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-visible">
      {/* Decorative overlay effects only */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Spotlight effect - positioned away from globe */}
        <Spotlight
          className="top-[-20%] left-0 md:left-[20%] md:top-[-10%] z-[1]"
          fill="oklch(0.4 0.15 280)"
        />
        
        {/* Background beams - reduced opacity */}
        <BackgroundBeams className="opacity-10 z-[1]" />
      </div>

      {/* Content Layer - Split Layout */}
      <div className="relative z-20 flex min-h-screen items-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-7xl w-full pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Minimized Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Global Luxury Collection
              </motion.div>

              {/* Main Headline */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl leading-[1.1]"
                >
                  Elegance
                  <br />
                  Meets
                  <br />
                  Excellence
                </motion.h1>
              </div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-lg text-white/80 font-light leading-relaxed max-w-lg"
              >
                Experience unparalleled luxury across our worldwide collection of premium hotels.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-6 text-base font-semibold shadow-2xl shadow-primary/25 transition-all duration-300 hover:scale-105"
                >
                  <Link href="#rooms" className="flex items-center gap-2">
                    Explore Rooms
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-white/20 bg-white/5 px-8 py-6 text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-primary/60 hover:bg-primary/10"
                >
                  <Link href="#booking">Book Your Stay</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side - Globe with Subtle Context */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative h-[600px] lg:h-[700px] flex items-center justify-center"
            >
              {/* Dotted Map Background */}
              <DottedMap 
                className="absolute inset-0 z-0" 
                dotSize={1.2}
                gap={20}
                color="white"
                opacity={0.15}
              />
              
              <div className="relative w-full max-w-[650px] flex flex-col items-center pt-24 z-10">
                {/* Globe Container */}
                <div className="relative w-full h-[480px] lg:h-[530px] overflow-visible">
                  <div className="absolute inset-0 -top-12">
                    <Globe className="w-full h-full" />
                  </div>
                </div>

                {/* Subtle Stats Below Globe - Much Closer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-4 grid grid-cols-3 gap-6 sm:gap-12 text-center w-full"
                >
                  <div className="space-y-0.5">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-white">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                      >
                        120+
                      </motion.span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider font-light">Hotels</div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-white">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1.7 }}
                      >
                        50+
                      </motion.span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider font-light">Countries</div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-white">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1.9 }}
                      >
                        10M+
                      </motion.span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider font-light">Guests</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-white/70"
            >
              <span className="text-sm">Scroll to explore</span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}





