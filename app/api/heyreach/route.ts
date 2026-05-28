export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.HEYREACH_API_KEY) {
    return NextResponse.json({ demo: true, reason: "no key" });
  }

  const key = process.env.HEYREACH_API_KEY;
  const BASE = "https://api.heyreach.io/api/public";

  try {
    const campRes = await fetch(BASE + "/campaign/GetAllCampaigns", {
      method: "GET",
      headers: { "X-API-KEY": key },
    });

    const campText = await campRes.text();

    if (!campRes.ok) {
      return NextResponse.json({
        demo: true,
        reason: "campaigns failed",
        status: campRes.status,
        body: campText,
      });
    }

    const campData = JSON.parse(campText);
    const campaigns = campData?.items || campData?.campaigns || campData || [];

    return NextResponse.json({
      demo: false,
      campaignCount: Array.isArray(campaigns) ? campaigns.length : 0,
      campaigns: campaigns,
    });

  } catch (e: any) {
    return NextResponse.json({ demo: true, error: e.message });
  }
}
