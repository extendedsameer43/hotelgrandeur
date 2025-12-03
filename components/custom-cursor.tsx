"use client";

import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    const cursorDot = document.createElement("div");
    
    cursor.className = "custom-cursor";
    cursorDot.className = "custom-cursor-dot";
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
    };

    const handleMouseEnter = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursor.style.borderColor = "oklch(0.62 0.22 280)";
    };

    const handleMouseLeave = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.borderColor = "rgba(255, 255, 255, 0.5)";
    };

    document.addEventListener("mousemove", moveCursor);

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      cursor.remove();
      cursorDot.remove();
    };
  }, []);

  return null;
}
