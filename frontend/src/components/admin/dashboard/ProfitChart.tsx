// components/ProfitChart.tsx
import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

const ProfitChart: React.FC = () => {
  const data = [
    { day: 'Mon', sales: 55, revenue: 75 },
    { day: 'Tue', sales: 75, revenue: 60 },
    { day: 'Wed', sales: 60, revenue: 75 },
    { day: 'Thu', sales: 65, revenue: 70 },
    { day: 'Fri', sales: 70, revenue: 80 },
    { day: 'Sat', sales: 65, revenue: 35 },
    { day: 'Sun', sales: 80, revenue: 75 }
  ];

  const maxValue = 100;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Profit this week</h3>
        <div className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg cursor-pointer">
          <span className="text-gray-300 text-sm">This Week</span>
          <ChevronDownIcon size={16} className="text-gray-400" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-gray-400 text-sm">Sales</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span className="text-gray-400 text-sm">Revenue</span>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            {/* Day label */}
            <div className="w-8 text-gray-400 text-sm">{item.day}</div>
            
            {/* Bars container */}
            <div className="flex-1 flex space-x-1">
              {/* Sales bar */}
              <div className="flex-1 bg-gray-700 rounded-full h-6 overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(item.sales / maxValue) * 100}%` }}
                ></div>
              </div>
              
              {/* Revenue bar */}
              <div className="flex-1 bg-gray-700 rounded-full h-6 overflow-hidden">
                <div 
                  className="h-full bg-blue-400 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(item.revenue / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Values */}
            <div className="flex space-x-4 text-sm">
              <span className="text-purple-400 w-8 text-right">{item.sales}</span>
              <span className="text-blue-400 w-8 text-right">{item.revenue}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Scale indicators */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>80</span>
        <span>100</span>
      </div>
    </div>
  );
};

export default ProfitChart;