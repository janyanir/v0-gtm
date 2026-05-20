import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.SMARTLEAD_API_KEY;
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get("campaignId");

  if (!apiKey) {
    return NextResponse.json(
      { error: "SMARTLEAD_API_KEY not configured" },
      { status: 401 }
    );
  }

  if (!campaignId) {
    return NextResponse.json(
      { error: "campaignId is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://server.smartlead.ai/api/v1/campaigns/${campaignId}/statistics?api_key=${apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Smartlead API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Smartlead stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Smartlead stats" },
      { status: 500 }
    );
  }
}
