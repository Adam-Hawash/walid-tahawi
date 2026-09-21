import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { LangProvider } from "@/lib/i18n";
import { ConfigProvider } from "@/lib/config";
import "./globals.css";

// خط القاهر — خط عربي نظيف ومناسب للمواقع التعليمية
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "منصة وليد التحاوي | شرح مبسّط ومتابعة مستمرة لكل الصفوف",
  description:
    "منصة المستر وليد التحاوي التعليمية — كورسات لكل المواد بأسلوب مبسّط وممتع، متابعة مستمرة لكل طالب، وامتحانات تدريبية توصلك لأعلى الدرجات بثقة.",
};

export const viewport: Viewport = {
  themeColor: "#ffa41c",
  width: "device-width",
  initialScale: 1,
};

// سكريبت مبكر بيقرا اللغة المحفوظة ويطبق lang/dir على <html>
// قبل أول رسم عشان مفيش وميض (anti-flash) — نفس مفتاح wt_lang
// اللي بيستخدمه LangProvider في src/lib/i18n.tsx
const ANTI_FLASH_SCRIPT = `(function(){try{var l=localStorage.getItem('wt_lang');if(l!=='en'&&l!=='ar')l='ar';var d=document.documentElement;d.lang=l;d.dir=l==='ar'?'rtl':'ltr';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.variable}
      suppressHydrationWarning
    >
      <body>
        {/* بيشتغل قبل الرسم عشان الاتجاه يبقى صح من أول لحظة */}
        <script dangerouslySetInnerHTML={{ __html: ANTI_FLASH_SCRIPT }} />
        <LangProvider>
          <ConfigProvider>
            {/* تحميل صورة الهيرو مسبقًا عشان تظهر فورًا من غير أي تأخير */}
            <link
              rel="preload"
              as="image"
              href="/images/hero-teacher.webp"
              fetchPriority="high"
            />
            {/* الغلاف بيمتد على الشاشة كلها والفوتر بيلزق في الآخر حتى لو المحتوى قصير */}
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ConfigProvider>
        </LangProvider>
      </body>
    </html>
  );
}
