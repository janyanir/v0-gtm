"use client";

import { AlertTriangle, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useApiStatus } from "@/lib/api-hooks";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { heyreachConfigured, smartleadConfigured, isLoading } = useApiStatus();

  if (dismissed || isLoading) return null;

  const isFullyConnected = heyreachConfigured && smartleadConfigured;
  const hasAnyConnection = heyreachConfigured || smartleadConfigured;

  // Show success banner if fully connected
  if (isFullyConnected) {
    return (
      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="text-sm text-emerald-800">
            <strong>Connected</strong> — HeyReach and Smartlead API keys configured. Live data is being fetched.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="rounded p-1 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-800"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
    );
  }

  // Show partial connection status
  if (hasAnyConnection) {
    const connected = [];
    const missing = [];
    
    if (heyreachConfigured) {
      connected.push("HeyReach");
    } else {
      missing.push("HeyReach");
    }
    
    if (smartleadConfigured) {
      connected.push("Smartlead");
    } else {
      missing.push("Smartlead");
    }

    return (
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 px-4 py-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-blue-800">
            <strong>{connected.join(", ")}</strong> connected — Add{" "}
            {missing.join(", ")} API key in environment variables to see all data
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="rounded p-1 text-blue-600 hover:bg-blue-100 hover:text-blue-800"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
    );
  }

  // Show demo mode banner when no API keys configured
  return (
    <div className="flex items-center justify-between bg-amber-50 border border-amber-200 px-4 py-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <span className="text-sm text-amber-800">
          <strong>Demo mode</strong> — Add HEYREACH_API_KEY and SMARTLEAD_API_KEY to environment variables to see live data
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
