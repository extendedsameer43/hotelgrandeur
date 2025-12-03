"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MasonryGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export function MasonryGrid({
  children,
  className,
  columns = { sm: 1, md: 2, lg: 3 },
}: MasonryGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns.sm === 1 && "grid-cols-1",
        columns.sm === 2 && "grid-cols-2",
        columns.md === 2 && "md:grid-cols-2",
        columns.md === 3 && "md:grid-cols-3",
        columns.lg === 3 && "lg:grid-cols-3",
        columns.lg === 4 && "lg:grid-cols-4",
        className
      )}
      style={{
        gridAutoRows: "10px",
      }}
    >
      {children}
    </div>
  );
}

interface MasonryItemProps {
  children: ReactNode;
  className?: string;
  span?: number;
}

export function MasonryItem({ children, className, span = 20 }: MasonryItemProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        gridRowEnd: `span ${span}`,
      }}
    >
      {children}
    </div>
  );
}

