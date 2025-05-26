// import Header from "@/components/Header";
import HeroSection from "@/components/user/reservasi/HeroSection";
import ReservasiSection from "@/components/user/reservasi/ReservasiSection";
import Footer from "@/components/user/reservasi/Footer";
// import Navbar from "@/components/user/reservasi/Navbar";
import ProgramSection from "@/components/user/reservasi/ProgramSection";
import ReservasionCTA from "@/components/user/reservasi/ReservasionCTA";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <ReservasiSection/>
      <ProgramSection/>
      <ReservasionCTA/>
      <Footer />
      {/* <Navbar /> */}
    </div>
  );
}
