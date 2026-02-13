"use client";

import { useState, useEffect, useRef, useMemo, useCallback, Fragment } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
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
  User,
  Sun,
  Moon,
  LogOut,
  ArrowRight,
  Command,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  section: string;
  keywords: string[];
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const items: CommandItem[] = useMemo(
    () => [
      // Pages
      { id: "dashboard", label: "Dashboard", description: "Overview & stats", icon: LayoutDashboard, section: "Pages", keywords: ["home", "overview"], action: () => navigate("/dashboard") },
      { id: "analytics", label: "Analytics", description: "Charts & metrics", icon: BarChart3, section: "Pages", keywords: ["charts", "data", "traffic"], action: () => navigate("/dashboard/analytics") },
      { id: "users", label: "Users", description: "Team management", icon: Users, section: "Pages", keywords: ["people", "team", "members"], action: () => navigate("/dashboard/users") },
      { id: "products", label: "Products", description: "Product catalog", icon: Package, section: "Pages", keywords: ["items", "inventory"], action: () => navigate("/dashboard/products") },
      { id: "orders", label: "Orders", description: "Order management", icon: ShoppingCart, section: "Pages", keywords: ["purchases", "sales"], action: () => navigate("/dashboard/orders") },
      { id: "messages", label: "Messages", description: "Inbox", icon: Mail, section: "Pages", keywords: ["inbox", "email", "chat"], action: () => navigate("/dashboard/messages") },
      { id: "calendar", label: "Calendar", description: "Events & schedule", icon: Calendar, section: "Pages", keywords: ["events", "dates", "schedule"], action: () => navigate("/dashboard/calendar") },
      { id: "kanban", label: "Kanban", description: "Task board", icon: Columns3, section: "Pages", keywords: ["board", "tasks", "todo"], action: () => navigate("/dashboard/kanban") },
      { id: "components", label: "Components", description: "UI showcase", icon: Puzzle, section: "Pages", keywords: ["ui", "elements", "buttons"], action: () => navigate("/dashboard/components") },
      { id: "settings", label: "Settings", description: "Preferences", icon: Settings, section: "Pages", keywords: ["preferences", "config"], action: () => navigate("/dashboard/settings") },
      { id: "pricing", label: "Pricing", description: "Plans & billing", icon: CreditCard, section: "Pages", keywords: ["plans", "billing"], action: () => navigate("/dashboard/pricing") },
      { id: "profile", label: "Profile", description: "Your profile", icon: User, section: "Pages", keywords: ["account", "me"], action: () => navigate("/dashboard/profile") },
      // Actions
      {
        id: "toggle-theme",
        label: resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        section: "Actions",
        keywords: ["theme", "dark", "light", "mode"],
        action: () => { toggleTheme(); setOpen(false); },
      },
      {
        id: "logout",
        label: "Log Out",
        icon: LogOut,
        section: "Actions",
        keywords: ["sign out", "exit"],
        action: () => { logout(); setOpen(false); router.push("/login"); },
      },
    ],
    [navigate, resolvedTheme, toggleTheme, logout, router]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
    );
  }, [query, items]);

  // Group by section
  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((item) => {
      const arr = map.get(item.section) || [];
      arr.push(item);
      map.set(item.section, arr);
    });
    return map;
  }, [filtered]);

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected into view
  useEffect(() => {
    if (!listRef.current) return;
    const selected = listRef.current.querySelector("[data-selected=true]");
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div className="relative flex items-start justify-center pt-[20vh] px-4">
        <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in slide-in-from-top-4 fade-in duration-200">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search pages and actions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">No results found</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try a different search term</p>
              </div>
            ) : (
              Array.from(grouped.entries()).map(([section, sectionItems]) => (
                <div key={section}>
                  <div className="px-4 py-1.5">
                    <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {section}
                    </p>
                  </div>
                  {sectionItems.map((item) => {
                    flatIndex++;
                    const isSelected = flatIndex === selectedIndex;
                    const currentIndex = flatIndex;
                    return (
                      <button
                        key={item.id}
                        data-selected={isSelected}
                        onClick={() => item.action()}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={cn(
                          "flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors",
                          isSelected
                            ? "bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-4 h-4 flex-shrink-0",
                            isSelected ? "text-primary-500" : "text-gray-400"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.label}</p>
                          {item.description && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-primary-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">esc</kbd>
                Close
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-400">
              <Command className="w-3 h-3" />K
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
