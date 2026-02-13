"use client";

import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatComparisonCardProps {
  title: string;
  current: number;
  previous: number;
  format?: "number" | "currency" | "percent";
  currencySymbol?: string;
  icon?: React.ReactNode;
  invertTrend?: boolean; // e.g. for bounce rate, lower = good
}

function formatValue(value: number, format: string, symbol: string): string {
  switch (format) {
    case "currency":
      return `${symbol}${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    case "percent":
      return `${value.toFixed(1)}%`;
    default:
      return value.toLocaleString("en-US");
  }
}

export default function StatComparisonCard({
  title,
  current,
  previous,
  format = "number",
  currencySymbol = "$",
  icon,
  invertTrend = false,
}: StatComparisonCardProps) {
  const diff = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
  const isUp = diff > 0;
  const isDown = diff < 0;
  const isNeutral = diff === 0;
  const isPositive = invertTrend ? isDown : isUp;
  const isNegative = invertTrend ? isUp : isDown;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </span>
        {icon && (
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
      </div>

      {/* Current value */}
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {formatValue(current, format, currencySymbol)}
      </div>

      {/* Comparison bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Previous: {formatValue(previous, format, currencySymbol)}</span>
          <div
            className={`flex items-center gap-1 font-medium ${
              isNeutral
                ? "text-gray-500"
                : isPositive
                ? "text-emerald-600 dark:text-emerald-500"
                : "text-danger-600 dark:text-danger-500"
            }`}
          >
            {isNeutral ? (
              <Minus className="h-3.5 w-3.5" />
            ) : isUp ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {Math.abs(diff).toFixed(1)}%
          </div>
        </div>

        {/* Visual bar comparison */}
        <div className="relative h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
          {(() => {
            const max = Math.max(current, previous);
            const prevWidth = max > 0 ? (previous / max) * 100 : 0;
            const currWidth = max > 0 ? (current / max) * 100 : 0;
            return (
              <>
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gray-300 dark:bg-gray-600 transition-all duration-500"
                  style={{ width: `${prevWidth}%` }}
                />
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                    isPositive
                      ? "bg-emerald-500"
                      : isNegative
                      ? "bg-danger-500"
                      : "bg-primary-500"
                  }`}
                  style={{ width: `${currWidth}%` }}
                />
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
