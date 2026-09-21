"use client";

import {
  Facebook,
  GraduationCap,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useSiteConfig } from "@/lib/config";
import { SITE_CONTENT } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const { tr, val } = useSiteConfig();
  const { footer, navbar, grades } = SITE_CONTENT;

  const whatsappLink = `https://wa.me/${val("whatsapp_number", "201000000000")}`;
  const phoneLink = `tel:+${val("contact_phone", "201000000000")}`;
  const phoneDisplay = val("contact_phone_display", "010 0000 0000");
  const facebookUrl = val("facebook_url", "https://www.facebook.com/");

  const copyright = tr("footer_copyright", footer.copyright).replace(
    "{year}",
    String(year)
  );

  return (
    // mt-auto بتخلي الفوتر لازق في آخر الشاشة حتى لو المحتوى قصير
    <footer className="mt-auto bg-[#14211f] text-white/85">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* عن المنصة */}
          <div>
            <a href="#home" className="flex min-h-11 items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-amber to-brand-amber-dark">
                <GraduationCap className="h-6 w-6 text-white" strokeWidth={2.2} />
              </span>
              <span className="text-lg font-extrabold text-white">
                {tr("footer_brand", footer.brand)}
              </span>
            </a>
            <p className="mt-4 leading-relaxed text-white/70">
              {tr("footer_about", footer.about)}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tr("footer_whatsapp_label", footer.whatsappLabel)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-amber"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tr("footer_facebook_label", footer.facebookLabel)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-amber"
              >
                <Facebook className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={phoneLink}
                aria-label={tr("footer_contact_title", footer.contactTitle)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-amber"
              >
                <Phone className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <nav aria-label={tr("footer_quick_links_title", footer.quickLinksTitle)}>
            <h3 className="text-lg font-extrabold text-white">
              {tr("footer_quick_links_title", footer.quickLinksTitle)}
            </h3>
            <ul className="mt-4 flex flex-col gap-1">
              {navbar.links.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-10 items-center rounded-lg px-1 text-white/70 transition-colors hover:text-brand-amber"
                  >
                    {tr(`navbar_link_${i + 1}`, link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* الصفوف الدراسية */}
          <nav aria-label={tr("footer_grades_title", footer.gradesTitle)}>
            <h3 className="text-lg font-extrabold text-white">
              {tr("footer_grades_title", footer.gradesTitle)}
            </h3>
            <ul className="mt-4 flex flex-col gap-1">
              {grades.items.map((grade, i) => (
                <li key={grade.id}>
                  <a
                    href="#grades"
                    className="inline-flex min-h-10 items-center rounded-lg px-1 text-white/70 transition-colors hover:text-brand-amber"
                  >
                    {tr(`grade${i + 1}_name`, grade.name)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* تواصل معنا */}
          <div>
            <h3 className="text-lg font-extrabold text-white">
              {tr("footer_contact_title", footer.contactTitle)}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={phoneLink}
                  className="flex min-h-11 items-center gap-3 text-white/70 transition-colors hover:text-brand-amber"
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden />
                  <span dir="ltr">{phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 text-white/70 transition-colors hover:text-brand-amber"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                  <span>{tr("footer_whatsapp_label", footer.whatsappLabel)}</span>
                </a>
              </li>
              <li>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 text-white/70 transition-colors hover:text-brand-amber"
                >
                  <Facebook className="h-5 w-5 shrink-0" aria-hidden />
                  <span>{tr("footer_facebook_label", footer.facebookLabel)}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* شريط الحقوق */}
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-7xl px-4 py-5 text-center text-sm text-white/60 sm:px-6 lg:px-8">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
