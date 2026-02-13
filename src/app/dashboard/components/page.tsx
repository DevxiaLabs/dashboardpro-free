"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Lock } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// Reuse the kept sections from original file by inlining light versions
// Section wrappers
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">{children}</div>
    </section>
  );
}
function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

// Simple button/inputs examples (copied minimal variants from pro)
function ButtonsSection() {
  return (
    <Section id="buttons" title="Buttons">
      <div className="flex flex-wrap items-center gap-3">
        <button className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700">Primary</button>
        <button className="px-4 py-2 rounded-lg bg-gray-600 text-white text-sm font-medium hover:bg-gray-700">Secondary</button>
        <button className="px-4 py-2 rounded-lg border-2 border-primary-600 text-primary-600 text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20">Outline</button>
        <button className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Ghost</button>
        <button className="px-4 py-2 rounded-lg bg-danger-600 text-white text-sm font-medium hover:bg-danger-700">Danger</button>
      </div>
    </Section>
  );
}

function FormInputsSection() {
  return (
    <Section id="form-inputs" title="Form Inputs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Text Input</label>
          <input className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Enter text..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
          <input type="email" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
          <input type="password" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="••••••••" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Textarea</label>
          <textarea rows={4} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Write something..." />
        </div>
      </div>
    </Section>
  );
}

function SelectsSection() {
  return (
    <Section id="selects" title="Selects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Native Select</label>
          <select className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <option>Choose...</option>
            <option>Option One</option>
            <option>Option Two</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Checkboxes</label>
          <div className="space-y-2">
            {[
              "Email notifications",
              "Push notifications",
              "SMS alerts",
            ].map((label) => (
              <label key={label} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-gray-600" defaultChecked />
                <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function TabsSection() {
  const [active, setActive] = React.useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "activity", label: "Activity" },
  ];
  return (
    <Section id="tabs" title="Tabs">
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex gap-0 -mb-px">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)} className={cn("px-4 py-3 text-sm font-medium border-b-2", active === t.id ? "text-primary-600 dark:text-primary-400 border-primary-600" : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600")}>{t.label}</button>
          ))}
        </div>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">Content for: {active}</p>
      </div>
    </Section>
  );
}

function BadgesSection() {
  const badges = [
    "Default",
    "Primary",
    "Success",
    "Warning",
    "Danger",
    "Info",
  ];
  return (
    <Section id="badges" title="Badges">
      <div className="flex flex-wrap gap-2">
        {badges.map((b) => (
          <span key={b} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">{b}</span>
        ))}
      </div>
    </Section>
  );
}

function CardsSection() {
  return (
    <Section id="cards" title="Cards">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Basic Card</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">Simple card for general content.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Card with Actions</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Includes buttons at the bottom.</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700">Action</button>
            <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Stat Card</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$45,230</p>
          <p className="text-xs text-success-700 mt-1">+12.5% vs last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Image Card</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">Gradient/image header style.</p>
        </div>
      </div>
    </Section>
  );
}

// Charts (basic: area, bar, pie)
function ChartsSection() {
  const areaData = [
    { name: "Jan", a: 400, b: 240 },
    { name: "Feb", a: 300, b: 139 },
    { name: "Mar", a: 500, b: 320 },
    { name: "Apr", a: 478, b: 290 },
    { name: "May", a: 589, b: 380 },
    { name: "Jun", a: 639, b: 380 },
  ];
  const barData = [
    { name: "Mon", uv: 2400, pv: 4000 },
    { name: "Tue", uv: 1398, pv: 3000 },
    { name: "Wed", uv: 3800, pv: 5000 },
    { name: "Thu", uv: 3908, pv: 4780 },
    { name: "Fri", uv: 4800, pv: 5890 },
  ];
  const pieData = [
    { name: "Direct", value: 400, color: "#3b82f6" },
    { name: "Social", value: 300, color: "#8b5cf6" },
    { name: "Organic", value: 300, color: "#22c55e" },
  ];

  return (
    <Section id="charts" title="Charts (Recharts)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Area</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="a" stroke="#3b82f6" fill="url(#colorA)" />
                <Area type="monotone" dataKey="b" stroke="#22c55e" fill="url(#colorB)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Bar</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#8b5cf6" radius={[4,4,0,0]} />
                <Bar dataKey="pv" fill="#3b82f6" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Pie</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {pieData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Data Table (sorting + pagination)
function DataTableSection() {
  const [sortCol, setSortCol] = useState<"name" | "role" | "status">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const data = [
    { name: "Alice Johnson", role: "Admin", status: "Active", email: "alice@example.com" },
    { name: "Bob Smith", role: "Editor", status: "Active", email: "bob@example.com" },
    { name: "Carol Williams", role: "Viewer", status: "Inactive", email: "carol@example.com" },
    { name: "David Brown", role: "Admin", status: "Active", email: "david@example.com" },
    { name: "Emma Davis", role: "Editor", status: "Pending", email: "emma@example.com" },
    { name: "Frank Miller", role: "Viewer", status: "Active", email: "frank@example.com" },
    { name: "Grace Wilson", role: "Editor", status: "Active", email: "grace@example.com" },
    { name: "Henry Taylor", role: "Admin", status: "Inactive", email: "henry@example.com" },
    { name: "Ivy Anderson", role: "Viewer", status: "Active", email: "ivy@example.com" },
    { name: "Jack Thomas", role: "Editor", status: "Pending", email: "jack@example.com" },
  ];

  const filtered = data.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortCol] as string;
    const valB = b[sortCol] as string;
    return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const totalPages = Math.ceil(sorted.length / rowsPerPage);
  const paginated = sorted.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const toggleSort = (col: "name" | "role" | "status") => {
    if (sortCol === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
      Inactive: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
      Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    };
    return (
      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", colors[status])}>
        {status}
      </span>
    );
  };

  return (
    <Section id="data-table" title="Data Table">
      <div className="mb-4">
        <div className="relative max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search users..."
            className="w-full pl-3 pr-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {(["name", "role", "status"] as const).map((col) => (
                <th
                  key={col}
                  onClick={() => toggleSort(col)}
                  className="py-3 px-4 text-left font-semibold text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition select-none"
                >
                  <div className="flex items-center gap-1">
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                    {sortCol === col && (
                      <span className="text-primary-600 dark:text-primary-400">{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
              <th className="py-3 px-4 text-left font-semibold text-gray-600 dark:text-gray-400">Email</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">{row.name}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.role}</td>
                <td className="py-3 px-4">{statusBadge(row.status)}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, sorted.length)} of {sorted.length}
        </p>
        <div className="flex items-center gap-1">
          <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition">Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)} className={cn("w-8 h-8 rounded-md text-sm font-medium transition", page === currentPage ? "bg-primary-600 text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800")}>{page}</button>
          ))}
          <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition">Next</button>
        </div>
      </div>
    </Section>
  );
}

// Modals
function ModalSection() {
  const [activeModal, setActiveModal] = useState<"sm" | "md" | "lg" | null>(null);
  const sizeClasses: Record<string, string> = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape" && activeModal) setActiveModal(null); };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeModal]);
  return (
    <Section id="modals" title="Modal Dialogs">
      <div className="flex flex-wrap gap-3">
        {(["sm", "md", "lg"] as const).map((size) => (
          <button key={size} onClick={() => setActiveModal(size)} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition">Open {size.toUpperCase()} Modal</button>
        ))}
      </div>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-4" onClick={() => setActiveModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className={cn("relative bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 mx-4 w-full max-h-[90vh] overflow-y-auto", sizeClasses[activeModal])} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{activeModal.toUpperCase()} Modal</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition" aria-label="Close dialog">✕</button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">This is a {activeModal} size modal dialog. It can contain any content you need - forms, confirmations, detailed information, etc.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">Cancel</button>
              <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

// Drawers
function DrawerSection() {
  const [drawer, setDrawer] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const openDrawer = (side: "left" | "right") => { setDrawer(side); setIsVisible(true); requestAnimationFrame(() => { requestAnimationFrame(() => { setIsAnimating(true); }); }); };
  const closeDrawer = () => { setIsAnimating(false); setTimeout(() => { setIsVisible(false); setDrawer(null); }, 300); };
  return (
    <Section id="drawers" title="Slide-over Drawers">
      <div className="flex flex-wrap gap-3">
        <button onClick={() => openDrawer("left")} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition">Open Left Drawer</button>
        <button onClick={() => openDrawer("right")} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition">Open Right Drawer</button>
      </div>
      {isVisible && (
        <div className="fixed inset-0 z-50" onClick={closeDrawer}>
          <div className={cn("absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300", isAnimating ? "opacity-100" : "opacity-0")} />
          <div className={cn("absolute top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out", drawer === "left" ? "left-0" : "right-0", drawer === "left" ? (isAnimating ? "translate-x-0" : "-translate-x-full") : (isAnimating ? "translate-x-0" : "translate-x-full"))} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{drawer === "left" ? "Left" : "Right"} Drawer</h3>
              <button onClick={closeDrawer} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition" aria-label="Close drawer">✕</button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">This is a slide-over drawer. Use it for navigation menus, detail panels, or settings.</p>
              <div className="space-y-3">
                {["Profile", "Settings", "Notifications", "Help"].map((item) => (
                  <button key={item} className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition">{item}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

// Toasts
let toastIdCounter = 0;
function ToastSection() {
  const [toasts, setToasts] = useState<Array<{ id: number; type: string; message: string }>>([]);
  const addToast = (type: string, message: string) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => { setToasts((prev) => prev.filter((t) => t.id !== id)); }, 4000);
  };
  const variants = [
    { type: "success", label: "Success", message: "Changes saved successfully!", color: "border-success-500 bg-success-50 text-success-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
    { type: "error", label: "Error", message: "Something went wrong. Please try again.", color: "border-danger-500 bg-danger-50 text-danger-700 dark:bg-rose-900/30 dark:text-rose-300" },
    { type: "warning", label: "Warning", message: "Your session will expire soon.", color: "border-warning-500 bg-warning-50 text-warning-700 dark:bg-amber-900/30 dark:text-amber-300" },
    { type: "info", label: "Info", message: "A new version is available.", color: "border-info-500 bg-info-50 text-info-700 dark:bg-sky-900/30 dark:text-sky-300" },
  ];
  return (
    <Section id="toasts" title="Toast Notifications">
      <div className="flex flex-wrap gap-3 mb-6">
        {variants.map((v) => (
          <button key={v.type} onClick={() => addToast(v.type, v.message)} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition">Show {v.label}</button>
        ))}
      </div>
      {/* Static examples */}
      <SubSection title="Examples">
        <div className="space-y-3">
          {variants.map((v) => (
            <div key={v.type} className={cn("flex items-start gap-3 p-4 rounded-lg border-l-4", v.color)}>
              <div className="flex-1">
                <p className="text-sm font-medium capitalize">{v.type}</p>
                <p className="text-sm opacity-90">{v.message}</p>
              </div>
            </div>
          ))}
        </div>
      </SubSection>
      {/* Live toasts */}
      <div className="fixed inset-0 pointer-events-none flex items-end justify-end p-4 sm:p-6">
        <div className="w-full max-w-sm space-y-2">
          {toasts.map((t) => (
            <div key={t.id} className={cn("pointer-events-auto flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-md", variants.find(v => v.type === t.type)?.color)}>
              <div className="flex-1">
                <p className="text-sm font-medium capitalize">{t.type}</p>
                <p className="text-sm opacity-90">{t.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const sections = [
  { id: "buttons", label: "Buttons" },
  { id: "form-inputs", label: "Form Inputs" },
  { id: "selects", label: "Selects" },
  { id: "tabs", label: "Tabs" },
  { id: "badges", label: "Badges" },
  { id: "cards", label: "Cards" },
  { id: "charts", label: "Charts" },
  { id: "data-table", label: "Data Table" },
  { id: "modals", label: "Modals" },
  { id: "drawers", label: "Drawers" },
  { id: "toasts", label: "Toasts" },
];

const proFeatures = [
  "Tooltips & Popovers",
  "Accordion",
  "Progress & Spinners",
  "Breadcrumbs",
  "Stepper",
  "Avatar Group",
  "Timeline",
  "Pagination",
  "Rich Text Editor",
  "File Upload",
  "Tree View",
  "Color Picker",
];

export default function ComponentsPage() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">UI Components</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Essential components included in the free version.</p>
          </div>
          <Link href="#" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700">
            Upgrade to Pro
          </Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20 dark:hover:text-primary-400 transition">{s.label}</a>
          ))}
        </div>
      </div>

      {/* Pro notice */}
      <div className="mb-8 p-4 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50/60 dark:bg-primary-900/10">
        <p className="text-sm font-semibold text-primary-700 dark:text-primary-300 flex items-center gap-2"><Lock className="w-4 h-4" /> More components available in Pro</p>
        <p className="mt-1 text-xs text-primary-700/80 dark:text-primary-400/80">Unlock the full library with 15+ advanced components:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {proFeatures.map((f) => (
            <span key={f} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-white text-primary-700 dark:bg-primary-950/40 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <ButtonsSection />
        <FormInputsSection />
        <SelectsSection />
        <TabsSection />
        <BadgesSection />
        <CardsSection />
        <ChartsSection />
        <DataTableSection />
        <ModalSection />
        <DrawerSection />
        <ToastSection />
      </div>
    </div>
  );
}
