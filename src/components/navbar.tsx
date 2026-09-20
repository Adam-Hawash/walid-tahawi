"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "الرئيسية" },
  { href: "#courses", label: "الكورسات" },
  { href: "#grades", label: "الصفوف الدراسية" },
  { href: "#about", label: "عن المستر" },
  { href: "#contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
        aria-label="القائمة الرئيسية"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8"
      >
        {/* اللوجو */}
        <a
          href="#home"
          className="flex min-h-11 items-center gap-2.5"
          aria-label="منصة وليد التحاوي — الرئيسية"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-amber to-brand-amber-dark shadow-glow-amber">
            <GraduationCap className="h-6 w-6 text-white" strokeWidth={2.2} />
          </span>
          <span className="text-lg font-extrabold tracking-tight sm:text-xl">
            منصة <span className="text-brand-teal">وليد التحاوي</span>
          </span>
        </a>

        {/* لينكات الديسكتوب */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-semibold text-ink/80 transition-colors hover:bg-brand-amber-soft hover:text-brand-teal-dark"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* زرار CTA الرئيسي — نفس ستايل الكبسولة بتاع المرجع */}
          <a
            href="#courses"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-gradient-to-l from-brand-amber to-brand-amber-dark px-6 text-[15px] font-bold text-white shadow-glow-amber transition-transform hover:scale-[1.04] active:scale-95 sm:inline-flex"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            ابدأ الآن
          </a>

          {/* زرار المينيو للموبايل */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
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
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-xl px-4 text-base font-semibold text-ink/85 transition-colors hover:bg-brand-amber-soft hover:text-brand-teal-dark"
                >
                  {link.label}
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
            ابدأ الآن
          </a>
        </div>
      )}
    </header>
  );
}
