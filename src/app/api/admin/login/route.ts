import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminPassword, makeAdminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** POST /api/admin/login — تسجيل دخول الأدمن بكلمة السر */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "بيانات غير صالحة" }, { status: 400 });
  }
  const password =
    typeof (body as Record<string, unknown>)?.password === "string"
      ? ((body as Record<string, unknown>).password as string)
      : "";

  if (!password || password !== getAdminPassword()) {
    return NextResponse.json({ error: "كلمة السر غير صحيحة" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // أسبوع
    path: "/",
  });
  return res;
}
