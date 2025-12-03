"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/magicui/reveal";
import { ScrollNavButtons } from "@/components/ui/scroll-nav-buttons";
import { UtensilsCrossed, Wine, Coffee, Cake, ChefHat, ArrowRight, Sparkles } from "lucide-react";

const menuCategories = [
  {
    id: 1,
    title: "Starters",
    description: "Exquisite appetizers to awaken your palate with flavors from around the world.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
    icon: UtensilsCrossed,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 2,
    title: "Main Course",
    description: "Chef's signature dishes crafted with the finest ingredients and culinary artistry.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080",
    icon: ChefHat,
    color: "from-red-500/20 to-rose-500/20",
  },
  {
    id: 3,
    title: "Desserts",
    description: "Divine sweet creations that provide the perfect ending to your dining experience.",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2128",
    icon: Cake,
    color: "from-pink-500/20 to-purple-500/20",
  },
  {
    id: 4,
    title: "Beverages",
    description: "Curated selection of wines, cocktails, and artisanal drinks to complement your meal.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070",
    icon: Wine,
    color: "from-violet-500/20 to-indigo-500/20",
  },
];

export function Restaurant() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".menu-card");

    // Staggered card entrance
    gsap.fromTo(
      cards,
      { opacity: 0, y: 80, rotateY: -20 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    // Image parallax on scroll
    cards.forEach((card) => {
      const img = card.querySelector("img");
      if (!img) return;

      gsap.to(img, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <section id="restaurant" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
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
              <Coffee className="mr-1 h-3 w-3" />
              Culinary Excellence
            </Badge>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Ground-Floor Restaurant
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed">
              Experience world-class cuisine in an atmosphere of refined elegance.
              Our award-winning chefs create unforgettable culinary journeys.
            </p>
          </motion.div>
        </Reveal>

        {/* Menu Categories - Mobile Horizontal Scroll / Desktop Grid */}
        <div ref={cardsRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 sm:grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible mb-12 scrollbar-hide">
          {menuCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="min-w-[85vw] sm:min-w-0 snap-center"
              >
                <Card className="menu-card group relative h-full overflow-hidden border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02]">
                  {/* Category Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay`} />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 rounded-full bg-background/90 p-3 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <category.icon className="h-5 w-5" />
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-2xl font-bold text-white drop-shadow-lg">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-sm text-white leading-relaxed">
                      {category.description}
                    </p>

                    {/* Hover indicator */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="mt-4 flex items-center gap-2 text-sm font-medium text-primary"
                    >
                      Explore Menu
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </CardContent>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <ScrollNavButtons containerRef={cardsRef} />

        {/* Featured Info Cards */}
        <Reveal delay={0.6}>
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              {
                icon: ChefHat,
                title: "Michelin-Star Chef",
                description: "Led by internationally acclaimed culinary masters",
              },
              {
                icon: Sparkles,
                title: "Fresh Ingredients",
                description: "Locally sourced, organic produce daily",
              },
              {
                icon: Wine,
                title: "Curated Wine List",
                description: "Over 500 premium wines from around the world",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-gradient-to-br from-black/40 to-black/30 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:from-black/50 hover:to-black/40"
              >
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-white">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* CTA Section */}
        <Reveal delay={0.8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-6 text-lg font-semibold shadow-2xl shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:shadow-primary/40"
              >
                <Link href="#menu" className="flex items-center gap-2">
                  View Full Menu
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-primary/30 bg-background/50 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/5"
              >
                <Link href="#booking">Reserve a Table</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white">
              Open Daily: Breakfast 7AM-11AM • Lunch 12PM-3PM • Dinner 6PM-11PM
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}





