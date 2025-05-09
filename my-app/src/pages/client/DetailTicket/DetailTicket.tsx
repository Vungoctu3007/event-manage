import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IoQrCodeOutline,
  IoTicketOutline,
  IoPeopleOutline,
  IoCalendarOutline,
  IoCartOutline,
  IoTimeOutline,
  IoBagOutline,
  IoCarOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

const DetailTicket: React.FC = () => {
  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-purple-600">Home</Link> {" "}
        <Link to="/my-tickets" className="hover:text-purple-600">My Tickets</Link> {" "}
        <span className="text-gray-700">Summer Music Festival</span>
      </nav>

      {/* Event Title and Download Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Summer Music Festival</h1>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Download Ticket
        </Button>
      </div>

      {/* Ticket Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* QR Code Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <IoQrCodeOutline className="text-purple-600" size={24} />
            <CardTitle>TICKET #TK-2023-8745</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Mã QR Code</CardDescription>
            <p className="text-gray-500 text-sm mt-2">
              Xuất trình mã QR Code để vào cổng
            </p>
          </CardContent>
        </Card>

        {/* Event Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết sự kiện</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              25/11/2023 • 8:00 PM - 11:00 PM Nhạc hát Opera Hà Nội, 1 Tràng Tiền
            </CardDescription>
          </CardContent>
        </Card>

        {/* Ticket Status Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <CardTitle>Xác nhận</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Trạng thái vé</CardDescription>
            <p className="text-gray-500 text-sm mt-2">
              Vé của bạn đã được xác nhận để sử dụng
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Information Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Thông tin vé</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center">
            <IoTicketOutline className="text-purple-600 mr-3" size={24} />
            <div>
              <p className="text-gray-500 text-sm">Ticket Type</p>
              <p className="text-gray-900">General Admission</p>
            </div>
          </div>
          <div className="flex items-center">
            <IoPeopleOutline className="text-purple-600 mr-3" size={24} />
            <div>
              <p className="text-gray-500 text-sm">Quantity</p>
              <p className="text-gray-900">2 Tickets</p>
            </div>
          </div>
          <div className="flex items-center">
            <IoCalendarOutline className="text-purple-600 mr-3" size={24} />
            <div>
              <p className="text-gray-500 text-sm">Purchase Date</p>
              <p className="text-gray-900">November 30, 2023</p>
            </div>
          </div>
          <div className="flex items-center">
            <IoCartOutline className="text-purple-600 mr-3" size={24} />
            <div>
              <p className="text-gray-500 text-sm">Order Number</p>
              <p className="text-gray-900">ORD-2023-5689</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Information Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h2>
        <p className="text-gray-600 mb-4">
          Join us for the biggest summer music festival featuring top artists from around the world. Experience amazing performances across multiple stages with food vendors, art installations, and more.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <IoTimeOutline className="text-purple-600 mr-3" size={24} />
              <div>
                <p className="text-gray-500 text-sm">Gates Open</p>
                <p className="text-gray-900">6:30 PM</p>
              </div>
            </div>
            <div className="flex items-center">
              <IoBagOutline className="text-purple-600 mr-3" size={24} />
              <div>
                <p className="text-gray-500 text-sm">Bag Policy</p>
                <p className="text-gray-900">Small bags only (under 12x12 inches)</p>
              </div>
            </div>
            <div className="flex items-center">
              <IoCarOutline className="text-purple-600 mr-3" size={24} />
              <div>
                <p className="text-gray-500 text-sm">Parking</p>
                <p className="text-gray-900">Available at Opera House Garage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <IoShareSocialOutline className="text-purple-600 mx-auto mb-3" size={24} />
            <CardTitle>Transfer Tickets</CardTitle>
            <CardDescription>Send tickets to friends or family</CardDescription>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Transfer</Button>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <IoCalendarOutline className="text-purple-600 mx-auto mb-3" size={24} />
            <CardTitle>Add to Calendar</CardTitle>
            <CardDescription>Sync event with your calendar</CardDescription>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Add</Button>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <IoPeopleOutline className="text-purple-600 mx-auto mb-3" size={24} />
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Need help with your tickets?</CardDescription>
            <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Contact</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DetailTicket;