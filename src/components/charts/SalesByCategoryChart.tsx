"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "@/contexts/ThemeContext";
import { salesByCategory } from "@/data/dashboard";

const COLORS = [
  "var(--color-primary-600)",
  "#10B981",
  "#F59E0B",
  "#0EA5E9",
  "#8B5CF6",
  "#EC4899",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { category: string; sales: number };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {data.category}
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          ${data.sales.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

export function SalesByCategoryChart() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Sales by Category
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Top performing product categories
        </p>
      </div>
      <div className="h-[250px] sm:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salesByCategory}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#E5E7EB"}
              vertical={false}
            />
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: isDark ? "#9CA3AF" : "#6B7280" }}
              dy={10}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: isDark ? "#9CA3AF" : "#6B7280" }}
              tickFormatter={(value) =>
                `$${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`
              }
              domain={['auto', 'auto']}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }} />
            <Bar dataKey="sales" radius={[4, 4, 0, 0]} maxBarSize={48} isAnimationActive={true} animationDuration={1000} animationEasing="ease-out">
              {salesByCategory.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
