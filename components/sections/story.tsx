"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/magicui/reveal";
import { Heart, Users, Sparkles, Calendar } from "lucide-react";

export function Story() {
  return (
    <section id="story" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Side - Image */}
          <Reveal>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Main Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070"
                  alt="Hotel Heritage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 h-32 w-32 border-t-4 border-l-4 border-primary/30 rounded-tl-2xl" />
              <div className="absolute -bottom-4 -right-4 h-32 w-32 border-b-4 border-r-4 border-primary/30 rounded-br-2xl" />

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-8 -right-8 hidden lg:block"
              >
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-display text-3xl font-bold text-primary">
                        1998
                      </div>
                      <div className="text-sm text-white">
                        Established
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Reveal>

          {/* Right Side - Content */}
          <Reveal delay={0.2}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Section Badge */}
              <Badge
                variant="outline"
                className="mb-6 border-primary/30 bg-primary/5 text-primary"
              >
                <Heart className="mr-1 h-3 w-3 fill-primary" />
                Our Heritage
              </Badge>

              {/* Headline */}
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight mb-6">
                A Legacy of
                <span className="block text-primary">Excellence</span>
              </h2>

              {/* Story Content */}
              <div className="space-y-4 text-lg text-white leading-relaxed">
                <p>
                  Founded in 1998 by visionary entrepreneurs Maria and Jonathan
                  Sterling, our hotel began as a dream to redefine luxury
                  hospitality. What started as a boutique property has evolved
                  into an internationally acclaimed destination.
                </p>
                <p>
                  Drawing inspiration from classical European architecture and
                  modern design principles, we've created a sanctuary where
                  timeless elegance meets contemporary comfort. Every detail, from
                  the hand-selected artwork to the custom furnishings, tells a
                  story of dedication to perfection.
                </p>
                <p>
                  Over the years, we've had the privilege of hosting world leaders,
                  celebrities, and discerning travelers from every corner of the
                  globe. Yet, we remain committed to treating every guest like
                  family, ensuring their stay becomes an unforgettable memory.
                </p>
                <p>
                  Today, we stand proud as a beacon of hospitality excellence,
                  continuing to innovate while honoring the traditions that have
                  made us who we are.
                </p>
              </div>

              {/* Key Values */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 grid gap-4 sm:grid-cols-2"
              >
                {[
                  {
                    icon: Heart,
                    title: "Passion",
                    description: "For exceptional service",
                  },
                  {
                    icon: Users,
                    title: "Family",
                    description: "Every guest, every time",
                  },
                  {
                    icon: Sparkles,
                    title: "Excellence",
                    description: "In every detail",
                  },
                  {
                    icon: Calendar,
                    title: "Heritage",
                    description: "25+ years of tradition",
                  },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-gradient-to-br from-black/40 to-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:from-black/50 hover:to-black/40"
                  >
                    <div className="rounded-lg bg-primary/10 p-2">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {value.title}
                      </h4>
                      <p className="text-sm text-white">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Reveal>
        </div>

        {/* Timeline Section */}
        <Reveal delay={0.6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-24"
          >
            <h3 className="font-display text-3xl font-bold text-center text-white mb-12">
              Our Journey
            </h3>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { year: "1998", event: "Hotel Founded", description: "The dream begins" },
                { year: "2005", event: "First Award", description: "5-star recognition" },
                { year: "2015", event: "Major Renovation", description: "Modern luxury reborn" },
                { year: "2024", event: "Global Recognition", description: "World's best hotel" },
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="relative text-center group"
                >
                  {/* Timeline dot */}
                  <div className="mx-auto mb-4 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20 transition-all duration-300 group-hover:scale-150 group-hover:ring-8" />
                  
                  {/* Year */}
                  <div className="font-display text-2xl font-bold text-primary mb-2">
                    {milestone.year}
                  </div>
                  
                  {/* Event */}
                  <div className="font-semibold text-white mb-1">
                    {milestone.event}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-white">
                    {milestone.description}
                  </div>

                  {/* Connecting line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1.5 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}





