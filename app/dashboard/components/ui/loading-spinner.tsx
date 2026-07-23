"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  label?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
    xl: "w-10 h-10",
  };

  return (
    <div
      role="status"
      aria-label={label || "Loading"}
      className={clsx("inline-flex items-center justify-center gap-2", className)}
    >
      <Loader2
        className={clsx(
          "animate-spin text-indigo-600 dark:text-indigo-400 shrink-0",
          sizeClasses[size]
        )}
      />
      {label && (
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          {label}
        </span>
      )}
      <span className="sr-only">{label || "Loading..."}</span>
    </div>
  );
}
