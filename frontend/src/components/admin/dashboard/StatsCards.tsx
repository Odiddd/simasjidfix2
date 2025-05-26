// components/StatsCards.tsx
import React from 'react';
import { EyeIcon, DollarSignIcon, PackageIcon, UsersIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
}

const StatsCards: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Total Views',
      value: '3.5K',
      change: '0.43%',
      isPositive: true,
      icon: <EyeIcon size={24} className="text-white" />,
      iconBg: 'bg-green-500'
    },
    {
      title: 'Total Profit',
      value: '$4.2K',
      change: '4.35%',
      isPositive: true,
      icon: <DollarSignIcon size={24} className="text-white" />,
      iconBg: 'bg-orange-500'
    },
    {
      title: 'Total Products',
      value: '3.5K',
      change: '2.59%',
      isPositive: true,
      icon: <PackageIcon size={24} className="text-white" />,
      iconBg: 'bg-purple-500'
    },
    {
      title: 'Total Users',
      value: '3.5K',
      change: '-0.95%',
      isPositive: false,
      icon: <UsersIcon size={24} className="text-white" />,
      iconBg: 'bg-blue-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat.isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {stat.isPositive ? (
                <TrendingUpIcon size={16} />
              ) : (
                <TrendingDownIcon size={16} />
              )}
              <span>{stat.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;