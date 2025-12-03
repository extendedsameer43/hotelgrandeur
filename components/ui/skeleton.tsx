"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "button" | "image";
  lines?: number;
  animated?: boolean;
}

export function Skeleton({
  className,
  variant = "text",
  lines = 1,
  animated = true,
}: SkeletonProps) {
  const baseClasses = "bg-white/5 backdrop-blur-sm";
  
  const variantClasses = {
    card: "rounded-3xl h-96 w-full",
    text: "rounded-md h-4 w-full",
    circle: "rounded-full h-12 w-12",
    button: "rounded-xl h-12 w-32",
    image: "rounded-2xl aspect-video w-full",
  };

  const shimmerAnimation = animated
    ? {
        backgroundImage:
          "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 2s infinite",
      }
    : {};

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 && "w-3/4"
            )}
            style={{
              ...shimmerAnimation,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{
        ...shimmerAnimation,
      }}
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl p-6 space-y-4", className)}>
      <Skeleton variant="image" />
      <div className="space-y-3">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" lines={2} />
      </div>
      <Skeleton variant="button" />
    </div>
  );
}

export function RoomCardSkeleton() {
  return (
    <div className="min-w-[85vw] sm:min-w-0 snap-center">
      <CardSkeleton className="h-[600px]" />
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} variant="image" className="h-72" />
      ))}
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="min-w-[85vw] sm:min-w-0 snap-center">
      <div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-2xl p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton variant="circle" className="h-16 w-16" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-32" />
            <Skeleton variant="text" className="w-24" />
          </div>
        </div>
        <Skeleton variant="text" lines={4} />
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="circle" className="h-5 w-5" />
          ))}
        </div>
      </div>
    </div>
  );
}
