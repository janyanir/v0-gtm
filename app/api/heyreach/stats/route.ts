import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.HEYREACH_API_KEY;
  const body = await request.json();
  const { campaignIds, accountIds } = body;

  if (!campaignIds || !accountIds) {
    return NextResponse.json(
      { error: "campaignIds and accountIds are required" },
      { status: 400 }
    );
  }

  try {
    // Use the GetOverallStats endpoint
    const response = await fetch("https://api.heyreach.io/api/public/campaign/GetOverallStats", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey || "",
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        AccountIds: accountIds,    // LinkedIn sender account IDs
        CampaignIds: campaignIds,   // Campaign IDs to get stats for
      }),
    });

    if (!response.ok) {
      throw new Error(`HeyReach API error: ${response.status}`);
    }

    const stats = await response.json();
    
    // Transform to your frontend format
    return NextResponse.json({
      sent: stats.totalConnectionRequestsSent || 0,
      accepted: stats.totalConnectionRequestsAccepted || 0,
      replies: stats.totalMessageRepliesReceived || 0,
    });
  } catch (error) {
    console.error("HeyReach stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
