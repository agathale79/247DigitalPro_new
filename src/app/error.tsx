"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-2xl font-heading font-bold text-ink mb-4">
        Something went wrong
      </h2>
      <p className="text-slate mb-6 max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button type="button" variant="primary" size="md" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
