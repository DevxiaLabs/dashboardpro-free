"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { PublicBackground } from "@/components/shared/PublicBackground";
import {
  BarChart3,
  Users,
  Shield,
  Zap,
  Moon,
  Palette,
  ArrowRight,
  Check,
  Star,
  Github,
  ChevronRight,
  LayoutDashboard,
  Package,
  Code,
} from "lucide-react";

const features = [
  { icon: <BarChart3 className="h-6 w-6" />, title: "Analytics Dashboard", desc: "Beautiful charts and KPIs with Recharts integration" },
  { icon: <Package className="h-6 w-6" />, title: "25+ Pages", desc: "Dashboard, analytics, chat, files, invoices, kanban, and more" },
  { icon: <LayoutDashboard className="h-6 w-6" />, title: "30+ Components", desc: "Buttons, forms, tables, modals, charts, file upload, and more" },
  { icon: <Moon className="h-6 w-6" />, title: "Dark Mode", desc: "System-aware dark mode with smooth transitions" },
  { icon: <Palette className="h-6 w-6" />, title: "5 Color Themes", desc: "Ocean, Sunset, Forest, Lavender, and Slate with auto dark variants" },
  { icon: <Shield className="h-6 w-6" />, title: "Auth Ready", desc: "Login, register, forgot password, and protected routes" },
  { icon: <Zap className="h-6 w-6" />, title: "Next.js 14", desc: "App Router, Server Components, optimized builds" },
  { icon: <Code className="h-6 w-6" />, title: "TypeScript", desc: "Fully typed with strict mode enabled" },
];

const stats = [
  { value: "25+", label: "Pages" },
  { value: "30+", label: "Components" },
  { value: "5", label: "Color Themes" },
  { value: "100%", label: "TypeScript" },
];

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      <PublicBackground />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-xl font-bold text-primary-600">DashBoard Pro</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium rounded-lg btn-primary"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 text-sm font-medium mb-6">
            <Star className="h-3.5 w-3.5 fill-current" /> New: 8 chart types & file manager
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            The Premium Dashboard
            <br />
            <span className="text-primary-600">Template You Need</span>
          </h2>
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A production-ready admin dashboard built with Next.js 14, Tailwind CSS, and TypeScript.
            25+ pages, 30+ components, 5 color themes, dark mode, and everything you need to ship fast.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-base font-semibold"
            >
              Live Demo <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="https://github.com/DevxiaLabs/dashboardpro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Github className="h-5 w-5" /> View on GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl mx-auto">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Everything You Need</h3>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              Built for developers who want to ship beautiful dashboards without starting from scratch.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Build?</h3>
              <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                Get started with DashBoard Pro and ship your next project faster than ever.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Free <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} DashBoard Pro. Built by DevxiaLabs.</p>
            <div className="flex items-center gap-6">
              <Link href="/login" className="hover:text-primary-600 transition-colors">Demo</Link>
              <a href="https://github.com/DevxiaLabs/dashboardpro" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
