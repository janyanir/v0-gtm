import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }
  return res.json();
};

// API Status Hook
export function useApiStatus() {
  const { data, error, isLoading } = useSWR("/api/status", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    status: data,
    isLoading,
    isError: error,
    heyreachConfigured: data?.heyreach?.configured ?? false,
    smartleadConfigured: data?.smartlead?.configured ?? false,
  };
}

// HeyReach Campaigns Hook
export function useHeyReachCampaigns() {
  const { heyreachConfigured } = useApiStatus();
  
  const { data, error, isLoading, mutate } = useSWR(
    heyreachConfigured ? "/api/heyreach/campaigns" : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    campaigns: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

// HeyReach Stats Hook
export function useHeyReachStats(campaignId?: string) {
  const { heyreachConfigured } = useApiStatus();
  
  const url = campaignId
    ? `/api/heyreach/stats?campaignId=${campaignId}`
    : "/api/heyreach/stats";

  const { data, error, isLoading, mutate } = useSWR(
    heyreachConfigured ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    stats: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

// Smartlead Campaigns Hook
export function useSmartleadCampaigns() {
  const { smartleadConfigured } = useApiStatus();
  
  const { data, error, isLoading, mutate } = useSWR(
    smartleadConfigured ? "/api/smartlead/campaigns" : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    campaigns: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

// Smartlead Stats Hook
export function useSmartleadStats(campaignId?: string) {
  const { smartleadConfigured } = useApiStatus();
  
  const { data, error, isLoading, mutate } = useSWR(
    smartleadConfigured && campaignId
      ? `/api/smartlead/stats?campaignId=${campaignId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    stats: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

// Combined Stats Hook - fetches all campaign stats
export function useAllSmartleadStats() {
  const { campaigns } = useSmartleadCampaigns();
  const { smartleadConfigured } = useApiStatus();

  const campaignIds = campaigns?.map((c: { id: string }) => c.id) || [];

  const { data, error, isLoading } = useSWR(
    smartleadConfigured && campaignIds.length > 0
      ? `/api/smartlead/all-stats?ids=${campaignIds.join(",")}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    stats: data,
    isLoading,
    isError: error,
  };
}
