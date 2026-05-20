import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.HEYREACH_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "HEYREACH_API_KEY not configured" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      "https://api.heyreach.io/api/public/campaign/GetAllCampaigns",
      {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `HeyReach API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("HeyReach campaigns error:", error);
    return NextResponse.json(
      { error: "Failed to fetch HeyReach campaigns" },
      { status: 500 }
    );
  }
}
