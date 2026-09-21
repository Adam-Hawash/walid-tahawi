"use client";

import { MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useSiteConfig } from "@/lib/config";
import { SITE_CONTENT } from "@/lib/content";

export default function FeaturedCourses() {
  const { t } = useLang();
  const { tr, val } = useSiteConfig();
  const { courses } = SITE_CONTENT;

  const whatsappLink = `https://wa.me/${val("whatsapp_number", "201000000000")}`;

  return (
    <section id="courses" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* عنوان القسم */}
        <div className="text-center">
          <span className="inline-flex min-h-9 items-center rounded-full bg-brand-amber-soft px-4 text-sm font-bold text-brand-amber-dark">
            {tr("courses_badge", courses.badge)}
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {tr("courses_title", courses.title)}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            {tr("courses_subtitle", courses.subtitle)}
          </p>
        </div>

        {/* جريد الكورسات */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.items.map((course, i) => {
            const title = tr(`course${i + 1}_title`, course.title);
            return (
              <article
                key={course.title.en}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <img
                  src={val(`course${i + 1}_img`, course.img)}
                  alt={tr(`course${i + 1}_alt`, course.alt)}
                  width={800}
                  height={457}
                  loading="eager"
                  decoding="sync"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-extrabold">{title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">
                    {tr(`course${i + 1}_desc`, course.desc)}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-lg font-black text-brand-teal">
                      {val(`course${i + 1}_price`, String(course.price))}
                      <span className="ms-1 text-sm font-bold text-muted">
                        {tr("courses_price_currency", courses.priceCurrency)}
                      </span>
                    </p>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-l from-brand-amber to-brand-amber-dark px-5 text-sm font-bold text-white shadow-glow-amber transition-transform hover:scale-[1.05] active:scale-95"
                      aria-label={t(
                        courses.subscribeAria.ar,
                        courses.subscribeAria.en
                      ).replace("{course}", title)}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      {tr("courses_subscribe", courses.subscribe)}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
