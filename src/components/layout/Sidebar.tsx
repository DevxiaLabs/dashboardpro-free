"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Mail,
  Calendar,
  Columns3,
  Puzzle,
  Settings,
  CreditCard,
  FileText,
  FolderOpen,
  MessageCircle,
  Bell,
  Clock,
  HelpCircle,
  MapPin,
  Shield,
  PieChart,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationSections } from "@/data/navigation";
import { useColorTheme } from "@/contexts/ColorThemeContext";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Mail,
  Calendar,
  Columns3,
  Puzzle,
  Settings,
  CreditCard,
  FileText,
  FolderOpen,
  MessageCircle,
  Bell,
  Clock,
  HelpCircle,
  MapPin,
  Shield,
  PieChart,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname() ?? "/";
  const { colorTheme } = useColorTheme();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className={cn(
      "flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700",
      "transition-all duration-300 ease-in-out"
    )}>
      {/* Logo + Collapse toggle integrated */}
      <div key={colorTheme} className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900">
        <Link
          href="/dashboard"
          onClick={onMobileClose}
          className="flex items-center gap-3 min-w-0 group"
          aria-label="Go to dashboard home"
        >
          <div className="flex-shrink-0 w-8 h-8 bg-white/20 group-hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-white truncate group-hover:text-primary-100 transition-colors">
              DashBoard Free
            </span>
          )}
        </Link>
        {/* Collapse toggle (desktop) */}
        <button
          onClick={onToggle}
          className={cn(
            "hidden lg:inline-flex items-center justify-center",
            "h-8 w-8 rounded-md text-white/80 hover:text-white hover:bg-white/10",
            "transition-colors"
          )}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-6">
            {!collapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = iconMap[item.icon];
                const active = isActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onMobileClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 lg:py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 min-h-[44px]",
                        active
                          ? "bg-primary-600 text-white dark:bg-primary-600 dark:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            "flex-shrink-0 w-5 h-5",
                            active
                              ? "text-white dark:text-white"
                              : "text-gray-400 dark:text-gray-500"
                          )}
                        />
                      )}
                      {!collapsed && (
                        <>
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto flex-shrink-0 bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 text-xs font-medium px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Upgrade banner */}
        <div className={cn(
          "mt-6 p-3 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50/60 dark:bg-primary-900/20",
          collapsed && "hidden"
        )}>
          <p className="text-xs font-semibold text-primary-700 dark:text-primary-300 mb-1">Unlock 30+ pages</p>
          <p className="text-xs text-primary-700/80 dark:text-primary-400/80 mb-2">Get Analytics, Users, Products, Kanban, and more.</p>
          <Link href="#" className="inline-flex items-center justify-center w-full text-xs font-semibold px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition" aria-label="Upgrade to Pro">
            Upgrade to Pro
          </Link>
        </div>
      </nav>

      {/* Spacer to keep content bottom padding on desktop */}
      <div className="hidden lg:block h-3" />
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] lg:hidden",
          "transform transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:flex-col",
          "transition-all duration-300 ease-in-out",
          collapsed ? "lg:w-[72px]" : "lg:w-[260px]"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
