"use client";

import { useState, useEffect, useMemo } from "react";
import { AnalyticsSkeleton } from "@/components/ui/Skeleton";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Eye,
  Users,
  TrendingDown,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ArrowUp,
  ArrowDown,
  Activity,
  Calendar,
} from "lucide-react";
import Sparkline from "@/components/shared/Sparkline";
import { cn } from "@/lib/utils";
import { analyticsData } from "@/data/analytics";
import { useTheme } from "@/contexts/ThemeContext";

// Date range type
type DateRange = "7d" | "30d" | "90d" | "1y";

const dateRangeLabels: Record<DateRange, string> = {
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
  "90d": "Last 90 Days",
  "1y": "Last Year",
};

// Traffic source colors for pie chart
const trafficColors = ["var(--color-primary-600)", "#10B981", "#F59E0B", "#0EA5E9"];

// Device icon map
const deviceIcons = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

// Helper to slice data based on date range
function getFilteredPageVisits(range: DateRange) {
  const data = analyticsData.pageVisits;
  switch (range) {
    case "7d":
      return data.slice(-7);
    case "30d":
      return data.slice(-14);
    case "90d":
      return data;
    case "1y":
      return data;
    default:
      return data;
  }
}

// Helper to compute metrics based on date range
function getFilteredMetrics(range: DateRange) {
  const multiplier =
    range === "7d" ? 0.25 : range === "30d" ? 0.6 : range === "90d" ? 0.85 : 1;
  return {
    sessions: Math.round(analyticsData.sessions * multiplier),
    uniqueVisitors: Math.round(analyticsData.uniqueVisitors * multiplier),
    bounceRate: +(analyticsData.bounceRate + (range === "7d" ? 2.1 : range === "30d" ? 0.8 : range === "90d" ? -0.5 : 0)).toFixed(1),
    bounceTrend: +(analyticsData.bounceTrend * (range === "7d" ? 1.5 : range === "30d" ? 1.2 : range === "90d" ? 0.9 : 1)).toFixed(1),
  };
}

// Custom tooltip for line chart
interface LineTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name: string;
  }>;
  label?: string;
}

function LineChartTooltip({ active, payload, label }: LineTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()} visits
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// Custom tooltip for bar chart
function BarChartTooltip({ active, payload, label }: LineTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {payload[0].value.toLocaleString()} visitors
        </p>
      </div>
    );
  }
  return null;
}

// Custom tooltip for pie chart
function PieChartTooltip({ active, payload }: LineTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-3 py-2">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {payload[0].name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
}

export default function AnalyticsPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [realtimeCount, setRealtimeCount] = useState(analyticsData.realtimeVisitors);
  const [comparisonEnabled, setComparisonEnabled] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulated real-time visitors counter
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeCount((prev) => {
        const delta = Math.floor(Math.random() * 21) - 10; // -10 to +10
        return Math.max(180, Math.min(350, prev + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filtered data based on date range
  const filteredVisits = useMemo(() => getFilteredPageVisits(dateRange), [dateRange]);
  const filteredMetrics = useMemo(() => getFilteredMetrics(dateRange), [dateRange]);

  // Mini-series for sparklines (last 7 points)
  const last7Visits = useMemo(() => filteredVisits.slice(-7).map((d) => d.value), [filteredVisits]);
  const sessionsSeries = last7Visits;
  const uniqueSeries = useMemo(() => last7Visits.map((v) => Math.max(1, Math.round(v * 0.4))), [last7Visits]);
  const bounceSeries = useMemo(() => {
    const base = filteredMetrics.bounceRate;
    const step = Math.sign(filteredMetrics.bounceTrend || 0) * 0.4;
    return Array.from({ length: 7 }, (_, i) => +(base + (i - 3) * step).toFixed(1));
  }, [filteredMetrics]);

  // Format visits data for line chart
  const visitsChartData = useMemo(() => {
    return filteredVisits.map((d) => ({
      date: new Date(d.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      "Current Period": d.value,
      "Previous Period": d.previousValue || 0,
    }));
  }, [filteredVisits]);

  // Traffic sources for pie chart
  const trafficSourceData = useMemo(() => {
    return analyticsData.trafficSources.map((s) => ({
      name: s.source,
      value: s.percentage,
      visitors: s.visitors,
    }));
  }, []);

  // Top geo data as bar chart
  const geoBarData = useMemo(() => {
    return analyticsData.geoData.slice(0, 8).map((g) => ({
      country: g.countryCode,
      visitors: g.visitors,
      fullName: g.country,
    }));
  }, []);

  if (isLoading) return <AnalyticsSkeleton />;

  return (
    <div className="p-4 sm:p-6 space-y-6 overflow-hidden">
      {/* Header with date range picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track your website performance and visitor insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Comparison Toggle */}
          <button
            onClick={() => setComparisonEnabled(!comparisonEnabled)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors",
              comparisonEnabled
                ? "border-primary-300 dark:border-primary-600 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400"
                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            )}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            Compare
          </button>
          {/* Date Range Picker */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Calendar className="w-4 h-4 text-gray-400 ml-2" />
            {(Object.keys(dateRangeLabels) as DateRange[]).map((key) => (
              <button
                key={key}
                onClick={() => setDateRange(key)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                  dateRange === key
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Real-time Visitors */}
        <div className="card relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Real-time Visitors
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {realtimeCount.toLocaleString()}
              </p>
            </div>
            {/* Sparkline replaces decorative icon, derived from current realtime value */}
            <div className="flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <Sparkline
                data={[realtimeCount - 10, realtimeCount - 6, realtimeCount - 8, realtimeCount - 2, realtimeCount + 3, realtimeCount - 1, realtimeCount]}
                width={56}
                height={22}
              />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500" />
            </span>
            <span className="text-xs text-success-700 font-medium">Live now</span>
          </div>
        </div>

        {/* Sessions */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Sessions
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {filteredMetrics.sessions.toLocaleString()}
              </p>
            </div>
            {/* Sparkline replaces decorative icon */}
            <div className="flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <Sparkline data={sessionsSeries} width={56} height={22} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <ArrowUp className="w-3.5 h-3.5 text-success-700" />
            <span className="text-xs font-medium text-success-700">+12.5%</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">vs last period</span>
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Unique Visitors
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {filteredMetrics.uniqueVisitors.toLocaleString()}
              </p>
            </div>
            {/* Sparkline replaces decorative icon */}
            <div className="flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <Sparkline data={uniqueSeries} width={56} height={22} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <ArrowUp className="w-3.5 h-3.5 text-success-700" />
            <span className="text-xs font-medium text-success-700">+8.3%</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">vs last period</span>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Bounce Rate
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {filteredMetrics.bounceRate}%
              </p>
            </div>
            {/* Sparkline replaces decorative icon */}
            <div className="flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <Sparkline data={bounceSeries} width={56} height={22} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            {filteredMetrics.bounceTrend < 0 ? (
              <ArrowDown className="w-3.5 h-3.5 text-success-700" />
            ) : (
              <ArrowUp className="w-3.5 h-3.5 text-danger-600" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                filteredMetrics.bounceTrend < 0 ? "text-success-700" : "text-danger-600"
              )}
            >
              {Math.abs(filteredMetrics.bounceTrend)}%
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">vs last period</span>
          </div>
        </div>
      </div>

      {/* Page Visits Line Chart */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Page Visits
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Visit trends with period comparison
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-primary-600 rounded" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Current Period</span>
            </div>
            {comparisonEnabled && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-gray-400 rounded" style={{ opacity: 0.5 }} />
                <span className="text-xs text-gray-500 dark:text-gray-400">Previous Period</span>
              </div>
            )}
          </div>
        </div>
        <div className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={visitsChartData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#E5E7EB"}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: isDark ? "#9CA3AF" : "#6B7280" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: isDark ? "#9CA3AF" : "#6B7280" }}
                tickFormatter={(value) =>
                  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value)
                }
                domain={['auto', 'auto']}
                dx={-10}
              />
              <Tooltip content={<LineChartTooltip />} />
              <Line
                type="monotone"
                dataKey="Current Period"
                name="Current Period"
                stroke="var(--color-primary-600)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "var(--color-primary-600)",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
              {comparisonEnabled && (
                <Line
                  type="monotone"
                  dataKey="Previous Period"
                  name="Previous Period"
                  stroke={isDark ? "#6B7280" : "#9CA3AF"}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: isDark ? "#6B7280" : "#9CA3AF",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Middle Row: Traffic Sources & Device Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Traffic Sources Pie Chart */}
        <div className="card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Traffic Sources
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Where your visitors come from
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-[200px] h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    animationDuration={800}
                  >
                    {trafficSourceData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={trafficColors[index % trafficColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {analyticsData.trafficSources.map((source, index) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: trafficColors[index] }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {source.source}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {source.percentage}%
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                      ({source.visitors.toLocaleString()})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Device Breakdown
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Traffic distribution by device type
            </p>
          </div>
          <div className="space-y-5">
            {(Object.entries(analyticsData.deviceBreakdown) as [keyof typeof deviceIcons, number][]).map(
              ([device, percentage]) => {
                const Icon = deviceIcons[device];
                return (
                  <div key={device} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {device}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-700",
                          device === "desktop"
                            ? "bg-primary-600"
                            : device === "mobile"
                            ? "bg-success-500"
                            : "bg-warning-500"
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Geographic Distribution Bar Chart */}
      <div className="card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            <Globe className="w-5 h-5 inline-block mr-2 -mt-0.5" />
            Visitors by Country
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Geographic distribution of your visitors
          </p>
        </div>
        <div className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={geoBarData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#374151" : "#E5E7EB"}
                vertical={false}
              />
              <XAxis
                dataKey="country"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: isDark ? "#9CA3AF" : "#6B7280" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: isDark ? "#9CA3AF" : "#6B7280" }}
                tickFormatter={(value) =>
                  value >= 1000 ? `${(value / 1000).toFixed(0)}k` : String(value)
                }
                domain={['auto', 'auto']}
                dx={-10}
              />
              <Tooltip content={<BarChartTooltip />} />
              <Bar
                dataKey="visitors"
                fill="var(--color-primary-600)"
                radius={[4, 4, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Top Pages Table */}
      <div className="card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Top Pages
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Most visited pages with performance metrics
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 pr-4">
                  Page
                </th>
                <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 pr-4">
                  Views
                </th>
                <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 pr-4">
                  Unique Views
                </th>
                <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3">
                  Avg. Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {analyticsData.topPages.map((page) => (
                <tr key={page.page} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {page.page}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {page.views.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-right">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {page.uniqueViews.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {page.avgTime}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
