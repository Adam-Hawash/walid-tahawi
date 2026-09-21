// ============================================================
// content.ts — المصدر الواحد لكل نصوص الموقع (عربي + إنجليزي)
// ============================================================
// كل نص في الموقع بيتعرّف هنا كـ { ar, en }:
//  - الطالب لو حوّل الموقع للإنجليزي يشوف الإنجليزي، ولو عربي يشوف العربي
//  - النصوص العربية هي نفس النصوص المعتمدة في التصميم حرفيًا
//  - DEFAULTS هو خريطة الكونفج المسطحة (مفتاح_ar / مفتاح_en) اللي
//    بيتقرا منها الأدمن و API /api/config — والمكونات بتستخدم المفاتيح دي
//    عشان المستر يقدر يعدّل أي نص من صفحة الأدمن
// ============================================================

export type Bi = { ar: string; en: string };

// ثوابت التواصل الافتراضية (من src/lib/site.ts — بتتفضل لو الكونفج فاضي)
import {
  WHATSAPP_NUMBER,
  PHONE_NUMBER,
  PHONE_DISPLAY,
  FACEBOOK_URL,
  WORKING_HOURS,
} from "./site";

export const SITE_CONTENT = {
  // ---------------------------------------------------------
  // النافيبار
  // ---------------------------------------------------------
  navbar: {
    brandPrefix: { ar: "منصة", en: "Mr." } as Bi,
    brandHighlight: { ar: "وليد التحاوي", en: "Walid Eltahawi" } as Bi,
    cta: { ar: "ابدأ الآن", en: "Get Started" } as Bi,
    links: [
      { href: "#home", label: { ar: "الرئيسية", en: "Home" } as Bi },
      { href: "#courses", label: { ar: "الكورسات", en: "Courses" } as Bi },
      { href: "#grades", label: { ar: "الصفوف الدراسية", en: "Grades" } as Bi },
      { href: "#about", label: { ar: "عن المستر", en: "About the Teacher" } as Bi },
      { href: "#contact", label: { ar: "تواصل معنا", en: "Contact Us" } as Bi },
    ],
  },

  // ---------------------------------------------------------
  // الهيرو
  // ---------------------------------------------------------
  hero: {
    badge: {
      ar: "منصة وليد التحاوي التعليمية",
      en: "Mr. Walid Eltahawi's Learning Platform",
    } as Bi,
    title: { ar: "رحلة التفوق الدراسي", en: "Learn Math" } as Bi,
    titleHighlight: { ar: "تبدأ من هنا", en: "the Smart Way" } as Bi,
    paragraph: {
      ar: "شرح مبسّط وممتع، متابعة مستمرة لكل طالب، وامتحانات تدريبية على نفس نمط الامتحانات الحقيقية — كل ده في مكان واحد وبيوصلك لأعلى الدرجات بثقة.",
      en: "Simple, engaging explanations, continuous follow-up for every student, and practice exams modeled on the real thing — all in one place, taking you to top grades with confidence.",
    } as Bi,
    btnPrimary: { ar: "استكشف الكورسات", en: "Explore Courses" } as Bi,
    btnSecondary: { ar: "تواصل واتساب", en: "Chat on WhatsApp" } as Bi,
    highlights: [
      { ar: "شرح مبسّط وواضح", en: "Clear, simple explanations" } as Bi,
      { ar: "متابعة لكل طالب", en: "Personal follow-up for every student" } as Bi,
      { ar: "نتائج تتكلم عن نفسها", en: "Results that speak for themselves" } as Bi,
    ],
    imageAlt: {
      ar: "المستر وليد التحاوي — معلم شاب مبتسم يرحب بطلاب المنصة",
      en: "Mr. Walid Eltahawi — a smiling young teacher welcoming his students",
    } as Bi,
    float1Title: { ar: "شروح مبسّطة", en: "Simple Explanations" } as Bi,
    float1Sub: { ar: "كل درس خطوة للأمام", en: "Every lesson, a step forward" } as Bi,
    float2Title: { ar: "متابعة مستمرة", en: "Continuous Support" } as Bi,
    float2Sub: { ar: "لسة عندك دايمًا", en: "Always there for you" } as Bi,
  },

  // ---------------------------------------------------------
  // الكورسات
  // ---------------------------------------------------------
  courses: {
    badge: { ar: "الكورسات", en: "Courses" } as Bi,
    title: { ar: "كورسات مميزة", en: "Featured Courses" } as Bi,
    subtitle: {
      ar: "اختار الكورس اللي يناسبك وابدأ رحلتك — كل كورس مصمم بعناية عشان يوصلك للفهم الحقيقي مش مجرد الحفظ.",
      en: "Pick the course that suits you and start your journey — every course is carefully designed to bring you real understanding, not just memorization.",
    } as Bi,
    priceCurrency: { ar: "ج.م", en: "EGP" } as Bi,
    subscribe: { ar: "اشترك الآن", en: "Enroll Now" } as Bi,
    subscribeAria: {
      ar: "اشترك الآن في كورس {course} عبر واتساب",
      en: "Enroll now in the {course} course via WhatsApp",
    } as Bi,
    items: [
      {
        title: { ar: "رياضيات", en: "Mathematics" } as Bi,
        desc: {
          ar: "شرح مبسّط لأصعب المسائل مع تدريبات مكثفة على كل درس.",
          en: "Clear explanations of the hardest problems with intensive practice in every lesson.",
        } as Bi,
        price: 300,
        img: "/images/course-math.webp",
        alt: {
          ar: "رسم توضيحي لكورس الرياضيات — أدوات هندسية ورموز رياضية",
          en: "Illustration for the Mathematics course — geometry tools and math symbols",
        } as Bi,
      },
      {
        title: { ar: "فيزياء", en: "Physics" } as Bi,
        desc: {
          ar: "تجارب وتطبيقات عملية تخلي القوانين أسهل في الفهم.",
          en: "Hands-on experiments and real-life applications that make the laws easier to grasp.",
        } as Bi,
        price: 300,
        img: "/images/course-physics.webp",
        alt: {
          ar: "رسم توضيحي لكورس الفيزياء — نموذج الذرة ومنشور الضوء",
          en: "Illustration for the Physics course — an atom model and a light prism",
        } as Bi,
      },
      {
        title: { ar: "كيمياء", en: "Chemistry" } as Bi,
        desc: {
          ar: "تلخيص شامل للمنهج مع مراجعات مستمرة قبل الامتحانات.",
          en: "A comprehensive curriculum summary with continuous revision before exams.",
        } as Bi,
        price: 300,
        img: "/images/course-chemistry.webp",
        alt: {
          ar: "رسم توضيحي لكورس الكيمياء — دورق ومختبر وأدوات تجارب",
          en: "Illustration for the Chemistry course — a flask, a lab, and experiment tools",
        } as Bi,
      },
      {
        title: { ar: "علوم", en: "Science" } as Bi,
        desc: {
          ar: "محتوى بصري ممتع يقرّب العلم لكل الطلاب بخطوات بسيطة.",
          en: "Engaging visual content that brings science closer to every student, step by step.",
        } as Bi,
        price: 250,
        img: "/images/course-science.webp",
        alt: {
          ar: "رسم توضيحي لكورس العلوم — مجهر وكوكب ومركبات علمية",
          en: "Illustration for the Science course — a microscope, a planet, and scientific vehicles",
        } as Bi,
      },
      {
        title: { ar: "لغة عربية", en: "Arabic Language" } as Bi,
        desc: {
          ar: "قواعد ونصوص وبلاغة بطريقة منظمة وسهلة الحفظ والفهم.",
          en: "Grammar, texts, and rhetoric organized in a way that's easy to memorize and understand.",
        } as Bi,
        price: 250,
        img: "/images/course-arabic.webp",
        alt: {
          ar: "رسم توضيحي لكورس اللغة العربية — كتاب مفتوح وريشة كتابة",
          en: "Illustration for the Arabic course — an open book and a quill",
        } as Bi,
      },
      {
        title: { ar: "لغة إنجليزية", en: "English Language" } as Bi,
        desc: {
          ar: "أساسيات قوية في القواعد والمحادثة خطوة بخطوة.",
          en: "Strong foundations in grammar and conversation, step by step.",
        } as Bi,
        price: 250,
        img: "/images/course-english.webp",
        alt: {
          ar: "رسم توضيحي لكورس اللغة الإنجليزية — كتاب وفقاعات حوار",
          en: "Illustration for the English course — a book and speech bubbles",
        } as Bi,
      },
    ],
  },

  // ---------------------------------------------------------
  // الصفوف الدراسية (رابعة وخمسة ابتدائي جديد + الإعدادي والثانوي)
  // ---------------------------------------------------------
  grades: {
    badge: { ar: "الصفوف الدراسية", en: "Academic Grades" } as Bi,
    title: { ar: "تصفح حسب الصف", en: "Browse by Grade" } as Bi,
    subtitle: {
      ar: "كورسات مصممة خصيصًا لكل صف دراسي — من رابعة الابتدائي لحد ثالثة الثانوي، دايمًا في محتوى مناسب لمستواك.",
      en: "Courses designed specifically for every grade — from Grade 4 Primary to Grade 12, there's always content that fits your level.",
    } as Bi,
    explore: { ar: "استكشف الكورسات", en: "Explore Courses" } as Bi,
    items: [
      { id: "grade1", name: { ar: "رابعة ابتدائي", en: "Grade 4" } as Bi },
      { id: "grade2", name: { ar: "خمسة ابتدائي", en: "Grade 5" } as Bi },
      { id: "grade3", name: { ar: "الأول الإعدادي", en: "Grade 7" } as Bi },
      { id: "grade4", name: { ar: "الثاني الإعدادي", en: "Grade 8" } as Bi },
      { id: "grade5", name: { ar: "الثالث الإعدادي", en: "Grade 9" } as Bi },
      { id: "grade6", name: { ar: "الأول الثانوي", en: "Grade 10" } as Bi },
      { id: "grade7", name: { ar: "الثاني الثانوي", en: "Grade 11" } as Bi },
      { id: "grade8", name: { ar: "الثالث الثانوي", en: "Grade 12" } as Bi },
    ],
  },

  // ---------------------------------------------------------
  // الفيديو التعريفي
  // ---------------------------------------------------------
  video: {
    badge: { ar: "فيديو تعريفي", en: "Intro Video" } as Bi,
    title: { ar: "كلمة من المستر وليد", en: "A Word from Mr. Walid" } as Bi,
    subtitle: {
      ar: "شوف بنفسك أسلوب الشرح وفكرت المنصة في أقل من دقيقتين.",
      en: "See his teaching style and the platform's vision for yourself in under two minutes.",
    } as Bi,
    iframeTitle: {
      ar: "الفيديو التعريفي للمستر وليد التحاوي",
      en: "Intro video by Mr. Walid Eltahawi",
    } as Bi,
    placeholderTitle: {
      ar: "الفيديو التعريفي قريبًا",
      en: "Intro video coming soon",
    } as Bi,
    placeholderDesc: {
      ar: "الفيديو التعريفي هيضاف هنا أول ما يكون جاهز — واستنى خبارق جديدة على طول.",
      en: "The intro video will be added here as soon as it's ready — stay tuned for more.",
    } as Bi,
  },

  // ---------------------------------------------------------
  // عن المنصة / عن المستر
  // ---------------------------------------------------------
  about: {
    badge: { ar: "عن المنصة", en: "About the Platform" } as Bi,
    title: { ar: "هنا الطالب بيفهم…", en: "Where Students Understand…" } as Bi,
    titleHighlight: { ar: "مش بس يحفظ", en: "Not Just Memorize" } as Bi,
    p1: {
      ar: "منصة وليد التحاوي مش مجرد كورسات — دي بيئة تعليمية كاملة اتصممت عشان الطالب يفهم من الأساس ويبني فوقه خطوة بخطوة، لحد ما يبقى جاهز لأي امتحان وبكل ثقة.",
      en: "Mr. Walid Eltahawi's platform is more than just courses — it's a complete learning environment designed so students understand from the ground up and build knowledge step by step, until they're ready for any exam, with full confidence.",
    } as Bi,
    p2: {
      ar: "هدفنا بسيط: نخلّي المذاكرة أسهل وأوضح، وندي كل طالب الدعم اللي يخليه يحب المادة ويحقق أفضل نتيجة ممكنة.",
      en: "Our goal is simple: make studying easier and clearer, and give every student the support that makes them love the subject and achieve their best possible result.",
    } as Bi,
    features: [
      {
        title: { ar: "شرح مبسّط", en: "Simple Explanations" } as Bi,
        desc: {
          ar: "كل درس بيشرح بأمثلة من الحياة اليومية لحد ما يثبت تمامًا.",
          en: "Every lesson uses real-life examples until the idea truly sticks.",
        } as Bi,
      },
      {
        title: { ar: "متابعة فردية", en: "Personal Follow-up" } as Bi,
        desc: {
          ar: "كل طالب بيتابع مستواه ونقطته أول بأول طول الفصل.",
          en: "Each student's level and performance are tracked throughout the term.",
        } as Bi,
      },
      {
        title: { ar: "امتحانات دورية", en: "Regular Exams" } as Bi,
        desc: {
          ar: "اختبارات مستمرة بنفس نمط الامتحان الحقيقي عشان مفيش مفاجآت.",
          en: "Continuous tests in the same style as the real exam — no surprises.",
        } as Bi,
      },
      {
        title: { ar: "تقارير لأولياء الأمور", en: "Parent Reports" } as Bi,
        desc: {
          ar: "ولي الأمر بيفضل متابع تقدم ابنه أول بأول من غير أي مجهود.",
          en: "Parents stay up to date on their child's progress with zero effort.",
        } as Bi,
      },
    ],
    stats: [
      {
        value: 5000,
        suffix: "+",
        label: { ar: "طالب انضموا للمنصة", en: "Students joined the platform" } as Bi,
      },
      {
        value: 12,
        suffix: "+",
        label: { ar: "سنة خبرة في التدريس", en: "Years of teaching experience" } as Bi,
      },
      {
        value: 98,
        suffix: "%",
        label: { ar: "نسبة نجاح بين طلابنا", en: "Success rate among our students" } as Bi,
      },
    ],
  },

  // ---------------------------------------------------------
  // التواصل
  // ---------------------------------------------------------
  contact: {
    badge: { ar: "تواصل", en: "Contact" } as Bi,
    title: { ar: "تواصل معنا", en: "Contact Us" } as Bi,
    subtitle: {
      ar: "عندك أي سؤال عن الكورسات أو الحجز؟ فريقنا جاهز يرد عليك في أي وقت ويوصلك لكل جديد.",
      en: "Got a question about courses or booking? Our team is ready to answer anytime and keep you updated.",
    } as Bi,
    whatsappTitle: { ar: "واتساب", en: "WhatsApp" } as Bi,
    whatsappDesc: {
      ar: "ابعتلنا رسالة وسنرد عليك في أسرع وقت ممكن.",
      en: "Send us a message and we'll reply as soon as possible.",
    } as Bi,
    whatsappCta: { ar: "ابدأ المحادثة", en: "Start Chat" } as Bi,
    phoneTitle: { ar: "تليفون", en: "Phone" } as Bi,
    phoneDesc: {
      ar: "كلمنا مباشرة على الرقم التالي خلال {hours}.",
      en: "Call us directly at the number below during {hours}.",
    } as Bi,
    facebookTitle: { ar: "فيسبوك", en: "Facebook" } as Bi,
    facebookDesc: {
      ar: "تابع صفحتنا لأخبار المنصة والمواعيد المهمة أول بأول.",
      en: "Follow our page for platform news and important dates, first-hand.",
    } as Bi,
    facebookCta: { ar: "افتح الصفحة", en: "Open Page" } as Bi,
    workingHours: { ar: WORKING_HOURS, en: "10 AM to 10 PM" } as Bi,
    bookingTitle: { ar: "الحجز عبر الهاتف", en: "Book by Phone" } as Bi,
    bookingText: {
      ar: "لو حابب تحجز مكانك أو تستفسر عن المجموعات، كلمنا بين {hours} و هنرد عليك فورًا.",
      en: "Want to book your spot or ask about groups? Call us between {hours} and we'll get back to you right away.",
    } as Bi,
    callNow: { ar: "اتصل الآن", en: "Call Now" } as Bi,
  },

  // ---------------------------------------------------------
  // الفوتر
  // ---------------------------------------------------------
  footer: {
    brand: { ar: "منصة وليد التحاوي", en: "Mr. Walid Eltahawi Platform" } as Bi,
    about: {
      ar: "مكانك الآمن لتتعلم وتفهم كل المواد بأسلوب مبسّط وممتع، وتوصل لأعلى الدرجات وانت متطمن.",
      en: "Your safe place to learn and understand every subject in a simple, fun way — and reach top grades with peace of mind.",
    } as Bi,
    quickLinksTitle: { ar: "روابط سريعة", en: "Quick Links" } as Bi,
    gradesTitle: { ar: "الصفوف الدراسية", en: "Academic Grades" } as Bi,
    contactTitle: { ar: "تواصل معنا", en: "Contact Us" } as Bi,
    whatsappLabel: { ar: "واتساب المنصة", en: "Platform WhatsApp" } as Bi,
    facebookLabel: { ar: "صفحة الفيسبوك", en: "Facebook Page" } as Bi,
    copyright: {
      ar: "© {year} منصة وليد التحاوي — جميع الحقوق محفوظة.",
      en: "© {year} Mr. Walid Eltahawi Platform — All rights reserved.",
    } as Bi,
  },
};

// ============================================================
// DEFAULTS — الخريطة المسطحة لكل مفاتيح الكونفج (مفتاح_ar / مفتاح_en)
// دي اللي بيقرا منها /api/config والأدمن، والمكونات بتستخدمها كقيم بداية
// ============================================================

const D: Record<string, string> = {};

function bi(map: Record<string, string>, key: string, v: Bi) {
  map[`${key}_ar`] = v.ar;
  map[`${key}_en`] = v.en;
}

// --- النافيبار ---
bi(D, "navbar_brand_prefix", SITE_CONTENT.navbar.brandPrefix);
bi(D, "navbar_brand_highlight", SITE_CONTENT.navbar.brandHighlight);
bi(D, "navbar_cta", SITE_CONTENT.navbar.cta);
SITE_CONTENT.navbar.links.forEach((l, i) =>
  bi(D, `navbar_link_${i + 1}`, l.label)
);

// --- الهيرو ---
bi(D, "hero_badge", SITE_CONTENT.hero.badge);
bi(D, "hero_title", SITE_CONTENT.hero.title);
bi(D, "hero_title_highlight", SITE_CONTENT.hero.titleHighlight);
bi(D, "hero_paragraph", SITE_CONTENT.hero.paragraph);
bi(D, "hero_btn_primary", SITE_CONTENT.hero.btnPrimary);
bi(D, "hero_btn_secondary", SITE_CONTENT.hero.btnSecondary);
SITE_CONTENT.hero.highlights.forEach((h, i) =>
  bi(D, `hero_highlight_${i + 1}`, h)
);
bi(D, "hero_float1_title", SITE_CONTENT.hero.float1Title);
bi(D, "hero_float1_sub", SITE_CONTENT.hero.float1Sub);
bi(D, "hero_float2_title", SITE_CONTENT.hero.float2Title);
bi(D, "hero_float2_sub", SITE_CONTENT.hero.float2Sub);

// --- الكورسات ---
bi(D, "courses_badge", SITE_CONTENT.courses.badge);
bi(D, "courses_title", SITE_CONTENT.courses.title);
bi(D, "courses_subtitle", SITE_CONTENT.courses.subtitle);
bi(D, "courses_price_currency", SITE_CONTENT.courses.priceCurrency);
bi(D, "courses_subscribe", SITE_CONTENT.courses.subscribe);
SITE_CONTENT.courses.items.forEach((c, i) => {
  bi(D, `course${i + 1}_title`, c.title);
  bi(D, `course${i + 1}_desc`, c.desc);
  bi(D, `course${i + 1}_alt`, c.alt);
  D[`course${i + 1}_price`] = String(c.price);
  D[`course${i + 1}_img`] = c.img;
});

// --- الصفوف ---
bi(D, "grades_badge", SITE_CONTENT.grades.badge);
bi(D, "grades_title", SITE_CONTENT.grades.title);
bi(D, "grades_subtitle", SITE_CONTENT.grades.subtitle);
bi(D, "grades_explore", SITE_CONTENT.grades.explore);
SITE_CONTENT.grades.items.forEach((g, i) => bi(D, `grade${i + 1}_name`, g.name));

// --- الفيديو ---
bi(D, "video_badge", SITE_CONTENT.video.badge);
bi(D, "video_title", SITE_CONTENT.video.title);
bi(D, "video_subtitle", SITE_CONTENT.video.subtitle);
bi(D, "video_placeholder_title", SITE_CONTENT.video.placeholderTitle);
bi(D, "video_placeholder_desc", SITE_CONTENT.video.placeholderDesc);
D["video_id"] = "";

// --- عن المستر ---
bi(D, "about_badge", SITE_CONTENT.about.badge);
bi(D, "about_title", SITE_CONTENT.about.title);
bi(D, "about_title_highlight", SITE_CONTENT.about.titleHighlight);
bi(D, "about_p1", SITE_CONTENT.about.p1);
bi(D, "about_p2", SITE_CONTENT.about.p2);
SITE_CONTENT.about.features.forEach((f, i) => {
  bi(D, `about_f${i + 1}_title`, f.title);
  bi(D, `about_f${i + 1}_desc`, f.desc);
});
SITE_CONTENT.about.stats.forEach((s, i) => {
  bi(D, `about_stat${i + 1}_label`, s.label);
  D[`about_stat${i + 1}_value`] = String(s.value);
  D[`about_stat${i + 1}_suffix`] = s.suffix;
});

// --- التواصل ---
bi(D, "contact_badge", SITE_CONTENT.contact.badge);
bi(D, "contact_title", SITE_CONTENT.contact.title);
bi(D, "contact_subtitle", SITE_CONTENT.contact.subtitle);
bi(D, "contact_whatsapp_title", SITE_CONTENT.contact.whatsappTitle);
bi(D, "contact_whatsapp_desc", SITE_CONTENT.contact.whatsappDesc);
bi(D, "contact_whatsapp_cta", SITE_CONTENT.contact.whatsappCta);
bi(D, "contact_phone_title", SITE_CONTENT.contact.phoneTitle);
bi(D, "contact_phone_desc", SITE_CONTENT.contact.phoneDesc);
bi(D, "contact_facebook_title", SITE_CONTENT.contact.facebookTitle);
bi(D, "contact_facebook_desc", SITE_CONTENT.contact.facebookDesc);
bi(D, "contact_facebook_cta", SITE_CONTENT.contact.facebookCta);
bi(D, "contact_working_hours", SITE_CONTENT.contact.workingHours);
bi(D, "contact_booking_title", SITE_CONTENT.contact.bookingTitle);
bi(D, "contact_booking_text", SITE_CONTENT.contact.bookingText);
bi(D, "contact_call_now", SITE_CONTENT.contact.callNow);
D["whatsapp_number"] = WHATSAPP_NUMBER;
D["contact_phone"] = PHONE_NUMBER;
D["contact_phone_display"] = PHONE_DISPLAY;
D["facebook_url"] = FACEBOOK_URL;

// --- الفوتر ---
bi(D, "footer_brand", SITE_CONTENT.footer.brand);
bi(D, "footer_about", SITE_CONTENT.footer.about);
bi(D, "footer_quick_links_title", SITE_CONTENT.footer.quickLinksTitle);
bi(D, "footer_grades_title", SITE_CONTENT.footer.gradesTitle);
bi(D, "footer_contact_title", SITE_CONTENT.footer.contactTitle);
bi(D, "footer_whatsapp_label", SITE_CONTENT.footer.whatsappLabel);
bi(D, "footer_facebook_label", SITE_CONTENT.footer.facebookLabel);
bi(D, "footer_copyright", SITE_CONTENT.footer.copyright);

export const DEFAULTS: Record<string, string> = D;
