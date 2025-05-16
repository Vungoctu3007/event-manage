import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  FileCheck, 
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const navItems: NavItem[] = [
    {
      label: 'Sự kiện của tôi',
      icon: <Calendar className="w-5 h-5" />,
      path: '/organizer/events',
    },
    {
      label: 'Quản lý báo cáo',
      icon: <FileText className="w-5 h-5" />,
      path: '/organizer/report',
    },
    {
      label: 'Điều khoản cho Ban tổ chức',
      icon: <FileCheck className="w-5 h-5" />,
      path: '/terms',
    },
  ];

  return (
    <aside  style={{ backgroundColor: '#1C2A24' }} className="w-64 h-screen text-gray-100 flex flex-col shadow-2xl ">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">OC</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Organizer Center
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-green-600/20 text-green-400'
                      : 'hover:bg-gray-800 text-gray-300 hover:text-green-400'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Language Selector */}
      <div className="p-4 border-t border-gray-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
            >
              <span>Ngôn ngữ: VN</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-gray-100">
            <DropdownMenuItem className="hover:bg-white focus:bg-gray-700">
              Tiếng Việt
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white focus:bg-gray-700">
              English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;