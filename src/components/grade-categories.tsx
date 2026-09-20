import {
  Atom,
  BookOpen,
  Calculator,
  GraduationCap,
  PencilRuler,
  Shapes,
} from "lucide-react";

const GRADES = [
  { name: "الأول الإعدادي", icon: BookOpen },
  { name: "الثاني الإعدادي", icon: PencilRuler },
  { name: "الثالث الإعدادي", icon: Shapes },
  { name: "الأول الثانوي", icon: Atom },
  { name: "الثاني الثانوي", icon: Calculator },
  { name: "الثالث الثانوي", icon: GraduationCap },
];

export default function GradeCategories() {
  return (
    <section
      id="grades"
      className="scroll-mt-24 bg-white py-16 ring-1 ring-black/5 sm:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* عنوان القسم */}
        <div className="text-center">
          <span className="inline-flex min-h-9 items-center rounded-full bg-brand-teal-soft px-4 text-sm font-bold text-brand-teal-dark">
            الصفوف الدراسية
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            تصفح حسب الصف
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            كورسات مصممة خصيصًا لكل صف دراسي — من أول الإعدادي لحد ثالثة
            ثانوي، دايمًا في محتوى مناسب لمستواك.
          </p>
        </div>

        {/* كروت الصفوف */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {GRADES.map((grade, i) => (
            <a
              key={grade.name}
              href="#courses"
              className="group flex min-h-44 flex-col items-center justify-center gap-3 rounded-3xl bg-cream p-4 text-center shadow-soft ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-brand-amber-soft hover:shadow-lift"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110 ${
                  i % 2 === 0
                    ? "bg-gradient-to-br from-brand-amber to-brand-amber-dark"
                    : "bg-gradient-to-br from-brand-teal to-brand-teal-dark"
                }`}
              >
                <grade.icon className="h-7 w-7" strokeWidth={1.9} aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-extrabold sm:text-lg">
                  {grade.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-muted transition-colors group-hover:text-brand-teal-dark">
                  استكشف الكورسات
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
