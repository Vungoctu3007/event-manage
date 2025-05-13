import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-green-500 text-white p-4 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-10 shadow-md">
      <div className="flex justify-between w-full sm:w-auto items-center mb-2 sm:mb-0">
        <div className="text-2xl font-bold">ticketbox</div>
        <div className="sm:hidden flex space-x-2 text-sm">
          <span>Vé đã mua</span> | <span>Đăng nhập</span> | <span>Đăng ký</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Bạn tìm gì hôm nay?"
            className="p-2 rounded-md text-black w-full"
          />
          <Button className="absolute right-0 top-0 h-full bg-transparent text-white hover:bg-green-600">
            <Search />
          </Button>
        </div>
        <Button className="hidden sm:inline-block bg-transparent hover:bg-green-600 text-sm">Tìm kiếm</Button>
        <Button className="bg-transparent hover:bg-green-600 w-full sm:w-auto text-sm">Tạo sự kiện</Button>
        <div className="hidden sm:flex space-x-2 text-sm">
          <span>Vé đã mua</span> | <span>Đăng nhập</span> | <span>Đăng ký</span>
        </div>
      </div>
     
    </header>
  );
}