"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  users: "Users",
  products: "Products",
  orders: "Orders",
  messages: "Messages",
  calendar: "Calendar",
  kanban: "Kanban",
  components: "Components",
  settings: "Settings",
  pricing: "Pricing",
};

export function Breadcrumb() {
  const rawPathname = usePathname();
  const pathname: string = rawPathname ?? "/";

  // Split pathname into segments, filtering out empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;

    return { href, label, isLast };
  });

  // Don't render if we're at the root dashboard (only one breadcrumb)
  if (breadcrumbs.length <= 1) {
    return (
      <nav aria-label="Breadcrumb" className="flex items-center text-sm">
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
          <Home className="w-3.5 h-3.5" />
          <span className="font-medium text-gray-900 dark:text-gray-100">Dashboard</span>
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm">
      <ol className="flex items-center gap-1.5">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            )}
            {index === 0 && (
              <Home className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0 mr-0.5" />
            )}
            {crumb.isLast ? (
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className={cn(
                  "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                )}
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
