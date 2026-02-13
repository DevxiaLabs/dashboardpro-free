"use client";

import { useState, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { trafficSources } from "@/data/dashboard";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: { name: string; value: number; color: string };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {data.name}
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {data.value}%
        </p>
      </div>
    );
  }
  return null;
}

export function TrafficDonutChart() {
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  const toggleSeries = useCallback((name: string) => {
    setHiddenSeries((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        // Don't allow hiding all series
        if (next.size < trafficSources.length - 1) {
          next.add(name);
        }
      }
      return next;
    });
  }, []);

  const visibleData = trafficSources.filter(
    (source) => !hiddenSeries.has(source.name)
  );

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Traffic Sources
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Where your visitors come from
        </p>
      </div>
      <div className="h-[200px] sm:h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={visibleData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              strokeWidth={0}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {visibleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Interactive Legend */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {trafficSources.map((source) => {
          const isHidden = hiddenSeries.has(source.name);
          return (
            <button
              key={source.name}
              onClick={() => toggleSeries(source.name)}
              className="flex items-center gap-2 text-left cursor-pointer transition-opacity duration-200 hover:opacity-80 rounded-md p-1 -m-1"
              data-legend-item={source.name}
              title={isHidden ? `Show ${source.name}` : `Hide ${source.name}`}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 transition-opacity duration-200"
                style={{
                  backgroundColor: source.color,
                  opacity: isHidden ? 0.3 : 1,
                }}
              />
              <div className="min-w-0">
                <p
                  className={`text-xs font-medium truncate transition-opacity duration-200 ${
                    isHidden
                      ? "text-gray-400 dark:text-gray-600 line-through"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {source.name}
                </p>
                <p
                  className={`text-xs transition-opacity duration-200 ${
                    isHidden
                      ? "text-gray-300 dark:text-gray-700"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {source.value}%
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
