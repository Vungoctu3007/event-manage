import React from "react";

const PaymentInfo: React.FC = () => {
  return (
    <div className="space-y-4 text-white  bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">Thông tin thanh toán</h2>

      <div className="space-y-4 bg-gray-800 p-4 rounded-md border border-gray-700">
        <p className="text-sm text-gray-400">
          Ticketbox sẽ chuyển tiền vào tài khoản ngân hàng của bạn. Nếu bạn muốn nhận thông tin chi tiết về số tiền đã nhận trong vòng 7 ngày, hãy gửi email tới{" "}
          <span className="text-white">info@ticketbox.vn</span>. Nếu bạn muốn nhận thông tin chi tiết về số tiền đã nhận, vui lòng liên hệ chúng tôi qua số <span className="text-white">1900.6408</span> hoặc email <span className="text-white">info@ticketbox.vn</span>.
        </p>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300 w-1/4">Email</label>
            <div className="relative flex-1">
              <input
                type="email"
                className="w-full p-2 pr-12 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-green-500"
                placeholder="Nhập email"
                maxLength={100}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                0/100
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300 w-1/4">Tên tài khoản</label>
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full p-2 pr-12 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-green-500"
                placeholder="Nhập tên tài khoản"
                maxLength={100}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                0/100
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300 w-1/4">Số tài khoản</label>
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full p-2 pr-12 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-green-500"
                placeholder="Nhập số tài khoản"
                maxLength={100}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                0/100
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300 w-1/4">Tên ngân hàng</label>
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full p-2 pr-12 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-green-500"
                placeholder="Nhập tên ngân hàng"
                maxLength={100}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                0/100
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300 w-1/4">Họ và tên</label>
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full p-2 pr-12 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-green-500"
                placeholder="Nhập họ và tên"
                maxLength={100}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                0/100
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300 w-1/4">Số tiền</label>
            <div className="relative flex-1">
              <input
                type="number"
                className="w-full p-2  rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-green-500"
                placeholder="Nhập số tiền"
                maxLength={100}
              />
            
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300 w-1/4">Địa chỉ</label>
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full p-2 pr-12 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-green-500"
                placeholder="Nhập địa chỉ"
                maxLength={100}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                0/100
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-300 w-1/4">Loại hình ngân hàng</label>
            <div className="relative flex-1">
              <select
                className="w-full p-2 pr-12 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-green-500"
              >
                <option value="cash">Cá nhân</option>
                <option value="company">Công ty</option>
              </select>
            
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentInfo;