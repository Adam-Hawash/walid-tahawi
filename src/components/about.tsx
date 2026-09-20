"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClipboardCheck,
  FileBarChart2,
  Lightbulb,
  UserCheck,
} from "lucide-react";

// عدّاد أرقام بسيط — بيعد لما القسم يظهر على الشاشة
function CountUp({
  end,
  suffix = "",
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            const t0 = performance.now();
            const duration = 1400;
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / duration);
              const eased = 1 - Math.pow(1 - p, 3); // تباطؤ ناعم في الآخر
              setValue(Math.round(end * eased));
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end]);

  return (
    <div
      ref={ref}
      className="rounded-3xl bg-white p-6 text-center shadow-soft ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
    >
      <p className="text-4xl font-black text-brand-teal sm:text-5xl">
        {value.toLocaleString("en-US")}
        <span className="text-brand-amber">{suffix}</span>
      </p>
      <p className="mt-2 font-bold text-ink/80">{label}</p>
    </div>
  );
}

const FEATURES = [
  {
    icon: Lightbulb,
    title: "شرح مبسّط",
    desc: "كل درس بيشرح بأمثلة من الحياة اليومية لحد ما يثبت تمامًا.",
  },
  {
    icon: UserCheck,
    title: "متابعة فردية",
    desc: "كل طالب بيتابع مستواه ونقطته أول بأول طول الفصل.",
  },
  {
    icon: ClipboardCheck,
    title: "امتحانات دورية",
    desc: "اختبارات مستمرة بنفس نمط الامتحان الحقيقي عشان مفيش مفاجآت.",
  },
  {
    icon: FileBarChart2,
    title: "تقارير لأولياء الأمور",
    desc: "ولي الأمر بيفضل متابع تقدم ابنه أول بأول من غير أي مجهود.",
  },
];

const STATS = [
  { end: 5000, suffix: "+", label: "طالب انضموا للمنصة" },
  { end: 12, suffix: "+", label: "سنة خبرة في التدريس" },
  { end: 98, suffix: "%", label: "نسبة نجاح بين طلابنا" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* النص */}
          <div>
            <span className="inline-flex min-h-9 items-center rounded-full bg-brand-teal-soft px-4 text-sm font-bold text-brand-teal-dark">
              عن المنصة
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              هنا الطالب بيفهم…
              <span className="text-brand-teal"> مش بس يحفظ</span>
            </h2>
            <p className="mt-4 leading-loose text-muted">
              منصة وليد التحاوي مش مجرد كورسات — دي بيئة تعليمية كاملة اتصممت
              عشان الطالب يفهم من الأساس ويبني فوقه خطوة بخطوة، لحد ما يبقى جاهز
              لأي امتحان وبكل ثقة.
            </p>
            <p className="mt-3 leading-loose text-muted">
              هدفنا بسيط: نخلّي المذاكرة أسهل وأوضح، وندي كل طالب الدعم اللي
              يخليه يحب المادة ويحقق أفضل نتيجة ممكنة.
            </p>

            {/* الميزات */}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li
                  key={f.title}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal-soft text-brand-teal">
                    <f.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-extrabold">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {f.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* الإحصائيات */}
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
            {STATS.map((stat) => (
              <CountUp
                key={stat.label}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
