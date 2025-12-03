"use client";

import { MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RippleButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  glow?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

export function RippleButton({
  children,
  variant = "default",
  size = "md",
  className,
  glow = false,
  disabled = false,
  type = "button",
  onClick,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  const variantStyles = {
    default: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    primary: "bg-primary hover:bg-primary/90 text-white border border-primary",
    outline: "bg-transparent hover:bg-white/5 text-white border border-white/30",
    ghost: "bg-transparent hover:bg-white/10 text-white",
  };

  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={addRipple}
      className={cn(
        "relative overflow-hidden rounded-xl font-medium transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        glow && "shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]",
        className
      )}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10">{children}</span>

      {/* Hover gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </motion.button>
  );
}
