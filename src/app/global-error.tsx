"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Something went wrong</h1>
            <p style={{ marginTop: "1rem", color: "#666" }}>An unexpected error occurred.</p>
            <button
              onClick={reset}
              style={{ marginTop: "1.5rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", backgroundColor: "var(--color-primary-600)", color: "white", border: "none", cursor: "pointer" }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
