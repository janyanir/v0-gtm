import { NextResponse } from "next/server";

export async function GET() {
  const heyreachKey = process.env.HEYREACH_API_KEY;
  const smartleadKey = process.env.SMARTLEAD_API_KEY;

  return NextResponse.json({
    heyreach: {
      configured: !!heyreachKey,
    },
    smartlead: {
      configured: !!smartleadKey,
    },
  });
}
