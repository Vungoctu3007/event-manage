import React, { useEffect, useRef, useState } from "react";
import { Upload, FileImage } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import type { District, Province, Ward } from "@/types/Province";

const EventInfo: React.FC = () => {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleBackgroundClick = () => {
    backgroundInputRef.current?.click();
  };

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState(
    "Chọn Thể loại sự kiện"
  );

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  const handleProvinceChange = (provinceName: string) => {
    setSelectedProvince(provinceName);
    const province = provinces.find((p) => p.name === provinceName);
    setDistricts(province?.districts || []);
    setSelectedDistrict("");
    setWards([]);
  };

  const handleDistrictChange = (districtName: string) => {
    setSelectedDistrict(districtName);
    const district = districts.find((d) => d.name === districtName);
    setWards(district?.wards || []);
    setSelectedWard("");
  };

  const maxLength = 100;
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value);
    }
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value.slice(0, maxLength));
  };

  const [value, setValue] = useState(`
    <strong>Giới thiệu sự kiện:</strong><br/>
    Tóm tắt ngắn gọn về sự kiện: Nội dung chính của sự kiện, điểm đặc sắc nhất và lý do khiến người tham gia không nên bỏ lỡ<br/><br/>

    <strong>Chi tiết sự kiện:</strong><br/>
    <strong>Chương trình chính:</strong> Liệt kê những hoạt động nổi bật trong sự kiện: các phần trình diễn, khách mời đặc biệt, lịch trình các tiết mục cụ thể nếu có.<br/>
    <strong>Khách mời:</strong> Thông tin về các khách mời đặc biệt, nghệ sĩ, diễn giả sẽ tham gia sự kiện. Có thể bao gồm phần mô tả ngắn gọn về họ và những gì họ sẽ mang lại cho sự kiện.<br/>
    <strong>Trải nghiệm đặc biệt:</strong> Nếu có các hoạt động đặc biệt khác như workshop, khu trải nghiệm, photo booth, khu vực check-in hay các phần quà/ưu đãi dành riêng cho người tham dự.<br/><br/>

    <strong>Điều khoản và điều kiện:</strong><br/>
    TnC sự kiện<br/><br/> 

    <strong>Lưu ý về điều khoản trẻ em</strong><br/>
    <strong>Lưu ý về điều khoản VAT</strong>
  `);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="space-y-6">
      {/* Upload Sections */}
      <div className="grid grid-cols-5 gap-6">
        <div
          style={{ backgroundColor: "#292D2B" }}
          className="col-span-1 rounded-lg p-12 text-center border-2 border-dashed border-gray-600 hover:border-green-500 transition-colors duration-200 relative cursor-pointer"
          onClick={handleLogoClick}
        >
          <input
            ref={logoInputRef}
            id="logoInput"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <Upload className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-400">Thêm logo sự kiện</p>
        </div>
        <div
          style={{ backgroundColor: "#292D2B" }}
          className="col-span-4 rounded-lg p-12 text-center border-2 border-dashed border-gray-600 hover:border-green-500 transition-colors duration-200 relative cursor-pointer"
          onClick={handleBackgroundClick}
        >
          <input
            ref={backgroundInputRef}
            id="backgroundInput"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <FileImage className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-400">Thêm ảnh nền sự kiện</p>
        </div>
      </div>
      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="text-sm mb-1 block">
            <span className="text-red-500">*</span>{" "}
            <span className="text-white">Tên sự kiện</span>
          </label>
          <div className="relative w-full">
            <Input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Tên sự kiện"
              className="bg-white text-black border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full pr-20"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
              {inputValue.length} / {maxLength}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm mb-1 block">
            <span className="text-red-500">*</span>{" "}
            <span className="text-white">Địa chỉ sự kiện</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="eventType"
              className="bg-gray-800 border-gray-700 text-green-500 focus:ring-green-500"
              defaultChecked
            />
            <span className="text-gray-300">Sự kiện Offline</span>
            <input
              type="radio"
              name="eventType"
              className="bg-gray-800 border-gray-700 text-green-500 focus:ring-green-500"
            />
            <span className="text-gray-300">Sự kiện Online</span>
          </div>
        </div>
        <div>
          <label className="text-sm mb-1 block">
            <span className="text-red-500">*</span>{" "}
            <span className="text-white">Tên địa điểm</span>
          </label>
          <div className="relative w-full">
            <Input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Tên địa điểm"
              className="bg-white text-black border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full pr-20"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
              {inputValue.length} / {maxLength}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm mb-1 block">
              <span className="text-red-500">*</span>{" "}
              <span className="text-white">Tỉnh thành</span>
            </label>
            <Select value={selectedProvince} onValueChange={handleProvinceChange}>
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Chọn Tỉnh/Thành" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((p) => (
                  <SelectItem key={p.code} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-white text-sm mb-1 block">Quận/Huyện</label>
            <Select
              value={selectedDistrict}
              onValueChange={handleDistrictChange}
              disabled={!districts.length}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Chọn Quận/Huyện" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d.code} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white text-sm mb-1 block">Phường/Xã</label>
            <Select
              value={selectedWard}
              onValueChange={setSelectedWard}
              disabled={!wards.length}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="Chọn Phường/Xã" />
              </SelectTrigger>
              <SelectContent>
                {wards.map((w) => (
                  <SelectItem key={w.code} value={w.name}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm mb-1 block">
              <span className="text-red-500">*</span>{" "}
              <span className="text-white">Số nhà, đường</span>
            </label>
            <Input
              placeholder="Số nhà, đường"
              className="bg-white text-black border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div>
          <label className="text-sm mb-1 block">
            <span className="text-red-500">*</span>{" "}
            <span className="text-white">Thể loại sự kiện</span>
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-white text-black border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500">
              <SelectValue placeholder="Chọn Thể loại sự kiện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nhạc sống">Nhạc sống</SelectItem>
              <SelectItem value="Sân Khấu & Nghệ Thuật">
                Sân Khấu & Nghệ Thuật
              </SelectItem>
              <SelectItem value="Thể Thao">Thể Thao</SelectItem>
              <SelectItem value="Giải trí">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm mb-1 block">
            <span className="text-red-500">*</span>{" "}
            <span className="text-white">Thông tin sự kiện</span>
          </label>
          <ReactQuill
            modules={module}
            theme="snow"
            value={value}
            onChange={setValue}
            className="bg-white text-black rounded-md border p-2"
          />
        </div>
        <div className="flex">
          <div className="w-1/4 pr-4 pt-5">
            <div
              style={{ backgroundColor: "#292D2B" }}
              className="rounded-lg p-12 text-center border-2 border-dashed border-gray-700 hover:border-green-500 text-white relative cursor-pointer"
              onClick={handleLogoClick}
            >
              <input
                ref={fileInputRef}
                id="logoInput"
                type="file"
                accept="image/*"
                className="hidden"
              />
              <Upload className="w-12 h-12 text-green-500 mx-auto mb-4 hover:border-green-500" />
              <p className="text-gray-300">Thêm logo ban tổ chức</p>
              <p className="text-xs text-gray-400">(275x275)</p>
            </div>
          </div>
          <div className="w-4/5 space-y-4">
            <div>
              <label className="text-sm mb-1 block">
                <span className="text-red-500">*</span>{" "}
                <span className="text-white">Tên ban tổ chức</span>
              </label>
              <div className="relative w-full">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Tên ban tổ chức"
                  className="bg-white text-black border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full pr-20"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
                  {inputValue.length} / {maxLength}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm mb-1 block">
                <span className="text-red-500">*</span>{" "}
                <span className="text-white">Thông tin ban tổ chức</span>
              </label>
              <div className="flex-1">
                <div className="relative w-full">
                  <textarea
                    value={inputValue}
                    onInput={handleChangeTextArea}
                    placeholder="Thông tin ban tổ chức"
                    className="bg-white text-black border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full h-24 rounded-md p-2 pr-20"
                  />
                  <span className="absolute right-2 bottom-2 text-xs text-gray-500 pointer-events-none">
                    {inputValue.length} / 500
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;