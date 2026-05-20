export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.HEYREACH_API_KEY) {
    return NextResponse.json({ demo: true, reason: "no key" });
  }

  const key = process.env.HEYREACH_API_KEY;
  const BASE = "https://api.heyreach.io/api/public";
  try {
    const authRes = await fetch(BASE + "/auth/CheckApiKey", {
      method: "GET",
      headers: { "X-API-KEY": key },
    });

    if (!authRes.ok) {
      return NextResponse.json({
        demo: true,
        reason: "invalid key",
        status: authRes.status,
      });
    }

    const campRes = await fetch(BASE + "/campaign/GetAllCampaigns", {
      method: "POST",
      headers: {
        "X-API-KEY": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ offset: 0, limit: 100 }),
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
    const campaignCount = Array.isArray(campaigns) ? campaigns.length : 0;
    const campaignSample = Array.isArray(campaigns) ? campaigns[0] : null;

    const endDate = new Date().toISOString();
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const statsRes = await fetch(BASE + "/analytics/GetOverallStats", {
      method: "POST",
      headers: {
        "X-API-KEY": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountIds: null,
        campaignIds: null,
        startDate,
        endDate,
      }),
    });

    const statsText = await statsRes.text();

    return NextResponse.json({
      demo: false,
      campaignCount,
      campaignSample,
      statsStatus: statsRes.status,
      statsRaw: statsText,
    });

  } catch (e: any) {
    return NextResponse.json({ demo: true, error: e.message });
  }
}
