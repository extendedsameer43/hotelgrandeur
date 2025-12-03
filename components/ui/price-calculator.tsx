"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PriceCalculatorProps {
  checkInDate?: Date;
  checkOutDate?: Date;
  guests: number;
  roomType: string;
  className?: string;
}

const roomPrices: Record<string, number> = {
  deluxe: 299,
  suite: 499,
  penthouse: 899,
  villa: 1299,
};

export function PriceCalculator({
  checkInDate,
  checkOutDate,
  guests,
  roomType,
  className,
}: PriceCalculatorProps) {
  const [displayPrice, setDisplayPrice] = useState(0);
  const [nights, setNights] = useState(0);

  useEffect(() => {
    if (!checkInDate || !checkOutDate || !roomType) {
      setDisplayPrice(0);
      setNights(0);
      return;
    }

    const nightCount = Math.max(
      1,
      Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    );
    setNights(nightCount);

    const basePrice = roomPrices[roomType.toLowerCase()] || 299;
    const totalPrice = basePrice * nightCount;

    // Animate the price counting up
    let currentPrice = displayPrice;
    const increment = Math.ceil((totalPrice - currentPrice) / 30);
    const interval = setInterval(() => {
      currentPrice += increment;
      if (currentPrice >= totalPrice) {
        currentPrice = totalPrice;
        clearInterval(interval);
      }
      setDisplayPrice(currentPrice);
    }, 30);

    return () => clearInterval(interval);
  }, [checkInDate, checkOutDate, roomType, guests]);

  const basePrice = roomPrices[roomType?.toLowerCase()] || 0;
  const tax = Math.round(displayPrice * 0.15);
  const total = displayPrice + tax;

  return (
    <AnimatePresence>
      {displayPrice > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm",
            className
          )}
        >
          <div className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Price Summary</h3>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30"
              >
                <span className="text-xs font-medium text-primary">
                  {nights} {nights === 1 ? "night" : "nights"}
                </span>
              </motion.div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/80">
                <span>
                  ${basePrice} × {nights} {nights === 1 ? "night" : "nights"}
                </span>
                <motion.span
                  key={displayPrice}
                  initial={{ scale: 1.2, color: "rgb(212, 175, 55)" }}
                  animate={{ scale: 1, color: "rgba(255, 255, 255, 0.8)" }}
                  transition={{ duration: 0.3 }}
                  className="font-medium"
                >
                  ${displayPrice.toLocaleString()}
                </motion.span>
              </div>

              <div className="flex justify-between text-white/80">
                <span>Taxes & fees</span>
                <motion.span
                  key={tax}
                  initial={{ scale: 1.2, color: "rgb(212, 175, 55)" }}
                  animate={{ scale: 1, color: "rgba(255, 255, 255, 0.8)" }}
                  transition={{ duration: 0.3 }}
                  className="font-medium"
                >
                  ${tax.toLocaleString()}
                </motion.span>
              </div>

              <div className="h-px bg-white/10 my-3" />

              {/* Total */}
              <div className="flex justify-between text-white pt-2">
                <span className="font-semibold text-lg">Total</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="font-bold text-2xl text-gradient-animated"
                >
                  ${total.toLocaleString()}
                </motion.span>
              </div>
            </div>

            {/* Savings badge */}
            {nights >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20"
              >
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-green-400">
                  Save 10% when booking 3+ nights!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
