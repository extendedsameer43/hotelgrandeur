"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade in animation on scroll
export function useFadeIn(ref: RefObject<HTMLElement>, options?: gsap.TweenVars) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        ...options,
      }
    );
  }, [ref, options]);
}

// Stagger children animation
export function useStaggerChildren(ref: RefObject<HTMLElement>, childSelector: string) {
  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.querySelectorAll(childSelector);

    gsap.fromTo(
      children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [ref, childSelector]);
}

// Scale up animation on scroll
export function useScaleIn(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [ref]);
}

// Parallax effect
export function useParallax(ref: RefObject<HTMLElement>, speed: number = 0.5) {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [ref, speed]);
}

// Counter animation
export function useCounter(
  ref: RefObject<HTMLElement>,
  start: number,
  end: number,
  duration: number = 2
) {
  useEffect(() => {
    if (!ref.current) return;

    const obj = { value: start };

    gsap.to(obj, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.value).toString();
        }
      },
    });
  }, [ref, start, end, duration]);
}

// Reveal text animation
export function useRevealText(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const text = element.textContent || "";
    element.textContent = "";

    const chars = text.split("");
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      element.appendChild(span);
    });

    const spans = element.querySelectorAll("span");

    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.03,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, [ref]);
}

// Image reveal animation (from left to right)
export function useImageReveal(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;

    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.inset = "0";
    overlay.style.background = "white";
    overlay.style.zIndex = "10";
    ref.current.style.position = "relative";
    ref.current.appendChild(overlay);

    gsap.to(overlay, {
      x: "100%",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onComplete: () => overlay.remove(),
    });
  }, [ref]);
}

// Magnetic button effect
export function useMagneticButton(ref: RefObject<HTMLElement | null>, strength: number = 0.3) {
  useEffect(() => {
    if (!ref.current) return;

    const button = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);
}
