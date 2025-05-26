// import Header from "@/components/Header";
import HeroSection from "@/components/user/beranda/HeroSection";
import FeatureSection from "@/components/user/beranda/FeatureSection";
import EventsSection from "@/components/user/beranda/EventsSection";
import MapSection from "@/components/user/beranda/MapSection";
import JadwalAdzan from "@/components/user/beranda/JadwalAdzan";
import Footer from "@/components/user/beranda/Footer";


export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <FeatureSection />
      <EventsSection />
      <MapSection />
      <JadwalAdzan />
      <Footer />
      
    </div>
  );
}
