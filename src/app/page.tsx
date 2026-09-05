import HeroSection from "@/components/home/HeroSection";
import CampaignSection from "@/components/CampaignSection";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import AboutSection from "@/components/home/AboutSection";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div style={{ paddingBottom: "clamp(32px,4vw,48px)" }}>
      <HeroSection />
      <CampaignSection />
      <Categories />
      <BestSellers />
      <AboutSection />
      <Testimonials />
      <ContactSection />
    </div>
  );
}
