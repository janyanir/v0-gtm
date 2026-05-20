"use client";
import useSWR from "swr";

export type ConnectionStatus = "idle" | "testing" | "connected" | "failed";

export interface ConnectionState {
  heyReach: {
    apiKey: string;
    status: ConnectionStatus;
  };
  smartlead: {
    apiKey: string;
    status: ConnectionStatus;
  };
  googleSheets: {
    sheetUrl: string;
    status: ConnectionStatus;
  };
}

const STORAGE_KEY = "gtm-dashboard-connections";

const defaultState: ConnectionState = {
  heyReach: { apiKey: "", status: "idle" },
  smartlead: { apiKey: "", status: "idle" },
  googleSheets: { sheetUrl: "", status: "idle" },
};

function getStoredState(): ConnectionState {
  if (typeof window === "undefined") return defaultState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultState, ...parsed };
    }
  } catch {}
  return defaultState;
}

function saveState(state: ConnectionState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

// Check if Vercel env vars are configured (via API route)
async function checkServerConnection(): Promise<ConnectionState> {
  try {
    const res = await fetch("/api/check-connection");
    const data = await res.json();

    // If server has keys configured, override localStorage with connected status
    if (data.heyreachConnected || data.smartleadConnected) {
      const stored = getStoredState();
      return {
        ...stored,
        heyReach: {
          apiKey: data.heyreachConnected ? "configured-in-vercel" : stored.heyReach.apiKey,
          status: data.heyreachConnected ? "connected" : stored.heyReach.status,
        },
        smartlead: {
          apiKey: data.smartleadConnected ? "configured-in-vercel" : stored.smartlead.apiKey,
          status: data.smartleadConnected ? "connected" : stored.smartlead.status,
        },
      };
    }
  } catch {}
  return getStoredState();
}

export function useConnectionState() {
  const { data, mutate } = useSWR<ConnectionState>(
    "connection-state",
    () => checkServerConnection(),
    {
      fallbackData: defaultState,
      revalidateOnFocus: false,
    }
  );

  const state = data || defaultState;

  const updateHeyReach = (apiKey: string, status: ConnectionStatus) => {
    const newState = { ...state, heyReach: { apiKey, status } };
    saveState(newState);
    mutate(newState, false);
  };

  const updateSmartlead = (apiKey: string, status: ConnectionStatus) => {
    const newState = { ...state, smartlead: { apiKey, status } };
    saveState(newState);
    mutate(newState, false);
  };

  const updateGoogleSheets = (sheetUrl: string, status: ConnectionStatus) => {
    const newState = { ...state, googleSheets: { sheetUrl, status } };
    saveState(newState);
    mutate(newState, false);
  };

  const isFullyConnected =
    state.heyReach.status === "connected" &&
    state.smartlead.status === "connected";

  const hasAnyConnection =
    state.heyReach.status === "connected" ||
    state.smartlead.status === "connected";

  return {
    state,
    updateHeyReach,
    updateSmartlead,
    updateGoogleSheets,
    isFullyConnected,
    hasAnyConnection,
  };
}
