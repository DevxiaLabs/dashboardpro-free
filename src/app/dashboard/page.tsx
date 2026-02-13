"use client";

import { useState, useEffect } from "react";
import { RevenueChart, SalesByCategoryChart, TrafficDonutChart } from "@/components/charts";
import Sparkline from "@/components/shared/Sparkline";
import { statCards, activityEvents } from "@/data/dashboard";
import { transactions } from "@/data/transactions";
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  UserPlus,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle,
  ShoppingBag,
  Star,
  Shield,
  Loader2,
} from "lucide-react";
import { cn, formatTimeAgo } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// Keep map for type safety/backcompat, though decorative icons are replaced by sparklines
const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
};

const activityIconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  DollarSign,
  UserPlus,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle,
  ShoppingBag,
  Star,
  Shield,
};

const activityColorMap: Record<string, string> = {
  order: "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400",
  user: "bg-success-50 dark:bg-success-500/10 text-success-700 dark:text-success-400",
  product: "bg-warning-50 dark:bg-warning-500/10 text-warning-700 dark:text-warning-400",
  system: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
};

const statusColorMap: Record<string, string> = {
  completed: "bg-success-50 dark:bg-success-500/10 text-success-700 dark:text-success-400",
  pending: "bg-warning-50 dark:bg-warning-500/10 text-warning-700 dark:text-warning-400",
  failed: "bg-danger-50 dark:bg-danger-500/10 text-danger-700 dark:text-danger-400",
};

// formatTimeAgo imported from @/lib/utils

function DashboardSkeleton() {
  return (
    <div className="p-4 sm:p-6 space-y-6" data-testid="dashboard-loading">
      {/* Header skeleton */}
      <div>
        <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="mt-2 h-4 w-72 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="mt-2 h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
            <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="mt-1 h-3 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-gray-300 dark:text-gray-600 animate-spin" />
        </div>
      </div>

      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="card">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
            <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-gray-300 dark:text-gray-600 animate-spin" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const recentTransactions = transactions.slice(0, 7);
  const recentActivities = activityEvents.slice(0, 7);

  useEffect(() => {
    // Simulate data loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here&apos;s an overview of your business.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const isIncrease = card.changeType === "increase";
          // Lightweight 7-point series based on change direction
          const base = isIncrease ? 50 : 55;
          const series = Array.from({ length: 7 }, (_, i) => {
            const drift = isIncrease ? i * 2 : -i * 2;
            const noise = (i % 2 === 0 ? 1 : -1) * (i % 3);
            return base + drift + noise;
          });
          return (
            <div key={card.title} className="card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {card.value}
                  </p>
                </div>
                {/* Sparkline replaces decorative icon */}
                <div className="flex-shrink-0 w-16 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <Sparkline data={series} width={56} height={22} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {isIncrease ? (
                  <ArrowUp className="w-3.5 h-3.5 text-success-700" />
                ) : (
                  <ArrowDown className="w-3.5 h-3.5 text-danger-600" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    isIncrease ? "text-success-700" : "text-danger-600"
                  )}
                >
                  {Math.abs(card.change)}%
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  vs last period
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Charts Row: Sales by Category & Traffic Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <SalesByCategoryChart />
        <TrafficDonutChart />
      </div>

      {/* Bottom Row: Recent Transactions & Activity Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Transactions */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recent Transactions
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Latest transaction activity
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 pr-4">
                    Name
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 pr-4">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 pr-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 pr-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {txn.name}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          txn.type === "debit"
                            ? "text-danger-600"
                            : "text-gray-900 dark:text-gray-100"
                        )}
                      >
                        {txn.type === "debit" ? "-" : "+"}$
                        {txn.amount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                          statusColorMap[txn.status]
                        )}
                      >
                        {txn.status.charAt(0).toUpperCase() +
                          txn.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(txn.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recent Activity
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              What&apos;s been happening
            </p>
          </div>
          <div className="space-y-4">
            {recentActivities.map((event, index) => {
              const ActivityIcon =
                activityIconMap[event.icon || ""] || CheckCircle;
              const colorClass =
                activityColorMap[event.type] || activityColorMap.system;

              return (
                <div key={event.id} className="flex gap-3">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        colorClass
                      )}
                    >
                      <ActivityIcon className="w-4 h-4" />
                    </div>
                    {index < recentActivities.length - 1 && (
                      <div className="w-px h-full bg-gray-200 dark:bg-gray-700 mt-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-4 min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {event.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {formatTimeAgo(event.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
