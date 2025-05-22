import React, { useState, useCallback } from "react";
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

interface EventDetailsProps {
  onDataChange: (data: {
    title: string;
    start_time: string;
    end_time: string;
    status: "active" | "cancelled" | "sold_out";
    category_id: string;
    description: string;
  }) => void;
}

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

const EventDetails: React.FC<EventDetailsProps> = React.memo(
  ({ onDataChange }) => {
    const maxLength = 100;
    const [formData, setFormData] = useState({
      title: "",
      start_time: "",
      end_time: "",
      status: "active" as "active" | "cancelled" | "sold_out",
    });
    const [description, setDescription] = useState(`
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
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const getCategoryId = useCallback((category: string): string => {
      const categoryMap: { [key: string]: string } = {
        "Nhạc sống": "1",
        "Sân Khấu & Nghệ Thuật": "2",
        "Thể Thao": "3",
        Khác: "4",
      };
      return categoryMap[category] || "";
    }, []);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "title" && value.length > maxLength) return;
        setFormData((prev) => {
          const newData = { ...prev, [name]: value };
          onDataChange({ ...newData, category_id: getCategoryId(selectedCategory), description });
          return newData;
        });
      },
      [onDataChange, selectedCategory, description, getCategoryId]
    );

    const handleCategoryChange = useCallback(
      (category: string) => {
        setSelectedCategory(category);
        onDataChange({
          ...formData,
          category_id: getCategoryId(category),
          description,
        });
      },
      [formData, description, onDataChange, getCategoryId]
    );

    const handleDescriptionChange = useCallback(
      (value: string) => {
        setDescription(value);
        onDataChange({ ...formData, category_id: getCategoryId(selectedCategory), description: value });
      },
      [formData, selectedCategory, onDataChange, getCategoryId]
    );

    return (
      <div className="space-y-4">
        <div>
          <label className="text-sm mb-1 block">
            <span className="text-red-500">*</span>{" "}
            <span className="text-white">Tên sự kiện</span>
          </label>
          <div className="relative w-full">
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Tên sự kiện"
              className="bg-white text-black border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full pr-20"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">
              {formData.title.length} / {maxLength}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm mb-1 block">
              <span className="text-red-500">*</span>{" "}
              <span className="text-white">Thời gian bắt đầu</span>
            </label>
            <Input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              className="bg-white text-black border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full"
            />
          </div>
          <div>
            <label className="text-sm mb-1 block">
              <span className="text-red-500">*</span>{" "}
              <span className="text-white">Thời gian kết thúc</span>
            </label>
            <Input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              className="bg-white text-black border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 w-full"
            />
          </div>
        </div>
        <div>
          <label className="text-sm mb-1 block">
            <span className="text-red-500">*</span>{" "}
            <span className="text-white">Thể loại sự kiện</span>
          </label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full bg-white text-black border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500">
              <SelectValue placeholder="Chọn Thể loại sự kiện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nhạc sống">Nhạc sống</SelectItem>
              <SelectItem value="Sân Khấu & Nghệ Thuật">
                Sân Khấu & Nghệ Thuật
              </SelectItem>
              <SelectItem value="Thể Thao">Thể Thao</SelectItem>
              <SelectItem value="Khác">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm mb-1 block">
            <span className="text-red-500">*</span>{" "}
            <span className="text-white">Thông tin sự kiện</span>
          </label>
          <ReactQuill
            modules={{ toolbar: toolbarOptions }}
            theme="snow"
            value={description}
            onChange={handleDescriptionChange}
            className="bg-white text-black rounded-md border p-2"
          />
        </div>
      </div>
    );
  }
);

export default EventDetails;