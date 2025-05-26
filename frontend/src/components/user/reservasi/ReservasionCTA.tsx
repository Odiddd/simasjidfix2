// src/components/ReservationCTA.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ReservationCTA: React.FC = () => {
  return (
    <div className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side with icon and heading */}
          <div className="flex items-center mb-8 md:mb-0">
            <div className="mr-4 text-amber-400">
              <Image
                src="/image/logomasjid.png"
                alt="Reservation Icon"
                width={60}
                height={60}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">RESERVASI</h2>
            </div>
          </div>
          
          {/* Right side with text and button */}
          <div className="md:w-2/3">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8 md:w-2/3">
                <p className="text-white">
                  Kami menyediakan layanan reservasi Masjid untuk keperluan bersama dan tidak merugikan pihak manapun seperti acara akad, pengajian, buka bersama, dan lain lain yang masih berkaitan dengan kegiatan keagamaan.
                </p>
              </div>
              
              <div className="md:w-1/3 text-center md:text-right">
                <div className="mb-4 text-center">
                  <p className="text-white">Anda berminat untuk reservasi?</p>
                </div>
                <Link href="/reservasi">
                  <div className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-medium py-3 px-6 rounded-full transition duration-300">
                    Klik disini untuk mengajukan
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCTA;