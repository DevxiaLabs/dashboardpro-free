export interface Invoice {
  id: string;
  number: string;
  client: string;
  email: string;
  amount: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue" | "draft";
  issuedDate: string;
  dueDate: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export const invoices: Invoice[] = [
  {
    id: "inv-001",
    number: "INV-2026-001",
    client: "Acme Corporation",
    email: "billing@acme.com",
    amount: 4500,
    tax: 945,
    total: 5445,
    status: "paid",
    issuedDate: "2026-01-15",
    dueDate: "2026-02-15",
    items: [
      { description: "Web Development", quantity: 30, rate: 100, amount: 3000 },
      { description: "UI/UX Design", quantity: 15, rate: 100, amount: 1500 },
    ],
  },
  {
    id: "inv-002",
    number: "INV-2026-002",
    client: "TechStart Inc.",
    email: "finance@techstart.io",
    amount: 2800,
    tax: 588,
    total: 3388,
    status: "pending",
    issuedDate: "2026-02-01",
    dueDate: "2026-03-01",
    items: [
      { description: "API Integration", quantity: 20, rate: 90, amount: 1800 },
      { description: "Database Setup", quantity: 10, rate: 100, amount: 1000 },
    ],
  },
  {
    id: "inv-003",
    number: "INV-2026-003",
    client: "Global Retail Co.",
    email: "ap@globalretail.com",
    amount: 8200,
    tax: 1722,
    total: 9922,
    status: "overdue",
    issuedDate: "2025-12-10",
    dueDate: "2026-01-10",
    items: [
      { description: "E-commerce Platform", quantity: 60, rate: 110, amount: 6600 },
      { description: "Payment Integration", quantity: 16, rate: 100, amount: 1600 },
    ],
  },
  {
    id: "inv-004",
    number: "INV-2026-004",
    client: "Design Studio Pro",
    email: "hello@designstudio.pro",
    amount: 1500,
    tax: 315,
    total: 1815,
    status: "draft",
    issuedDate: "2026-02-10",
    dueDate: "2026-03-10",
    items: [
      { description: "Logo Design", quantity: 1, rate: 800, amount: 800 },
      { description: "Brand Guidelines", quantity: 1, rate: 700, amount: 700 },
    ],
  },
  {
    id: "inv-005",
    number: "INV-2026-005",
    client: "CloudNine Solutions",
    email: "accounts@cloudnine.dev",
    amount: 6300,
    tax: 1323,
    total: 7623,
    status: "paid",
    issuedDate: "2026-01-20",
    dueDate: "2026-02-20",
    items: [
      { description: "Cloud Migration", quantity: 40, rate: 120, amount: 4800 },
      { description: "DevOps Setup", quantity: 15, rate: 100, amount: 1500 },
    ],
  },
  {
    id: "inv-006",
    number: "INV-2026-006",
    client: "MediaFlow Agency",
    email: "billing@mediaflow.co",
    amount: 3750,
    tax: 787.5,
    total: 4537.5,
    status: "pending",
    issuedDate: "2026-02-05",
    dueDate: "2026-03-05",
    items: [
      { description: "CMS Development", quantity: 25, rate: 100, amount: 2500 },
      { description: "Content Migration", quantity: 12.5, rate: 100, amount: 1250 },
    ],
  },
  {
    id: "inv-007",
    number: "INV-2026-007",
    client: "HealthTech Labs",
    email: "finance@healthtech.com",
    amount: 12000,
    tax: 2520,
    total: 14520,
    status: "paid",
    issuedDate: "2025-12-01",
    dueDate: "2025-12-31",
    items: [
      { description: "HIPAA Compliance App", quantity: 80, rate: 125, amount: 10000 },
      { description: "Security Audit", quantity: 20, rate: 100, amount: 2000 },
    ],
  },
  {
    id: "inv-008",
    number: "INV-2026-008",
    client: "EduPlatform Co.",
    email: "admin@eduplatform.org",
    amount: 5600,
    tax: 1176,
    total: 6776,
    status: "overdue",
    issuedDate: "2025-11-15",
    dueDate: "2025-12-15",
    items: [
      { description: "LMS Development", quantity: 40, rate: 100, amount: 4000 },
      { description: "Video Integration", quantity: 16, rate: 100, amount: 1600 },
    ],
  },
];
