"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/magicui/reveal";
import { Star, Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    rating: 5,
    text: "An absolutely unforgettable experience! From the moment we arrived, every detail was perfection. The staff's attention to detail and genuine hospitality made our anniversary truly special.",
  },
  {
    id: 2,
    name: "James Anderson",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    rating: 5,
    text: "The epitome of luxury and elegance. The room was spectacular, the dining experience exceptional, and the spa treatments divine. This hotel has set a new standard for luxury hospitality.",
  },
  {
    id: 3,
    name: "Maria Garcia",
    location: "Barcelona, Spain",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    rating: 5,
    text: "I've stayed at luxury hotels worldwide, but this one stands out. The views, the service, the cuisine - everything exceeded expectations. Already planning my next visit!",
  },
  {
    id: 4,
    name: "David Chen",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    rating: 5,
    text: "Outstanding in every way. The concierge team went above and beyond to arrange special experiences for us. The attention to detail and personalized service was remarkable.",
  },
  {
    id: 5,
    name: "Emma Thompson",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
    rating: 5,
    text: "A truly magical stay! The blend of modern luxury and timeless elegance creates an atmosphere that's both sophisticated and welcoming. Highly recommend for special occasions.",
  },
];

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="testimonials" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 h-96 w-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
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
              <Star className="mr-1 h-3 w-3 fill-primary" />
              Guest Experiences
            </Badge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
              What Our Guests Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 md:text-xl font-light leading-relaxed">
              Hear from travelers who've experienced the pinnacle of luxury and
              hospitality at our hotel.
            </p>
          </motion.div>
        </Reveal>

        {/* Testimonials Carousel */}
        <Reveal delay={0.3}>
          <div className="mx-auto max-w-5xl">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: true,
                }),
              ]}
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <Card className="border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-2xl">
                      <CardContent className="p-8 md:p-12">
                        {/* Quote Icon */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="mb-6"
                        >
                          <Quote className="h-12 w-12 text-primary/20" />
                        </motion.div>

                        {/* Star Rating */}
                        <div className="mb-6 flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <Star className="h-5 w-5 fill-primary text-primary" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="mb-8 text-lg leading-relaxed text-white md:text-xl"
                        >
                          "{testimonial.text}"
                        </motion.p>

                        {/* Customer Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="flex items-center gap-4"
                        >
                          <Avatar className="h-14 w-14 border-2 border-primary/20">
                            <AvatarImage
                              src={testimonial.avatar}
                              alt={testimonial.name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-white">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-white">
                              {testimonial.location}
                            </p>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Arrows */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <CarouselPrevious className="relative left-0 translate-x-0" />
                <CarouselNext className="relative right-0 translate-x-0" />
              </div>
            </Carousel>

            {/* Carousel Dots */}
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Stats Section */}
        <Reveal delay={0.6}>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              { value: "10,000+", label: "Happy Guests" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "98%", label: "Would Return" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="rounded-xl border border-white/10 bg-gradient-to-br from-black/40 to-black/30 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:from-black/50 hover:to-black/40"
              >
                <div className="font-display text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}





