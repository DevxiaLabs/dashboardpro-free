// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "editor" | "viewer" | "member";
  status: "active" | "inactive" | "pending";
  joinedDate: string;
  bio?: string;
  phone?: string;
  location?: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  status: "active" | "draft" | "archived";
  image: string;
  sku: string;
  createdAt: string;
}

// Order types
export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  shippingAddress: string;
  trackingNumber?: string;
  timeline: OrderTimelineEntry[];
}

export interface OrderTimelineEntry {
  status: string;
  date: string;
  description: string;
}

// Message types
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  subject: string;
  body: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
}

// Analytics types
export interface AnalyticsData {
  pageVisits: ChartDataPoint[];
  sessions: number;
  uniqueVisitors: number;
  bounceRate: number;
  bounceTrend: number;
  topPages: TopPage[];
  trafficSources: TrafficSource[];
  deviceBreakdown: DeviceBreakdown;
  geoData: GeoDataPoint[];
  realtimeVisitors: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  previousValue?: number;
}

export interface TopPage {
  page: string;
  views: number;
  uniqueViews: number;
  avgTime: string;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

export interface DeviceBreakdown {
  desktop: number;
  mobile: number;
  tablet: number;
}

export interface GeoDataPoint {
  country: string;
  countryCode: string;
  visitors: number;
}

// Transaction types
export interface Transaction {
  id: string;
  name: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  type: "credit" | "debit";
}

// Calendar event types
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  color: "blue" | "green" | "red" | "yellow" | "purple" | "pink";
  description?: string;
}

// Kanban types
export interface KanbanCard {
  id: string;
  title: string;
  description: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  priority: "low" | "medium" | "high" | "urgent";
  tags?: string[];
  dueDate?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  isRead: boolean;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// Dashboard stat card types
export interface StatCard {
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease";
  icon: string;
}

// Revenue chart types
export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

// Sales by category
export interface SalesByCategory {
  category: string;
  sales: number;
}

// Traffic source for donut chart
export interface TrafficSourceData {
  name: string;
  value: number;
  color: string;
}

// Activity feed
export interface ActivityEvent {
  id: string;
  description: string;
  timestamp: string;
  type: "user" | "order" | "product" | "system";
  icon?: string;
}

// Pricing plan
export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isRecommended: boolean;
  cta: string;
}
