// src/components/PrayerScheduleSection.tsx

import React from 'react';

interface PrayerTime {
  name: string;
  time: string;
}

const JadwalAdzan: React.FC = () => {
  const prayerTimes: PrayerTime[] = [
    { name: 'Subuh', time: '04.15' },
    { name: 'Zuhur', time: '11.30' },
    { name: 'Ashar', time: '15.10' },
    { name: 'magrib', time: '17.45' },
    { name: 'isya', time: '18.55' },
  ];

  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <div className="bg-amber-400 text-center py-4">
            <h2 className="text-2xl font-bold text-black">JADWAL ADZAN</h2>
          </div>
          <div>
            {prayerTimes.map((prayer, index) => (
              <div 
                key={prayer.name} 
                className={`flex justify-between items-center px-6 py-4 ${
                  index < prayerTimes.length - 1 ? 'border-b border-gray-300' : ''
                }`}
              >
                <span className="text-lg text-black font-medium">
                  {prayer.name}
                </span>
                <span className="text-lg text-black">
                  {prayer.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JadwalAdzan;