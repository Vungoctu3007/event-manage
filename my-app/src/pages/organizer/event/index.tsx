import React from 'react';
import { Home, Search, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const EventHome: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Filter Bar */}
      <div className="flex items-center space-x-3 p-4 bg-gray-900 border-b border-gray-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm sự kiện"
            className="pl-10 bg-gray-800 border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <Button
          className="bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg px-4 py-2 transition-colors duration-200"
        >
          Tìm kiếm
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 flex items-center space-x-2 transition-colors duration-200"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Sắp xếp</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-100 rounded-lg shadow-lg">
            <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 px-4 py-2 transition-colors duration-200">
              Ngày tạo
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 px-4 py-2 transition-colors duration-200">
              Tên sự kiện
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 px-4 py-2 transition-colors duration-200">
              Ngày diễn ra
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          className="text-gray-100 hover:bg-gray-700 hover:text-white rounded-lg px-4 py-2 transition-colors duration-200"
        >
          Đã qua
        </Button>
        <Button
          variant="ghost"
          className="text-gray-100 hover:bg-gray-700 hover:text-white rounded-lg px-4 py-2 transition-colors duration-200"
        >
          Chờ duyệt
        </Button>
        <Button
          variant="ghost"
          className="text-gray-100 hover:bg-gray-700 hover:text-white rounded-lg px-4 py-2 transition-colors duration-200"
        >
          Nháp
        </Button>
      </div>

      {/* Main Section: No Events */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black py-8 min-h-[600px]">
        <Home className="w-20 h-20 text-gray-500 mb-4" />
        <p className="text-gray-400 text-lg">Không có sự kiện để hiển thị.</p>
      </div>
    </div>
  );
};

export default EventHome;