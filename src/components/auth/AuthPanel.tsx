"use client";

/**
 * Animated right panel for auth pages with floating grid pattern
 * and subtle moving gradient orbs. Wraps any content.
 */
export function AuthPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 items-center justify-center p-12 relative overflow-hidden">
      {/* Animated dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 -right-16 w-56 h-56 bg-white/[0.08] rounded-full blur-3xl animate-float-medium" />
      <div className="absolute top-2/3 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float-fast" />

      {/* Diagonal lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="auth-lines"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <line x1="0" y1="0" x2="0" y2="60" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-lines)" />
      </svg>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
