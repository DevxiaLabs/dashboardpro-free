"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  cta?: {
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary";
  };
  className?: string;
}

export function EmptyState({ icon, title, description, cta, className }: EmptyStateProps) {
  const Btn = () => {
    if (!cta) return null;
    const base = "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors";
    const cls = cta.variant === "secondary"
      ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30"
      : "text-white bg-primary-600 hover:bg-primary-700";

    if (cta.href) {
      return (
        <Link href={cta.href} className={cn(base, cls)}>
          {cta.label}
        </Link>
      );
    }
    return (
      <button onClick={cta.onClick} className={cn(base, cls)}>
        {cta.label}
      </button>
    );
  };

  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-16 px-6", className)}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 text-gray-400 dark:text-gray-500">
          {icon}
        </div>
      )}
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md">{description}</p>
      )}
      {cta && (
        <div className="mt-5">
          <Btn />
        </div>
      )}
    </div>
  );
}
