"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastCounter = 0;
const toastListeners = new Set<(toast: Toast) => void>();

export function showToast(message: string, type: ToastType = "success") {
  const toast: Toast = {
    id: `toast-${++toastCounter}`,
    message,
    type,
  };
  toastListeners.forEach((listener) => listener(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const addToast = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000);
    };

    toastListeners.add(addToast);
    return () => {
      toastListeners.delete(addToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5" />;
      case "error":
        return <AlertCircle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
    }
  };

  const getColors = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/30 text-green-500";
      case "error":
        return "bg-red-500/10 border-red-500/30 text-red-500";
      case "info":
        return "bg-blue-500/10 border-blue-500/30 text-blue-500";
    }
  };

  return (
    <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl pointer-events-auto ${getColors(toast.type)}`}
          >
            <div className="flex-shrink-0">{getIcon(toast.type)}</div>
            <p className="flex-1 text-sm font-medium text-white">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
