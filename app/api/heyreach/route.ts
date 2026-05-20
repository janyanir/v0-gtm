export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.HEYREACH_API_KEY) {
    return NextResponse.json({ demo: true });
  }

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const res = await fetch(
      "https://api.heyreach.io/api/public/analytics/GetOverallStats",
      {
        method: "POST",
        headers: {
          "X-API-KEY": process.env.HEYREACH_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountIds: [],
          campaignIds: [],
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ demo: true, error: err });
    }

    const data = await res.json();

    return NextResponse.json({
      demo: false,
      raw: data,
      totals: {
        invitesSent: data?.connectionRequestsSent ?? data?.invitesSent ?? data?.totalInvitesSent ?? 0,
        invitesAccepted: data?.connectionRequestsAccepted ?? data?.invitesAccepted ?? data?.totalConnected ?? 0,
        repliesReceived: data?.replies ?? data?.repliesReceived ?? data?.totalReplies ?? 0,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ demo: true, error: e.message });
  }
}
