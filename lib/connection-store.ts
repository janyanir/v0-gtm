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

// Get initial state from localStorage
function getStoredState(): ConnectionState {
  if (typeof window === "undefined") return defaultState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...defaultState,
        ...parsed,
      };
    }
  } catch {
    // Ignore errors
  }
  return defaultState;
}

// Save state to localStorage
function saveState(state: ConnectionState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore errors
  }
}

// Custom hook for connection state
export function useConnectionState() {
  const { data, mutate } = useSWR<ConnectionState>(
    "connection-state",
    () => getStoredState(),
    {
      fallbackData: defaultState,
      revalidateOnFocus: false,
    }
  );

  const state = data || defaultState;

  const updateHeyReach = (apiKey: string, status: ConnectionStatus) => {
    const newState = {
      ...state,
      heyReach: { apiKey, status },
    };
    saveState(newState);
    mutate(newState, false);
  };

  const updateSmartlead = (apiKey: string, status: ConnectionStatus) => {
    const newState = {
      ...state,
      smartlead: { apiKey, status },
    };
    saveState(newState);
    mutate(newState, false);
  };

  const updateGoogleSheets = (sheetUrl: string, status: ConnectionStatus) => {
    const newState = {
      ...state,
      googleSheets: { sheetUrl, status },
    };
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
