"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Menu, X, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/config";
import { SITE_CONTENT } from "@/lib/content";

type Lang = "ar" | "en";

// سويتش اللغة بحبتين (EN | عربي) — نفس ستايل منصة د. شيماء بالظبط (و73):
// كونتينر كبسولة بحدود وخلفية محايدة + الحبة المفعّلة بلون البراند — الحبة
// المفعّلة متعلم عليها بـ aria-pressed — الوضع الموبايل بياخد العرض كامل
// (نفس بادنج p-0.5/py-1 بتاع المرجع — مبالغة بسيطة py-1.5 في الموبايل بس
// عشان هدف اللمس يفضل معقول)
function LangToggle({
  lang,
  setLang,
  fullWidth = false,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  fullWidth?: boolean;
}) {
  // ملاحظة: منصة وليد مفيهاش توكنز shadcn (border/primary/muted-foreground) —
  // فبنستخدم المقابل بتاعها: border-black/10 + bg-black/5 بدل bg-muted/60،
  // bg-brand-teal + text-white بدل bg-primary + text-primary-foreground،
  // text-muted hover:text-ink بدل text-muted-foreground hover:text-foreground
  const containerCls =
    "mt-3 items-center rounded-full border border-black/10 bg-black/5 p-0.5 text-[11px] font-bold " +
    (fullWidth ? "flex w-full" : "inline-flex");
  const btnCls =
    "rounded-full transition-colors cursor-pointer " +
    (fullWidth ? "flex-1 px-4 py-1.5 " : "px-2.5 py-1 ");
  const onCls = "bg-brand-teal text-white shadow-sm";
  const offCls = "text-muted hover:text-ink";
  return (
    <div className={containerCls} role="group" aria-label="Language / اللغة">
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={btnCls + (lang === "en" ? onCls : offCls)}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={btnCls + (lang === "ar" ? onCls : offCls)}
      >
        عربي
      </button>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { tr } = useSiteConfig();
  const { navbar } = SITE_CONTENT;

  // قفل السكرول لما المينيو الموبايل مفتوح
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <nav
        aria-label={t("القائمة الرئيسية", "Main navigation")}
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8"
      >
        {/* اللوجو */}
        <a
          href="#home"
          className="flex min-h-11 items-center gap-2.5"
          aria-label={t(
            "منصة وليد التحاوي — الرئيسية",
            "Mr. Walid Eltahawi Platform — Home"
          )}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-amber to-brand-amber-dark shadow-glow-amber">
            <GraduationCap className="h-6 w-6 text-white" strokeWidth={2.2} />
          </span>
          <span className="text-lg font-extrabold tracking-tight sm:text-xl">
            {tr("navbar_brand_prefix", navbar.brandPrefix)}{" "}
            <span className="text-brand-teal">
              {tr("navbar_brand_highlight", navbar.brandHighlight)}
            </span>
          </span>
        </a>

        {/* لينكات الديسكتوب */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navbar.links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold text-ink/80 transition-colors hover:bg-brand-amber-soft hover:text-brand-teal-dark"
              >
                {tr(`navbar_link_${i + 1}`, link.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* زرار تبديل اللغة (ديسكتوب) */}
          <div className="hidden sm:block">
            <LangToggle lang={lang} setLang={setLang} />
          </div>

          {/* زرار CTA الرئيسي — نفس ستايل الكبسولة بتاع المرجع */}
          <a
            href="#courses"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-gradient-to-l from-brand-amber to-brand-amber-dark px-6 text-[15px] font-bold text-white shadow-glow-amber transition-transform hover:scale-[1.04] active:scale-95 sm:inline-flex"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {tr("navbar_cta", navbar.cta)}
          </a>

          {/* زرار المينيو للموبايل */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("إغلاق القائمة", "Close menu") : t("فتح القائمة", "Open menu")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-colors hover:bg-brand-amber-soft lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* قائمة الموبايل */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-black/5 bg-white px-4 pb-6 pt-2 shadow-soft lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navbar.links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-xl px-4 text-base font-semibold text-ink/85 transition-colors hover:bg-brand-amber-soft hover:text-brand-teal-dark"
                >
                  {tr(`navbar_link_${i + 1}`, link.label)}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#courses"
            onClick={() => setOpen(false)}
            className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-l from-brand-amber to-brand-amber-dark px-6 text-base font-bold text-white shadow-glow-amber"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            {tr("navbar_cta", navbar.cta)}
          </a>
          {/* زرار تبديل اللغة (موبايل) */}
          <LangToggle lang={lang} setLang={setLang} fullWidth />
        </div>
      )}
    </header>
  );
}
