export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.HEYREACH_API_KEY) {
    return NextResponse.json({ demo: true, reason: "no key" });
  }

  try {
    // First test if key is valid
    const authRes = await fetch(
      "https://api.heyreach.io/api/public/auth/CheckApiKey",
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.HEYREACH_API_KEY,
        },
      }
    );

    if (!authRes.ok) {
      return NextResponse.json({ 
        demo: true, 
        reason: "auth failed",
        status: authRes.status,
        key_prefix: process.env.HEYREACH_API_KEY.substring(0, 8)
      });
    }

    // Get all campaigns
    const campRes = await fetch(
      "https://api.heyreach.io/api/public/campaign/GetAllCampaigns",
      {
        method: "POST",
        headers: {
          "X-API-KEY": process.env.HEYREACH_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offset: 0, limit: 50 }),
      }
    );

    const campData = await campRes.json();

    return NextResponse.json({
      demo: false,
      authStatus: authRes.status,
      campaignStatus: campRes.status,
      campaigns: campData,
    });

  } catch (e: any) {
    return NextResponse.json({ demo: true, error: e.message });
  }
}
