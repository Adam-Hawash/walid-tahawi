import { createHash } from "crypto";

/**
 * مصادقة الأدمن البسيطة (نفس نمط zikola المثبت):
 * - كلمة السر من متغير البيئة ADMIN_PASSWORD (الافتراضي: walid2026#)
 * - الكوكي httpOnly يحتوي هاش مشتق من كلمة السر (مش كلمة السر نفسها)
 * - تغيير ADMIN_PASSWORD يبطل كل الجلسات القديمة تلقائيًا
 */
export const ADMIN_COOKIE = "wt_admin_session";
export const DEFAULT_ADMIN_PASSWORD = "walid2026#";

export function getAdminPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  return p && p.trim().length > 0 ? p.trim() : DEFAULT_ADMIN_PASSWORD;
}

export function makeAdminToken(): string {
  return createHash("sha256")
    .update(`walid-tahawi::${getAdminPassword()}::v1`)
    .digest("hex");
}

export function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

export function isAdminRequest(req: Request): boolean {
  const cookies = parseCookies(req.headers.get("cookie"));
  return cookies[ADMIN_COOKIE] === makeAdminToken();
}
