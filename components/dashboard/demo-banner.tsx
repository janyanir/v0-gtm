"use client";

import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center justify-between bg-amber-50 border border-amber-200 px-4 py-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <span className="text-sm text-amber-800">
          <strong>Demo mode</strong> — add API keys in{" "}
          <Link href="/settings" className="underline hover:text-amber-900">
            Settings
          </Link>{" "}
          to go live
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="rounded p-1 text-amber-600 hover:bg-amber-100 hover:text-amber-800"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </button>
    </div>
  );
}
