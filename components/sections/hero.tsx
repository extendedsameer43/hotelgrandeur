"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/magicui/spotlight";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Globe } from "@/components/magicui/globe";
import { DottedMap } from "@/components/magicui/dotted-map";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { TextReveal } from "@/components/aceternity/text-reveal";
import { ArrowRight, Sparkles, MapPin, Building2, Users, Award } from "lucide-react";
import { useMagneticButton } from "@/hooks/use-gsap-animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const button1Ref = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const hotelsRef = useRef<HTMLSpanElement>(null);
  const countriesRef = useRef<HTMLSpanElement>(null);
  const guestsRef = useRef<HTMLSpanElement>(null);

  // Magnetic button effects
  useMagneticButton(button1Ref, 0.2);
  useMagneticButton(button2Ref, 0.2);

  useEffect(() => {
    // Title split text animation
    if (titleRef.current) {
      const lines = titleRef.current.querySelectorAll(".hero-line");
      
      gsap.fromTo(
        lines,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.5,
        }
      );
    }

    // Globe parallax effect
    if (globeRef.current) {
      gsap.to(globeRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: globeRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Counter animations
    const animateCounter = (ref: React.RefObject<HTMLSpanElement | null>, endValue: number, suffix: string = "", delay: number = 0) => {
      if (!ref.current) return;

      const obj = { value: 0 };
      gsap.to(obj, {
        value: endValue,
        duration: 2,
        delay: delay,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.round(obj.value) + suffix;
          }
        },
      });
    };

    animateCounter(hotelsRef, 120, "+", 1.5);
    animateCounter(countriesRef, 50, "+", 1.7);
    animateCounter(guestsRef, 10, "M+", 1.9);
  }, []);
  
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
                <h1
                  ref={titleRef}
                  className="font-[family-name:var(--font-quintessential)] text-3xl font-normal leading-tight tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  <span className="hero-line inline-block">Elegance</span>
                  <br />
                  <span className="hero-line inline-block">Meets</span>
                  <br />
                  <span className="hero-line inline-block">Excellence</span>
                </h1>
              </div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed max-w-lg"
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
                <div ref={button1Ref}>
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
                </div>

                <div ref={button2Ref}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-2 border-white/20 bg-white/5 px-8 py-6 text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-primary/60 hover:bg-primary/10"
                  >
                    <Link href="#booking">Book Your Stay</Link>
                  </Button>
                </div>
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
              
              <div ref={globeRef} className="relative w-full max-w-[650px] flex flex-col items-center pt-24 z-10">
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
                        ref={hotelsRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                      >
                        0+
                      </motion.span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider font-light">Hotels</div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-white">
                      <motion.span
                        ref={countriesRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1.7 }}
                      >
                        0+
                      </motion.span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider font-light">Countries</div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-white">
                      <motion.span
                        ref={guestsRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1.9 }}
                      >
                        0M+
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





