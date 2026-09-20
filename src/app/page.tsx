import Hero from "@/components/hero";
import FeaturedCourses from "@/components/featured-courses";
import GradeCategories from "@/components/grade-categories";
import VideoSection from "@/components/video-section";
import About from "@/components/about";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <GradeCategories />
      <VideoSection />
      <About />
      <Contact />
    </>
  );
}
