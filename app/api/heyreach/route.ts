export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.HEYREACH_API_KEY) {
    return NextResponse.json({ demo: true, reason: "no key" });
  }

  try {
    // Step 1: Check if API key is valid
    const authRes = await fetch(
      "https://api.heyreach.io/api/public/auth/CheckApiKey",
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.HEYREACH_API_KEY,
        },
      }
    );

    return NextResponse.json({
      authStatus: authRes.status,
      authOk: authRes.ok,
      authBody: await authRes.text(),
      keyPrefix: process.env.HEYREACH_API_KEY.substring(0, 8),
    });

  } catch (e: any) {
    return NextResponse.json({ demo: true, error: e.message });
  }
}
