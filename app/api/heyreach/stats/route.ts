import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.HEYREACH_API_KEY;
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get("campaignId");

  if (!apiKey) {
    return NextResponse.json(
      { error: "HEYREACH_API_KEY not configured" },
      { status: 401 }
    );
  }

  try {
    const url = campaignId
      ? `https://api.heyreach.io/api/public/campaign/GetCampaignStats?campaignId=${campaignId}`
      : "https://api.heyreach.io/api/public/campaign/GetCampaignStats";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HeyReach API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("HeyReach stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch HeyReach stats" },
      { status: 500 }
    );
  }
}
