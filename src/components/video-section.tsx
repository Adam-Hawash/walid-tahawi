import { MonitorPlay } from "lucide-react";

// ============================================================
// حط هنا معرف فيديو اليوتيوب التعريفي
// (ده الجزء اللي بيكون بعد watch?v= في لينك الفيديو — مثال: dQw4w9WgXcQ)
// لما تسيبه فاضي هيظهر كارت-placeholder أنيق مكان الفيديو
// ============================================================
const VIDEO_ID = "";

export default function VideoSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* عنوان القسم */}
        <div className="text-center">
          <span className="inline-flex min-h-9 items-center rounded-full bg-brand-amber-soft px-4 text-sm font-bold text-brand-amber-dark">
            فيديو تعريفي
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            كلمة من المستر وليد
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            شوف بنفسك أسلوب الشرح وفكرت المنصة في أقل من دقيقتين.
          </p>
        </div>

        {/* الفيديو — 16:9 متجاوب مع كل الشاشات */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/5">
            {VIDEO_ID ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                title="الفيديو التعريفي للمستر وليد التحاوي"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-brand-amber-soft via-cream to-brand-teal-soft px-6 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-amber to-brand-amber-dark text-white shadow-glow-amber">
                  <MonitorPlay className="h-9 w-9" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="text-xl font-extrabold sm:text-2xl">
                  الفيديو التعريفي قريبًا
                </p>
                <p className="max-w-md leading-relaxed text-muted">
                  الفيديو التعريفي هيضاف هنا أول ما يكون جاهز — واستنى خبارق
                  جديدة على طول.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
