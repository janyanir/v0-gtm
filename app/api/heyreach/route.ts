import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!process.env.HEYREACH_API_KEY) {
    return NextResponse.json({ demo: true });
  }

  try {
    const res = await fetch(
      "https://api.heyreach.io/api/public/campaign/GetAllCampaigns",
      {
        method: "POST",
        headers: {
          "X-API-KEY": process.env.HEYREACH_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!res.ok) return NextResponse.json({ demo: true });

    const data = await res.json();
    const campaigns = data?.items || data?.campaigns || data || [];

    let totalInvitesSent = 0;
    let totalInvitesAccepted = 0;
    let totalReplies = 0;
    const chartData: Record<string, { invitesSent: number; invitesAccepted: number; repliesReceived: number }> = {};

    for (const campaign of campaigns) {
      const statsRes = await fetch(
        `https://api.heyreach.io/api/public/campaign/GetCampaignStats`,
        {
          method: "POST",
          headers: {
            "X-API-KEY": process.env.HEYREACH_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ campaignId: campaign.id }),
        }
      );

      if (statsRes.ok) {
        const stats = await statsRes.json();
        totalInvitesSent += stats?.totalInvitesSent || stats?.invitesSent || 0;
        totalInvitesAccepted += stats?.totalInvitesAccepted || stats?.invitesAccepted || 0;
        totalReplies += stats?.totalReplies || stats?.repliesReceived || 0;
      }
    }

    return NextResponse.json({
      demo: false,
      totals: {
        invitesSent: totalInvitesSent,
        invitesAccepted: totalInvitesAccepted,
        repliesReceived: totalReplies,
      },
      chartData: Object.entries(chartData).map(([date, v]) => ({ date, ...v })),
    });
  } catch {
    return NextResponse.json({ demo: true });
  }
}
