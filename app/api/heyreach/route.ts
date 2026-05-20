export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.HEYREACH_API_KEY) {
    return NextResponse.json({ demo: true, reason: "no key" });
  }

  const key = process.env.HEYREACH_API_KEY;

  try {
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
        status: authRes.status,
      });
    }

    const campRes = await fetch(
      "https://api.heyreach.io/api/public/campaign/GetAllCampaigns",
      {
