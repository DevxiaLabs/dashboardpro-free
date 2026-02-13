import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ColorThemeProvider } from "@/contexts/ColorThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DashBoard Pro",
  description:
    "A premium, modern dashboard template built with Next.js, Tailwind CSS, and TypeScript",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <ColorThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
