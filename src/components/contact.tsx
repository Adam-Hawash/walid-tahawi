import { Facebook, MessageCircle, Phone } from "lucide-react";
import {
  FACEBOOK_URL,
  PHONE_DISPLAY,
  PHONE_LINK,
  WHATSAPP_LINK,
  WORKING_HOURS,
} from "@/lib/site";

const CHANNELS = [
  {
    title: "واتساب",
    desc: "ابعتلنا رسالة وسنرد عليك في أسرع وقت ممكن.",
    cta: "ابدأ المحادثة",
    href: WHATSAPP_LINK,
    external: true,
    icon: MessageCircle,
    iconClass: "bg-brand-teal-soft text-brand-teal",
  },
  {
    title: "تليفون",
    desc: `كلمنا مباشرة على الرقم التالي خلال ${WORKING_HOURS}.`,
    cta: PHONE_DISPLAY,
    href: PHONE_LINK,
    external: false,
    icon: Phone,
    iconClass: "bg-brand-amber-soft text-brand-amber-dark",
  },
  {
    title: "فيسبوك",
    desc: "تابع صفحتنا لأخبار المنصة والمواعيد المهمة أول بأول.",
    cta: "افتح الصفحة",
    href: FACEBOOK_URL,
    external: true,
    icon: Facebook,
    iconClass: "bg-brand-teal-soft text-brand-teal-dark",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-white py-16 ring-1 ring-black/5 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* عنوان القسم */}
        <div className="text-center">
          <span className="inline-flex min-h-9 items-center rounded-full bg-brand-teal-soft px-4 text-sm font-bold text-brand-teal-dark">
            تواصل
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            تواصل معنا
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            عندك أي سؤال عن الكورسات أو الحجز؟ فريقنا جاهز يرد عليك في أي وقت
            ويوصلك لكل جديد.
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
          <div className="flex flex-col items-center gap-6 px-6 py-10 text-center sm:px-10 md:flex-row md:justify-between md:text-right">
            <div>
              <h3 className="text-2xl font-black text-white sm:text-3xl">
                الحجز عبر الهاتف
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-white/85">
                لو حابب تحجز مكانك أو تستفسر عن المجموعات، كلمنا بين{" "}
                {WORKING_HOURS} و هنرد عليك فورًا.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
              <a
                href={PHONE_LINK}
                dir="ltr"
                className="text-3xl font-black tracking-wider text-white transition-opacity hover:opacity-85"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={PHONE_LINK}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 text-base font-extrabold text-brand-teal-dark shadow-lift transition-transform hover:scale-[1.04] active:scale-95"
              >
                <Phone className="h-5 w-5" aria-hidden />
                اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
