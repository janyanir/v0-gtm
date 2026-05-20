import { NextResponse } from "next/server";

export async function POST() {
  const apiKey = process.env.HEYREACH_API_KEY;

  try {
    const response = await fetch("https://api.heyreach.io/api/public/campaign/GetAll", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey || "",
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        offset: 0,
        limit: 100  // Get up to 100 campaigns per request
      }),
    });

    if (!response.ok) {
      throw new Error(`HeyReach API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("HeyReach campaigns error:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}
