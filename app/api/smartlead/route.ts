import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.SMARTLEAD_API_KEY) {
    return NextResponse.json({ demo: true });
  }

  try {
    const res = await fetch(
      `https://server.smartlead.ai/api/v1/campaigns?api_key=${process.env.SMARTLEAD_API_KEY}&limit=100&offset=0`
    );

    if (!res.ok) return NextResponse.json({ demo: true });

    const campaigns = await res.json();
    const list = Array.isArray(campaigns) ? campaigns : campaigns?.data || [];

    let totalEmailsSent = 0;
    let totalReplies = 0;

    for (const campaign of list) {
      const statsRes = await fetch(
        `https://server.smartlead.ai/api/v1/campaigns/${campaign.id}/analytics?api_key=${process.env.SMARTLEAD_API_KEY}`
      );

      if (statsRes.ok) {
        const stats = await statsRes.json();
        totalEmailsSent += Number(stats?.sent_count || stats?.emailsSent || 0);
        totalReplies += Number(stats?.reply_count || stats?.repliesReceived || 0);
      }
    }

    return NextResponse.json({
      demo: false,
      totals: {
        emailsSent: totalEmailsSent,
        repliesReceived: totalReplies,
      },
    });
  } catch {
    return NextResponse.json({ demo: true });
  }
}
