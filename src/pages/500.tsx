import { PublicBackground } from "@/components/shared/PublicBackground";

export default function ServerError500() {
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
              d="M12 9v3.75m0 3.75h.007v.008H12V16.5zM4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
            />
          </svg>
        </div>

        <h1 className="text-7xl font-bold text-gray-900 dark:text-gray-100">500</h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Something went wrong on our end
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          An unexpected error occurred. Please try again. If the problem
          persists, our team will investigate it shortly.
        </p>
        <button
          onClick={() => window.location.reload()}
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
              d="M4.5 12a7.5 7.5 0 0112.651-5.303M19.5 12a7.5 7.5 0 01-12.651 5.303M19.5 4.5v6h-6"
            />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );
}
