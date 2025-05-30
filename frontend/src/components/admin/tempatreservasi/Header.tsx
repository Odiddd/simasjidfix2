// components/Header.tsx
import React from 'react';
import { SearchIcon, SunIcon, MoonIcon, BellIcon, ChevronDownIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm">Next.js Admin Dashboard Solution</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 w-64"
            />
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center bg-gray-700 rounded-lg p-1">
            <button className="p-2 rounded-md bg-gray-600 text-gray-300">
              <SunIcon size={18} />
            </button>
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-300">
              <MoonIcon size={18} />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 bg-gray-700 rounded-lg text-gray-300 hover:text-white">
              <BellIcon size={20} />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JS</span>
            </div>
            <div className="hidden md:block">
              <p className="text-white text-sm font-medium">John Smith</p>
            </div>
            <ChevronDownIcon size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;