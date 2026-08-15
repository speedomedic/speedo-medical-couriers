import { NextRequest, NextResponse } from "next/server";
import { createCoC } from "@/lib/coc";
import type { CoCRecord } from "@/lib/coc";

export async function POST(req: NextRequest) {
  if (!process.env.KV_REST_API_URL) {
    return NextResponse.json({ error: "KV store not configured" }, { status: 503 });
  }
  try {
    const body = await req.json() as Omit<CoCRecord, "createdAt" | "status">;
    if (!body.orderNumber) {
      return NextResponse.json({ error: "orderNumber required" }, { status: 400 });
    }
    await createCoC(body);
    return NextResponse.json({ ok: true, signingUrl: `/coc/${body.orderNumber}` });
  } catch (err) {
    console.error("[COC CREATE ERROR]", err);
    return NextResponse.json({ error: "Failed to create record" }, { status: 500 });
  }
}
