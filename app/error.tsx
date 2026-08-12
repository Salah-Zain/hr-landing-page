"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
      <div className="max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Something went wrong!</h2>
        <p className="text-sm text-slate-600 font-medium">
          An unexpected error occurred while loading this page. Please try refreshing or return home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button onClick={() => reset()} className="px-6 rounded-full font-bold">
            Try Again
          </Button>
          <Link href="/" className="inline-block">
            <Button variant="outline" className="px-6 rounded-full font-bold">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
