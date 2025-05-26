import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background image with darker overlay */}
      <div className="absolute inset-0 bg-black z-0">
        <div className="absolute inset-0 bg-black opacity-70"></div>
         <Image 
              src="/image/masjidhd2.jpg" 
              alt="Masjid Al-Ikhlash" 
              fill
              
              priority
            />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 flex items-center h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Mosque image */}
          <div className="rounded-lg overflow-hidden">
            <Image 
              src="/image/masjid1.jpg" 
              alt="Masjid Al-Ikhlash" 
              width={500} 
              height={350}
              className="rounded-lg"
              priority
            />
          </div>
          
          {/* Right side - About information */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h2>
            <p className="text-lg">
              Masjid Al-Ikhlash merupakan sebuah Masjid sederhana 
              yang dibangun di atas lahan fasilitas umum (fasum) di
              Perumahan Vila Mutiara Cikarang Blok A. Bangunan 
              Masjid seluas ± 210 m2 mulai dibangun pada tahun 2003
              melalui sumbangan tanah fasum dari pengembang dan
              dana swadaya masyarakat.
            </p>
            <p></p>
             <p className="text-lg">
              Kami berkomitmen untuk menjadikan Masjid Al-Ikhlash sebagai pusat kegiatan keagamaan 
              dan sosial bagi masyarakat sekitar. Berbagai program rutin seperti pengajian, kajian, 
              dan kegiatan sosial diadakan untuk memakmurkan masjid dan meningkatkan ketakwaan jamaah.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;