import type { NavSection } from "@/types";

export const navigationSections: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
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
