"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Menu,
  Sun,
  Moon,
  LogOut,
  User,
  Settings,
  ChevronDown,
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Mail,
  Calendar,
  Columns3,
  Puzzle,
  CreditCard,
  X,
  Palette,
  Check,
  type LucideIcon,
} from "lucide-react";
import { cn, getInitials, formatTimeAgo } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useColorTheme, type BaseColorTheme } from "@/contexts/ColorThemeContext";
import { notifications as mockNotifications } from "@/data/notifications";

const searchIconMap: Record<string, LucideIcon> = {
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
};

interface SearchItem {
  label: string;
  href: string;
  icon: string;
  section: string;
  keywords: string[];
}

const searchableItems: SearchItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard", section: "Main", keywords: ["home", "overview", "stats", "revenue"] },
  { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3", section: "Main", keywords: ["charts", "metrics", "data", "visitors", "traffic"] },
  { label: "Users", href: "/dashboard/users", icon: "Users", section: "Management", keywords: ["people", "accounts", "members", "team"] },
  { label: "Products", href: "/dashboard/products", icon: "Package", section: "Management", keywords: ["items", "inventory", "stock", "catalog"] },
  { label: "Orders", href: "/dashboard/orders", icon: "ShoppingCart", section: "Management", keywords: ["purchases", "transactions", "sales", "shipping"] },
  { label: "Messages", href: "/dashboard/messages", icon: "Mail", section: "Apps", keywords: ["inbox", "email", "chat", "communication"] },
  { label: "Calendar", href: "/dashboard/calendar", icon: "Calendar", section: "Apps", keywords: ["events", "schedule", "dates", "meetings"] },
  { label: "Kanban", href: "/dashboard/kanban", icon: "Columns3", section: "Apps", keywords: ["board", "tasks", "projects", "todo", "drag"] },
  { label: "Components", href: "/dashboard/components", icon: "Puzzle", section: "Other", keywords: ["ui", "elements", "buttons", "forms", "showcase"] },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings", section: "Other", keywords: ["profile", "preferences", "account", "theme", "password"] },
  { label: "Pricing", href: "/dashboard/pricing", icon: "CreditCard", section: "Other", keywords: ["plans", "billing", "subscription", "upgrade"] },
];

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

export function Header({ onMenuClick, sidebarCollapsed }: HeaderProps) {
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { baseColorTheme, setColorTheme } = useColorTheme();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(-1);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchableItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.keywords.some((kw) => kw.includes(q))
    );
  }, [searchQuery]);

  const handleSearchSelect = (href: string) => {
    router.push(href);
    setSearchQuery("");
    setShowSearchResults(false);
    setSelectedSearchIndex(-1);
    searchInputRef.current?.blur();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!showSearchResults || searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSearchIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSearchIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === "Enter" && selectedSearchIndex >= 0) {
      e.preventDefault();
      handleSearchSelect(searchResults[selectedSearchIndex].href);
    } else if (e.key === "Escape") {
      setShowSearchResults(false);
      setSelectedSearchIndex(-1);
      searchInputRef.current?.blur();
    }
  };

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
        setSelectedSearchIndex(-1);
      }
      if (
        colorRef.current &&
        !colorRef.current.contains(event.target as Node)
      ) {
        setShowColorMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const colorThemes = [
    {
      key: "ocean",
      label: "Ocean",
      swatch: ["#90b1d0", "#668eb6", "#416e9b", "#1e3a5f", "#19314f"],
    },
    {
      key: "sunset",
      label: "Sunset",
      swatch: ["#ffb19f", "#ff8e75", "#f47257", "#e8634a", "#d4523b"],
    },
    {
      key: "forest",
      label: "Forest",
      swatch: ["#90cbb1", "#66b293", "#429976", "#2d6a4f", "#245742"],
    },
    {
      key: "lavender",
      label: "Lavender",
      swatch: ["#c4aee2", "#a88fd4", "#8d70c5", "#7c5cbf", "#6a4aa8"],
    },
    {
      key: "slate",
      label: "Slate",
      swatch: ["#94a3b8", "#78899e", "#64748b", "#475569", "#3b4a5c"],
    },
  ] as const;

  const allThemeOptions = colorThemes.map((t) => ({
    id: t.key as BaseColorTheme,
    label: t.label,
    swatch: t.swatch,
  }));

  return (
    <header
      className={cn(
        "sticky top-0 z-20 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700",
        "flex items-center justify-between px-4 lg:px-6",
        "transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "lg:pl-[calc(72px+1.5rem)]" : "lg:pl-[calc(260px+1.5rem)]"
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="hidden sm:flex relative" ref={searchRef}>
          <div className={cn(
            "flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 w-64 lg:w-80 transition-all",
            showSearchResults && searchQuery.trim() && "rounded-b-none ring-2 ring-primary-500/30"
          )}>
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
                setSelectedSearchIndex(-1);
              }}
              onFocus={() => {
                if (searchQuery.trim()) setShowSearchResults(true);
              }}
              onKeyDown={handleSearchKeyDown}
              className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none w-full"
              aria-label="Search pages"
              data-testid="global-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                  setSelectedSearchIndex(-1);
                  searchInputRef.current?.focus();
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 rounded-b-lg shadow-lg border border-t-0 border-gray-200 dark:border-gray-700 overflow-hidden z-50" data-testid="search-results-dropdown">
              {searchResults.length > 0 ? (
                <div className="py-1 max-h-64 overflow-y-auto">
                  {searchResults.map((result, index) => {
                    const IconComponent = searchIconMap[result.icon];
                    return (
                      <button
                        key={result.href}
                        onClick={() => handleSearchSelect(result.href)}
                        className={cn(
                          "flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors",
                          index === selectedSearchIndex
                            ? "bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                        data-testid={`search-result-${result.label.toLowerCase()}`}
                      >
                        {IconComponent && (
                          <IconComponent className={cn(
                            "w-4 h-4 flex-shrink-0",
                            index === selectedSearchIndex ? "text-primary-500" : "text-gray-400"
                          )} />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{result.label}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{result.section}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="px-3 py-4 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No results found</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Try a different search term</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Color theme popover */}
        <div className="relative" ref={colorRef}>
          <button
            onClick={() => setShowColorMenu((v) => !v)}
            className="p-2.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Select color theme"
            data-testid="color-theme-button"
          >
            <Palette className="w-5 h-5" />
          </button>

          {showColorMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-50" role="menu" aria-label="Color theme selector">
              <div className="flex flex-col gap-1">
                {allThemeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setColorTheme(opt.id);
                      setShowColorMenu(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left",
                      baseColorTheme === opt.id && "ring-2 ring-primary-500 bg-primary-50/50 dark:bg-primary-500/10"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-md overflow-hidden flex flex-col",
                      baseColorTheme === opt.id ? "ring-2 ring-primary-500" : "ring-1 ring-gray-200 dark:ring-gray-700"
                    )}>
                      {opt.swatch.map((c, i) => (
                        <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={cn("text-sm truncate", baseColorTheme === opt.id ? "font-semibold text-primary-700 dark:text-primary-300" : "text-gray-800 dark:text-gray-200")}>{opt.label}</span>
                      {baseColorTheme === opt.id && <Check className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-danger-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Notifications
                </h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.slice(0, 5).map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      "px-4 py-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
                      !notif.read && "bg-primary-50/50 dark:bg-primary-950/30"
                    )}
                  >
                    <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {notif.message}
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
                      {formatTimeAgo(notif.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium w-full text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                {user ? getInitials(user.name) : "?"}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user?.name ?? "Guest"}
              </p>
            </div>
            <ChevronDown className="hidden md:block w-4 h-4 text-gray-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push("/dashboard/profile");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    router.push("/dashboard/settings");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-danger-600 hover:bg-danger-50 dark:text-danger-500 dark:hover:bg-danger-500/10"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
