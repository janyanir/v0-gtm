"use client";

import { AlertTriangle, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useConnectionState } from "@/lib/connection-store";

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { isFullyConnected, hasAnyConnection, state } = useConnectionState();

  if (dismissed) return null;

  // Show success banner if fully connected
  if (isFullyConnected) {
    return (
      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="text-sm text-emerald-800">
            <strong>Connected</strong> — HeyReach and Smartlead integrations configured. In production, data will sync from your accounts.
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
    
    if (state.heyReach.status === "connected") {
      connected.push("HeyReach");
    } else {
      missing.push("HeyReach");
    }
    
    if (state.smartlead.status === "connected") {
      connected.push("Smartlead");
    } else {
      missing.push("Smartlead");
    }

    return (
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 px-4 py-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-blue-800">
            <strong>{connected.join(", ")}</strong> connected —{" "}
            <Link href="/settings" className="underline hover:text-blue-900">
              connect {missing.join(", ")}
            </Link>{" "}
            to see all data
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

  // Show demo mode banner
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
