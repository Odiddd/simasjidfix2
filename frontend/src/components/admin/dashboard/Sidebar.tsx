// components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  CalendarIcon, 
  UserIcon, 
  CheckSquareIcon, 
  MessageSquareIcon,
  TableIcon,
  FileTextIcon,
  InboxIcon,
  ChevronDownIcon
} from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  hasSubmenu?: boolean;
  badge?: string;
  badgeColor?: string;
}

const Sidebar: React.FC = () => {
  const mainMenuItems: MenuItem[] = [
    { icon: <HomeIcon size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: <CalendarIcon size={20} />, label: 'Reservasi', href: '/admin/reservasi' },
    { icon: <UserIcon size={20} />, label: 'Profile', href: '/profile' },
    { icon: <CheckSquareIcon size={20} />, label: 'Tasks', href: '/tasks', hasSubmenu: true },
    { icon: <MessageSquareIcon size={20} />, label: 'Forms', href: '/forms', hasSubmenu: true },
    { icon: <TableIcon size={20} />, label: 'Tables', href: '/tables', hasSubmenu: true },
    { icon: <FileTextIcon size={20} />, label: 'Pages', href: '/pages', hasSubmenu: true },
  ];


  const renderMenuItem = (item: MenuItem, index: number) => {
    const content = (
      <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-lg mx-2">
        <div className="flex items-center space-x-3">
          <span className="text-gray-400">{item.icon}</span>
          <span className="text-gray-300">{item.label}</span>
        </div>
        <div className="flex items-center space-x-2">
          {item.badge && (
            <span className={`px-2 py-1 text-xs rounded-full text-white ${item.badgeColor}`}>
              {item.badge}
            </span>
          )}
          {item.hasSubmenu && (
            <ChevronDownIcon size={16} className="text-gray-400" />
          )}
        </div>
      </div>
    );

    return item.href ? (
      <Link key={index} href={item.href}>
        {content}
      </Link>
    ) : (
      <div key={index}>{content}</div>
    );
  };

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-semibold text-white">Masjid Al-Muhajirin</span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="py-4">
        <div className="px-6 mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Menu
          </h3>
        </div>
        <div className="space-y-1">
          {mainMenuItems.map((item, index) => renderMenuItem(item, index))}
        </div>
      </div>

      {/* Support */}
      <div className="py-4">
        <div className="px-6 mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            
          </h3>
        </div>
        <div className="space-y-1">
          {/* {supportItems.map((item, index) => renderMenuItem(item, index))} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
