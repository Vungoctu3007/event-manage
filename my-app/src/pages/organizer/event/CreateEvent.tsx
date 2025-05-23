"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EventInfo from "./EventInfo";
import ScheduleTickets from "./ScheduleTickets";
import Settings from "./SettingEvent";
import PaymentInfo from "./PaymentInfo";
import { useToast } from "@/hooks/use-toast";
import { createEvent } from "@/services/EventService";
import type { CreateEventData } from "@/types/Event";

const CreateEvent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("info");
    const [completedTabs, setCompletedTabs] = useState<string[]>([]);
    const [eventData, setEventData] = useState<CreateEventData | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false); // Thêm state để theo dõi trạng thái đã lưu

    const { toast } = useToast();

    const handleContinue = () => {
        const tabOrder = ["info", "schedule", "settings", "payment"];
        const currentIndex = tabOrder.indexOf(activeTab);
        if (currentIndex < tabOrder.length - 1) {
            const nextTab = tabOrder[currentIndex + 1];
            setCompletedTabs([...completedTabs, activeTab]);
            setActiveTab(nextTab);
            setIsSaved(false); // Reset trạng thái đã lưu khi chuyển tab
        } else if (currentIndex === tabOrder.length - 1) {
            toast({
                title: "Sự Kiện Đang Chờ Duyệt",
                description:
                    "Đối tác vui lòng liên hệ Ticketbox email: tbox.bd@ticketbox.vn để được hỗ trợ trong trường hợp cần thiết. Trân trọng cảm ơn!",
                duration: 3000,
            });
        }
    };

    // Xử lý submit event info
    const handleEventDataChange = (data: CreateEventData) => {
        setEventData(data);
        setIsSaved(false); // Reset trạng thái đã lưu khi dữ liệu thay đổi
    };

    const handleSave = async () => {
        if (!eventData) {
            toast({
                title: "Lỗi",
                description:
                    "Vui lòng điền đầy đủ thông tin sự kiện trước khi lưu.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await createEvent(eventData);
            setIsSaved(true); // Đánh dấu đã lưu thành công
            toast({
                title: "Thành công",
                description: response.message || "Sự kiện đã được lưu thành công!",
            });
            setCompletedTabs((prev) => [...new Set([...prev, "info"])]); // Đảm bảo không trùng lặp
            setActiveTab("schedule");
        } catch (error: any) {
            toast({
                title: "Lỗi",
                description: error?.response?.data?.message || "Có lỗi xảy ra",
                variant: "destructive",
            });
        } finally {
            setLoading(false); // Đặt lại trạng thái loading trong mọi trường hợp
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-gray-900 via-gray-950 to-black">
            <div className="sticky top-0 z-10 border-b border-gray-700 shadow-lg">
                <div className="flex items-center justify-between p-2">
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="flex space-x-2 bg-transparent">
                            <TabsTrigger
                                value="info"
                                className="bg-transparent text-gray-300 hover:text-white rounded-md px-4 py-2 transition-all duration-200 data-[state=active]:border-b-2 data-[state=active]:border-green-500"
                            >
                                <span
                                    className={`mr-2 rounded-full w-6 h-6 flex items-center justify-center ${
                                        completedTabs.includes("info")
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-400 text-white"
                                    }`}
                                >
                                    1
                                </span>
                                {completedTabs.includes("info") ? (
                                    <span>✔ Thông tin sự kiện</span>
                                ) : (
                                    <span>Thông tin sự kiện</span>
                                )}
                            </TabsTrigger>
                            <TabsTrigger
                                value="schedule"
                                className="bg-transparent text-gray-300 hover:text-white rounded-md px-4 py-2 transition-all duration-200 data-[state=active]:border-b-2 data-[state=active]:border-green-500"
                            >
                                <span
                                    className={`mr-2 rounded-full w-6 h-6 flex items-center justify-center ${
                                        completedTabs.includes("schedule")
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-400 text-white"
                                    }`}
                                >
                                    2
                                </span>
                                {completedTabs.includes("schedule") ? (
                                    <span>✔ Thời gian & Loại vé</span>
                                ) : (
                                    <span>Thời gian & Loại vé</span>
                                )}
                            </TabsTrigger>
                            <TabsTrigger
                                value="settings"
                                className="bg-transparent text-gray-300 hover:text-white rounded-md px-4 py-2 transition-all duration-200 data-[state=active]:border-b-2 data-[state=active]:border-green-500"
                            >
                                <span
                                    className={`mr-2 rounded-full w-6 h-6 flex items-center justify-center ${
                                        completedTabs.includes("settings")
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-400 text-white"
                                    }`}
                                >
                                    3
                                </span>
                                {completedTabs.includes("settings") ? (
                                    <span>✔ Cài đặt</span>
                                ) : (
                                    <span>Cài đặt</span>
                                )}
                            </TabsTrigger>
                            <TabsTrigger
                                value="payment"
                                className="bg-transparent text-gray-300 hover:text-white rounded-md px-4 py-2 transition-all duration-200 data-[state=active]:border-b-2 data-[state=active]:border-green-500"
                            >
                                <span
                                    className={`mr-2 rounded-full w-6 h-6 flex items-center justify-center ${
                                        completedTabs.includes("payment")
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-400 text-white"
                                    }`}
                                >
                                    4
                                </span>
                                {completedTabs.includes("payment") ? (
                                    <span>✔ Thông tin thanh toán</span>
                                ) : (
                                    <span>Thông tin thanh toán</span>
                                )}
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex space-x-2">
                        <Button
                            onClick={handleSave}
                            className="bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2 transition-colors duration-200"
                            disabled={loading || isSaved} // Vô hiệu hóa khi đang lưu hoặc đã lưu
                        >
                            {loading ? "Đang lưu..." : isSaved ? "Đã lưu" : "Lưu"}
                        </Button>
                        <Button
                            onClick={handleContinue}
                            className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition-colors duration-200"
                            disabled={activeTab === "info" && !isSaved} // Vô hiệu hóa nút Tiếp tục nếu chưa lưu ở tab info
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-12 overflow-auto">
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsContent value="info">
                        <EventInfo onDataChange={handleEventDataChange} />
                    </TabsContent>
                    <TabsContent value="schedule">
                        <ScheduleTickets />
                    </TabsContent>
                    <TabsContent value="settings">
                        <Settings />
                    </TabsContent>
                    <TabsContent value="payment">
                        <PaymentInfo />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default CreateEvent;