"use client";

import { PublicBackground } from "@/components/shared/PublicBackground";

export default function Forbidden403() {
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
              d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25z M9.75 12h4.5"
            />
          </svg>
        </div>

        <h1 className="text-7xl font-bold text-gray-900 dark:text-gray-100">403</h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          You don&apos;t have permission to access this page
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Your account may not have the required permissions to view this
          content. If you believe this is a mistake, contact your administrator.
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
