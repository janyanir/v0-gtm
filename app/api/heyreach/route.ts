export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.HEYREACH_API_KEY) {
    return NextResponse.json({ demo: true, reason: "no key" });
  }

  const key = process.env.HEYREACH_API_KEY;

  try {
    // Step 1: verify key works
    const authRes = await fetch(
      "https://api.heyreach.io/api/public/auth/CheckApiKey",
      {
        method: "GET",
        headers: { "X-API-KEY": key },
      }
    );

    if (!authRes.ok) {
      return NextResponse.json({ 
        demo: true, 
        reason: "invalid key",
        status: authRes.status
      });
    }

    // Step 2: get all campaigns
    const campRes = await fetch(
      "https://api.heyreach.io/api/public/campaign/GetAllCampaigns",
      {
        method: "POST",
        headers: { 
          "X-API-KEY": key,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ offset: 0, limit: 100 }),
      }
    );

    const campText = await campRes.text();
    
    if (!campRes.ok) {
      return NextResponse.json({ 
        demo: true, 
        reason: "campaigns failed",
        status: campRes.status,
        body: campText
      });
    }

    const campData = JSON.parse(campText);
    const campaigns = campData?.items || campData?.campaigns || campData || [];

    // Step 3: get overall stats
    const endDate = new Date().toISOString();
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const statsRes = await fetch(
      "https://api.heyreach.io/api/public/analytics/GetOverallStats",
      {
        method: "POST",
        headers: { 
          "X-API-KEY": key,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          accountIds: null,
          campaignIds: null,
          startDate,
          endDate,
        }),
      }
    );

    const statsText = await statsRes.text();

    return NextResponse.json({
      demo: false,
      campaignCount: Array.isArray(campaigns) ? campaigns.length : 0,
      campaignSample: Array.isArray(campaigns) ?
