"use client";

import { Facebook, MessageCircle, Phone } from "lucide-react";
import { useSiteConfig } from "@/lib/config";
import { SITE_CONTENT } from "@/lib/content";

export default function Contact() {
  const { tr, val } = useSiteConfig();
  const { contact } = SITE_CONTENT;

  // أرقام التواصل من الكونفج (صفحة الأدمن) أو الافتراضي
  const whatsappNumber = val("whatsapp_number", "201000000000");
  const phoneNumber = val("contact_phone", "201000000000");
  const phoneDisplay = val("contact_phone_display", "010 0000 0000");
  const facebookUrl = val("facebook_url", "https://www.facebook.com/");

  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const phoneLink = `tel:+${phoneNumber}`;

  // مواعيد العمل بتتبدل مكان {hours} في النصوص
  const workingHours = tr("contact_working_hours", contact.workingHours);
  const phoneDesc = tr("contact_phone_desc", contact.phoneDesc).replace(
    "{hours}",
    workingHours
  );
  const bookingText = tr("contact_booking_text", contact.bookingText).replace(
    "{hours}",
    workingHours
  );

  const CHANNELS = [
    {
      title: tr("contact_whatsapp_title", contact.whatsappTitle),
      desc: tr("contact_whatsapp_desc", contact.whatsappDesc),
      cta: tr("contact_whatsapp_cta", contact.whatsappCta),
      href: whatsappLink,
      external: true,
      icon: MessageCircle,
      iconClass: "bg-brand-teal-soft text-brand-teal",
    },
    {
      title: tr("contact_phone_title", contact.phoneTitle),
      desc: phoneDesc,
      cta: phoneDisplay,
      href: phoneLink,
      external: false,
      icon: Phone,
      iconClass: "bg-brand-amber-soft text-brand-amber-dark",
    },
    {
      title: tr("contact_facebook_title", contact.facebookTitle),
      desc: tr("contact_facebook_desc", contact.facebookDesc),
      cta: tr("contact_facebook_cta", contact.facebookCta),
      href: facebookUrl,
      external: true,
      icon: Facebook,
      iconClass: "bg-brand-teal-soft text-brand-teal-dark",
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-white py-16 ring-1 ring-black/5 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* عنوان القسم */}
        <div className="text-center">
          <span className="inline-flex min-h-9 items-center rounded-full bg-brand-teal-soft px-4 text-sm font-bold text-brand-teal-dark">
            {tr("contact_badge", contact.badge)}
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {tr("contact_title", contact.title)}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            {tr("contact_subtitle", contact.subtitle)}
          </p>
        </div>

        {/* قنوات التواصل */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CHANNELS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-col items-center rounded-3xl bg-cream p-8 text-center shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${c.iconClass}`}
              >
                <c.icon className="h-8 w-8" strokeWidth={1.9} aria-hidden />
              </span>
              <h3 className="mt-4 text-xl font-extrabold">{c.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{c.desc}</p>
              <span className="mt-5 inline-flex min-h-11 items-center rounded-full border-2 border-brand-teal px-6 text-sm font-bold text-brand-teal transition-colors group-hover:bg-brand-teal group-hover:text-white">
                {c.cta}
              </span>
            </a>
          ))}
        </div>

        {/* شريط الحجز عبر الهاتف — زي قسم الطلب عبر الهاتف في المرجع */}
        <div className="mt-14 overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-brand-teal-dark to-brand-teal shadow-lift">
          <div className="flex flex-col items-center gap-6 px-6 py-10 text-center sm:px-10 md:flex-row md:justify-between md:text-start">
            <div>
              <h3 className="text-2xl font-black text-white sm:text-3xl">
                {tr("contact_booking_title", contact.bookingTitle)}
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-white/85">
                {bookingText}
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
              <a
                href={phoneLink}
                dir="ltr"
                className="text-3xl font-black tracking-wider text-white transition-opacity hover:opacity-85"
              >
                {phoneDisplay}
              </a>
              <a
                href={phoneLink}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 text-base font-extrabold text-brand-teal-dark shadow-lift transition-transform hover:scale-[1.04] active:scale-95"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {tr("contact_call_now", contact.callNow)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
