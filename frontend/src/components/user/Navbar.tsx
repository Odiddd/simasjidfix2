'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const navItems = [
    { name: "Beranda", href: "/user/beranda" },
    { name: "Tentang Kami", href: "/user/tentangkami" },
    { name: "Reservasi", href: "/user/reservasi" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md shadow-md">
      <nav className="text-white px-10 h-20 max-w-6xl mx-auto flex items-center relative">
        {/* Logo di kiri */}
        <div className="flex items-center h-20 relative z-10">
          <Image
            src="/image/logomasjid2.png" 
                alt="Masjid Raya Al-Muhajjirin Logo"
            width={200}
            height={200}
            className="object-contain -mt-4"
            priority
          />
        </div>

        {/* Menu di tengah */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-10 text-sm font-semibold">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className="cursor-pointer text-yellow-400 hover:text-orange-500 active:text-yellow-400 transition-colors duration-200">
                {item.name}
              </div>
            </Link>
          ))}
        </div>

        {/* Spacer kanan */}
        <div className="w-32" />
      </nav>
    </div>
  );
};

export default Navbar;
