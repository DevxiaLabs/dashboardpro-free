export type NotificationType = "system" | "user" | "order" | "message" | "alert";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  message: string;
  time: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  link?: string;
}

export const notifications: Notification[] = [
  // Today
  { id: "n1", type: "order", title: "New order received", description: "Order #1284 from Sarah Johnson — $249.00", message: "Order #1284 from Sarah Johnson — $249.00", time: "10 minutes ago", timestamp: "2026-02-12T10:00:00Z", read: false },
  { id: "n2", type: "message", title: "New message from Alex Chen", description: "Hey, I've pushed the latest changes to the repo.", message: "Hey, I've pushed the latest changes to the repo.", time: "25 minutes ago", timestamp: "2026-02-12T10:00:00Z", read: false, avatar: "AC" },
  { id: "n3", type: "system", title: "Deployment successful", description: "dashboardpro v2.4.1 deployed to production.", message: "dashboardpro v2.4.1 deployed to production.", time: "1 hour ago", timestamp: "2026-02-12T10:00:00Z", read: false },
  { id: "n4", type: "alert", title: "High CPU usage detected", description: "Server us-east-1 reached 92% CPU utilization.", message: "Server us-east-1 reached 92% CPU utilization.", time: "2 hours ago", timestamp: "2026-02-12T10:00:00Z", read: false },
  { id: "n5", type: "user", title: "New user registered", description: "Emma Davis created an account.", message: "Emma Davis created an account.", time: "3 hours ago", timestamp: "2026-02-12T10:00:00Z", read: true, avatar: "ED" },

  // Yesterday
  { id: "n6", type: "order", title: "Payment received", description: "Invoice #892 paid by James Wilson — $1,200.00", message: "Invoice #892 paid by James Wilson — $1,200.00", time: "Yesterday, 4:30 PM", timestamp: "2026-02-12T10:00:00Z", read: true },
  { id: "n7", type: "message", title: "Maria Garcia mentioned you", description: "Can you review the wireframes I shared?", message: "Can you review the wireframes I shared?", time: "Yesterday, 2:15 PM", timestamp: "2026-02-12T10:00:00Z", read: true, avatar: "MG" },
  { id: "n8", type: "system", title: "Scheduled maintenance complete", description: "Database optimization finished. Performance improved by 18%.", message: "Database optimization finished. Performance improved by 18%.", time: "Yesterday, 6:00 AM", timestamp: "2026-02-12T10:00:00Z", read: true },
  { id: "n9", type: "alert", title: "SSL certificate expiring", description: "Certificate for api.example.com expires in 14 days.", message: "Certificate for api.example.com expires in 14 days.", time: "Yesterday, 10:00 AM", timestamp: "2026-02-12T10:00:00Z", read: true },

  // This week
  { id: "n10", type: "user", title: "Team member role updated", description: "Ryan Miller was promoted to Admin.", message: "Ryan Miller was promoted to Admin.", time: "2 days ago", timestamp: "2026-02-12T10:00:00Z", read: true, avatar: "RM" },
  { id: "n11", type: "order", title: "Refund processed", description: "Refund of $79.00 issued for order #1198.", message: "Refund of $79.00 issued for order #1198.", time: "2 days ago", timestamp: "2026-02-12T10:00:00Z", read: true },
  { id: "n12", type: "system", title: "New feature released", description: "Dark mode is now available in settings.", message: "Dark mode is now available in settings.", time: "3 days ago", timestamp: "2026-02-12T10:00:00Z", read: true },
  { id: "n13", type: "message", title: "Dev Team channel", description: "Lisa: Sprint retrospective notes are ready.", message: "Lisa: Sprint retrospective notes are ready.", time: "3 days ago", timestamp: "2026-02-12T10:00:00Z", read: true, avatar: "DT" },
  { id: "n14", type: "alert", title: "Failed login attempts", description: "5 failed login attempts from IP 192.168.1.45.", message: "5 failed login attempts from IP 192.168.1.45.", time: "4 days ago", timestamp: "2026-02-12T10:00:00Z", read: true },
  { id: "n15", type: "user", title: "User account deactivated", description: "John Doe's account was deactivated due to inactivity.", message: "John Doe's account was deactivated due to inactivity.", time: "5 days ago", timestamp: "2026-02-12T10:00:00Z", read: true },
  { id: "n16", type: "order", title: "Subscription renewed", description: "Pro plan renewed for DevxiaLabs — $299/mo.", message: "Pro plan renewed for DevxiaLabs — $299/mo.", time: "5 days ago", timestamp: "2026-02-12T10:00:00Z", read: true },

  // Older
  { id: "n17", type: "system", title: "Backup completed", description: "Weekly backup completed successfully. Size: 2.4 GB.", message: "Weekly backup completed successfully. Size: 2.4 GB.", time: "1 week ago", timestamp: "2026-02-12T10:00:00Z", read: true },
  { id: "n18", type: "message", title: "Sarah Johnson shared a file", description: "Q4-Report-Final.pdf (2.1 MB)", message: "Q4-Report-Final.pdf (2.1 MB)", time: "1 week ago", timestamp: "2026-02-12T10:00:00Z", read: true, avatar: "SJ" },
  { id: "n19", type: "alert", title: "Disk space warning", description: "Server storage at 85% capacity.", message: "Server storage at 85% capacity.", time: "2 weeks ago", timestamp: "2026-02-12T10:00:00Z", read: true },
  { id: "n20", type: "user", title: "Bulk user import complete", description: "Successfully imported 142 users from CSV.", message: "Successfully imported 142 users from CSV.", time: "2 weeks ago", timestamp: "2026-02-12T10:00:00Z", read: true },
];

export const typeLabels: Record<NotificationType, string> = {
  system: "System",
  user: "User",
  order: "Order",
  message: "Message",
  alert: "Alert",
};

export const typeColors: Record<NotificationType, { bg: string; text: string; icon: string }> = {
  system: { bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", icon: "text-blue-500" },
  user: { bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", icon: "text-emerald-500" },
  order: { bg: "bg-purple-50 dark:bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", icon: "text-purple-500" },
  message: { bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", icon: "text-amber-500" },
  alert: { bg: "bg-rose-50 dark:bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", icon: "text-rose-500" },
};
