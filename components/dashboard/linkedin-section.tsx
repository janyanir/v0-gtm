// Find the data fetching function (likely useEffect or a custom hook)
// Change from GET to POST:

// BEFORE (what you probably have):
const fetchCampaigns = async () => {
  const response = await fetch('/api/heyreach/campaigns');
  const data = await response.json();
  // ...
}

// AFTER (what it should be):
const fetchCampaigns = async () => {
  const response = await fetch('/api/heyreach/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  // ...
}

// For stats:
const fetchStats = async (campaignId: string, accountIds: string[]) => {
  const response = await fetch('/api/heyreach/stats', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      campaignIds: [campaignId],
      accountIds: accountIds,
    }),
  });
  const stats = await response.json();
  // ...
}
