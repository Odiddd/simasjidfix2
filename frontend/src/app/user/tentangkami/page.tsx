// import Header from "@/components/Header";
import HeroSection from "@/components/user/tentangkami/HeroSection";
import DonationSection from "@/components/user/tentangkami/DonationSection";
import Footer from "@/components/user/tentangkami/Footer";
// import Navbar from "@/components/tentangkami/Navbar";
import JadwalAdzan from "@/components/user/tentangkami/JadwalAdzan";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <DonationSection/>
      <JadwalAdzan/>
      <Footer />
      {/* <Navbar /> */}
    </div>
  );
}
