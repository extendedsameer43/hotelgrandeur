"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/magicui/reveal";
import { ScrollNavButtons } from "@/components/ui/scroll-nav-buttons";
import { Trophy, Award, Star, Medal, Crown, Shield } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const awards = [
  {
    id: 1,
    title: "World's Best Luxury Hotel",
    organization: "World Travel Awards",
    year: "2024",
    icon: Trophy,
    color: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-600",
  },
  {
    id: 2,
    title: "5-Star Diamond Rating",
    organization: "Forbes Travel Guide",
    year: "2024",
    icon: Star,
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    title: "Best Hotel Architecture",
    organization: "International Design Awards",
    year: "2023",
    icon: Crown,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-600",
  },
  {
    id: 4,
    title: "Michelin Key Award",
    organization: "Michelin Guide",
    year: "2024",
    icon: Medal,
    color: "from-red-500/20 to-rose-500/20",
    iconColor: "text-red-600",
  },
  {
    id: 5,
    title: "Sustainability Excellence",
    organization: "Green Globe Certification",
    year: "2023",
    icon: Shield,
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-600",
  },
  {
    id: 6,
    title: "Best Customer Service",
    organization: "Luxury Hospitality Awards",
    year: "2024",
    icon: Award,
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-600",
  },
];

export function Awards() {
  const counter1Ref = useRef<HTMLDivElement>(null);
  const counter2Ref = useRef<HTMLDivElement>(null);
  const counter3Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Counter animations
    const animateCounter = (ref: React.RefObject<HTMLDivElement | null>, endValue: number, suffix: string = "") => {
      if (!ref.current) return;

      const valueElement = ref.current.querySelector(".counter-value");
      if (!valueElement) return;

      const obj = { value: 0 };

      gsap.to(obj, {
        value: endValue,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          valueElement.textContent = Math.round(obj.value) + suffix;
        },
      });
    };

    animateCounter(counter1Ref, 50, "+");
    animateCounter(counter2Ref, 15, "+");
    animateCounter(counter3Ref, 1, "");
  }, []);

  return (
    <section id="awards" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 bg-primary/5 text-primary"
            >
              <Trophy className="mr-1 h-3 w-3" />
              Recognition & Excellence
            </Badge>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Awards & Achievements
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed">
              Our commitment to excellence has been recognized by the world's most
              prestigious hospitality organizations.
            </p>
          </motion.div>
        </Reveal>

        {/* Awards - Mobile Horizontal Scroll / Desktop Grid */}
        <div ref={cardsRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible scrollbar-hide">
          {awards.map((award, index) => (
            <Reveal key={award.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="min-w-[85vw] sm:min-w-0 snap-center"
              >
                <Card className="group relative h-full overflow-hidden border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02]">
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <CardHeader className="relative z-10">
                    {/* Icon Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className="mb-4"
                    >
                      <div className="inline-flex rounded-2xl bg-background/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                        <award.icon className={`h-8 w-8 ${award.iconColor}`} />
                      </div>
                    </motion.div>

                    {/* Year Badge */}
                    <Badge
                      variant="secondary"
                      className="mb-3 w-fit bg-primary/10 text-primary font-semibold"
                    >
                      {award.year}
                    </Badge>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-2">
                    {/* Award Title */}
                    <h3 className="font-display text-xl font-bold text-white">
                      {award.title}
                    </h3>

                    {/* Organization */}
                    <p className="text-sm text-white leading-relaxed">
                      {award.organization}
                    </p>
                  </CardContent>

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-2 right-2 h-6 w-6 border-t-2 border-r-2 border-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <ScrollNavButtons containerRef={cardsRef} />

        {/* Bottom Stats */}
        <Reveal delay={0.6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-8 rounded-2xl border border-white/10 bg-gradient-to-r from-black/40 via-black/30 to-black/40 px-8 py-6 backdrop-blur-xl">
              <div className="text-center" ref={counter1Ref}>
                <div className="font-display text-4xl font-bold text-primary counter-value">
                  0+
                </div>
                <div className="mt-1 text-sm text-white">
                  Industry Awards
                </div>
              </div>
              <div className="hidden sm:block h-12 w-px bg-border/40" />
              <div className="text-center" ref={counter2Ref}>
                <div className="font-display text-4xl font-bold text-primary counter-value">
                  0+
                </div>
                <div className="mt-1 text-sm text-white">
                  Years of Excellence
                </div>
              </div>
              <div className="hidden sm:block h-12 w-px bg-border/40" />
              <div className="text-center" ref={counter3Ref}>
                <div className="font-display text-4xl font-bold text-primary counter-value">
                  0
                </div>
                <div className="mt-1 text-sm text-white">
                  Ranked Globally
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}





