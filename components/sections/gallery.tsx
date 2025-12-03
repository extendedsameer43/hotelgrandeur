"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/magicui/reveal";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    alt: "Luxury Hotel Lobby",
    caption: "Grand Entrance Lobby",
    span: 30,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
    alt: "Deluxe Hotel Room",
    caption: "Deluxe Suite Interior",
    span: 25,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
    alt: "Hotel Pool Area",
    caption: "Infinity Pool & Lounge",
    span: 35,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080",
    alt: "Hotel Restaurant",
    caption: "Fine Dining Restaurant",
    span: 28,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074",
    alt: "Presidential Suite",
    caption: "Presidential Suite",
    span: 32,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070",
    alt: "Spa & Wellness",
    caption: "Luxury Spa Retreat",
    span: 26,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070",
    alt: "Hotel Exterior Night",
    caption: "Evening Exterior View",
    span: 30,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070",
    alt: "Rooftop Bar",
    caption: "Skyline Rooftop Bar",
    span: 24,
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    // Staggered reveal of gallery images
    const images = galleryRef.current.querySelectorAll(".gallery-item");
    
    gsap.fromTo(
      images,
      {
        opacity: 0,
        y: 60,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Image hover scale effect
    images.forEach((image) => {
      const img = image.querySelector("img");
      if (!img) return;

      image.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.1, duration: 0.5, ease: "power2.out" });
      });

      image.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
      });
    });
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    
    if (direction === "next") {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    } else {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  return (
    <section id="gallery" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10" />

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
              <Camera className="mr-1 h-3 w-3" />
              Visual Journey
            </Badge>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Photo Gallery
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed">
              Explore the breathtaking beauty and luxurious details of our
              property through stunning photography.
            </p>
          </motion.div>
        </Reveal>

        {/* Masonry Gallery Grid */}
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <Reveal key={image.id} delay={index * 0.1}>
              <motion.div
                className={`gallery-item group relative overflow-hidden rounded-xl cursor-pointer ${
                  index % 5 === 0 ? "md:row-span-2 h-[500px]" : "h-[300px]"
                } ${index % 7 === 0 ? "lg:col-span-2" : "col-span-1"}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Caption & Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 rounded-full bg-white/20 p-4 backdrop-blur-sm"
                    >
                      <Maximize2 className="h-6 w-6 text-white" />
                    </motion.div>
                    <p className="font-display text-xl font-semibold text-white drop-shadow-lg">
                      {image.caption}
                    </p>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-2 right-2 h-8 w-8 border-t-2 border-r-2 border-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-2 left-2 h-8 w-8 border-b-2 border-l-2 border-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* View All CTA */}
        <Reveal delay={0.8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-16 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-primary/30 bg-background/50 px-8 font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/5"
            >
              <Camera className="mr-2 h-5 w-5" />
              View All Photos
            </Button>
          </motion.div>
        </Reveal>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <AnimatePresence mode="wait">
            {selectedImage !== null && (
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Close Button */}
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 z-50 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                    onClick={closeLightbox}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </DialogClose>

                {/* Image */}
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    fill
                    sizes="95vw"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Caption */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md">
                  <p className="font-display text-lg text-white">
                    {galleryImages[selectedImage].caption}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Image Counter */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                  <p className="text-sm text-white">
                    {selectedImage + 1} / {galleryImages.length}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}





