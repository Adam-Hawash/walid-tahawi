"use client";

/**
 * /admin — لوحة تحكم محتوى المنصة
 * - الدخول بكلمة سر (ADMIN_PASSWORD — الافتراضي walid2026#)
 * - بعد الدخول: محرر لكل نصوص الموقع مقسّم لأقسام
 * - كل نص ليه خانتين: «عربي» و «English» — الطالب يشوف اللي مختاره
 *   حسب لغة الموقع (المفاتيح بتتخزن مفتاح_ar ومفتاح_en)
 * - الحفظ بيتعمل في قاعدة البيانات (Prisma + SQLite) عن طريق /api/config
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  GraduationCap,
  Loader2,
  Lock,
  LogOut,
  Save,
} from "lucide-react";

type Field = {
  key: string;
  label: string;
  type: "bi" | "plain";
  hint?: string;
};

type Section = { id: string; title: string; fields: Field[] };

const biF = (key: string, label: string, hint?: string): Field => ({
  key,
  label,
  type: "bi",
  hint,
});
const plainF = (key: string, label: string, hint?: string): Field => ({
  key,
  label,
  type: "plain",
  hint,
});

const HOURS_HINT = "سيب كلمة {hours} مكانها وهي بتتبدل بمواعيد العمل";
const COURSE_NAMES = [
  "رياضيات",
  "فيزياء",
  "كيمياء",
  "علوم",
  "لغة عربية",
  "لغة إنجليزية",
];
const GRADE_NAMES = [
  "رابعة ابتدائي",
  "خمسة ابتدائي",
  "الأول الإعدادي",
  "الثاني الإعدادي",
  "الثالث الإعدادي",
  "الأول الثانوي",
  "الثاني الثانوي",
  "الثالث الثانوي",
];
const FEATURE_NAMES = ["شرح مبسّط", "متابعة فردية", "امتحانات دورية", "تقارير لأولياء الأمور"];
const STAT_NAMES = ["عدد الطلاب", "سنين الخبرة", "نسبة النجاح"];

const SECTIONS: Section[] = [
  {
    id: "navbar",
    title: "النافيبار",
    fields: [
      biF("navbar_brand_prefix", "اسم المنصة — الجزء الأول"),
      biF("navbar_brand_highlight", "اسم المنصة — الجزء الملون"),
      biF("navbar_link_1", "لينك: الرئيسية"),
      biF("navbar_link_2", "لينك: الكورسات"),
      biF("navbar_link_3", "لينك: الصفوف الدراسية"),
      biF("navbar_link_4", "لينك: عن المستر"),
      biF("navbar_link_5", "لينك: تواصل معنا"),
      biF("navbar_cta", "زرار «ابدأ الآن»"),
    ],
  },
  {
    id: "hero",
    title: "الهيرو (أول الشاشة)",
    fields: [
      biF("hero_badge", "الشريط الصغير فوق العنوان"),
      biF("hero_title", "العنوان الرئيسي"),
      biF("hero_title_highlight", "الجزء الملون من العنوان"),
      biF("hero_paragraph", "الفقرة التعريفية"),
      biF("hero_btn_primary", "الزرار الأول (استكشف الكورسات)"),
      biF("hero_btn_secondary", "الزرار الثاني (تواصل واتساب)"),
      biF("hero_highlight_1", "الميزة السريعة ١"),
      biF("hero_highlight_2", "الميزة السريعة ٢"),
      biF("hero_highlight_3", "الميزة السريعة ٣"),
      biF("hero_float1_title", "الكارت العائم الأول — العنوان"),
      biF("hero_float1_sub", "الكارت العائم الأول — الوصف"),
      biF("hero_float2_title", "الكارت العائم الثاني — العنوان"),
      biF("hero_float2_sub", "الكارت العائم الثاني — الوصف"),
    ],
  },
  {
    id: "courses",
    title: "الكورسات",
    fields: [
      biF("courses_badge", "الشريط الصغير فوق العنوان"),
      biF("courses_title", "عنوان القسم"),
      biF("courses_subtitle", "وصف القسم"),
      biF("courses_price_currency", "عملة السعر"),
      biF("courses_subscribe", "زرار الاشتراك"),
      ...COURSE_NAMES.flatMap((name, i): Field[] => [
        biF(`course${i + 1}_title`, `كورس ${name} — الاسم`),
        biF(`course${i + 1}_desc`, `كورس ${name} — الوصف`),
        plainF(`course${i + 1}_price`, `كورس ${name} — السعر (رقم)`),
        plainF(`course${i + 1}_img`, `كورس ${name} — رابط الصورة`),
      ]),
    ],
  },
  {
    id: "grades",
    title: "الصفوف الدراسية",
    fields: [
      biF("grades_badge", "الشريط الصغير فوق العنوان"),
      biF("grades_title", "عنوان القسم"),
      biF("grades_subtitle", "وصف القسم"),
      biF("grades_explore", "الكلام اللي تحت اسم كل صف"),
      ...GRADE_NAMES.map((name, i) =>
        biF(`grade${i + 1}_name`, `صف: ${name}`)
      ),
    ],
  },
  {
    id: "video",
    title: "الفيديو التعريفي",
    fields: [
      biF("video_badge", "الشريط الصغير فوق العنوان"),
      biF("video_title", "عنوان القسم"),
      biF("video_subtitle", "وصف القسم"),
      plainF(
        "video_id",
        "معرف فيديو اليوتيوب (ID)",
        "الجزء اللي بعد watch?v= في اللينك — سيبه فاضي يظهر كارت «الفيديو قريبًا»"
      ),
      biF("video_placeholder_title", "نص «قريبًا» — العنوان"),
      biF("video_placeholder_desc", "نص «قريبًا» — الوصف"),
    ],
  },
  {
    id: "about",
    title: "عن المستر",
    fields: [
      biF("about_badge", "الشريط الصغير فوق العنوان"),
      biF("about_title", "العنوان الرئيسي"),
      biF("about_title_highlight", "الجزء الملون من العنوان"),
      biF("about_p1", "الفقرة الأولى"),
      biF("about_p2", "الفقرة الثانية"),
      ...FEATURE_NAMES.flatMap((name, i): Field[] => [
        biF(`about_f${i + 1}_title`, `ميزة ${name} — العنوان`),
        biF(`about_f${i + 1}_desc`, `ميزة ${name} — الوصف`),
      ]),
      ...STAT_NAMES.flatMap((name, i): Field[] => [
        plainF(`about_stat${i + 1}_value`, `إحصائية ${name} — الرقم`),
        plainF(`about_stat${i + 1}_suffix`, `إحصائية ${name} — الرمز (+ / %)`),
        biF(`about_stat${i + 1}_label`, `إحصائية ${name} — الوصف`),
      ]),
    ],
  },
  {
    id: "contact",
    title: "التواصل",
    fields: [
      biF("contact_badge", "الشريط الصغير فوق العنوان"),
      biF("contact_title", "عنوان القسم"),
      biF("contact_subtitle", "وصف القسم"),
      biF("contact_whatsapp_title", "قناة الواتساب — العنوان"),
      biF("contact_whatsapp_desc", "قناة الواتساب — الوصف"),
      biF("contact_whatsapp_cta", "قناة الواتساب — الزرار"),
      biF("contact_phone_title", "قناة التليفون — العنوان"),
      biF("contact_phone_desc", "قناة التليفون — الوصف", HOURS_HINT),
      biF("contact_facebook_title", "قناة الفيسبوك — العنوان"),
      biF("contact_facebook_desc", "قناة الفيسبوك — الوصف"),
      biF("contact_facebook_cta", "قناة الفيسبوك — الزرار"),
      biF("contact_working_hours", "مواعيد العمل", HOURS_HINT),
      plainF("whatsapp_number", "رقم الواتساب (دولي من غير +)"),
      plainF("contact_phone", "رقم التليفون للاتصال (دولي من غير +)"),
      plainF("contact_phone_display", "رقم التليفون المعروض على الشاشة"),
      plainF("facebook_url", "رابط صفحة الفيسبوك"),
      biF("contact_booking_title", "شريط الحجز — العنوان"),
      biF("contact_booking_text", "شريط الحجز — النص", HOURS_HINT),
      biF("contact_call_now", "شريط الحجز — زرار الاتصال"),
    ],
  },
  {
    id: "footer",
    title: "الفوتر",
    fields: [
      biF("footer_brand", "اسم المنصة"),
      biF("footer_about", "نص «عن المنصة»"),
      biF("footer_quick_links_title", "عنوان الروابط السريعة"),
      biF("footer_grades_title", "عنوان قايمة الصفوف"),
      biF("footer_contact_title", "عنوان تواصل معنا"),
      biF("footer_whatsapp_label", "كلمة «واتساب المنصة»"),
      biF("footer_facebook_label", "كلمة «صفحة الفيسبوك»"),
      biF("footer_copyright", "نص الحقوق", "سيب {year} مكانها وهي بتتبدل بالسنة"),
    ],
  },
];

const TOTAL_FIELDS = SECTIONS.reduce((n, s) => n + s.fields.length, 0);

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[15px] text-ink placeholder:text-muted/60 focus:border-brand-amber focus:outline-none focus:ring-2 focus:ring-brand-amber/50";

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null); // null = بنفحص
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [values, setValues] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);

  // هل الجلسة الحالية أدمن؟
  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d?.authed)))
      .catch(() => setAuthed(false));
  }, []);

  // تحميل الكونفج بعد الدخول
  useEffect(() => {
    if (authed !== true || loaded) return;
    fetch("/api/config")
      .then((r) => r.json())
      .then((d) => {
        if (d && typeof d === "object" && typeof d.error !== "string") {
          setValues(d);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [authed, loaded]);

  // إخفاء رسالة النجاح/الخطأ تلقائيًا
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  const login = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoggingIn(true);
      setLoginError("");
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (res.ok) {
          setAuthed(true);
        } else {
          const d = await res.json().catch(() => null);
          setLoginError(d?.error || "كلمة السر غير صحيحة");
        }
      } catch {
        setLoginError("حصلت مشكلة في الاتصال — جرب تاني");
      } finally {
        setLoggingIn(false);
      }
    },
    [password]
  );

  const logout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthed(false);
    setLoaded(false);
    setValues({});
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setToast({ ok: true, text: "تم حفظ التعديلات ✓ — افتح الموقع وشوف النتيجة" });
      } else if (res.status === 401) {
        setAuthed(false);
        setToast({ ok: false, text: "انتهت الجلسة — سجل دخولك تاني" });
      } else {
        setToast({ ok: false, text: "حصلت مشكلة في الحفظ — جرب تاني" });
      }
    } catch {
      setToast({ ok: false, text: "حصلت مشكلة في الاتصال — جرب تاني" });
    } finally {
      setSaving(false);
    }
  }, [values]);

  const setField = useCallback((key: string, v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
  }, []);

  if (authed === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Loader2 className="h-8 w-8 animate-spin text-brand-amber" />
      </div>
    );
  }

  // ============ شاشة تسجيل الدخول ============
  if (!authed) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-soft ring-1 ring-black/5"
        >
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-amber to-brand-amber-dark shadow-glow-amber">
              <Lock className="h-7 w-7 text-white" aria-hidden />
            </span>
            <h1 className="mt-4 text-2xl font-black">لوحة تحكم المحتوى</h1>
            <p className="mt-1 text-sm text-muted">
              منصة وليد التحاوي — دخول الأدمن
            </p>
          </div>
          <label className="mt-6 block">
            <span className="text-sm font-bold text-ink/80">كلمة السر</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              autoComplete="current-password"
              className={`${inputClass} mt-2`}
              placeholder="اكتب كلمة السر هنا"
            />
          </label>
          {loginError && (
            <p className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={loggingIn || password.length === 0}
            className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-brand-amber to-brand-amber-dark text-base font-bold text-white shadow-glow-amber transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loggingIn ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            ) : (
              <Lock className="h-5 w-5" aria-hidden />
            )}
            دخول
          </button>
        </form>
      </div>
    );
  }

  // ============ شاشة المحرر ============
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      {/* الهيدر */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal to-brand-teal-dark">
            <GraduationCap className="h-6 w-6 text-white" strokeWidth={2.2} aria-hidden />
          </span>
          <div>
            <h1 className="text-xl font-black sm:text-2xl">لوحة تحكم المحتوى</h1>
            <p className="text-sm text-muted">
              كل نص ليه خانة عربي وخانة English — {TOTAL_FIELDS} حقل في{" "}
              {SECTIONS.length} أقسام
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-bold text-ink transition-colors hover:bg-brand-amber-soft"
          >
            عرض الموقع
          </a>
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-bold text-ink transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            خروج
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving || !loaded}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-l from-brand-amber to-brand-amber-dark px-5 text-sm font-bold text-white shadow-glow-amber transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Save className="h-4 w-4" aria-hidden />
            )}
            حفظ كل التعديلات
          </button>
        </div>
      </div>

      {/* الأقسام — كل قسم فولدر يفتح ويقفل */}
      {!loaded ? (
        <div className="mt-8 flex items-center justify-center gap-3 rounded-3xl bg-white p-10 text-muted shadow-soft ring-1 ring-black/5">
          <Loader2 className="h-6 w-6 animate-spin text-brand-amber" aria-hidden />
          جاري تحميل المحتوى…
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {SECTIONS.map((section) => (
            <details
              key={section.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 select-none hover:bg-brand-amber-soft/50 sm:px-6">
                <span className="text-lg font-extrabold">{section.title}</span>
                <span className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-muted">
                    {section.fields.length} حقل
                  </span>
                  <ChevronDown
                    className="h-5 w-5 text-muted transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </span>
              </summary>
              <div className="grid gap-5 border-t border-black/5 px-5 py-5 sm:grid-cols-2 sm:px-6">
                {section.fields.map((field) => (
                  <FieldEditor
                    key={field.key}
                    field={field}
                    values={values}
                    onChange={setField}
                  />
                ))}
              </div>
            </details>
          ))}
        </div>
      )}

      {/* زرار الحفظ السفلي */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={save}
          disabled={saving || !loaded}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-l from-brand-teal to-brand-teal-dark px-10 text-base font-bold text-white shadow-soft transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          ) : (
            <Check className="h-5 w-5" aria-hidden />
          )}
          حفظ كل التعديلات
        </button>
      </div>

      {/* رسالة النجاح/الخطأ */}
      {toast && (
        <div
          role="status"
          className={`fixed inset-x-4 bottom-6 z-50 mx-auto max-w-md rounded-2xl px-5 py-4 text-center text-sm font-bold shadow-lift ${
            toast.ok
              ? "bg-brand-teal text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}

// ============ خانة حقل واحدة (عربي + English أو خانة واحدة) ============
function FieldEditor({
  field,
  values,
  onChange,
}: {
  field: Field;
  values: Record<string, string>;
  onChange: (key: string, v: string) => void;
}) {
  const rows = useMemo(() => {
    if (field.type === "bi") {
      return [
        { key: `${field.key}_ar`, label: "عربي", dir: "rtl" as const },
        { key: `${field.key}_en`, label: "English", dir: "ltr" as const },
      ];
    }
    return [{ key: field.key, label: null, dir: "ltr" as const }];
  }, [field]);

  return (
    <div>
      <p className="text-sm font-bold text-ink/85">{field.label}</p>
      {field.hint && (
        <p className="mt-0.5 text-xs text-muted">{field.hint}</p>
      )}
      <div className="mt-2 grid gap-2">
        {rows.map((row) => (
          <label key={row.key} className="block">
            {row.label && (
              <span
                dir={row.dir}
                className="mb-1 block text-xs font-extrabold text-brand-teal-dark"
              >
                {row.label}
              </span>
            )}
            <input
              dir={row.dir}
              value={values[row.key] ?? ""}
              onChange={(e) => onChange(row.key, e.target.value)}
              className={inputClass}
              placeholder={row.label === "English" ? "English text" : undefined}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
