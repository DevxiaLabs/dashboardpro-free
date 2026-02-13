import type { NavSection } from "@/types";

export const navigationSections: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3" },
      { label: "Users", href: "/dashboard/users", icon: "Users" },
      { label: "Calendar", href: "/dashboard/calendar", icon: "Calendar" },
      { label: "Components", href: "/dashboard/components", icon: "Puzzle" },
      { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
    ],
  },
  {
    title: "Upgrade",
    items: [
      { label: "Upgrade to Pro", href: "#", icon: "CreditCard" },
    ],
  },
];
