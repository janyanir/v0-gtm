import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.HEYREACH_API_KEY;
  const body = await request.json();
  const { campaignId } = body;

  if (!campaignId) {
    return NextResponse.json({ error: "campaignId required" }, { status: 400 });
  }

  try {
    // Get campaign details first to access conversations
    const campaignResponse = await fetch(
      `https://api.heyreach.io/api/public/campaign/GetById?campaignId=${campaignId}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey || "",
          "Accept": "application/json",
        },
      }
    );

    if (!campaignResponse.ok) {
      throw new Error(`HeyReach API error: ${campaignResponse.status}`);
    }

    const campaign = await campaignResponse.json();
    
    // Extract replies from campaign conversations
    const replies = campaign.conversations
      ?.filter((conv: any) => conv.hasReply)
      ?.map((conv: any) => ({
        id: conv.id,
        leadName: conv.leadName,
        leadEmail: conv.leadEmail,
        company: conv.company,
        campaignId: campaignId,
        campaignName: campaign.name,
        replyDate: conv.lastMessageDate,
        messagePreview: conv.lastMessage?.substring(0, 100),
        fullMessage: conv.lastMessage,
      })) || [];

    return NextResponse.json(replies);
  } catch (error) {
    console.error("HeyReach replies error:", error);
    return NextResponse.json({ error: "Failed to fetch replies" }, { status: 500 });
  }
}
