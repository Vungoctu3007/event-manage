import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/organizer/create-event');
  };

  return (
    <header
      style={{ backgroundColor: '#292D2B' }}
      className="bg-primary text-gray-100 p-2 flex items-center justify-between h-[60px]"
    >
      <div className="flex items-center space-x-3">
        <h2 className="text-xl font-medium">Sự kiện của tôi</h2>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          onClick={handleCreateEvent}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </Button>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-300 hover:text-gray-100 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">
            1
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500">
              <span className="text-sm">TK</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-100">
            <DropdownMenuItem>Tài khoản</DropdownMenuItem>
            <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;