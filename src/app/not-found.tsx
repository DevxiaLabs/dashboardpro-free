"use client";

import { PublicBackground } from "@/components/shared/PublicBackground";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      <PublicBackground />
      <div className="text-center max-w-md relative z-10">
        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="mx-auto h-48 w-48 text-primary-200 dark:text-primary-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={0.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-7xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Page not found
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved. Please check the URL or navigate back home.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 btn-primary px-6 py-2.5"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Go Home
        </a>
      </div>
    </div>
  );
}
