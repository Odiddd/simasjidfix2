// src/components/ReservationSection.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from '@/components/ui/Carousel';

const ReservationSection: React.FC = () => {
  const images = [
    '/image/masjidutama.jpg',
    '/image/halamanmasjid.jpg',
    '/image/halamanmasjid2.jpg',
    '/image/mimbarmasjid.jpg',
    '/image/tempatsholat.jpg',
    '/image/interiormasjid.jpg'
  ];

  return (
    <div className="py-16 bg-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-black mb-4 border-b-2 border-amber-500 pb-2 inline-block">
              Reservasi Masjid Al-Muhajjirin
            </h2>
            <p className="text-black mt-6">
              Temukan berbagai layanan dan fasilitas yang tersedia di Masjid Al-Muhajjirin. Rencanakan kunjungan atau partisipasi Anda dengan reservasi sekarang!
            </p>
          </div>
          
          {/* Right Content - Carousel */}
          <div className="w-full md:w-1/2 relative">
            <Carousel images={images} />
            
            {/* Navigation arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button className="bg-white bg-opacity-50 rounded-full p-2 ml-2">
                &lt;
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button className="bg-white bg-opacity-50 rounded-full p-2 mr-2">
                &gt;
              </button>
            </div>
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images.map((_, index) => (
                <button 
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSection;