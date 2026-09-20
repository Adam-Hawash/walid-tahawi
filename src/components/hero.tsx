import { ArrowDown, BadgeCheck, MessageCircle, Sparkles } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/site";

const HIGHLIGHTS = [
  "شرح مبسّط وواضح",
  "متابعة لكل طالب",
  "نتائج تتكلم عن نفسها",
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden scroll-mt-24">
      {/* خلفية مزخرفة ناعمة — بلوبات بلون البرتقالي والتيل */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-amber/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand-teal/10 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
        {/* النص الرئيسي */}
        <div className="text-center lg:text-right">
          <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-amber/30 bg-brand-amber-soft px-4 text-sm font-bold text-brand-amber-dark">
            <Sparkles className="h-4 w-4" aria-hidden />
            منصة وليد التحاوي التعليمية
          </span>

          <h1 className="mt-5 text-4xl font-black leading-[1.25] tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.2]">
            رحلة التفوق الدراسي
            <span className="relative mx-2 inline-block text-brand-teal">
              تبدأ من هنا
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-3 -z-10 rounded-full bg-brand-amber/40"
              />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
            شرح مبسّط وممتع، متابعة مستمرة لكل طالب، وامتحانات تدريبية على نفس
            نمط الامتحانات الحقيقية — كل ده في مكان واحد وبيوصلك لأعلى الدرجات
            بثقة.
          </p>

          {/* زراير الهيرو */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <a
              href="#courses"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-l from-brand-amber to-brand-amber-dark px-8 text-base font-bold text-white shadow-glow-amber transition-transform hover:scale-[1.04] active:scale-95"
            >
              <ArrowDown className="h-5 w-5" aria-hidden />
              استكشف الكورسات
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-brand-teal bg-white px-8 text-base font-bold text-brand-teal transition-colors hover:bg-brand-teal-soft"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              تواصل واتساب
            </a>
          </div>

          {/* ميزات سريعة */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-sm font-semibold text-ink/75"
              >
                <BadgeCheck
                  className="h-5 w-5 text-brand-teal"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* صورة الهيرو — بتتحمّل فورًا */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-brand-amber/25 via-transparent to-brand-teal/20 blur-xl"
          />
          <img
            src="/images/hero-teacher.webp"
            alt="المستر وليد التحاوي — معلم شاب مبتسم يرحب بطلاب المنصة"
            width={900}
            height={900}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className="relative aspect-square w-full rounded-[2.5rem] object-cover shadow-lift ring-8 ring-white"
          />

          {/* كارت عائم — متابعة يومية */}
          <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift sm:right-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-amber-soft text-brand-amber-dark">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <div className="text-right">
              <p className="text-sm font-extrabold">شروح مبسّطة</p>
              <p className="text-xs text-muted">كل درس خطوة للأمام</p>
            </div>
          </div>

          {/* كارت عائم — نتائج */}
          <div className="absolute -top-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift sm:left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal-soft text-brand-teal">
              <BadgeCheck className="h-5 w-5" aria-hidden />
            </span>
            <div className="text-right">
              <p className="text-sm font-extrabold">متابعة مستمرة</p>
              <p className="text-xs text-muted">لسة عندك دايمًا</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
