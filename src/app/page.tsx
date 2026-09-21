import PharmacyLoading from "@/components/pharmacy-loading";
import Hero from "@/components/hero";
import FeaturedCourses from "@/components/featured-courses";
import GradeCategories from "@/components/grade-categories";
import VideoSection from "@/components/video-section";
import About from "@/components/about";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      {/* (2026-و75-C) شاشة تحميل الصيدلية — طبقة client فوق الصفحة وتختفي بعد 1.5ث */}
      <PharmacyLoading />
      <Hero />
      <FeaturedCourses />
      <GradeCategories />
      <VideoSection />
      <About />
      <Contact />
    </>
  );
}
