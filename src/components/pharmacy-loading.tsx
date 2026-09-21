"use client";

import { useEffect, useState } from "react";

// (2026-و75-C) شاشة تحميل الصيدلية — بتظهر فوق الصفحة الرئيسية أول ما تفتح
// (طبقة ثابتة فوق المحتوى العادي فمش بتعطل SSR ولا تحميل باقي الصفحة)
// وتختفي بسلاسة بعد 1.5 ثانية.
const HIDE_AFTER_MS = 1500;
const FADE_MS = 350;

export default function PharmacyLoading() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setFading(true), HIDE_AFTER_MS);
    const removeTimer = setTimeout(
      () => setGone(true),
      HIDE_AFTER_MS + FADE_MS + 50,
    );
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // بعد الاختفاء الكامل بنتشال من الـDOM خالص
  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-cream transition-opacity duration-300 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* اللوجو الكيميائي بتاع المنصة (نفس فافيكون الموقع) */}
      <img
        src="/favicon.svg"
        alt=""
        width={76}
        height={76}
        className="wt-load-drop"
      />
      {/* إيموجيز الصيدلية بندوبة متدرجة */}
      <div className="flex items-end gap-4 text-4xl leading-none" dir="ltr">
        <span className="wt-load-bounce">💊</span>
        <span className="wt-load-bounce wt-load-delay-1">⚗️</span>
        <span className="wt-load-bounce wt-load-delay-2">🧪</span>
      </div>
      <p className="text-xl font-extrabold text-brand-teal">
        منصة وليد التحاوي
      </p>
      <p className="animate-pulse text-sm font-semibold text-muted">
        جاري التحميل...
      </p>
    </div>
  );
}
