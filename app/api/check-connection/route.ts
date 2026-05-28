export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  const heyreachKey = process.env.HEYREACH_MCP_KEY ?? "";
  const smartleadKey = process.env.SMARTLEAD_API_KEY ?? "";

  return NextResponse.json({
    heyreachConnected: heyreachKey.length > 0,
    smartleadConnected: smartleadKey.length > 0,
    debug: {
      heyreachLength: heyreachKey.length,
      smartleadLength: smartleadKey.length,
    },
  });
}
