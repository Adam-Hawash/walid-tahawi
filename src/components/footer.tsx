import {
  Facebook,
  GraduationCap,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  FACEBOOK_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
  WHATSAPP_LINK,
} from "@/lib/site";

const QUICK_LINKS = [
  { href: "#home", label: "الرئيسية" },
  { href: "#courses", label: "الكورسات" },
  { href: "#grades", label: "الصفوف الدراسية" },
  { href: "#about", label: "عن المستر" },
  { href: "#contact", label: "تواصل معنا" },
];

const GRADES = [
  "الأول الإعدادي",
  "الثاني الإعدادي",
  "الثالث الإعدادي",
  "الأول الثانوي",
  "الثاني الثانوي",
  "الثالث الثانوي",
];

export default function Footer() {
  const year = new Date().getFullYear();

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
                منصة وليد التحاوي
              </span>
            </a>
            <p className="mt-4 leading-relaxed text-white/70">
              مكانك الآمن لتتعلم وتفهم كل المواد بأسلوب مبسّط وممتع، وتوصل
              لأعلى الدرجات وانت متطمن.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل واتساب"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-amber"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="صفحة الفيسبوك"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-amber"
              >
                <Facebook className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={PHONE_LINK}
                aria-label="اتصل بنا"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-amber"
              >
                <Phone className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <nav aria-label="روابط سريعة">
            <h3 className="text-lg font-extrabold text-white">روابط سريعة</h3>
            <ul className="mt-4 flex flex-col gap-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-10 items-center rounded-lg px-1 text-white/70 transition-colors hover:text-brand-amber"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* الصفوف الدراسية */}
          <nav aria-label="الصفوف الدراسية">
            <h3 className="text-lg font-extrabold text-white">
              الصفوف الدراسية
            </h3>
            <ul className="mt-4 flex flex-col gap-1">
              {GRADES.map((grade) => (
                <li key={grade}>
                  <a
                    href="#grades"
                    className="inline-flex min-h-10 items-center rounded-lg px-1 text-white/70 transition-colors hover:text-brand-amber"
                  >
                    {grade}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* تواصل معنا */}
          <div>
            <h3 className="text-lg font-extrabold text-white">تواصل معنا</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={PHONE_LINK}
                  className="flex min-h-11 items-center gap-3 text-white/70 transition-colors hover:text-brand-amber"
                >
                  <Phone className="h-5 w-5 shrink-0" aria-hidden />
                  <span dir="ltr">{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 text-white/70 transition-colors hover:text-brand-amber"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                  <span>واتساب المنصة</span>
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 text-white/70 transition-colors hover:text-brand-amber"
                >
                  <Facebook className="h-5 w-5 shrink-0" aria-hidden />
                  <span>صفحة الفيسبوك</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* شريط الحقوق */}
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-7xl px-4 py-5 text-center text-sm text-white/60 sm:px-6 lg:px-8">
          © {year} منصة وليد التحاوي — جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
