"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6 text-center font-sans">
        <div className="max-w-md bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-4">
          <h2 className="text-2xl font-black text-white">System Error</h2>
          <p className="text-sm text-slate-400 font-medium">
            A critical error occurred. Click below to reload the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#fe9b19] text-slate-950 font-extrabold rounded-full hover:bg-amber-500 transition-all"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
