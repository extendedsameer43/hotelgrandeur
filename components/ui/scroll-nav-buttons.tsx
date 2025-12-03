"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScrollNavButtonsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function ScrollNavButtons({ containerRef, className = "" }: ScrollNavButtonsProps) {
  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = containerRef.current.offsetWidth * 0.8;
    const newScrollPosition =
      direction === "left"
        ? containerRef.current.scrollLeft - scrollAmount
        : containerRef.current.scrollLeft + scrollAmount;

    containerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className={`flex items-center justify-center gap-3 mt-8 md:hidden ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("left")}
        className="h-12 w-12 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/30"
          />
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => scroll("right")}
        className="h-12 w-12 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
