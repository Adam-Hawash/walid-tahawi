import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** GET /api/admin/me — هل الجلسة الحالية أدمن؟ */
export async function GET(req: Request) {
  return NextResponse.json({ authed: isAdminRequest(req) });
}
