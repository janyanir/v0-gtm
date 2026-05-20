import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    heyreachConnected: !!process.env.HEYREACH_API_KEY,
    smartleadConnected: !!process.env.SMARTLEAD_API_KEY,
  });
}
