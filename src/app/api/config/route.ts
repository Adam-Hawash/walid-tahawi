import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminRequest } from "@/lib/auth";
import { DEFAULTS } from "@/lib/content";

export const dynamic = "force-dynamic";

/**
 * GET /api/config — عام (من غير دخول)
 * بيرجع خريطة مسطحة: DEFAULTS مدموجة مع صفوف الداتابيز
 * عشان الموقع يشتغل فورًا حتى لو مفيش أي تعديلات محفوظة
 */
export async function GET() {
  try {
    const rows = await db.siteConfig.findMany();
    const map: Record<string, string> = { ...DEFAULTS };
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return NextResponse.json(map);
  } catch (error) {
    console.error("Config fetch error:", error);
    // فشل الداتابيز مش بيكسر الموقع — بنرجع الافتراضيات
    return NextResponse.json({ ...DEFAULTS });
  }
}

/**
 * PUT /api/config — للأدمن بس
 * بياخد خريطة { key: value } ويعمل upsert لكل مفتاح
 */
export async function PUT(req: Request) {
  if (!isAdminRequest(req)) {
    return NextResponse.json(
      { error: "غير مصرح — سجل دخولك الأول" },
      { status: 401 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "بيانات غير صالحة" }, { status: 400 });
  }

  try {
    const keys = Object.keys(body);
    for (const key of keys) {
      // مفاتيح مش من الكونفج (زي error/defaults لو حصلت)
      if (key === "error" || key === "defaults") continue;
      const value = body[key];
      if (typeof value !== "string") continue;
      await db.siteConfig.upsert({
        where: { key },
        update: { value, updatedAt: new Date() },
        create: { key, value },
      });
    }
    return NextResponse.json({ ok: true, message: "تم حفظ الإعدادات" });
  } catch (error) {
    console.error("Config update error:", error);
    return NextResponse.json(
      { error: "حصلت مشكلة في الحفظ — جرب تاني" },
      { status: 500 }
    );
  }
}
