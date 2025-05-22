import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowUpDown, BarChart2, Users, ShoppingCart, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getPaginatedEvents } from '@/services/EventService';
import moment from 'moment';
import type { EventResponse, PaginatedResponse } from '@/types/Event';

// Đặt locale cho moment
moment.locale('vi');

const EventHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState('past');
  const [events, setEvents] = useState<EventResponse['data'][]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('created_at');

  // Hàm gọi API để lấy danh sách sự kiện
  const fetchEvents = async (page: number, search: string, sort: string, status: string) => {
    setLoading(true);
    try {
      const response: PaginatedResponse<EventResponse['data']> = await getPaginatedEvents(page, {
        search,
        sort,
        status,
        per_page: 3, // Giới hạn 3 sự kiện mỗi trang
      });
      setEvents(response.data);
      setLastPage(response.last_page);
    } catch (error) {
      console.error('Lỗi khi lấy sự kiện:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi page, search, sort hoặc activeTab thay đổi
  useEffect(() => {
    setPage(1); // Reset về trang 1 khi thay đổi tab hoặc search/sort
    fetchEvents(1, search, sort, activeTab);
  }, [activeTab, search, sort]);

  // Gọi lại API khi thay đổi trang
  useEffect(() => {
    fetchEvents(page, search, sort, activeTab);
  }, [page]);

  // Hàm để hiển thị skeleton loading
  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="bg-gray-800 border-gray-700">
          <CardContent className="flex items-center p-4">
            <Skeleton className="w-1/3 h-32 rounded-lg mr-4" />
            <div className="w-2/3 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Hàm để hiển thị danh sách sự kiện
  const renderEvents = (eventList: EventResponse['data'][]) => {
    if (eventList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Home className="w-20 h-20 mb-4" />
          <p className="text-lg">Không có sự kiện để hiển thị.</p>
        </div>
      );
    }

    return eventList.map((event) => (
      <Card
        key={event.event_id}
        className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow duration-300"
      >
        <CardContent className="flex flex-col md:flex-row items-center p-4">
          <div
            className="w-full md:w-1/3 h-48 md:h-32 bg-contain bg-center rounded-lg mb-4 md:mb-0 md:mr-4"
            style={{ backgroundImage: `url(${event.banner_url})` }}
          />
          <div className="w-full md:w-2/3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-100 font-semibold text-lg">{event.title}</p>
              <Badge
                variant={
                  event.status === 'active'
                    ? 'default'
                    : event.status === 'cancelled'
                    ? 'destructive'
                    : 'secondary'
                }
                className="text-xs"
              >
                {event.status === 'active'
                  ? 'Đang diễn ra'
                  : event.status === 'cancelled'
                  ? 'Đã hủy'
                  : 'Hết vé'}
              </Badge>
            </div>
            <p className="text-green-500 text-sm">
              {moment(event.start_time).format('HH:mm, dddd, DD MMMM YYYY')}
            </p>
            <p className="text-gray-400 text-sm">
              {event.description ? event.description.slice(0, 100) + '...' : 'Không có mô tả'}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button variant="ghost" size="sm" className="text-gray-100 hover:bg-gray-700">
                <BarChart2 className="w-4 h-4 mr-2" />
                Tổng quan
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-100 hover:bg-gray-700">
                <Users className="w-4 h-4 mr-2" />
                Thành viên
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-100 hover:bg-gray-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Đơn hàng
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-100 hover:bg-gray-700">
                <Users className="w-4 h-4 mr-2" />
                Sơ đồ ghế
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-100 hover:bg-gray-700">
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-900 to-black min-h-screen p-4 md:p-6">
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-md rounded-lg shadow-lg mb-6">
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 w-full"
          />
        </div>
        <Button
          onClick={() => fetchEvents(page, search, sort, activeTab)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 w-full md:w-auto"
        >
          Tìm kiếm
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg px-4 py-2 flex items-center gap-2 w-full md:w-auto">
              <ArrowUpDown className="w-4 h-4" />
              Sắp xếp
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-100 rounded-lg shadow-lg">
            <DropdownMenuItem
              onClick={() => setSort('created_at')}
              className="hover:bg-gray-700 focus:bg-gray-700 px-4 py-2"
            >
              Ngày tạo
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSort('title')}
              className="hover:bg-gray-700 focus:bg-gray-700 px-4 py-2"
            >
              Tên sự kiện
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSort('start_time')}
              className="hover:bg-gray-700 focus:bg-gray-700 px-4 py-2"
            >
              Ngày diễn ra
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="bg-gray-800/50 backdrop-blur-md rounded-lg p-1 mb-6">
          <TabsTrigger
            value="past"
            className="px-4 py-2 rounded-md data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Đã qua
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="px-4 py-2 rounded-md data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Đang diễn ra
          </TabsTrigger>
          <TabsTrigger
            value="sold_out"
            className="px-4 py-2 rounded-md data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Hết vé
          </TabsTrigger>
        </TabsList>
        <TabsContent value="past" className="mt-0">
          {loading ? renderSkeleton() : renderEvents(events)}
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          {loading ? renderSkeleton() : renderEvents(events)}
        </TabsContent>
        <TabsContent value="sold_out" className="mt-0">
          {loading ? renderSkeleton() : renderEvents(events)}
        </TabsContent>
      </Tabs>

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1 || loading}
          className="bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg px-4 py-2"
        >
          Trang trước
        </Button>
        <span className="text-gray-100">Trang {page} / {lastPage}</span>
        <Button
          onClick={() => setPage(prev => prev + 1)}
          disabled={page === lastPage || loading}
          className="bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg px-4 py-2"
        >
          Trang sau
        </Button>
      </div>
    </div>
  );
};

export default EventHome;