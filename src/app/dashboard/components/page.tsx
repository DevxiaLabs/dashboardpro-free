"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Lock } from "lucide-react";
import React from "react";

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

const sections = [
  { id: "buttons", label: "Buttons" },
  { id: "form-inputs", label: "Form Inputs" },
  { id: "selects", label: "Selects" },
  { id: "tabs", label: "Tabs" },
  { id: "badges", label: "Badges" },
  { id: "cards", label: "Cards" },
];

const proFeatures = [
  "Date Picker",
  "Data Table",
  "Modals",
  "Drawers",
  "Toasts",
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
      </div>
    </div>
  );
}
