'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/dashboard/Sidebar';
import Header from '@/components/admin/dashboard/Header';
import StatsCards from '@/components/admin/dashboard/StatsCards';
import PaymentsChart from '@/components/admin/dashboard/PaymentsChart';
import ProfitChart from '@/components/admin/dashboard/ProfitChart';

const Dashboard: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/admin/login'); // Redirect jika tidak ada token
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <PaymentsChart />
            </div>
            <div className="lg:col-span-1">
              <ProfitChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
