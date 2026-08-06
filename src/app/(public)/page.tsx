import Category from "@/components/home/Category";
import CtaSection from "@/components/home/CtaSection";
import Hero from "@/components/home/Hero";
import PopularServices from "@/components/home/PopularServices";
import Testimonial from "@/components/home/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Category />
      <PopularServices />
      <Testimonial />
      <CtaSection />
    </div>
  );
}
