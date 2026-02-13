/**
 * Subtle animated background pattern for public-facing screens
 * (auth pages, error pages). Adds a dot grid + floating gradient orbs.
 */
export function PublicBackground() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-400/[0.06] dark:bg-primary-500/[0.04] rounded-full blur-3xl animate-float-slow" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-primary-300/[0.05] dark:bg-primary-400/[0.03] rounded-full blur-3xl animate-float-medium" />
    </>
  );
}
