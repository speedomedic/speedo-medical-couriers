import { NextRequest, NextResponse } from "next/server";
import { getCoC } from "@/lib/coc";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  try {
    const record = await getCoC(token);
    if (!record) return NextResponse.json({ error: "Record not found" }, { status: 404 });
    // Strip signature data URLs from GET response to keep payload small
    const safe = {
      ...record,
      pickup:   record.pickup   ? { ...record.pickup,   signature: "[present]" } : undefined,
      delivery: record.delivery ? { ...record.delivery, signature: "[present]" } : undefined,
    };
    return NextResponse.json(safe);
  } catch (err) {
    console.error("[COC GET ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch record" }, { status: 500 });
  }
}
