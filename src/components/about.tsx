"use client";

import { useEffect, useRef, useState } from "react";
import {
  ClipboardCheck,
  FileBarChart2,
  Lightbulb,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { useSiteConfig } from "@/lib/config";
import { SITE_CONTENT } from "@/lib/content";

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

// أيقونات الميزات بالترتيب (بتتطابق مع FEATURES في المحتوى)
const FEATURE_ICONS: LucideIcon[] = [
  Lightbulb,
  UserCheck,
  ClipboardCheck,
  FileBarChart2,
];

export default function About() {
  const { tr, val } = useSiteConfig();
  const { about } = SITE_CONTENT;

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* النص */}
          <div>
            <span className="inline-flex min-h-9 items-center rounded-full bg-brand-teal-soft px-4 text-sm font-bold text-brand-teal-dark">
              {tr("about_badge", about.badge)}
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {tr("about_title", about.title)}
              <span className="text-brand-teal">
                {" "}
                {tr("about_title_highlight", about.titleHighlight)}
              </span>
            </h2>
            <p className="mt-4 leading-loose text-muted">
              {tr("about_p1", about.p1)}
            </p>
            <p className="mt-3 leading-loose text-muted">
              {tr("about_p2", about.p2)}
            </p>

            {/* الميزات */}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {about.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i] ?? Lightbulb;
                return (
                  <li
                    key={f.title.en}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/5"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal-soft text-brand-teal">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-extrabold">
                        {tr(`about_f${i + 1}_title`, f.title)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {tr(`about_f${i + 1}_desc`, f.desc)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* الإحصائيات */}
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
            {about.stats.map((stat, i) => (
              <CountUp
                key={stat.label.en}
                end={Number(val(`about_stat${i + 1}_value`, String(stat.value))) || 0}
                suffix={val(`about_stat${i + 1}_suffix`, stat.suffix)}
                label={tr(`about_stat${i + 1}_label`, stat.label)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
