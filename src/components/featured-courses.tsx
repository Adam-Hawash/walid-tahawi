import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/site";

const COURSES = [
  {
    title: "رياضيات",
    desc: "شرح مبسّط لأصعب المسائل مع تدريبات مكثفة على كل درس.",
    price: 300,
    img: "/images/course-math.webp",
    alt: "رسم توضيحي لكورس الرياضيات — أدوات هندسية ورموز رياضية",
  },
  {
    title: "فيزياء",
    desc: "تجارب وتطبيقات عملية تخلي القوانين أسهل في الفهم.",
    price: 300,
    img: "/images/course-physics.webp",
    alt: "رسم توضيحي لكورس الفيزياء — نموذج الذرة ومنشور الضوء",
  },
  {
    title: "كيمياء",
    desc: "تلخيص شامل للمنهج مع مراجعات مستمرة قبل الامتحانات.",
    price: 300,
    img: "/images/course-chemistry.webp",
    alt: "رسم توضيحي لكورس الكيمياء — دورق ومختبر وأدوات تجارب",
  },
  {
    title: "علوم",
    desc: "محتوى بصري ممتع يقرّب العلم لكل الطلاب بخطوات بسيطة.",
    price: 250,
    img: "/images/course-science.webp",
    alt: "رسم توضيحي لكورس العلوم — مجهر وكوكب ومركبات علمية",
  },
  {
    title: "لغة عربية",
    desc: "قواعد ونصوص وبلاغة بطريقة منظمة وسهلة الحفظ والفهم.",
    price: 250,
    img: "/images/course-arabic.webp",
    alt: "رسم توضيحي لكورس اللغة العربية — كتاب مفتوح وريشة كتابة",
  },
  {
    title: "لغة إنجليزية",
    desc: "أساسيات قوية في القواعد والمحادثة خطوة بخطوة.",
    price: 250,
    img: "/images/course-english.webp",
    alt: "رسم توضيحي لكورس اللغة الإنجليزية — كتاب وفقاعات حوار",
  },
];

export default function FeaturedCourses() {
  return (
    <section id="courses" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* عنوان القسم */}
        <div className="text-center">
          <span className="inline-flex min-h-9 items-center rounded-full bg-brand-amber-soft px-4 text-sm font-bold text-brand-amber-dark">
            الكورسات
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            كورسات مميزة
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            اختار الكورس اللي يناسبك وابدأ رحلتك — كل كورس مصمم بعناية عشان
            يوصلك للفهم الحقيقي مش مجرد الحفظ.
          </p>
        </div>

        {/* جريد الكورسات */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <article
              key={course.title}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <img
                src={course.img}
                alt={course.alt}
                width={800}
                height={457}
                loading="eager"
                decoding="sync"
                className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-extrabold">{course.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">
                  {course.desc}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-lg font-black text-brand-teal">
                    {course.price}
                    <span className="ms-1 text-sm font-bold text-muted">
                      ج.م
                    </span>
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-l from-brand-amber to-brand-amber-dark px-5 text-sm font-bold text-white shadow-glow-amber transition-transform hover:scale-[1.05] active:scale-95"
                    aria-label={`اشترك الآن في كورس ${course.title} عبر واتساب`}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    اشترك الآن
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
