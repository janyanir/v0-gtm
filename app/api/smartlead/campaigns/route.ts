import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.SMARTLEAD_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "SMARTLEAD_API_KEY not configured" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `https://server.smartlead.ai/api/v1/campaigns?api_key=${apiKey}`,
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
    console.error("Smartlead campaigns error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Smartlead campaigns" },
      { status: 500 }
    );
  }
}
