import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>
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
      </body>
    </html>
  );
}
