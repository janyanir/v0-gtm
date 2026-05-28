export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.HEYREACH_MCP_KEY) {
    return NextResponse.json({ demo: true, reason: "no key" });
  }

  const mcpUrl = "https://mcp.heyreach.io/mcp?xMcpKey=" + process.env.HEYREACH_MCP_KEY;

  try {
    const res = await fetch(mcpUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: "get_all_campaigns",
          arguments: {}
        }
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json({ demo: true, status: res.status, body: text });
    }

    const data = JSON.parse(text);

    return NextResponse.json({
      demo: false,
      raw: data,
    });

  } catch (e: any) {
    return NextResponse.json({ demo: true, error: e.message });
  }
}
