import React, { useState } from "react";

const Settings: React.FC = () => {
  const [customLink, setCustomLink] = useState("a"); // State để quản lý giá trị input
  const [isSurveyEnabled, setIsSurveyEnabled] = useState(false);
  const [questions, setQuestions] = useState<
    { questionText: string; type: "multiple" | "text" }[]
  >([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState<"multiple" | "text">("multiple");

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { questionText: newQuestion, type: questionType }]);
      setNewQuestion(""); // Reset input sau khi thêm
    }
  };

  return (
    <div className="space-y-8 text-white p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">Cài đặt</h2>

      {/* Link dẫn đến sự kiện */}
      <div className="space-y-4 bg-gray-800 p-4 rounded-md border border-gray-700">
        <h3 className="text-lg font-semibold text-red-500">* Link dẫn đến sự kiện</h3>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-300">Tùy chỉnh đường dẫn:</label>
          <div className="relative flex-1">
            <input
              type="text"
              value={customLink}
              onChange={(e) => setCustomLink(e.target.value)} // Cập nhật state khi nhập
              className="w-full p-2 rounded-md bg-white text-black border border-gray-600 focus:outline-none focus:border-green-500"
              placeholder="Nhập đường dẫn"
              maxLength={80} // Giới hạn 80 ký tự
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              {customLink.length}/80
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          Đường dẫn sự kiện của bạn là:{" "}
          <span className="text-white">https://ticketbox.vn/{customLink}-24235</span>
        </p>
      </div>

      {/* Quyền riêng tư sự kiện */}
      <div className="space-y-4 bg-gray-800 p-4 rounded-md border border-gray-700">
        <h3 className="text-lg font-semibold">Quyền riêng tư sự kiện</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="privacy"
              id="public"
              className="text-green-500 focus:ring-green-500 h-4 w-4"
              defaultChecked
            />
            <label htmlFor="public" className="flex items-center space-x-2 text-sm">
              <span className="text-green-500">👥</span>
              <span className="text-white">Sự kiện mở cho mọi người</span>
            </label>
          </div>
          <p className="text-sm text-gray-400 ml-6">Tất cả mọi người đều có thể đặt vé</p>

          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name="privacy"
              id="private"
              className="text-green-500 focus:ring-green-500 h-4 w-4"
            />
            <label htmlFor="private" className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">👤</span>
              <span className="text-white">Sự kiện dành riêng cho 1 nhóm</span>
            </label>
          </div>
          <p className="text-sm text-gray-400 ml-6">Chỉ những có link truy cập mới đặt được vé</p>
        </div>
      </div>

      {/* Thông tin thêm */}
      <div className="space-y-4 bg-gray-800 p-4 rounded-md border border-gray-700">
        <h3 className="text-lg font-semibold">Tin nhắn xác nhận cho người tham gia</h3>
        <div className="relative">
          <textarea
            className="w-full p-2 rounded-md bg-white text-white border border-gray-600 focus:outline-none focus:border-green-500 h-32 resize-none"
            placeholder="Tin nhắn xác nhận này sẽ được gửi đến cho người tham gia sau khi đặt vé thành công "
          ></textarea>
          <span className="absolute right-2 bottom-2 text-gray-400 text-sm">
            0/500
          </span>
        </div>
      </div>

      {/* Tạo bảng câu hỏi cho người tham gia */}
      <div className="space-y-4 bg-gray-800 p-4 rounded-md border border-gray-700">
        <h3 className="text-lg font-semibold">Tạo bảng câu hỏi cho người tham gia</h3>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enable-survey"
            className="text-green-500 focus:ring-green-500 h-4 w-4"
            checked={isSurveyEnabled}
            onChange={() => setIsSurveyEnabled(!isSurveyEnabled)}
          />
          <label htmlFor="enable-survey" className="text-sm text-white">
            Bật bảng câu hỏi cho người tham gia
          </label>
        </div>

        {isSurveyEnabled && (
          <div className="space-y-4">
            {/* Form thêm câu hỏi */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Nhập câu hỏi..."
                  className="flex-1 p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
                />
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value as "multiple" | "text")}
                  className="p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
                >
                  <option value="multiple">Nhiều lựa chọn</option>
                  <option value="text">Nhập câu trả lời</option>
                </select>
              </div>
              <button
                onClick={handleAddQuestion}
                className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition-colors duration-200"
              >
                Thêm câu hỏi
              </button>
            </div>

            {/* Danh sách câu hỏi đã thêm */}
            {questions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Danh sách câu hỏi:</h4>
                <ul className="space-y-2">
                  {questions.map((q, index) => (
                    <li
                      key={index}
                      className="p-2 bg-gray-700 rounded-md flex justify-between items-center"
                    >
                      <span>
                        {index + 1}. {q.questionText} ({q.type === "multiple" ? "Nhiều lựa chọn" : "Nhập câu trả lời"})
                      </span>
                      <button
                        onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-600"
                      >
                        Xóa
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;