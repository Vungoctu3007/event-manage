import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const featuredEvents = [
  { id: 1, title: "THẮP SÁNG HÀ NỘI", subtitle: "CÔNG VIÊN MỘT MÙA", date: "01.06.2025", img: "/thap-sang-ha-noi.jpg" },
  { id: 2, title: "BABYMONSTER", subtitle: "2025 BABYMONSTER 1ST WORLD TOUR", date: "2025.05.31, SAT 8PM", img: "/babymonster.jpg" },
];

const specialEvents = [
  { id: 1, title: "VIE ON", subtitle: "SVD lần 6", date: "2025.05.31", img: "/vie-on.jpg", rank: 1 },
  { id: 2, title: "ALL-ROUNDER", subtitle: "OFFICIAL MERCHANDISE COLLECTION", img: "/all-rounder.jpg", rank: 2 },
  { id: 3, title: "LỄ GIỮA HAI THẾ KỶ", subtitle: "QUÝ TẦN", img: "/le-giua-hai-the-ky.jpg", rank: 3 },
  { id: 4, title: "MỘT XƯA", subtitle: "THÁI ĐÔNG", img: "/mot-xua.jpg", rank: 4 },
];

const trendingEvents = [
  { id: 1, title: "VIE ON", subtitle: "SVD lần 6", img: "/vie-on-trending.jpg", rank: 1 },
  { id: 2, title: "PHÚ THỌ SUMMER TOUR", subtitle: "SVD PHÚ THỌ, THHCM", img: "/phu-tho-summer.jpg", rank: 2 },
  { id: 3, title: "LỄ GIỮA HAI THẾ KỶ", subtitle: "QUÝ TẦN", img: "/le-giua-hai-the-ky-trending.jpg", rank: 3 },
  { id: 4, title: "MỘT XƯA", subtitle: "THÁI ĐÔNG", img: "/mot-xua-trending.jpg", rank: 4 },
];

const recommendedEvents = [
  { id: 1, title: "[FLOWER 1969'S] MOSS FRAME WORKSHOP", subtitle: "BỨC TRANH THIÊN NHIÊN", date: "10 tháng 05, 2025", price: "315,000đ", img: "/moss-frame.jpg" },
  { id: 2, title: "Ngắm niềm bứt trỗi đến tuyết đẹp cùng Đại thiên vạn Nha Trang", date: "10 tháng 05, 2025", price: "100,000đ", img: "/nha-trang.jpg" },
  { id: 3, title: "[FLOWER 1969'S] WORKSHOP SOLID PERFUME - NƯỚC HOA KHÔ", date: "10 tháng 05, 2025", price: "279,000đ", img: "/perfume-workshop.jpg" },
  { id: 4, title: "MADAME SHOW - NHỮNG DƯỚNG CHIM BAY", date: "10 tháng 05, 2025", price: "650,000đ", img: "/madame-show.jpg" },
];

const weekendEvents = [
  { id: 1, title: "Nhà Hát IDECAF: Tiếng Mỉa Dia!", date: "09 tháng 05, 2025", price: "270,000đ", img: "/tieng-mia-dia.jpg" },
  { id: 2, title: "[BEN THÀNH] Đêm nhạc Quang Định", date: "09 tháng 05, 2025", price: "500,000đ", img: "/dem-nhac-quang-dinh.jpg" },
  { id: 3, title: "[VIVIAN VU'S CANDLES] WORKSHOP LÀM NẾN THƠM VÀ SÁP THOM HANDMADE", date: "10 tháng 05, 2025", price: "315,000đ", img: "/candle-workshop.jpg" },
  { id: 4, title: "[FLOWER 1969'S] MOSS FRAME WORKSHOP", subtitle: "BỨC TRANH THIÊN NHIÊN", date: "10 tháng 05, 2025", price: "315,000đ", img: "/moss-frame-weekend.jpg" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);

  return (
    <main className="container mx-auto p-4 bg-gray-900 text-white">
      {/* Carousel Section */}
      <section className="relative mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featuredEvents.map((event, index) => (
            <Card key={event.id} className={`overflow-hidden ${index === currentSlide ? "block" : "hidden lg:block"}`}>
              <CardContent className="p-0">
                <img src={event.img} alt={event.title} className="w-full h-64 lg:h-96 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.subtitle}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <Button className="mt-2 bg-green-500 hover:bg-green-600 text-white">
                    Xem chi tiết <Play className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700">
          <ChevronLeft />
        </Button>
        <Button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700">
          <ChevronRight />
        </Button>
      </section>

      {/* Special Events Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Sự kiện đặc biệt</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden relative">
              <CardContent className="p-0">
                <img src={event.img} alt={event.title} className="w-full h-48 object-cover" />
                {event.rank && (
                  <span className="absolute top-0 left-0 bg-green-500 text-white text-2xl font-bold p-2 rounded-br-lg">{event.rank}</span>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.subtitle}</p>
                  {event.date && <p className="text-sm text-gray-500">{event.date}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Events Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          Sự kiện xu hướng <span className="ml-2 text-yellow-500">🔥</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden relative">
              <CardContent className="p-0">
                <img src={event.img} alt={event.title} className="w-full h-48 object-cover" />
                {event.rank && (
                  <span className="absolute top-0 left-0 bg-green-500 text-white text-2xl font-bold p-2 rounded-br-lg">{event.rank}</span>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommended Events Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Dành cho bạn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img src={event.img} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.subtitle}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <p className="text-sm text-green-500 font-bold">{event.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-4">
          <Button className="bg-green-500 hover:bg-green-600 text-white">Xem thêm</Button>
        </div>
      </section>

      {/* Weekend Events Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Cuối tuần này</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weekendEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img src={event.img} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <p className="text-sm text-green-500 font-bold">{event.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}