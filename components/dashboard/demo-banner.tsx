"use client";

import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 px-4 py-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <span className="text-sm text-yellow-200">
          <strong>Demo mode</strong> — add API keys in{" "}
          <Link href="/settings" className="underline hover:text-yellow-100">
            Settings
          </Link>{" "}
          to go live
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="rounded p-1 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-200"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </button>
    </div>
  );
}
