import React from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Report: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-gray-900 via-gray-950 to-black pt-6 px-8">
            {/* Header Row */}
            <div className="bg-gray-800 rounded-t-lg shadow-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                            <TableHead className="w-12 text-gray-300 font-medium">
                                File
                            </TableHead>
                            <TableHead className="text-gray-300 font-medium">
                                Ngày Tạo
                            </TableHead>
                            <TableHead className="text-gray-300 font-medium">
                                Người tạo
                            </TableHead>
                            <TableHead className="text-gray-300 font-medium">
                                Trạng thái sử dụng
                            </TableHead>
                            <TableHead className="text-gray-300 font-medium">
                                Thao tác
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </div>

            {/* Content Area: No Data */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
                <FileText className="w-24 h-24 text-gray-500 mb-6 animate-pulse" />
                <p className="text-gray-300 text-xl font-medium mb-4">
                    Chưa có báo cáo nào để hiển thị
                </p>
                <p className="text-gray-400 text-sm mb-6 max-w-md text-center">
                    Bạn có thể tạo báo cáo mới để bắt đầu theo dõi và quản lý dữ
                    liệu của mình.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
                    <Plus className="w-5 h-5" />
                    <span>Tạo báo cáo mới</span>
                </Button>
            </div>
        </div>
    );
};

export default Report;
