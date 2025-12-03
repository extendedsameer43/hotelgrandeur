"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepProgress({ steps, currentStep, className }: StepProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Progress bar */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
        
        {/* Active progress line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: currentStep / (steps.length - 1),
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 origin-left"
          style={{
            width: `${((currentStep) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Step indicators */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isUpcoming = index > currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Circle indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className={cn(
                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted && "border-primary bg-primary text-white",
                    isCurrent && "border-primary bg-black text-primary scale-110 shadow-[0_0_20px_rgba(212,175,55,0.5)]",
                    isUpcoming && "border-white/20 bg-black text-white/40"
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      <Check className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                {/* Step label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="mt-2 text-center"
                >
                  <p
                    className={cn(
                      "text-xs font-medium transition-colors duration-300",
                      (isCompleted || isCurrent) && "text-white",
                      isUpcoming && "text-white/40"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="mt-0.5 text-[10px] text-white/60 max-w-[80px]">
                      {step.description}
                    </p>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
