"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  );
}

/** Skeleton for table rows on data pages (users, products, orders) */
export function TableRowSkeleton({ columns = 6 }: { columns?: number }) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <Skeleton
            className={cn(
              "h-4",
              i === 0 ? "w-8" : i === 1 ? "w-32" : "w-20"
            )}
          />
        </td>
      ))}
    </tr>
  );
}

/** Full skeleton for a users-style data table page */
export function UsersTableSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Table header */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex gap-8">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        {/* Table rows */}
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4">
              {/* Checkbox */}
              <Skeleton className="h-4 w-4 rounded" />
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 w-40">
                <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
                <Skeleton className="h-4 w-24" />
              </div>
              {/* Email */}
              <Skeleton className="h-4 w-48" />
              {/* Role */}
              <Skeleton className="h-6 w-16 rounded-full" />
              {/* Status */}
              <Skeleton className="h-6 w-16 rounded-full" />
              {/* Date */}
              <Skeleton className="h-4 w-24" />
              {/* Actions */}
              <Skeleton className="h-7 w-14 rounded-md" />
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <Skeleton className="h-4 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Skeleton for the analytics page */
export function AnalyticsSkeleton() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-7 w-32 mb-3" />
            <Skeleton className="h-4 w-36" />
          </div>
        ))}
      </div>
      <div className="card">
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-4 w-56 mb-4" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="card"><Skeleton className="h-5 w-32 mb-4" /><Skeleton className="h-48 w-full rounded-lg" /></div>
        <div className="card"><Skeleton className="h-5 w-32 mb-4" /><Skeleton className="h-48 w-full rounded-lg" /></div>
      </div>
    </div>
  );
}

/** Skeleton for the orders page */
export function OrdersTableSkeleton() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><Skeleton className="h-8 w-24 mb-2" /><Skeleton className="h-4 w-56" /></div>
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex gap-8">
          {[12, 28, 24, 16, 16, 20, 12].map((w, i) => <Skeleton key={i} className={`h-4 w-${w}`} />)}
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-8 rounded-md" />
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <Skeleton className="h-4 w-40" />
          <div className="flex gap-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-8 rounded-lg" />)}</div>
        </div>
      </div>
    </div>
  );
}

/** Skeleton for the invoices page */
export function InvoicesTableSkeleton() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><Skeleton className="h-8 w-28 mb-2" /><Skeleton className="h-4 w-48" /></div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-16 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Skeleton for the calendar page */
export function CalendarSkeleton() {
  return (
    <div className="p-4 sm:p-6 pt-20 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><Skeleton className="h-8 w-28 mb-2" /><Skeleton className="h-4 w-48" /></div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-2"><Skeleton className="h-8 w-8 rounded" /><Skeleton className="h-8 w-8 rounded" /></div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
          {Array.from({ length: 35 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-lg" />)}
        </div>
      </div>
    </div>
  );
}

/** Skeleton for the messages page */
export function MessagesSkeleton() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4"><Skeleton className="h-8 w-32 mb-2" /><Skeleton className="h-4 w-48" /></div>
      <div className="card overflow-hidden">
        <div className="flex h-[500px]">
          <div className="w-full md:w-[340px] border-r border-gray-200 dark:border-gray-700">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700"><Skeleton className="h-10 w-full rounded-lg" /></div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-3">
                  <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                  <div className="flex-1"><Skeleton className="h-4 w-32 mb-2" /><Skeleton className="h-3 w-48" /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex flex-1 items-center justify-center">
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Skeleton for the kanban page */
export function KanbanSkeleton() {
  return (
    <div className="pt-16 p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><Skeleton className="h-8 w-24 mb-2" /><Skeleton className="h-4 w-48" /></div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 4 }).map((_, col) => (
          <div key={col} className="flex-shrink-0 w-72 bg-gray-100 dark:bg-gray-800 rounded-xl p-3 space-y-3">
            <div className="flex items-center justify-between mb-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-5 w-6 rounded" /></div>
            {Array.from({ length: 3 - col % 2 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-lg p-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <div className="flex gap-2"><Skeleton className="h-5 w-12 rounded-full" /><Skeleton className="h-5 w-16 rounded-full" /></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Skeleton for the settings page */
export function SettingsSkeleton() {
  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div><Skeleton className="h-8 w-28 mb-2" /><Skeleton className="h-4 w-56" /></div>
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-1">
        {["w-20", "w-24", "w-28", "w-16"].map((w, i) => <Skeleton key={i} className={`h-9 ${w} rounded-lg`} />)}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card space-y-4">
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="space-y-3">
            <div><Skeleton className="h-4 w-20 mb-1" /><Skeleton className="h-10 w-full rounded-lg" /></div>
            <div><Skeleton className="h-4 w-24 mb-1" /><Skeleton className="h-10 w-full rounded-lg" /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Skeleton for the pricing page */
export function PricingSkeleton() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center"><Skeleton className="h-8 w-48 mx-auto mb-2" /><Skeleton className="h-4 w-72 mx-auto" /></div>
      <div className="flex justify-center"><Skeleton className="h-10 w-48 rounded-full" /></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card space-y-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-4 w-full" />
            <div className="space-y-2">{Array.from({ length: 5 }).map((_, j) => <Skeleton key={j} className="h-4 w-full" />)}</div>
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Full skeleton for a products-style data table page */
export function ProductsTableSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-28 mb-2" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-36 rounded-lg" />
        <Skeleton className="h-10 w-36 rounded-lg" />
        <div className="flex gap-1">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex gap-8">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4">
              {/* Image */}
              <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
              {/* Name */}
              <Skeleton className="h-4 w-40" />
              {/* Category */}
              <Skeleton className="h-6 w-20 rounded-full" />
              {/* Price */}
              <Skeleton className="h-4 w-16" />
              {/* Stock */}
              <Skeleton className="h-4 w-20" />
              {/* Status */}
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <Skeleton className="h-4 w-44" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
