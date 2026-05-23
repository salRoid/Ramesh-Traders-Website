import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ProductsPreview from "@/components/home/ProductsPreview";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import CampaignSection from "@/components/CampaignSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CampaignSection />
      <ProductsPreview />
      <WhyUs />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
