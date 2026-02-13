"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}

export function Sparkline({
  data,
  width = 44,
  height = 24,
  strokeWidth = 2,
  className,
}: SparklineProps) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1; // avoid div by 0

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (width - strokeWidth) + strokeWidth / 2;
    const y = height - ((v - min) / span) * (height - strokeWidth) - strokeWidth / 2;
    return [x, y] as const;
  });

  const d = points
    .map(([x, y], i) => (i === 0 ? `M ${x},${y}` : `L ${x},${y}`))
    .join(" ");

  const trendUp = data[data.length - 1] >= data[0];
  const colorClass = trendUp
    ? "text-success-600 dark:text-success-500"
    : "text-danger-600 dark:text-danger-500";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("overflow-visible", colorClass, className)}
      aria-hidden
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export default Sparkline;
