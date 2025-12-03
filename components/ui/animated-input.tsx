"use client";

import { InputHTMLAttributes, useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, success, icon, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className="relative w-full">
        {/* Input container */}
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none z-10">
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            className={cn(
              "w-full h-12 px-4 rounded-xl transition-all duration-300",
              "bg-white/5 border border-white/20 text-white placeholder:text-white/40",
              "focus:outline-none focus:border-primary focus:bg-white/10",
              "hover:border-white/30",
              icon && "pl-10",
              (success || error) && "pr-10",
              error && "border-red-500/50 focus:border-red-500",
              success && "border-green-500/50 focus:border-green-500",
              className
            )}
            {...props}
          />

          {/* Floating label */}
          {label && (
            <motion.label
              initial={false}
              animate={{
                top: isFocused || hasValue ? "-0.75rem" : "50%",
                translateY: isFocused || hasValue ? "0" : "-50%",
                fontSize: isFocused || hasValue ? "0.75rem" : "1rem",
                color: isFocused
                  ? "rgb(212, 175, 55)"
                  : hasValue
                    ? "rgb(255, 255, 255)"
                    : "rgba(255, 255, 255, 0.6)",
              }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute left-4 px-1 bg-black pointer-events-none",
                icon && "left-10"
              )}
            >
              {label}
            </motion.label>
          )}

          {/* Validation icon */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              >
                <Check className="h-5 w-5" />
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, ease: "backOut" }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
              >
                <AlertCircle className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Focus indicator line */}
          <motion.div
            initial={false}
            animate={{
              scaleX: isFocused ? 1 : 0,
              opacity: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              "absolute bottom-0 left-0 right-0 h-0.5 origin-center",
              error ? "bg-red-500" : success ? "bg-green-500" : "bg-primary"
            )}
          />
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";
