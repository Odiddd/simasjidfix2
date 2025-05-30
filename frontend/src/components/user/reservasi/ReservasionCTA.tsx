// src/components/ReservationCTA.tsx

'use client'; // Tambahkan directive ini untuk membuat Client Component

import React from 'react';
import Image from 'next/image';

const ReservationCTA: React.FC = () => {
  // Konfigurasi WhatsApp
  const whatsappConfig = {
    phoneNumber: "6288292105178", // Ganti dengan nomor WhatsApp tujuan (format internasional tanpa +)
    message: `Assalamu'alaikum, saya tertarik untuk melakukan reservasi Masjid.

Mohon informasi lebih lanjut terkait:
- Nama : 
- Tempat : 
- Tanggal :
- Waktu :
- Jumlah tamu : 
- Acara :

Terima kasih.`
  };

  // Fungsi untuk membuka WhatsApp
  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappConfig.message);
    
    // URL untuk WhatsApp Web/Desktop
    const whatsappWebUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`;
    
    // URL untuk WhatsApp Mobile App
    const whatsappAppUrl = `whatsapp://send?phone=${whatsappConfig.phoneNumber}&text=${encodedMessage}`;
    
    // Deteksi device dan buka WhatsApp yang sesuai
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Coba buka app WhatsApp dulu, jika gagal fallback ke WhatsApp Web
      window.location.href = whatsappAppUrl;
      
      // Fallback ke WhatsApp Web setelah 2 detik jika app tidak terbuka
      setTimeout(() => {
        window.open(whatsappWebUrl, '_blank');
      }, 2000);
    } else {
      // Desktop: langsung buka WhatsApp Web
      window.open(whatsappWebUrl, '_blank');
    }
  };

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
                <button
                  onClick={openWhatsApp}
                  className="inline-block bg-amber-400 hover:bg-amber-500 text-black font-medium py-3 px-6 rounded-full transition duration-300 cursor-pointer"
                >
                  Klik disini untuk mengajukan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCTA;