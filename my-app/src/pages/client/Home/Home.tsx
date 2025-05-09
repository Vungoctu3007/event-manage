const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Explore Events Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Khám phá sự kiện</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện theo tên, địa điểm hoặc ngày..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </section>

      {/* Tags Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Thể loại</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-200 p-4 rounded-lg flex items-center space-x-3">
            <span className="text-blue-500">🎵</span>
            <div>
              <h3 className="font-medium">Âm nhạc</h3>
              <p className="text-sm text-gray-500">Biểu diễn, hòa nhạc, lễ hội...</p>
            </div>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg flex items-center space-x-3">
            <span className="text-purple-500">🎤</span>
            <div>
              <h3 className="font-medium">Hội nghị</h3>
              <p className="text-sm text-gray-500">Hội thảo, hội thảo chuyên đề và sự kiện kinh doanh</p>
            </div>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg flex items-center space-x-3">
            <span className="text-purple-500">🎭</span>
            <div>
              <h3 className="font-medium">Thể thao</h3>
              <p className="text-sm text-gray-500">Trận đấu, giải đấu và cuộc thi</p>
            </div>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg flex items-center space-x-3">
            <span className="text-purple-500">🎨</span>
            <div>
              <h3 className="font-medium">Nghệ thuật</h3>
              <p className="text-sm text-gray-500">Triển lãm, phòng trưng bày và biểu diễn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted Events Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Sự kiện nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
            <p className="text-sm text-gray-500 mb-2">Dec 25, 2023 • 8:00 PM</p>
            <h3 className="font-semibold">Summer Music Festival</h3>
            <p className="text-sm text-gray-500 mb-4">Nhạc hội lớn Hà Nội</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Xem chi tiết
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
            <p className="text-sm text-gray-500 mb-2">Dec 25, 2024 • 9:30 AM</p>
            <h3 className="font-semibold">Hội nghị công nghệ 2025</h3>
            <p className="text-sm text-gray-500 mb-4">Âm hội nghị quốc gia</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Xem chi tiết
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
            <p className="text-sm text-gray-500 mb-2">Feb 5, 2024 • 7:00 PM</p>
            <h3 className="font-semibold">Giải vô địch bóng đá</h3>
            <p className="text-sm text-gray-500 mb-4">Sân vận động Mỹ Đình</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Xem chi tiết
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Sự kiện sắp diễn ra</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-medium">Khởi mạc triển lãm nghệ thuật</h3>
              <p className="text-sm text-gray-500">Dec 10, 2025 • Bảo tàng Mỹ thuật</p>
            </div>
            <span className="text-gray-500">➔</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-medium">Sự kiện kết nối kinh doanh</h3>
              <p className="text-sm text-gray-500">Dec 12, 2025 • Khách sạn Melia</p>
            </div>
            <span className="text-gray-500">➔</span>
          </div>
          <div className="bg-white p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-medium">Đêm nhạc JAZZ</h3>
              <p className="text-sm text-gray-500">Dec 18, 2025 • CLB xã hội Hà Nội</p>
            </div>
            <span className="text-gray-500">➔</span>
          </div>
        </div>
        <button className="mt-4 text-blue-600  hover:underline">Xem tất cả</button>
      </section>
    </div>
  );
};

export default Home;