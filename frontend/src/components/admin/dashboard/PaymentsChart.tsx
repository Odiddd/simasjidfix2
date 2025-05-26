// components/PaymentsChart.tsx
import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

const PaymentsChart: React.FC = () => {
  // Sample data points for the chart
  const generatePath = (data: number[], width: number, height: number) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const revenueData = [15, 25, 35, 45, 40, 50, 65, 75, 70, 80, 85, 70];
  const salesData = [10, 20, 30, 40, 35, 45, 60, 70, 65, 75, 80, 65];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Payments Overview</h3>
        <div className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg cursor-pointer">
          <span className="text-gray-300 text-sm">Monthly</span>
          <ChevronDownIcon size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="relative">
        <svg width="100%" height="200" viewBox="0 0 400 200" className="overflow-visible">
          {/* Grid lines */}
          {[0, 20, 40, 60, 80, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={200 - (y * 2)}
              x2="400"
              y2={200 - (y * 2)}
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Revenue area */}
          <defs>
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Revenue area fill */}
          <path
            d={`${generatePath(revenueData, 400, 160)} L 400,200 L 0,200 Z`}
            fill="url(#revenueGradient)"
          />

          {/* Sales area fill */}
          <path
            d={`${generatePath(salesData, 400, 160)} L 400,200 L 0,200 Z`}
            fill="url(#salesGradient)"
          />

          {/* Revenue line */}
          <path
            d={generatePath(revenueData, 400, 160)}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Sales line */}
          <path
            d={generatePath(salesData, 400, 160)}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-xs text-gray-400">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
          {[100, 80, 60, 40, 20, 0].map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentsChart;