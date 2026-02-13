import type { StatCard, SalesByCategory, TrafficSourceData, ActivityEvent } from "@/types";

export const statCards: StatCard[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    changeType: "increase",
    icon: "DollarSign",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: 15.3,
    changeType: "increase",
    icon: "Users",
  },
  {
    title: "Total Orders",
    value: "1,247",
    change: 8.2,
    changeType: "increase",
    icon: "ShoppingCart",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: -2.4,
    changeType: "decrease",
    icon: "TrendingUp",
  },
];

export const salesByCategory: SalesByCategory[] = [
  { category: "Electronics", sales: 45200 },
  { category: "Furniture", sales: 28900 },
  { category: "Accessories", sales: 22400 },
  { category: "Appliances", sales: 15800 },
  { category: "Lighting", sales: 8900 },
  { category: "Fitness", sales: 6200 },
];

export const trafficSources: TrafficSourceData[] = [
  { name: "Organic Search", value: 43.1, color: "var(--color-primary-600)" },
  { name: "Direct", value: 26.2, color: "#10B981" },
  { name: "Referral", value: 17.2, color: "#F59E0B" },
  { name: "Social Media", value: 13.5, color: "#0EA5E9" },
];

export const activityEvents: ActivityEvent[] = [
  {
    id: "act_001",
    description: "New order #ORD-2024-020 placed by Lucas Martin",
    timestamp: "2024-05-20T10:45:00Z",
    type: "order",
    icon: "ShoppingCart",
  },
  {
    id: "act_002",
    description: "Payment of $534.95 received from Harper Jackson",
    timestamp: "2024-05-20T09:30:00Z",
    type: "order",
    icon: "DollarSign",
  },
  {
    id: "act_003",
    description: "Grace Robinson registered a new account",
    timestamp: "2024-05-19T14:10:00Z",
    type: "user",
    icon: "UserPlus",
  },
  {
    id: "act_004",
    description: "Order #ORD-2024-013 delivered to Benjamin White",
    timestamp: "2024-05-19T11:45:00Z",
    type: "order",
    icon: "Package",
  },
  {
    id: "act_005",
    description: "Product 'Portable Monitor 15.6\"' marked as low stock",
    timestamp: "2024-05-18T15:30:00Z",
    type: "product",
    icon: "AlertTriangle",
  },
  {
    id: "act_006",
    description: "Order #ORD-2024-019 cancelled by Alexander Lee",
    timestamp: "2024-05-18T14:00:00Z",
    type: "order",
    icon: "XCircle",
  },
  {
    id: "act_007",
    description: "System update v2.9.1 deployed successfully",
    timestamp: "2024-05-18T06:00:00Z",
    type: "system",
    icon: "CheckCircle",
  },
  {
    id: "act_008",
    description: "Bulk order from Evelyn Clark for $231.94",
    timestamp: "2024-05-17T13:50:00Z",
    type: "order",
    icon: "ShoppingBag",
  },
  {
    id: "act_009",
    description: "Emily Rodriguez left a 5-star product review",
    timestamp: "2024-05-17T11:20:00Z",
    type: "product",
    icon: "Star",
  },
  {
    id: "act_010",
    description: "Security audit completed with 0 critical findings",
    timestamp: "2024-05-16T14:00:00Z",
    type: "system",
    icon: "Shield",
  },
];
