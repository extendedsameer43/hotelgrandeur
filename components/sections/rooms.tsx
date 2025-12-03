"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardTilt } from "@/components/aceternity/card-tilt";
import { Reveal } from "@/components/magicui/reveal";
import { Wifi, AirVent, Tv, Coffee, Star, ArrowRight, Users } from "lucide-react";

const rooms = [
  {
    id: 1,
    title: "Deluxe Room",
    description:
      "Experience comfort and elegance in our thoughtfully designed deluxe rooms with modern amenities and stunning views.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
    price: 299,
    featured: false,
    capacity: "2 Guests",
    size: "350 sq ft",
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: AirVent, label: "Climate Control" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Mini Bar" },
    ],
  },
  {
    id: 2,
    title: "Super Deluxe Room",
    description:
      "Indulge in spacious luxury with premium furnishings, separate living area, and exclusive access to our executive lounge.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
    price: 499,
    featured: true,
    capacity: "3 Guests",
    size: "500 sq ft",
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: AirVent, label: "Climate Control" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Premium Bar" },
    ],
  },
  {
    id: 3,
    title: "Suite Room",
    description:
      "The pinnacle of luxury living. Expansive suites with private balcony, jacuzzi, and personalized butler service.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074",
    price: 899,
    featured: false,
    capacity: "4 Guests",
    size: "800 sq ft",
    amenities: [
      { icon: Wifi, label: "High-Speed WiFi" },
      { icon: AirVent, label: "Climate Control" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Full Bar" },
    ],
  },
];

export function Rooms() {
  return (
    <section id="rooms" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
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
              Premium Accommodations
            </Badge>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
              Discover Your Perfect Stay
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl font-light leading-relaxed">
              From elegant deluxe rooms to opulent suites, each space is a
              masterpiece of comfort and sophistication.
            </p>
          </motion.div>
        </Reveal>

        {/* Room Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <Reveal key={room.id} delay={index * 0.2}>
              <CardTilt containerClassName="h-full">
                <Card className="group relative h-full overflow-hidden border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02]">
                  {/* Featured Badge */}
                  {room.featured && (
                    <Badge className="absolute right-4 top-4 z-10 bg-gradient-to-r from-primary to-primary/80 font-semibold shadow-lg">
                      Most Popular
                    </Badge>
                  )}

                  {/* Room Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={room.id === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 rounded-full bg-background/90 px-4 py-2 backdrop-blur-sm">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary">
                          ${room.price}
                        </span>
                        <span className="text-sm text-white">/night</span>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-display text-2xl text-white">
                          {room.title}
                        </CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-4 text-sm text-white/70">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {room.capacity}
                          </span>
                          <span>•</span>
                          <span>{room.size}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-white leading-relaxed">
                      {room.description}
                    </p>

                    {/* Amenities */}
                    <div className="grid grid-cols-2 gap-3">
                      {room.amenities.map((amenity) => (
                        <div
                          key={amenity.label}
                          className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 transition-colors hover:bg-white/20"
                        >
                          <amenity.icon className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-white">
                            {amenity.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      asChild
                      className="group/btn w-full rounded-full bg-gradient-to-r from-primary to-primary/80 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                    >
                      <Link
                        href={`#booking`}
                        className="flex items-center justify-center gap-2"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CardTilt>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="mb-6 text-lg text-white/80 font-light">
              Can't decide? Let our concierge help you find the perfect room.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group/cta rounded-full border-2 border-white/20 bg-white/5 px-8 py-6 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-primary/60 hover:bg-primary/10 hover:shadow-2xl hover:shadow-primary/20"
            >
              <Link href="#booking" className="flex items-center gap-2">
                Speak with Concierge
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}





