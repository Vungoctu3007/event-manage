import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoMailOutline, IoCallOutline, IoLocationOutline } from "react-icons/io5";
import avatarImage from "../../../assets/avatar.jpg"; // Đường dẫn đến ảnh đại diện của bạn
const ProfileHome: React.FC = () => {
  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Header thông tin người dùng */}
      <Card className="mb-6 bg-purple-50 border-purple-200">
        <CardHeader className="flex flex-col md:flex-row items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
              <img
                src= {avatarImage}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Chào mừng quay trở lại, dnfu!
              </h1>
              <p className="text-gray-600">dnfu (Crown) <span className="text-purple-600">360 Điểm Down Đy</span></p>
            </div>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
              Chỉnh sửa
            </Button>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Thay đổi ảnh đại diện
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Phần thông tin tài khoản */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Thông tin tài khoản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <IoMailOutline className="text-purple-600 mr-3" size={24} />
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-gray-900">toyufu@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center">
            <IoCallOutline className="text-purple-600 mr-3" size={24} />
            <div>
              <p className="text-gray-500 text-sm">Số điện thoại</p>
              <p className="text-gray-900">+84 123456789</p>
            </div>
          </div>
          <div className="flex items-center">
            <IoLocationOutline className="text-purple-600 mr-3" size={24} />
            <div>
              <p className="text-gray-500 text-sm">Địa chỉ</p>
              <p className="text-gray-900">Hà Nội, Việt Nam</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phần sở thích */}
      <Card className="mb-6">
        <CardHeader> 
          <CardTitle>Sở thích</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-200 rounded-full"></span>
              <p className="text-gray-900">Thể thao</p>
            </div>
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-600">
              Select
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-200 rounded-full"></span>
              <p className="text-gray-900">Nhạc</p>
            </div>
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-600">
              Select
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-200 rounded-full"></span>
              <p className="text-gray-900">Âm nhạc, thời trang, gameshow</p>
            </div>
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-600">
              Select
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Phần hoạt động */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt động</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="pb-2">Sự kiện đã tham gia</th>
                <th className="pb-2">Ngày</th>
                <th className="pb-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2">Summer Music Festival</td>
                <td className="py-2">Jul 15, 2023</td>
                <td className="py-2 text-purple-600">+1M người đã thích</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">Tech Conference 2023</td>
                <td className="py-2">Aug 22, 2023</td>
                <td className="py-2 text-purple-600">+500k người đã thích</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">Food & Wine Festival</td>
                <td className="py-2">Sep 10, 2023</td>
                <td className="py-2 text-purple-600">+300k người đã thích</td>
              </tr>
            </tbody>
          </table>
          <Button variant="link" className="mt-4 text-purple-600">
            View All Events
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default ProfileHome;